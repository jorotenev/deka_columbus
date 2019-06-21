from flask import current_app
import logging as log
from requests import get

"""
`price_level`
The price level of the place, on a scale of 0 to 4. The exact amount indicated by a specific value will vary from region to region. Price levels are interpreted as follows:
0 — Free
1 — Inexpensive
2 — Moderate
3 — Expensive
4 — Very Expensive

`rating` 
contains the place's rating, from 1.0 to 5.0, based on aggregated user reviews.

{'opening_hours': {'open_now': False, 'periods': [{'close': {'day': 1, 'time': '0130'}, 'open': {'day': 0, 'time': '1000'}}, {'close': {'day': 2, 'time': '0200'}, 'open': {'day': 1, 'time': '1000'}}, {'close': {'day': 3, 'time': '0200'}, 'open': {'day': 2, 'time': '1000'}}, {'close': {'day': 4, 'time': '0200'}, 'open': {'day': 3, 'time': '1000'}}, {'close': {'day': 5, 'time': '0200'}, 'open': {'day': 4, 'time': '1000'}}, {'close': {'day': 6, 'time': '0200'}, 'open': {'day': 5, 'time': '1000'}}, {'close': {'day': 0, 'time': '0200'}, 'open': {'day': 6, 'time': '1000'}}], 'weekday_text': ['Monday: 10:00 AM – 2:00 AM', 'Tuesday: 10:00 AM – 2:00 AM', 'Wednesday: 10:00 AM – 2:00 AM', 'Thursday: 10:00 AM – 2:00 AM', 'Friday: 10:00 AM – 2:00 AM', 'Saturday: 10:00 AM – 2:00 AM', 'Sunday: 10:00 AM – 1:30 AM']}, 'price_level': 2, 'rating': 4.2}

"""


class GoogleWrapper:

    def __init__(self, app):
        if app:
            self.init_app(app)

    def init_app(self, app):
        self.api_key = app.config.get('GOOGLE_API_KEY')
        self.API_BASE_URL = f"https://maps.googleapis.com/maps/api/place/details/json?key={self.api_key}&"

        log.debug("Loaded Google API key")

    def query(self, place_id, fields=None):
        if not fields:
            fields = ['opening_hours', 'price_level', 'rating']

        log.debug(f"Querying place_id=f{place_id} for fields {fields}")
        resp = get(f"{self.API_BASE_URL}placeid={place_id}&fields={','.join(fields)}").json()
        log.debug("Response from Google Details API:")
        log.debug(resp)

        return resp.get('result', None) if resp['status'] == 'OK' else None


if __name__ == '__main__':
    from app import create_app
    from config import configs

    app = create_app(app_config=configs['development'])
    wrapper = GoogleWrapper(app)

    print(wrapper.query(place_id="ChIJ46vLf2WFqkAR72z9LicHh5M"))
