export type Coordinate = number;
export type ApiRequest = { lat: Coordinate, lng: Coordinate, radius: number, venue_types: string };
export type ApiResponse = {
    geometry: { location: { lat: Coordinate, lng: Coordinate } },
    name: string,
    rating: number,
    vicinity: string,
    types?: string[]
};

export type Place = ApiResponse & {
    coordinates?: L.LatLng,
};
export type Places = Place[];