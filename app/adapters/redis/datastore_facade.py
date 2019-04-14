import json
import logging as log

# contant keys
sth, nth, lng, lat = 'southeast', 'northwest', 'lng', 'lat'


class NoCityInDataStoreException(Exception): pass


class RedisFacade():
    def __init__(self, redis):
        self._r = redis

    def georadius(self, key, lat, lng, radius):
        return self._r.georadius(key, lng, lat, radius,
                                 unit='m', withdist=True, withcoord=True, count=None, sort='ASC')

    def get_place_details(self, places_key, place_id):
        return json.loads(self._r.hget(places_key, place_id))

    def get_all_matching_keys(self, key_base):
        return self._r.keys(f'{key_base}:*')

    def get_val(self, key):
        return self._r.get(key)


class DataStoreFacade():
    boundaries_key = "cities:boundaries"
    coordinates_key = "cities:coordinates"
    places_key = "cities:places"

    def __init__(self, redis):
        self.redis_facade = RedisFacade(redis=redis)

        self.city_coords = {}
        self._build_city_coords()

    def query(self, lat, lng, radius, place_types):
        try:
            city_name, city_data = self._city_matches_query(lat, lng)
            assert city_name, (f"no city in datastore for lat={lat} lng={lng}", NoCityInDataStoreException())

            places = self.get_matching_places_in_city(city_name, lat, lng, radius, place_types)
        except AssertionError as ex:
            msg, exception = ex.args
            raise exception

    def get_matching_places_in_city(self, city, lat, lng, radius, place_types):
        raw_coords_places = self.redis_facade.georadius(key=f'{self.coordinates_key}:{city}', lat=lat, lng=lng,
                                                        radius=radius)
        log.debug(f"Found {len(raw_coords_places)} places for {city}")

        details = [place for place in (self._process_raw_item(city, raw, place_types) for raw in raw_coords_places) if
                   place]
        return details

    def _process_raw_item(self, city, raw_item, place_types):
        processed_place = self.redis_facade.get_place_details(places_key=f'{self.places_key}:{city}',
                                                              place_id=raw_item[0])
        processed_place_types = processed_place.get("types", [])
        valid_place = len(set(place_types).intersection(set(processed_place_types))) > 0

        return processed_place if valid_place else None

    def available_cities(self):
        keys = self.redis_facade.get_all_matching_keys(self.boundaries_key)
        city_names = [k.split(':')[-1] for k in keys]
        return city_names, keys

    def _build_city_coords(self):
        cities, city_keys = self.available_cities()
        for city_name, key in zip(cities, city_keys):
            city_data = self.redis_facade.get_val(key)
            self.city_coords[city_name] = json.loads(city_data)

    def _city_matches_query(self, query_lat, query_lng):
        """
        for each city we store we check if the query coords are within its boundaries
        :param query_lat:
        :param query_lng:
        :return:
        """

        def coords_in(bound_coord1, bound_coord2, query_coord):
            return max(bound_coord1, bound_coord2) > query_coord and query_coord > min(bound_coord1, bound_coord2)

        for city_name, city_data in self.city_coords.items():
            nw_lat, nw_lng, se_lat, se_lng = city_data[nth][lat], city_data[nth][lng], city_data[sth][lat], \
                                             city_data[sth][lng]
            log.debug("checking if query's coords are within [{city_name}]")
            if coords_in(nw_lat, se_lat, query_lat) and coords_in(nw_lng, se_lng, query_lng):
                return city_name, city_data
        return None, None


if __name__ == '__main__':
    import connection  # _redis
    from collections import namedtuple

    config = {'REDIS_HOST': '192.168.99.100'}
    _fake_app_type = namedtuple('FakeApp', ['config'])
    fake_app = _fake_app_type(config=config)
    connection.init_redis_app(fake_app)
    redis = connection._redis

    facade = DataStoreFacade(connection._redis)
    names, keys = facade.available_cities()
    sofia = names[0]
    lat, lng = 42.695466, 23.318973  # sofia center
    result = facade.get_matching_places_in_city('sofia', lat=lat, lng=lng, radius=1000, place_types=['bar'])
    print(result)
