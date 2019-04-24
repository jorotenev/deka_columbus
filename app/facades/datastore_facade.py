import json
import logging as log
import app

# constant keys
STH, NTH, LNG, LAT = 'southeast', 'northwest', 'lng', 'lat'
BOUNDARIES_KEY = "cities:boundaries"
COORDINATES_KEY = "cities:coordinates"
PLACES_KEY = "cities:places"

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

    def query(self, lat, lng, radius, place_types):
        try:
            city_name, city_data = self.cities.get_city_matching_query_coords(lat, lng)
            assert city_name, (f"no city in datastore for lat={lat} lng={lng}", NoCityInDataStoreException)

            places = self.get_matching_places_in_city(city_name, lat, lng, radius, place_types)
            log.debug(f"Found {len(places)} within {city_name}")
            return places
        except AssertionError as ex:
            msg, exception = ex.args[0]
            log.exception(msg)
            raise exception(msg)

    def get_matching_places_in_city(self, city, lat, lng, radius, place_types):
        raw_coords_places = self.redis_facade.georadius(key=f'{COORDINATES_KEY}:{city}', lat=lat, lng=lng,
                                                        radius=radius)
        log.debug(f"Found {len(raw_coords_places)} places for {city}")

        details = [place for place in (self._process_raw_item(city, raw, place_types) for raw in raw_coords_places) if
                   place]
        return details

    def _process_raw_item(self, city, raw_item, place_types):
        processed_place = self.redis_facade.fetch_item_from_hash(key=f'{PLACES_KEY}:{city}',
                                                                 item_id=raw_item[0])
        processed_place_types = processed_place.get("types", [])
        valid_place = len(set(place_types).intersection(set(processed_place_types))) > 0

        return processed_place if valid_place else None


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


class NoCityInDataStoreException(Exception): pass


if __name__ == '__main__':
    import connection  # _redis
    from collections import namedtuple

    config = {'REDIS_HOST': '192.168.99.100'}
    _fake_app_type = namedtuple('FakeApp', ['config'])
    fake_app = _fake_app_type(config=config)
    connection.init_redis_app(fake_app)
    redis = connection._redis
    redis_facade = RedisAdapter(redis)
    facade = _DataStoreFacade(redis_facade)

    sofia = 'sofia'
    lat, lng = 42.695466, 23.318973  # sofia center
    result = facade.query(lat=lat, lng=lng, radius=1000, place_types=['bar'])
    print(result)
