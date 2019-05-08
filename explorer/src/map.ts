export let map;
export let layerForUserRectangles;
declare let L;
// add the map to the page
map = L.map('map').setView([42.697930, 23.321628], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <createCoordinatesReturn href="http://openstreetmap.org">OpenStreetMap</createCoordinatesReturn> contributors, <createCoordinatesReturn href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</createCoordinatesReturn>, Imagery © <createCoordinatesReturn href="http://mapbox.com">Mapbox</createCoordinatesReturn>',
    maxZoom: 18,
    id: 'mapbox.streets-basic',
    accessToken: 'pk.eyJ1IjoiY2hpcHNhbiIsImEiOiJqa0JwV1pnIn0.mvduWzyRdcHxK_QIOpetFg'
}).addTo(map);


// the collapsible sidebar with redraw/download etc. custom buttons
let sidebar = L.control.sidebar('sidebar').addTo(map);

// where we draw rectangles
layerForUserRectangles = new L.FeatureGroup();
map.addLayer(layerForUserRectangles);
// enable the plugin for drawing on the map
let drawControl = new L.Control.Draw({
    edit: {
        featureGroup: layerForUserRectangles
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
        layerForUserRectangles.clearLayers();
        layerForUserRectangles.addLayer(layer)

        callbackOnCircleDrawn(L.circle(layer.getLatLng(), {radius: layer.getRadius()}))
    });
    map.on("draw:deleted", () => {
    })

}

var myRenderer = L.canvas({padding: 0.5});

/**
 * Given a layer, coordinates of the center of circles and the radius of the circle,
 * draw the circles on the layer
 * @param {LatLng[]} coords
 * @param {LayerGroup} layer
 * @param {number} circleRadius
 * @param {{}} circleOptions
 */
export function drawCircles(coords: L.LatLng[], layer: L.LayerGroup, circleRadius = 300, circleOptions = {}) {
    let opts = {
        color: "red",
        ...circleOptions
    };
    coords.forEach((coord: L.LatLng) => {
        L.circle(coord, {radius: circleRadius}, circleOptions).addTo(layer)
    })
}


