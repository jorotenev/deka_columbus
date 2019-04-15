from flask import request
import logging as log
from . import api
from app.helpers.api_utils import make_json_response
from app.facades.datastore_facade import get_datastore_facade, NoCityInDataStoreException


@api.route('/api_ping')
def ping():
    return make_json_response({"result": "pong"})


@api.route("/query")
def query():
    args = request.args
    lat = float(args.get('lat'))
    lng = float(args.get('lng'))
    radius = int(args.get('radius'))
    venue_types = args.get('venue_types', '').split(",")
    venue_types = [t.strip() for t in venue_types]
    log.debug(f"querying lat={lat} lng={lng} radius={radius} venue_types={venue_types}")

    facade = get_datastore_facade()
    try:
        data = facade.query(lat, lng, radius, venue_types)
        status_code = 200
    except NoCityInDataStoreException:
        data = 'no city matches the request'
        status_code = 404
    return make_json_response(data, status_code=status_code)
