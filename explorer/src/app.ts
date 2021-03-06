import {map, drawMarkers, enableDrawing, cleanMap} from "./map"
import {Circle, Rectangle} from "leaflet";
import {ApiRequest, ApiResponse, Place, Places} from "./custom_types";
// jquery and leaflet are "imported" in the html via <script>
declare let $;
declare let L;
const api_base_url_dom_id = "api_url";

/**
 * Orchestrate it all
 */
(function run() {
    // the leaflet layer on which the circles generated circles will be drawn
    const circlesLayer = new L.FeatureGroup().addTo(map);

    // set default api url
    $("#api_url").attr("value", 'http://127.0.0.1:8080/api/query');

    // attach a callback to the event when a user has drawn a rectangle on the map.
    // the defining coords of the rectangle are then passed to a callback that we set here
    enableDrawing(onDrawn);
})();


function onDrawn(rect: Circle) {
    const types = [];
    const price = [];

    $(".venue-type:checked").each((i, el) => {
        types.push($(el).attr('venue_type'))
    });
    $(".venue-price:checked").each((i, el) => {
        price.push($(el).attr('value'))
    });

    let open_at = $('#open_at').attr('value');
    const query_strings = {
        lat: rect.getLatLng().lat,
        lng: rect.getLatLng().lng,
        radius: rect.getRadius(),
        venue_types: types.join(","),
        price: price.join(","),
        open_at: open_at
    };
    console.log(query_strings);
    makeApiRequest(query_strings).then((response: ApiResponse[]) => {

            console.log(`response from server ${response}`);
            console.log(new Date());
            const places: Places = response.map((place: Place) => {
                place.coordinates = new L.LatLng(place.geometry.location.lat, place.geometry.location.lng);
                return place;
            });
            if (places.length > 0) {

                drawMarkers(places)

            } else {
                cleanMap()
            }

        }, (reason) => {
            let err = reason.err;
            let obj = reason.obj;
            console.error(err);
            console.error(obj);
            console.log(new Date())
        }
    );

}


function makeApiRequest(payload: ApiRequest): Promise<Places> {
    const api_base_url = (<HTMLInputElement>document.getElementById(api_base_url_dom_id)).value;
    console.log(new Date());
    const query_url = `${api_base_url}`;

    console.log(`querying to ${query_url}`);

    return new Promise((resolve, reject) => {
        $.ajax(query_url, {
            method: "GET",
            async: true,
            contentType: 'application/json',
            data: payload, // also fine for GET - converts to query string
            dataType: 'json',
            error: (err, st, reason) => reject({err: err, obj: reason}),
            success: resolve,
            timeout: 10000//milliseconds
        });
    })
}

function onDelete() {
    console.log('deleting..')
}

