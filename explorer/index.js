/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ \"./src/map.ts\");\n\r\nvar api_base_url_dom_id = \"api_url\";\r\n/**\r\n * Orchestrate it all\r\n */\r\n(function run() {\r\n    // the leaflet layer on which the circles generated circles will be drawn\r\n    var circlesLayer = new L.FeatureGroup().addTo(_map__WEBPACK_IMPORTED_MODULE_0__[\"map\"]);\r\n    // set default api url\r\n    $(\"#api_url\").attr(\"value\", 'http://127.0.0.1:8080/api/query');\r\n    // attach a callback to the event when a user has drawn a rectangle on the map.\r\n    // the defining coords of the rectangle are then passed to a callback that we set here\r\n    Object(_map__WEBPACK_IMPORTED_MODULE_0__[\"enableDrawing\"])(onDrawn);\r\n})();\r\nfunction onDrawn(rect) {\r\n    var query_strings = {\r\n        lat: rect.getLatLng().lat,\r\n        lng: rect.getLatLng().lng,\r\n        radius: rect.getRadius(),\r\n        venue_types: \"bar\"\r\n    };\r\n    makeApiRequest(query_strings).then(function (response) {\r\n        console.log(\"response from server \" + response);\r\n        console.log(new Date());\r\n        var places = response.map(function (place) {\r\n            place.coordinates = new L.LatLng(place.geometry.location.lat, place.geometry.location.lng);\r\n            return place;\r\n        });\r\n        Object(_map__WEBPACK_IMPORTED_MODULE_0__[\"drawMarkers\"])(places);\r\n    }, function (reason) {\r\n        var err = reason.err;\r\n        var obj = reason.obj;\r\n        console.error(err);\r\n        console.error(obj);\r\n        console.log(new Date());\r\n    });\r\n}\r\nfunction makeApiRequest(payload) {\r\n    var api_base_url = document.getElementById(api_base_url_dom_id).value;\r\n    console.log(new Date());\r\n    console.log(\"querying to \" + api_base_url);\r\n    var query_url = \"\" + api_base_url;\r\n    return new Promise(function (resolve, reject) {\r\n        $.ajax(query_url, {\r\n            method: \"GET\",\r\n            async: true,\r\n            contentType: 'application/json',\r\n            data: payload,\r\n            dataType: 'json',\r\n            error: function (err, st, reason) { return reject({ err: err, obj: reason }); },\r\n            success: resolve,\r\n            timeout: 10000 //milliseconds\r\n        });\r\n    });\r\n}\r\nfunction onDelete() {\r\n    console.log('deleting..');\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cz8wNjZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bWFwLCBkcmF3TWFya2VycywgZW5hYmxlRHJhd2luZ30gZnJvbSBcIi4vbWFwXCJcclxuaW1wb3J0IHtDaXJjbGUsIFJlY3RhbmdsZX0gZnJvbSBcImxlYWZsZXRcIjtcclxuaW1wb3J0IHtBcGlSZXF1ZXN0LCBQbGFjZSwgUGxhY2VzfSBmcm9tIFwiLi9jdXN0b21fdHlwZXNcIjtcclxuLy8ganF1ZXJ5IGFuZCBsZWFmbGV0IGFyZSBcImltcG9ydGVkXCIgaW4gdGhlIGh0bWwgdmlhIDxzY3JpcHQ+XHJcbmRlY2xhcmUgbGV0ICQ7XHJcbmRlY2xhcmUgbGV0IEw7XHJcbmNvbnN0IGFwaV9iYXNlX3VybF9kb21faWQgPSBcImFwaV91cmxcIjtcclxuXHJcbi8qKlxyXG4gKiBPcmNoZXN0cmF0ZSBpdCBhbGxcclxuICovXHJcbihmdW5jdGlvbiBydW4oKSB7XHJcbiAgICAvLyB0aGUgbGVhZmxldCBsYXllciBvbiB3aGljaCB0aGUgY2lyY2xlcyBnZW5lcmF0ZWQgY2lyY2xlcyB3aWxsIGJlIGRyYXduXHJcbiAgICBjb25zdCBjaXJjbGVzTGF5ZXIgPSBuZXcgTC5GZWF0dXJlR3JvdXAoKS5hZGRUbyhtYXApO1xyXG5cclxuICAgIC8vIHNldCBkZWZhdWx0IGFwaSB1cmxcclxuICAgICQoXCIjYXBpX3VybFwiKS5hdHRyKFwidmFsdWVcIiwgJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4MC9hcGkvcXVlcnknKTtcclxuXHJcbiAgICAvLyBhdHRhY2ggYSBjYWxsYmFjayB0byB0aGUgZXZlbnQgd2hlbiBhIHVzZXIgaGFzIGRyYXduIGEgcmVjdGFuZ2xlIG9uIHRoZSBtYXAuXHJcbiAgICAvLyB0aGUgZGVmaW5pbmcgY29vcmRzIG9mIHRoZSByZWN0YW5nbGUgYXJlIHRoZW4gcGFzc2VkIHRvIGEgY2FsbGJhY2sgdGhhdCB3ZSBzZXQgaGVyZVxyXG4gICAgZW5hYmxlRHJhd2luZyhvbkRyYXduKTtcclxufSkoKTtcclxuXHJcblxyXG5mdW5jdGlvbiBvbkRyYXduKHJlY3Q6IENpcmNsZSkge1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5X3N0cmluZ3MgPSB7XHJcbiAgICAgICAgbGF0OiByZWN0LmdldExhdExuZygpLmxhdCxcclxuICAgICAgICBsbmc6IHJlY3QuZ2V0TGF0TG5nKCkubG5nLFxyXG4gICAgICAgIHJhZGl1czogcmVjdC5nZXRSYWRpdXMoKSxcclxuICAgICAgICB2ZW51ZV90eXBlczogXCJiYXJcIlxyXG4gICAgfTtcclxuXHJcbiAgICBtYWtlQXBpUmVxdWVzdChxdWVyeV9zdHJpbmdzKS50aGVuKChyZXNwb25zZTogUGxhY2VzKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcmVzcG9uc2UgZnJvbSBzZXJ2ZXIgJHtyZXNwb25zZX1gKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlczogUGxhY2VzID0gcmVzcG9uc2UubWFwKChwbGFjZTogUGxhY2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHBsYWNlLmNvb3JkaW5hdGVzID0gbmV3IEwuTGF0TG5nKHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCwgcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwbGFjZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRyYXdNYXJrZXJzKHBsYWNlcylcclxuXHJcbiAgICAgICAgfSwgKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZXJyID0gcmVhc29uLmVycjtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IHJlYXNvbi5vYmo7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihvYmopO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXcgRGF0ZSgpKVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbWFrZUFwaVJlcXVlc3QocGF5bG9hZDogQXBpUmVxdWVzdCk6IFByb21pc2U8UGxhY2VzPiB7XHJcbiAgICBjb25zdCBhcGlfYmFzZV91cmwgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXBpX2Jhc2VfdXJsX2RvbV9pZCkpLnZhbHVlO1xyXG4gICAgY29uc29sZS5sb2cobmV3IERhdGUoKSk7XHJcbiAgICBjb25zb2xlLmxvZyhgcXVlcnlpbmcgdG8gJHthcGlfYmFzZV91cmx9YCk7XHJcblxyXG4gICAgY29uc3QgcXVlcnlfdXJsID0gYCR7YXBpX2Jhc2VfdXJsfWA7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAkLmFqYXgocXVlcnlfdXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IHBheWxvYWQsIC8vIGFsc28gZmluZSBmb3IgR0VUIC0gY29udmVydHMgdG8gcXVlcnkgc3RyaW5nXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGVycm9yOiAoZXJyLCBzdCwgcmVhc29uKSA9PiByZWplY3Qoe2VycjogZXJyLCBvYmo6IHJlYXNvbn0pLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXNvbHZlLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiAxMDAwMC8vbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBvbkRlbGV0ZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdkZWxldGluZy4uJylcclxufVxyXG5cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFNQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.ts\n");

