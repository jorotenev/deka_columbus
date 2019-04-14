from redis import StrictRedis

_redis = None


def init_redis_app(app):
    global _redis
    _redis = StrictRedis(host=app.config.get("REDIS_HOST"), decode_responses=True)
