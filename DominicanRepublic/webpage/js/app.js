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


// put zoom control in top right corner
map.zoomControl.setPosition('topright');

// add scalebars
var scale = L.control.scale({ position: "bottomleft" }).addTo(map);

map.fitBounds([[20.11596,-72.04484],[17.50595,-68.29026]])

function onMenuChange (elem) {
    var choice = elem.value;
    rightTitle.innerHTML = choice;
    switch (choice) {
        //case "Find Individual" :
        //    toggleRightContent(findSFTS);
        //     break;
        case "Special Events" :
            toggleRightContent(layerList);
            break;
        case "Map Styles" :
            toggleRightContent(basemapList);
            break;
        // case "Circuit Details" :
        //     toggleRightContent(circuitDetails);
        //     break;
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


 // toggle for setting visibility of the congregation layer
 function toggleCongLayer(checked) {
     if (checked) {
         map.addLayer(congLayer);
         map.on('click', getCongregationInfo); // layer must be current
     } else {
         map.removeLayer(congLayer);
         map.off('click', getCongregationInfo);
     }
 }

 // toggle for showing the group of selected congregation language layers
 function toggleCongGroupLayer(checked) {
     // get the list display element for showing the list of languages
     var congDisplay = document.getElementById('congTr');
     if (checked) {
         congDisplay.style.display = "table-row";
         for (var i = 0; i < congLayers.length; i++) {
             var toggle = document.getElementById('congLayerToggle_' + i);
             if (toggle.checked) {
                 map.addLayer(congLayers[i]);
             }
         }
         map.on('click', getCongregationInfo);
     } else {
         for (var i = 0; i < congLayers.length; i++) {
             var toggle = document.getElementById('congLayerToggle_' + i);
             if (toggle.checked) {
                 map.removeLayer(congLayers[i]);
             }
         }
         congDisplay.style.display = "none";
         map.off('click', getCongregationInfo);
     }
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
var mapItemText = document.getElementById('mapItemText');

var panels = [layerList, basemapList];

var mapPane = document.getElementById("mapid");

// setUpBasemapList();
map.on('mousemove', getMouseCoords, this);

//map.on('dragstart', function () {
//    mapPane.style.cursor = "move";
//});
//map.on('dragend', function() {
//    mapPane.style.cursor = "pointer";
//});