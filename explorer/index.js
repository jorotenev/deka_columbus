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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ \"./src/map.ts\");\n\r\nvar api_base_url_dom_id = \"api_url\";\r\n/**\r\n * Orchestrate it all\r\n */\r\n(function run() {\r\n    // the leaflet layer on which the circles generated circles will be drawn\r\n    var circlesLayer = new L.FeatureGroup().addTo(_map__WEBPACK_IMPORTED_MODULE_0__[\"map\"]);\r\n    // set default api url\r\n    $(\"#api_url\").attr(\"value\", 'http://127.0.0.1:8080/api/query');\r\n    // attach a callback to the event when a user has drawn a rectangle on the map.\r\n    // the defining coords of the rectangle are then passed to a callback that we set here\r\n    Object(_map__WEBPACK_IMPORTED_MODULE_0__[\"enableDrawing\"])(onDrawn);\r\n})();\r\nfunction onDrawn(rect) {\r\n    var query_strings = {\r\n        lat: rect.getLatLng().lat,\r\n        lng: rect.getLatLng().lng,\r\n        radius: rect.getRadius(),\r\n        venue_types: \"bar\"\r\n    };\r\n    makeApiRequest(query_strings).then(function (response) {\r\n        console.log(\"response from server \" + response);\r\n        console.log(new Date());\r\n    }, function (reason) {\r\n        var err = reason.err;\r\n        var obj = reason.obj;\r\n        console.error(err);\r\n        console.error(obj);\r\n        console.log(new Date());\r\n    });\r\n}\r\nfunction makeApiRequest(payload) {\r\n    var api_base_url = document.getElementById(api_base_url_dom_id).value;\r\n    console.log(new Date());\r\n    console.log(\"querying to \" + api_base_url);\r\n    var query_url = \"\" + api_base_url;\r\n    return new Promise(function (resolve, reject) {\r\n        $.ajax(query_url, {\r\n            method: \"GET\",\r\n            async: true,\r\n            contentType: 'application/json',\r\n            data: payload,\r\n            dataType: 'json',\r\n            error: function (err, st, reason) { return reject({ err: err, obj: reason }); },\r\n            success: resolve,\r\n            timeout: 10000 //milliseconds\r\n        });\r\n    });\r\n}\r\nfunction onDelete() {\r\n    console.log('deleting..');\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cz8wNjZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bWFwLCBkcmF3Q2lyY2xlcywgZW5hYmxlRHJhd2luZ30gZnJvbSBcIi4vbWFwXCJcclxuaW1wb3J0IHtDaXJjbGUsIFJlY3RhbmdsZX0gZnJvbSBcImxlYWZsZXRcIjtcclxuaW1wb3J0IHtBcGlSZXNwb25zZSwgQXBpUmVxdWVzdCwgQ29vcmRpbmF0ZX0gZnJvbSBcIi4vY3VzdG9tX3R5cGVzXCI7XHJcbi8vIGpxdWVyeSBhbmQgbGVhZmxldCBhcmUgXCJpbXBvcnRlZFwiIGluIHRoZSBodG1sIHZpYSA8c2NyaXB0PlxyXG5kZWNsYXJlIGxldCAkO1xyXG5kZWNsYXJlIGxldCBMO1xyXG5jb25zdCBhcGlfYmFzZV91cmxfZG9tX2lkID0gXCJhcGlfdXJsXCI7XHJcblxyXG4vKipcclxuICogT3JjaGVzdHJhdGUgaXQgYWxsXHJcbiAqL1xyXG4oZnVuY3Rpb24gcnVuKCkge1xyXG4gICAgLy8gdGhlIGxlYWZsZXQgbGF5ZXIgb24gd2hpY2ggdGhlIGNpcmNsZXMgZ2VuZXJhdGVkIGNpcmNsZXMgd2lsbCBiZSBkcmF3blxyXG4gICAgY29uc3QgY2lyY2xlc0xheWVyID0gbmV3IEwuRmVhdHVyZUdyb3VwKCkuYWRkVG8obWFwKTtcclxuXHJcbiAgICAvLyBzZXQgZGVmYXVsdCBhcGkgdXJsXHJcbiAgICAkKFwiI2FwaV91cmxcIikuYXR0cihcInZhbHVlXCIsICdodHRwOi8vMTI3LjAuMC4xOjgwODAvYXBpL3F1ZXJ5Jyk7XHJcblxyXG4gICAgLy8gYXR0YWNoIGEgY2FsbGJhY2sgdG8gdGhlIGV2ZW50IHdoZW4gYSB1c2VyIGhhcyBkcmF3biBhIHJlY3RhbmdsZSBvbiB0aGUgbWFwLlxyXG4gICAgLy8gdGhlIGRlZmluaW5nIGNvb3JkcyBvZiB0aGUgcmVjdGFuZ2xlIGFyZSB0aGVuIHBhc3NlZCB0byBhIGNhbGxiYWNrIHRoYXQgd2Ugc2V0IGhlcmVcclxuICAgIGVuYWJsZURyYXdpbmcob25EcmF3bik7XHJcbn0pKCk7XHJcblxyXG5cclxuZnVuY3Rpb24gb25EcmF3bihyZWN0OiBDaXJjbGUpIHtcclxuXHJcbiAgICBjb25zdCBxdWVyeV9zdHJpbmdzID0ge1xyXG4gICAgICAgIGxhdDogcmVjdC5nZXRMYXRMbmcoKS5sYXQsXHJcbiAgICAgICAgbG5nOiByZWN0LmdldExhdExuZygpLmxuZyxcclxuICAgICAgICByYWRpdXM6IHJlY3QuZ2V0UmFkaXVzKCksXHJcbiAgICAgICAgdmVudWVfdHlwZXM6IFwiYmFyXCJcclxuICAgIH07XHJcblxyXG4gICAgbWFrZUFwaVJlcXVlc3QocXVlcnlfc3RyaW5ncykudGhlbigocmVzcG9uc2U6IEFwaVJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcmVzcG9uc2UgZnJvbSBzZXJ2ZXIgJHtyZXNwb25zZX1gKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3IERhdGUoKSlcclxuXHJcbiAgICAgICAgfSwgKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZXJyID0gcmVhc29uLmVycjtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IHJlYXNvbi5vYmo7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihvYmopO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXcgRGF0ZSgpKVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlQXBpUmVxdWVzdChwYXlsb2FkOiBBcGlSZXF1ZXN0KTogUHJvbWlzZTxBcGlSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgYXBpX2Jhc2VfdXJsID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFwaV9iYXNlX3VybF9kb21faWQpKS52YWx1ZTtcclxuICAgIGNvbnNvbGUubG9nKG5ldyBEYXRlKCkpO1xyXG4gICAgY29uc29sZS5sb2coYHF1ZXJ5aW5nIHRvICR7YXBpX2Jhc2VfdXJsfWApO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5X3VybCA9IGAke2FwaV9iYXNlX3VybH1gO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgJC5hamF4KHF1ZXJ5X3VybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXlsb2FkLCAvLyBhbHNvIGZpbmUgZm9yIEdFVCAtIGNvbnZlcnRzIHRvIHF1ZXJ5IHN0cmluZ1xyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBlcnJvcjogKGVyciwgc3QsIHJlYXNvbikgPT4gcmVqZWN0KHtlcnI6IGVyciwgb2JqOiByZWFzb259KSxcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzb2x2ZSxcclxuICAgICAgICAgICAgdGltZW91dDogMTAwMDAvL21pbGxpc2Vjb25kc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gb25EZWxldGUoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnZGVsZXRpbmcuLicpXHJcbn1cclxuXHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBTUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.ts\n");

