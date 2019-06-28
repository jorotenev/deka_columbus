from datetime import datetime

from app.facades.datastore_facade import PlaceFilter
from tests.base_test import BaseTest


class TestPlaceFilter(BaseTest):
    def setUp(self):
        self.place_filter = PlaceFilter()
        # days are as returned by google api (i.e. sunday is 0)
        self.place = {
            'opening_hours': {
                'periods': [
                    {'open': {'time': '0600', 'day': '0'}, 'close': {'time': '0300', 'day': 1}},  # sunday, closes mon
                    {'open': {'time': '0600', 'day': '1'}, 'close': {'time': '2000', 'day': 1}},
                    {'open': {'time': '0600', 'day': '2'}, 'close': {'time': '2000', 'day': 2}},
                    {'open': {'time': '0600', 'day': '3'}, 'close': {'time': '2000', 'day': 3}},
                    {'open': {'time': '0600', 'day': '4'}, 'close': {'time': '2000', 'day': 4}},
                    {'open': {'time': '0600', 'day': '5'}, 'close': {'time': '0300', 'day': 6}},
                    # friday but closes sat
                    {'open': {'time': '0600', 'day': '6'}, 'close': {'time': '0200', 'day': 0}},
                    # sat but closes sunday
                ]}
        }

    def test_when_is_opened(self):
        request_open_at = datetime(year=2019, day=25, month=6, hour=19)  # 2000 tuesday
        is_open = self.place_filter._place_is_open(self.place, request_open_at)

        self.assertTrue(is_open)

    def test_when_not_opened(self):
        request_open_at = datetime(year=2019, day=25, month=6, hour=21)  # 20:00 tuesday, june 2019
        is_open = self.place_filter._place_is_open(self.place, request_open_at)

        self.assertFalse(is_open)

    def test_closes_the_next_day(self):
        request_at_same_day = datetime(year=2019, day=28, month=6, hour=21)  # 20:00 friday, june 2019
        request_at_next_day = datetime(year=2019, day=29, month=6, hour=2)  # 02:00 saturday, june 2019
        is_open_same_day = self.place_filter._place_is_open(self.place, request_at_same_day)
        is_open_next_day = self.place_filter._place_is_open(self.place, request_at_next_day)
        self.assertTrue(is_open_same_day, 'must be opened because it closes the morning of the next day')
        self.assertTrue(is_open_next_day,
                        'must be opened because it opened on friday and testing for saturday morning b4 its closing time')

    def test_closes_next_week(self):
        request_at_same_day = datetime(year=2019, day=30, month=6, hour=21)  # 20:00 sunday, june 2019
        request_at_next_day = datetime(year=2019, day=1, month=7, hour=2)  # 02:00 monday, july 2019
        is_open_same_day = self.place_filter._place_is_open(self.place, request_at_same_day)
        is_open_next_day = self.place_filter._place_is_open(self.place, request_at_next_day)
        self.assertTrue(is_open_same_day, 'must be opened because it closes the morning of the next day (which happens to be also next week)')
        self.assertTrue(is_open_next_day,
                        'must be opened because it opened on sunday and testing for monday morning b4 its closing time')
