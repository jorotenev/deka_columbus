from app.facades.datastore_facade import get_datastore_facade
from tests.base_test import BaseTest

from tests.test_integration import sofia_query

class CitiesStoreTest(BaseTest):
    def setUp(self):
        self.facade = get_datastore_facade()
        self.city_store = self.facade.cities

    def test_sofia(self):
        city, coords = self.city_store.get_city_matching_query_coords(query_lat=sofia_query['lat'],
                                                                      query_lng=sofia_query['lng'])
        self.assertEqual('sofia', city)