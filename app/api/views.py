from flask import request
import logging as log
from . import api
from app.helpers.api_utils import make_json_response, make_error_response, allow_cors


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


from app.facades.datastore_facade import get_datastore_facade, NoCityInDataStoreException


@api.route("/query", methods=['GET', 'OPTIONS'])
@allow_cors
def query():
    try:
        args = request.args
        lat = float(args.get('lat'))
        lng = float(args.get('lng'))
        radius = int(float(args.get('radius')))
        venue_types = args.get('venue_types', '').split(",")
        venue_types = [t.strip() for t in venue_types]
        log.debug(f"querying lat={lat} lng={lng} radius={radius} venue_types={venue_types}")

        facade = get_datastore_facade()
        data = facade.query(lat, lng, radius, venue_types)
        status_code = 200
    except NoCityInDataStoreException:
        data = 'no city matches the request'
        status_code = 404
    except Exception as ex:
        data = 'internal server error'
        status_code = 500
        log.exception(str(ex))
    return make_json_response(data) if status_code == 200 else make_error_response(data, status_code=status_code)
