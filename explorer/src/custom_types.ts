export type Coordinate = number;
export type ApiRequest = { lat: Coordinate, lng: Coordinate, radius: number, venue_types: string };
export type Place = { geometry: { location: { lat: Coordinate, lng: Coordinate } }, name: string, rating: number, vicinity: string, coordinates?: L.LatLng };
export type Places = Place[];