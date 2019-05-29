from flask import request
import logging as log
from . import api
from app.helpers.api_utils import make_json_response, make_error_response, allow_cors
from app.facades.datastore_facade import get_datastore_facade, NoCityInDataStoreException


@api.route('/api_ping', methods=['GET', 'OPTIONS'])
def ping():
    with_dependencies = bool(request.args.get("with_dependencies", False))
    if with_dependencies:
        try:
            from app import redis_adapter
            assert redis_adapter.ping()
        except Exception:
            return make_error_response('failed dependencies check', status_code=500)

    return make_json_response({"result": "pong"})




@api.route("/query", methods=['GET', 'OPTIONS'])
@allow_cors
def query():
    try:
        args = extract_args(request.args)
        facade = get_datastore_facade()
        data = facade.query(args.lat, args.lng, args.radius, args.venue_types, args.price)
        status_code = 200
    except NoCityInDataStoreException:
        data = 'no city matches the request'
        status_code = 404
    except Exception as ex:
        data = 'internal server error'
        status_code = 500
        log.exception(str(ex))
    return make_json_response(data) if status_code == 200 else make_error_response(data, status_code=status_code)


def extract_args(args):
    lat = float(args.get('lat'))
    lng = float(args.get('lng'))
    radius = int(float(args.get('radius')))
    venue_types = args.get('venue_types', '').split(",")
    venue_types = [t.strip() for t in venue_types]
    price = args.get("price").split(",")
    log.debug(f"querying lat={lat} lng={lng} radius={radius} venue_types={venue_types} price={price}")

    return RequestArgs(lat=lat, lng=lng, radius=radius, venue_types=venue_types, price=price)


class RequestArgs:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            self.__setattr__(k, v)

    def __getattr__(self, item):
        return getattr(self, item)