/***/ }),

/***/ "./src/map.ts":
/*!********************!*\
  !*** ./src/map.ts ***!
  \********************/
/*! exports provided: map, layerForUserCircles, enableDrawing, drawMarkers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"map\", function() { return map; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"layerForUserCircles\", function() { return layerForUserCircles; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableDrawing\", function() { return enableDrawing; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawMarkers\", function() { return drawMarkers; });\nvar map;\r\nvar layerForUserCircles;\r\n// add the map to the page\r\nmap = L.map('map').setView([42.697930, 23.321628], 13);\r\nL.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {\r\n    attribution: 'Map data &copy; <createCoordinatesReturn href=\"http://openstreetmap.org\">OpenStreetMap</createCoordinatesReturn> contributors, <createCoordinatesReturn href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</createCoordinatesReturn>, Imagery © <createCoordinatesReturn href=\"http://mapbox.com\">Mapbox</createCoordinatesReturn>',\r\n    maxZoom: 18,\r\n    id: 'mapbox.streets-basic',\r\n    accessToken: 'pk.eyJ1IjoiY2hpcHNhbiIsImEiOiJqa0JwV1pnIn0.mvduWzyRdcHxK_QIOpetFg'\r\n}).addTo(map);\r\n// var markers = L.markerClusterGroup();\r\nvar markers = new L.FeatureGroup();\r\nmap.addLayer(markers);\r\n// the collapsible sidebar with redraw/download etc. custom buttons\r\nvar sidebar = L.control.sidebar('sidebar').addTo(map);\r\n// where we draw rectangles\r\nlayerForUserCircles = new L.FeatureGroup();\r\nmap.addLayer(layerForUserCircles);\r\n// enable the plugin for drawing on the map\r\nvar drawControl = new L.Control.Draw({\r\n    edit: {\r\n        featureGroup: layerForUserCircles\r\n    },\r\n    draw: {\r\n        circle: true,\r\n        circlemarker: false,\r\n        marker: false,\r\n        polygon: false,\r\n        polyline: false,\r\n        rectangle: false\r\n    }\r\n});\r\nmap.addControl(drawControl);\r\n/**\r\n * A function which collects what the user has drawn and pass it to a callback\r\n * @param {(rectangle: Rectangle) => any} callbackOnRectDrawn\r\n * @param {() => void} callbackOnDelete\r\n */\r\nfunction enableDrawing(callbackOnCircleDrawn) {\r\n    map.on('draw:created', function (e) {\r\n        var type = e.layerType, layer = e.layer;\r\n        if (type !== \"circle\") {\r\n            return true;\r\n        }\r\n        var radius = layer.getRadius();\r\n        var center = layer.getLatLng();\r\n        console.log(\"radius=\" + radius + \" center=\" + center);\r\n        layerForUserCircles.clearLayers();\r\n        layerForUserCircles.addLayer(layer);\r\n        callbackOnCircleDrawn(L.circle(layer.getLatLng(), { radius: layer.getRadius() }));\r\n    });\r\n    map.on(\"draw:deleted\", function () {\r\n    });\r\n}\r\nvar myRenderer = L.canvas({ padding: 0.5 });\r\nfunction drawMarkers(coords, circleOptions) {\r\n    if (circleOptions === void 0) { circleOptions = {}; }\r\n    markers.clearLayers();\r\n    console.info(\"adding \" + coords.length + \" markers\");\r\n    var layers = coords.map(function (place) { return L.marker(place.coordinates, {\r\n        title: place.name,\r\n        place: place\r\n    })\r\n        .on('click', onclick)\r\n        .bindTooltip(place.name + \" [\" + place.types + \"]\", { permanent: true }); });\r\n    layers.forEach(function (layer) {\r\n        markers.addLayer(layer);\r\n    });\r\n    map.fitBounds(markers.getBounds());\r\n    // markers.addLayers(layers);\r\n    layerForUserCircles.clearLayers();\r\n    console.info('done');\r\n}\r\nfunction onclick(ev) {\r\n    console.log(\"clicked on \" + this.options.title + \" \" + ev.latlng);\r\n    console.log(this.options.place);\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFwLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL21hcC50cz8yOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGxhY2UsIFBsYWNlc30gZnJvbSBcIi4vY3VzdG9tX3R5cGVzXCI7XHJcbmltcG9ydCB7RG9tRXZlbnR9IGZyb20gXCJsZWFmbGV0XCI7XHJcbmltcG9ydCBvbiA9IERvbUV2ZW50Lm9uO1xyXG5cclxuZXhwb3J0IGxldCBtYXA7XHJcbmV4cG9ydCBsZXQgbGF5ZXJGb3JVc2VyQ2lyY2xlcztcclxuZGVjbGFyZSBsZXQgTDtcclxuLy8gYWRkIHRoZSBtYXAgdG8gdGhlIHBhZ2VcclxubWFwID0gTC5tYXAoJ21hcCcpLnNldFZpZXcoWzQyLjY5NzkzMCwgMjMuMzIxNjI4XSwgMTMpO1xyXG5MLnRpbGVMYXllcignaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49e2FjY2Vzc1Rva2VufScsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxjcmVhdGVDb29yZGluYXRlc1JldHVybiBocmVmPVwiaHR0cDovL29wZW5zdHJlZXRtYXAub3JnXCI+T3BlblN0cmVldE1hcDwvY3JlYXRlQ29vcmRpbmF0ZXNSZXR1cm4+IGNvbnRyaWJ1dG9ycywgPGNyZWF0ZUNvb3JkaW5hdGVzUmV0dXJuIGhyZWY9XCJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8yLjAvXCI+Q0MtQlktU0E8L2NyZWF0ZUNvb3JkaW5hdGVzUmV0dXJuPiwgSW1hZ2VyeSDCqSA8Y3JlYXRlQ29vcmRpbmF0ZXNSZXR1cm4gaHJlZj1cImh0dHA6Ly9tYXBib3guY29tXCI+TWFwYm94PC9jcmVhdGVDb29yZGluYXRlc1JldHVybj4nLFxyXG4gICAgbWF4Wm9vbTogMTgsXHJcbiAgICBpZDogJ21hcGJveC5zdHJlZXRzLWJhc2ljJyxcclxuICAgIGFjY2Vzc1Rva2VuOiAncGsuZXlKMUlqb2lZMmhwY0hOaGJpSXNJbUVpT2lKcWEwSndWMXBuSW4wLm12ZHVXenlSZGNIeEtfUUlPcGV0RmcnXHJcbn0pLmFkZFRvKG1hcCk7XHJcblxyXG4vLyB2YXIgbWFya2VycyA9IEwubWFya2VyQ2x1c3Rlckdyb3VwKCk7XHJcbnZhciBtYXJrZXJzID0gbmV3IEwuRmVhdHVyZUdyb3VwKCk7XHJcbm1hcC5hZGRMYXllcihtYXJrZXJzKTtcclxuXHJcbi8vIHRoZSBjb2xsYXBzaWJsZSBzaWRlYmFyIHdpdGggcmVkcmF3L2Rvd25sb2FkIGV0Yy4gY3VzdG9tIGJ1dHRvbnNcclxubGV0IHNpZGViYXIgPSBMLmNvbnRyb2wuc2lkZWJhcignc2lkZWJhcicpLmFkZFRvKG1hcCk7XHJcblxyXG4vLyB3aGVyZSB3ZSBkcmF3IHJlY3RhbmdsZXNcclxubGF5ZXJGb3JVc2VyQ2lyY2xlcyA9IG5ldyBMLkZlYXR1cmVHcm91cCgpO1xyXG5tYXAuYWRkTGF5ZXIobGF5ZXJGb3JVc2VyQ2lyY2xlcyk7XHJcblxyXG4vLyBlbmFibGUgdGhlIHBsdWdpbiBmb3IgZHJhd2luZyBvbiB0aGUgbWFwXHJcbmxldCBkcmF3Q29udHJvbCA9IG5ldyBMLkNvbnRyb2wuRHJhdyh7XHJcbiAgICBlZGl0OiB7XHJcbiAgICAgICAgZmVhdHVyZUdyb3VwOiBsYXllckZvclVzZXJDaXJjbGVzXHJcbiAgICB9LFxyXG4gICAgZHJhdzoge1xyXG4gICAgICAgIGNpcmNsZTogdHJ1ZSxcclxuICAgICAgICBjaXJjbGVtYXJrZXI6IGZhbHNlLFxyXG4gICAgICAgIG1hcmtlcjogZmFsc2UsXHJcbiAgICAgICAgcG9seWdvbjogZmFsc2UsXHJcbiAgICAgICAgcG9seWxpbmU6IGZhbHNlLFxyXG4gICAgICAgIHJlY3RhbmdsZTogZmFsc2VcclxuICAgIH1cclxufSk7XHJcbm1hcC5hZGRDb250cm9sKGRyYXdDb250cm9sKTtcclxuXHJcbi8qKlxyXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIGNvbGxlY3RzIHdoYXQgdGhlIHVzZXIgaGFzIGRyYXduIGFuZCBwYXNzIGl0IHRvIGEgY2FsbGJhY2tcclxuICogQHBhcmFtIHsocmVjdGFuZ2xlOiBSZWN0YW5nbGUpID0+IGFueX0gY2FsbGJhY2tPblJlY3REcmF3blxyXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGNhbGxiYWNrT25EZWxldGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVEcmF3aW5nKGNhbGxiYWNrT25DaXJjbGVEcmF3bjogKGNpcmNsZTogTC5DaXJjbGUpID0+IGFueSkge1xyXG4gICAgbWFwLm9uKCdkcmF3OmNyZWF0ZWQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCB0eXBlID0gZS5sYXllclR5cGUsXHJcbiAgICAgICAgICAgIGxheWVyID0gZS5sYXllcjtcclxuICAgICAgICBpZiAodHlwZSAhPT0gXCJjaXJjbGVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmFkaXVzID0gbGF5ZXIuZ2V0UmFkaXVzKCk7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IGxheWVyLmdldExhdExuZygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGByYWRpdXM9JHtyYWRpdXN9IGNlbnRlcj0ke2NlbnRlcn1gKTtcclxuICAgICAgICBsYXllckZvclVzZXJDaXJjbGVzLmNsZWFyTGF5ZXJzKCk7XHJcbiAgICAgICAgbGF5ZXJGb3JVc2VyQ2lyY2xlcy5hZGRMYXllcihsYXllcilcclxuXHJcbiAgICAgICAgY2FsbGJhY2tPbkNpcmNsZURyYXduKEwuY2lyY2xlKGxheWVyLmdldExhdExuZygpLCB7cmFkaXVzOiBsYXllci5nZXRSYWRpdXMoKX0pKVxyXG4gICAgfSk7XHJcbiAgICBtYXAub24oXCJkcmF3OmRlbGV0ZWRcIiwgKCkgPT4ge1xyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbnZhciBteVJlbmRlcmVyID0gTC5jYW52YXMoe3BhZGRpbmc6IDAuNX0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdNYXJrZXJzKGNvb3JkczogUGxhY2VzLCBjaXJjbGVPcHRpb25zID0ge30pIHtcclxuICAgIG1hcmtlcnMuY2xlYXJMYXllcnMoKTtcclxuXHJcbiAgICBjb25zb2xlLmluZm8oYGFkZGluZyAke2Nvb3Jkcy5sZW5ndGh9IG1hcmtlcnNgKTtcclxuICAgIGNvbnN0IGxheWVycyA9IGNvb3Jkcy5tYXAocGxhY2UgPT4gTC5tYXJrZXIocGxhY2UuY29vcmRpbmF0ZXMsIHtcclxuICAgICAgICAgICAgdGl0bGU6IHBsYWNlLm5hbWUsXHJcbiAgICAgICAgICAgIHBsYWNlOiBwbGFjZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBvbmNsaWNrKVxyXG4gICAgICAgICAgICAuYmluZFRvb2x0aXAoYCR7cGxhY2UubmFtZX0gWyR7cGxhY2UudHlwZXN9XWAsIHtwZXJtYW5lbnQ6IHRydWV9KVxyXG4gICAgKVxyXG4gICAgbGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICAgIG1hcmtlcnMuYWRkTGF5ZXIobGF5ZXIpXHJcbiAgICB9KVxyXG4gICAgbWFwLmZpdEJvdW5kcyhtYXJrZXJzLmdldEJvdW5kcygpKVxyXG4gICAgLy8gbWFya2Vycy5hZGRMYXllcnMobGF5ZXJzKTtcclxuICAgIGxheWVyRm9yVXNlckNpcmNsZXMuY2xlYXJMYXllcnMoKVxyXG4gICAgY29uc29sZS5pbmZvKCdkb25lJylcclxufVxyXG5cclxuZnVuY3Rpb24gb25jbGljayhldikge1xyXG4gICAgY29uc29sZS5sb2coYGNsaWNrZWQgb24gJHt0aGlzLm9wdGlvbnMudGl0bGV9ICR7ZXYubGF0bG5nfWApXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMucGxhY2UpXHJcbn1cclxuXHJcbiJdLCJtYXBwaW5ncyI6IkFBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/map.ts\n");

/***/ })

/******/ });