import json

from redis import StrictRedis


class RedisAdapter():
    def __init__(self, app=None):
        # global _redis
        if app:
            self.init_app(app)
        # self._r = _redis

    def init_app(self, app):
        self._r = StrictRedis(host=app.config.get("REDIS_HOST"),
                              socket_timeout=2,
                              decode_responses=True)

    def ping(self):
        return self._r.ping()

    def georadius(self, key, lat, lng, radius, limit=None):
        """
        returns [place_id, dist from query point, (lat,lng)]
        """
        return self._r.georadius(key, lng, lat, radius,
                                 unit='m', withdist=True, withcoord=True, count=limit, sort='ASC')

    def fetch_item_from_hash(self, key, item_id):
        fetched = self._r.hget(key, item_id)
        return json.loads(fetched) if fetched else None

    def get_all_matching_keys(self, key_base):
        return self._r.keys(f'{key_base}:*')

    def get_val(self, key):
        return self._r.get(key)

    def store_item_in_hash(self, hash_key, item_id, value):
        val = None
        if type(value) != str:
            val = json.dumps(value)
        self._r.hset(name=hash_key, key=item_id, value=val if val else value)