/***/ }),

/***/ "./src/map.ts":
/*!********************!*\
  !*** ./src/map.ts ***!
  \********************/
/*! exports provided: map, layerForUserRectangles, enableDrawing, drawCircles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"map\", function() { return map; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"layerForUserRectangles\", function() { return layerForUserRectangles; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableDrawing\", function() { return enableDrawing; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawCircles\", function() { return drawCircles; });\nvar __assign = (undefined && undefined.__assign) || Object.assign || function(t) {\r\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n        s = arguments[i];\r\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n            t[p] = s[p];\r\n    }\r\n    return t;\r\n};\r\nvar map;\r\nvar layerForUserRectangles;\r\n// add the map to the page\r\nmap = L.map('map').setView([42.697930, 23.321628], 13);\r\nL.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {\r\n    attribution: 'Map data &copy; <createCoordinatesReturn href=\"http://openstreetmap.org\">OpenStreetMap</createCoordinatesReturn> contributors, <createCoordinatesReturn href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</createCoordinatesReturn>, Imagery © <createCoordinatesReturn href=\"http://mapbox.com\">Mapbox</createCoordinatesReturn>',\r\n    maxZoom: 18,\r\n    id: 'mapbox.streets-basic',\r\n    accessToken: 'pk.eyJ1IjoiY2hpcHNhbiIsImEiOiJqa0JwV1pnIn0.mvduWzyRdcHxK_QIOpetFg'\r\n}).addTo(map);\r\n// the collapsible sidebar with redraw/download etc. custom buttons\r\nvar sidebar = L.control.sidebar('sidebar').addTo(map);\r\n// where we draw rectangles\r\nlayerForUserRectangles = new L.FeatureGroup();\r\nmap.addLayer(layerForUserRectangles);\r\n// enable the plugin for drawing on the map\r\nvar drawControl = new L.Control.Draw({\r\n    edit: {\r\n        featureGroup: layerForUserRectangles\r\n    },\r\n    draw: {\r\n        circle: true,\r\n        circlemarker: false,\r\n        marker: false,\r\n        polygon: false,\r\n        polyline: false,\r\n        rectangle: false\r\n    }\r\n});\r\nmap.addControl(drawControl);\r\n/**\r\n * A function which collects what the user has drawn and pass it to a callback\r\n * @param {(rectangle: Rectangle) => any} callbackOnRectDrawn\r\n * @param {() => void} callbackOnDelete\r\n */\r\nfunction enableDrawing(callbackOnCircleDrawn) {\r\n    map.on('draw:created', function (e) {\r\n        var type = e.layerType, layer = e.layer;\r\n        if (type !== \"circle\") {\r\n            return true;\r\n        }\r\n        var radius = layer.getRadius();\r\n        var center = layer.getLatLng();\r\n        console.log(\"radius=\" + radius + \" center=\" + center);\r\n        layerForUserRectangles.clearLayers();\r\n        layerForUserRectangles.addLayer(layer);\r\n        callbackOnCircleDrawn(L.circle(layer.getLatLng(), { radius: layer.getRadius() }));\r\n    });\r\n    map.on(\"draw:deleted\", function () {\r\n    });\r\n}\r\nvar myRenderer = L.canvas({ padding: 0.5 });\r\n/**\r\n * Given a layer, coordinates of the center of circles and the radius of the circle,\r\n * draw the circles on the layer\r\n * @param {LatLng[]} coords\r\n * @param {LayerGroup} layer\r\n * @param {number} circleRadius\r\n * @param {{}} circleOptions\r\n */\r\nfunction drawCircles(coords, layer, circleRadius, circleOptions) {\r\n    if (circleRadius === void 0) { circleRadius = 300; }\r\n    if (circleOptions === void 0) { circleOptions = {}; }\r\n    var opts = __assign({ color: \"red\" }, circleOptions);\r\n    coords.forEach(function (coord) {\r\n        L.circle(coord, { radius: circleRadius }, circleOptions).addTo(layer);\r\n    });\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFwLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL21hcC50cz8yOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBsZXQgbWFwO1xyXG5leHBvcnQgbGV0IGxheWVyRm9yVXNlclJlY3RhbmdsZXM7XHJcbmRlY2xhcmUgbGV0IEw7XHJcbi8vIGFkZCB0aGUgbWFwIHRvIHRoZSBwYWdlXHJcbm1hcCA9IEwubWFwKCdtYXAnKS5zZXRWaWV3KFs0Mi42OTc5MzAsIDIzLjMyMTYyOF0sIDEzKTtcclxuTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5wbmc/YWNjZXNzX3Rva2VuPXthY2Nlc3NUb2tlbn0nLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJ01hcCBkYXRhICZjb3B5OyA8Y3JlYXRlQ29vcmRpbmF0ZXNSZXR1cm4gaHJlZj1cImh0dHA6Ly9vcGVuc3RyZWV0bWFwLm9yZ1wiPk9wZW5TdHJlZXRNYXA8L2NyZWF0ZUNvb3JkaW5hdGVzUmV0dXJuPiBjb250cmlidXRvcnMsIDxjcmVhdGVDb29yZGluYXRlc1JldHVybiBocmVmPVwiaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9jcmVhdGVDb29yZGluYXRlc1JldHVybj4sIEltYWdlcnkgwqkgPGNyZWF0ZUNvb3JkaW5hdGVzUmV0dXJuIGhyZWY9XCJodHRwOi8vbWFwYm94LmNvbVwiPk1hcGJveDwvY3JlYXRlQ29vcmRpbmF0ZXNSZXR1cm4+JyxcclxuICAgIG1heFpvb206IDE4LFxyXG4gICAgaWQ6ICdtYXBib3guc3RyZWV0cy1iYXNpYycsXHJcbiAgICBhY2Nlc3NUb2tlbjogJ3BrLmV5SjFJam9pWTJocGNITmhiaUlzSW1FaU9pSnFhMEp3VjFwbkluMC5tdmR1V3p5UmRjSHhLX1FJT3BldEZnJ1xyXG59KS5hZGRUbyhtYXApO1xyXG5cclxuXHJcbi8vIHRoZSBjb2xsYXBzaWJsZSBzaWRlYmFyIHdpdGggcmVkcmF3L2Rvd25sb2FkIGV0Yy4gY3VzdG9tIGJ1dHRvbnNcclxubGV0IHNpZGViYXIgPSBMLmNvbnRyb2wuc2lkZWJhcignc2lkZWJhcicpLmFkZFRvKG1hcCk7XHJcblxyXG4vLyB3aGVyZSB3ZSBkcmF3IHJlY3RhbmdsZXNcclxubGF5ZXJGb3JVc2VyUmVjdGFuZ2xlcyA9IG5ldyBMLkZlYXR1cmVHcm91cCgpO1xyXG5tYXAuYWRkTGF5ZXIobGF5ZXJGb3JVc2VyUmVjdGFuZ2xlcyk7XHJcbi8vIGVuYWJsZSB0aGUgcGx1Z2luIGZvciBkcmF3aW5nIG9uIHRoZSBtYXBcclxubGV0IGRyYXdDb250cm9sID0gbmV3IEwuQ29udHJvbC5EcmF3KHtcclxuICAgIGVkaXQ6IHtcclxuICAgICAgICBmZWF0dXJlR3JvdXA6IGxheWVyRm9yVXNlclJlY3RhbmdsZXNcclxuICAgIH0sXHJcbiAgICBkcmF3OiB7XHJcbiAgICAgICAgY2lyY2xlOiB0cnVlLFxyXG4gICAgICAgIGNpcmNsZW1hcmtlcjogZmFsc2UsXHJcbiAgICAgICAgbWFya2VyOiBmYWxzZSxcclxuICAgICAgICBwb2x5Z29uOiBmYWxzZSxcclxuICAgICAgICBwb2x5bGluZTogZmFsc2UsXHJcbiAgICAgICAgcmVjdGFuZ2xlOiBmYWxzZVxyXG4gICAgfVxyXG59KTtcclxubWFwLmFkZENvbnRyb2woZHJhd0NvbnRyb2wpO1xyXG5cclxuLyoqXHJcbiAqIEEgZnVuY3Rpb24gd2hpY2ggY29sbGVjdHMgd2hhdCB0aGUgdXNlciBoYXMgZHJhd24gYW5kIHBhc3MgaXQgdG8gYSBjYWxsYmFja1xyXG4gKiBAcGFyYW0geyhyZWN0YW5nbGU6IFJlY3RhbmdsZSkgPT4gYW55fSBjYWxsYmFja09uUmVjdERyYXduXHJcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gY2FsbGJhY2tPbkRlbGV0ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZURyYXdpbmcoY2FsbGJhY2tPbkNpcmNsZURyYXduOiAoY2lyY2xlOiBMLkNpcmNsZSkgPT4gYW55KSB7XHJcbiAgICBtYXAub24oJ2RyYXc6Y3JlYXRlZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBlLmxheWVyVHlwZSxcclxuICAgICAgICAgICAgbGF5ZXIgPSBlLmxheWVyO1xyXG4gICAgICAgIGlmICh0eXBlICE9PSBcImNpcmNsZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByYWRpdXMgPSBsYXllci5nZXRSYWRpdXMoKTtcclxuICAgICAgICBsZXQgY2VudGVyID0gbGF5ZXIuZ2V0TGF0TG5nKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYHJhZGl1cz0ke3JhZGl1c30gY2VudGVyPSR7Y2VudGVyfWApO1xyXG4gICAgICAgIGxheWVyRm9yVXNlclJlY3RhbmdsZXMuY2xlYXJMYXllcnMoKTtcclxuICAgICAgICBsYXllckZvclVzZXJSZWN0YW5nbGVzLmFkZExheWVyKGxheWVyKVxyXG5cclxuICAgICAgICBjYWxsYmFja09uQ2lyY2xlRHJhd24oTC5jaXJjbGUobGF5ZXIuZ2V0TGF0TG5nKCksIHtyYWRpdXM6IGxheWVyLmdldFJhZGl1cygpfSkpXHJcbiAgICB9KTtcclxuICAgIG1hcC5vbihcImRyYXc6ZGVsZXRlZFwiLCAoKSA9PiB7XHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxudmFyIG15UmVuZGVyZXIgPSBMLmNhbnZhcyh7cGFkZGluZzogMC41fSk7XHJcblxyXG4vKipcclxuICogR2l2ZW4gYSBsYXllciwgY29vcmRpbmF0ZXMgb2YgdGhlIGNlbnRlciBvZiBjaXJjbGVzIGFuZCB0aGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUsXHJcbiAqIGRyYXcgdGhlIGNpcmNsZXMgb24gdGhlIGxheWVyXHJcbiAqIEBwYXJhbSB7TGF0TG5nW119IGNvb3Jkc1xyXG4gKiBAcGFyYW0ge0xheWVyR3JvdXB9IGxheWVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjaXJjbGVSYWRpdXNcclxuICogQHBhcmFtIHt7fX0gY2lyY2xlT3B0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdDaXJjbGVzKGNvb3JkczogTC5MYXRMbmdbXSwgbGF5ZXI6IEwuTGF5ZXJHcm91cCwgY2lyY2xlUmFkaXVzID0gMzAwLCBjaXJjbGVPcHRpb25zID0ge30pIHtcclxuICAgIGxldCBvcHRzID0ge1xyXG4gICAgICAgIGNvbG9yOiBcInJlZFwiLFxyXG4gICAgICAgIC4uLmNpcmNsZU9wdGlvbnNcclxuICAgIH07XHJcbiAgICBjb29yZHMuZm9yRWFjaCgoY29vcmQ6IEwuTGF0TG5nKSA9PiB7XHJcbiAgICAgICAgTC5jaXJjbGUoY29vcmQsIHtyYWRpdXM6IGNpcmNsZVJhZGl1c30sIGNpcmNsZU9wdGlvbnMpLmFkZFRvKGxheWVyKVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/map.ts\n");

/***/ })

/******/ });