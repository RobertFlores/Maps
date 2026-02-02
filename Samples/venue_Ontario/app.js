// add map and background map layer
var map = L.map('mapid',{attribution: ""}).setView([0,0], 2);

// var lastBackground = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
// 			maxZoom: 16
// }).addTo(map);
// var lastBackground = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
//    maxZoom: 16
//}).addTo(map);
var lastBackground = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: ""
}).addTo(map);

var appObj = {};
// put zoom control in top right corner
map.zoomControl.setPosition('topright');

// add scalebars
var scale = L.control.scale({ position: "bottomleft" }).addTo(map);

function onMenuChange (elem) {
    var choice = elem.value;
    rightTitle.innerHTML = choice;
    switch (choice) {
        case "Find Congregation" :
           toggleRightContent(findCongregation);
            break;
        case "Layers" :
            toggleRightContent(layerList);
            break;
        case "Map Styles" :
            toggleRightContent(basemapList);
            break;
        case "Convention List" :
            toggleRightContent(conventionList);
            break;
    }

}

function toggleRightContent(elem){
    for (var i = 0; i < panels.length; i++) {
        var panel = panels[i];
        if (panel == elem) {
            panel.style.display = "block";
        } else {
            panel.style.display = "none";
        }
    }
}

// get page query string value
function getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



// toggle for setting visibility of a congregation language layer
//      - does not override group toggle
function toggleLangLayer(checked, index) {
    // no need to check if cong group is toggle to be visible - individual language checkboxes only visible if cong group is toggled on

    if (checked) {
        map.addLayer(congLayers[index]);
    } else {
        map.removeLayer(congLayers[index]);
    }
}

function toggleLayer(layer, checked) {
    if (checked) {
        map.addLayer(layer);
    } else {
        map.removeLayer(layer);
    }
}

function toggleCoordsDisplay(checked) {
    var coords = document.getElementById('coordsSpan');
    if (coords) {
        coords.style.display = checked ? "block" : "none";
    }
}

// function for getting map coords at mouse cursor
function getMouseCoords(e) {
    //var cSpan = document.getElementById("coordsSpan");
    if (coordsDisplay) {

        var valStr = " Latitude: " + (e.latlng.lat).toFixed(5) + " | Longitude: " + (e.latlng.lng).toFixed(5) + " | Zoom: " + map.getZoom() + " ";
        coordsDisplay.innerHTML = valStr;
    }
}

String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

var titleHeader = document.getElementById("titleHeader");
var rightTitle = document.getElementById("rightTitle");
var rightContent = document.getElementById("rightContent");
var menuDropdown = document.getElementById("menuDropdown");
var layerList = document.getElementById("layerList");
var basemapList = document.getElementById("basemapList");
var coordsDisplay = document.getElementById('coordsSpan');
var findCongregation = document.getElementById('findCongregation');
var conventionList = document.getElementById('conventionList');
var listResults = document.getElementById("listResults");
var listBanner = document.getElementById("listBanner");
var fa3VisibilityToggle = document.getElementById("fa3VisibilityToggle");
var fa3bVisibilityToggle = document.getElementById("fa3bVisibilityToggle");

var panels = [layerList, basemapList, findCongregation, conventionList];

var mapPane = document.getElementById("mapid");

setUpBasemapList();
map.on('mousemove', getMouseCoords, this);
//map.fitBounds(allWorkers.getBounds());
map.on('dragstart', function() {
    mapPane.style.cursor = "move";
});
map.on('dragend', function() {
    mapPane.style.cursor = "pointer";
});