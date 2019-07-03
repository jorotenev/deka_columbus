from flask import request
import logging as log
from datetime import datetime

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
        data = facade.query(args.lat, args.lng, args.radius, args.venue_types, args.price, args.open_at)
        status_code = 200
    except InvalidRequest:
        data: "invalid request"
        status_code = 400
    except NoCityInDataStoreException:
        data = 'no city matches the request'
        status_code = 404
    except Exception as ex:
        data = 'internal server error'
        status_code = 500
        log.exception(str(ex))
    return make_json_response(data) if status_code == 200 else make_error_response(data, status_code=status_code)


def extract_args(args):
    try:
        lat = float(args['lat'])
        lng = float(args['lng'])
        radius = int(float(args['radius']))
        venue_types = args.get('venue_types', '').split(",")
        venue_types = [t.strip() for t in venue_types]
        # list of ints, from 1 to 4, where 4 is the most expensive one
        price = list(map(int, args.get("price").split(",")))
        # YYYY-MM-DDTHH
        open_at = _parse_open_at(args.get('open_at', None))
        request = RequestArgs(lat=lat, lng=lng, radius=radius, venue_types=venue_types, price=price,
                              open_at=open_at)
        log.debug(
            f"Request args: {['%s=%s' % (k, v) for (k, v) in request.__dict__.items() if not k.startswith('__')]}")
        return request
    except AssertionError as ex:
        log.debug(str(ex))
        raise InvalidRequest(ex.args[0])


def _parse_open_at(open_at):
    # 2019-06-21T21
    return datetime.strptime(open_at, "%Y-%m-%dT%H:%M")


class InvalidRequest(Exception):
    def __init__(self, *arg):
        super(InvalidRequest, self).__init__(*arg)


class RequestArgs:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            self.__setattr__(k, v)

    def __getattr__(self, item):
        return getattr(self, item)
