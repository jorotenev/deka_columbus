export type Coordinate = number;
export type ApiRequest = { lat: Coordinate, lng: Coordinate, radius: number, venue_types: string };
export type ApiResponse = any