"""
assumes a running & populated redis datastore`
"""
import json

from tests.base_test import BaseTest, HTTPMethodsMixin
from tests.test_integration import sofia_query


class SmokeTest(BaseTest, HTTPMethodsMixin):
    def setUp(self):
        pass

    def test_raises_on_city_not_in_datastore(self):
        args = {
            'lat': 1,  # near africa :)
            'lng': 1,
            'radius': 200,
            'venue_types': ['bar']
        }

        response = self.get(url='api.query', url_args=args, raw_response=True)
        self.assertEqual(404, response.status_code)

    def test_returned_places_are_in_sofia(self):
        args = sofia_query
        response = self.get(url='api.query', url_args=args, json_response=True)

        def in_sofia(place):
            return any(sofia in place['vicinity'].lower() for sofia in ['sofia', 'софия'])

        self.assertTrue(all([in_sofia(place) for place in response]))
