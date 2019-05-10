import {Place, Places} from "./custom_types";

export let map;
export let layerForUserCircles;
declare let L;
// add the map to the page
map = L.map('map').setView([42.697930, 23.321628], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <createCoordinatesReturn href="http://openstreetmap.org">OpenStreetMap</createCoordinatesReturn> contributors, <createCoordinatesReturn href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</createCoordinatesReturn>, Imagery © <createCoordinatesReturn href="http://mapbox.com">Mapbox</createCoordinatesReturn>',
    maxZoom: 18,
    id: 'mapbox.streets-basic',
    accessToken: 'pk.eyJ1IjoiY2hpcHNhbiIsImEiOiJqa0JwV1pnIn0.mvduWzyRdcHxK_QIOpetFg'
}).addTo(map);

var markers = L.markerClusterGroup();
map.addLayer(markers);

// the collapsible sidebar with redraw/download etc. custom buttons
let sidebar = L.control.sidebar('sidebar').addTo(map);

// where we draw rectangles
layerForUserCircles = new L.FeatureGroup();
map.addLayer(layerForUserCircles);
// enable the plugin for drawing on the map
let drawControl = new L.Control.Draw({
    edit: {
        featureGroup: layerForUserCircles
    },
    draw: {
        circle: true,
        circlemarker: false,
        marker: false,
        polygon: false,
        polyline: false,
        rectangle: false
    }
});
map.addControl(drawControl);

/**
 * A function which collects what the user has drawn and pass it to a callback
 * @param {(rectangle: Rectangle) => any} callbackOnRectDrawn
 * @param {() => void} callbackOnDelete
 */
export function enableDrawing(callbackOnCircleDrawn: (circle: L.Circle) => any) {
    map.on('draw:created', function (e) {
        let type = e.layerType,
            layer = e.layer;
        if (type !== "circle") {
            return true
        }
        let radius = layer.getRadius();
        let center = layer.getLatLng();
        console.log(`radius=${radius} center=${center}`);
        layerForUserCircles.clearLayers();
        layerForUserCircles.addLayer(layer)

        callbackOnCircleDrawn(L.circle(layer.getLatLng(), {radius: layer.getRadius()}))
    });
    map.on("draw:deleted", () => {
    })

}

var myRenderer = L.canvas({padding: 0.5});

export function drawMarkers(coords: Places, circleOptions = {}) {
    markers.clearLayers();

    console.info(`adding ${coords.length} markers`);
    const layers = coords.map(place => L.marker(place.coordinates));
    markers.addLayers(layers);
    layerForUserCircles.clearLayers()

    console.info('done')
}


