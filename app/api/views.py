from flask import request
import logging as log
from . import api
from app.helpers.api_utils import make_json_response
from app.adapters.redis.datastore_facade import query as query_redis


@api.route('/api_ping')
def ping():
    return make_json_response({"result": "pong"})


@api.route("/query")
def query():
    args = request.args
    lat = args.get('lat')
    lng = args.get('lng')
    radius = args.get('radius')
    venue_types = args.get('venue_types')
    log.info(f"querying lat={lat} lng={lng} radius={radius} venue_types={venue_types}")
    query_redis(lat, lng, radius, venue_types)
    return make_json_response(":)")
