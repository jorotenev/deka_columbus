import json

from redis import StrictRedis

_redis = None


def init_redis_app(app):
    global _redis
    _redis = StrictRedis(host=app.config.get("REDIS_HOST"), decode_responses=True)


class RedisAdapter():
    def __init__(self):
        global _redis
        self._r = _redis

    def georadius(self, key, lat, lng, radius, limit=None):
        """
        returns [place_id, dist from query point, (lat,lng)]
        """
        return self._r.georadius(key, lng, lat, radius,
                                 unit='m', withdist=True, withcoord=True, count=limit, sort='ASC')

    def fetch_item_from_hash(self, key, item_id):
        return json.loads(self._r.hget(key, item_id))

    def get_all_matching_keys(self, key_base):
        return self._r.keys(f'{key_base}:*')

    def get_val(self, key):
        return self._r.get(key)
