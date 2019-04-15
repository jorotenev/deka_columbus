"""
assumes a running & populated redis datastore`
"""
import json

from tests.base_test import BaseTest, HTTPMethodsMixin
from app.facades.datastore_facade import NoCityInDataStoreException


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
