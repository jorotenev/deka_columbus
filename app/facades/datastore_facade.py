import json
import logging as log

from flask import current_app

import app
from app.facades.exceptions import NoCityInDataStoreException

# constant keys
from app.facades.google_wrapper import GoogleWrapper

STH, NTH, LNG, LAT = 'southeast', 'northwest', 'lng', 'lat'
BOUNDARIES_KEY = "cities:boundaries"
COORDINATES_KEY = "cities:coordinates"
PLACES_KEY = "cities:places"
CACHED_DETAILED_PLACES_KEY = "cities:places_detailed"

_facade = None


def get_datastore_facade():
    global _facade
    if not _facade:
        _facade = _DataStoreFacade(app.redis_adapter)

    return _facade


class _DataStoreFacade():

    def __init__(self, redis_adapter):
        log.debug("Initialising data store")
        self.redis_facade = redis_adapter
        self.cities = CityCoords(self.redis_facade)
        self.place_fetcher = PlaceFetcher(self.redis_facade)

    def query(self, lat, lng, radius, place_types, price, open_at):
        try:
            city_name, city_data = self.cities.get_city_matching_query_coords(lat, lng)
            assert city_name, (f"no city in datastore for lat={lat} lng={lng}", NoCityInDataStoreException)

            places = self.get_matching_places_in_city(city_name, lat, lng, radius, place_types, price, open_at)
            log.debug(f"Found {len(places)} within {city_name}")
            return places
        except AssertionError as ex:
            msg, exception = ex.args[0]
            log.exception(msg)
            raise exception(msg)

    def get_matching_places_in_city(self, city, lat, lng, radius, query_place_types, query_price, open_at):
        # [ [place_id,[lat,lng],... ]
        raw_places_id_with_coords = self.redis_facade.georadius(key=f'{COORDINATES_KEY}:{city}', lat=lat, lng=lng,
                                                                radius=radius)
        log.debug(f"Found {len(raw_places_id_with_coords)} places for {city} within lat={lat} lng={lng} r={radius}")

        # fetch place details and filter the ones that match the query
        return [place for place in
                (self.place_fetcher.fetch(place_id=raw[0], city=city) for raw in raw_places_id_with_coords)
                if self._place_matches_query(place, query_place_types, query_price)]

    def _place_matches_query(self, fetched_place, query_place_types, query_price):
        processed_place_types = fetched_place.get("types", [])
        try:
            assert len(set(query_place_types).intersection(set(processed_place_types))) > 0
        except AssertionError:
            return False
        return True


class CityCoords():
    def __init__(self, redis_facade):
        self.city_coords = {}
        self.redis_facade = redis_facade
        self._build_city_coords()

    def available_cities(self):
        keys = self.redis_facade.get_all_matching_keys(BOUNDARIES_KEY)
        city_names = [k.split(':')[-1] for k in keys]
        return city_names, keys

    def _build_city_coords(self):
        cities, city_keys = self.available_cities()
        for city_name, key in zip(cities, city_keys):
            city_data = self.redis_facade.get_val(key)
            self.city_coords[city_name] = json.loads(city_data)

    def get_city_matching_query_coords(self, query_lat, query_lng):
        """
        for each city we store we check if the query coords are within its boundaries
        :param query_lat:
        :param query_lng:
        :return:
        """

        def coords_in(bound_coord1, bound_coord2, query_coord):
            return max(bound_coord1, bound_coord2) > query_coord > min(bound_coord1, bound_coord2)

        for city_name, city_data in self.city_coords.items():
            nw_lat, nw_lng, se_lat, se_lng = city_data[NTH][LAT], city_data[NTH][LNG], city_data[STH][LAT], \
                                             city_data[STH][LNG]
            log.debug(f"checking if query's coords are within [{city_name}]")
            if coords_in(nw_lat, se_lat, query_lat) and coords_in(nw_lng, se_lng, query_lng):
                return city_name, city_data
        return None, None


class PlaceFetcher:
    """
    encapsulates the logic of managing the datastore & caching

    given a request to fetch a place, get the basic data for the place.
    Then check if we have _detailed data for this place.
    * if we do, get it from the datastore and merge it with the basic data
    * if we don't, get the details from the google api, cache them in the datastore and merge them to the basic data

    The reason we do this is because we want to minimse the calls to the Details API (it's expensive $$$)
    """

    def __init__(self, redis_facade):
        self.redis_facade = redis_facade
        self.google_wrapper = GoogleWrapper(current_app)

    def _save_place_details(self, place_id, city, place_details):
        self.redis_facade.store_item_in_hash(hash_key=f'{CACHED_DETAILED_PLACES_KEY}:{city}', item_id=place_id,
                                             value=place_details)

    def fetch(self, city, place_id):
        basic_data = self.redis_facade.fetch_item_from_hash(key=f'{PLACES_KEY}:{city}',
                                                            item_id=place_id)
        details = self.get_place_details(city=city, place_id=place_id)
        if details:
            basic_data.update(details)
        return basic_data

    def get_place_details(self, city, place_id):
        place_details = self.redis_facade.fetch_item_from_hash(key=f'{CACHED_DETAILED_PLACES_KEY}:{city}',
                                                               item_id=place_id)
        if not place_details:
            # cache miss
            log.debug("Cache miss for place details for " + place_id)
            place_details = self.google_wrapper.query(place_id=place_id)
            if place_details:
                log.debug("Place details from api:")
                log.debug(place_details)
                self._save_place_details(place_id=place_id, city=city, place_details=place_details)
            else:
                log.debug("No details from API for " + place_id)

        return place_details


if __name__ == '__main__':
    from app import create_app
    from config import configs

    if __name__ == '__main__':
        from dateutil.parser import parse

        d = parse('2019-01-01T21:00')
        print(d)
    exit(0)
    _app = create_app(app_config=configs['development'])
    with _app.app_context():
        facade = get_datastore_facade()

        place_fetcher = facade.place_fetcher

        place = place_fetcher.google_wrapper.query(place_id="ChIJRWXGlmyFqkAR7E1lhoPyEZk")
        # place = place_fetcher.fetch('sofia', "ChIJRWXGlmyFqkAR7E1lhoPyEZk")
        print(place)
