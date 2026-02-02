
var searchTolerance = 0.3, searchZoomLevel = 9;
var venueLayer = new L.featureGroup();

var cirLayer, convLayer;

var faColumns = ["Congregati", "CongNbr", "Dates", "Publishers", "Circuit"];
var faAlias = ["Congregation", "Congregation #", "Convention", "Publishers", "Circuit"];
var convDates = [
    "July 28-30",
    "August 4-6",
    "August 11-13",
    "August 18-20",
    "August 25-27",
];
var mediaColumns = ["Type", "RecipientEntityTypeId", "StreetAddress", "City", "Zip", "Notes"];
var mediaAlias = ["Type: ", "Contact: ", "Address: ", "City: ", "Zip: " , "Notes: "];

var listColors = ["#f9f9ff","#739cdf","#8fdf73","#d173df","#df7373","#FFA500"];

// possible default layers - KHs, Assembly Halls, and SFTS locations
var cityLayer, faLayer, khPoints;
if (soCalCityData) {
    cityLayer = L.geoJson(soCalCityData, { onEachFeature: onEachCity, style: cityStyle }); //.addTo(map);
    cityLayer.id = "Cities";
    cityLayer.name = "Cities";
}

 if (ontarioVenueData) {
     faLayer = L.geoJson(ontarioVenueData, { onEachFeature: onEachFA, style: venueStyle });
     faLayer1 = L.geoJson(ontarioVenueData1, { onEachFeature: onEachFA, style: venueStyle }).addTo(map);
     faLayer2 = L.geoJson(ontarioVenueData2, { onEachFeature: onEachFA, style: venueStyle }).addTo(map);
     faLayer3 = L.geoJson(ontarioVenueData3, { onEachFeature: onEachFA, style: venueStyle }).addTo(map);
     faLayer3b = L.geoJson(ontarioVenueData3b, { onEachFeature: onEachFA, style: venueStyle });
     faLayer4 = L.geoJson(ontarioVenueData4, { onEachFeature: onEachFA, style: venueStyle }).addTo(map);
     faLayer5 = L.geoJson(ontarioVenueData5, { onEachFeature: onEachFA, style: venueStyle }).addTo(map);

     faLayer.id = "OntarioVenue";
     faLayer.name = "Ontario Venue";
 }

var mediaLayer;
if (mediaLocations) {
    mediaLayer = L.geoJson(mediaLocations, {onEachFeature: onEachMedia, pointToLayer: mediaMarker});
}

var venueMarker = L.marker([34.073344, -117.5667], {
    icon: L.icon({
        iconUrl: '../images/fat_pin_magenta_20x24.png',
        iconSize: [20, 24],
        iconAnchor: [10, 24],
        shadowAnchor: [12, 40],
        popupAnchor: [0, -27]
    })
});

venueMarker.bindPopup("<center><b>Convention Venue</center><br/>Citizens Bank Arena - Ontario CA</b><br/>4000 East Ontario Center Parkway, Ontario CA 91764");
venueLayer.addLayer(venueMarker);
map.addLayer(venueLayer);


function venueStyle(feature) {
    var fill = getAreaColor(feature.properties.Convention);
    //var fill = "#739cdf";
    return {
        weight: 2,
        opacity: 0.5,
        color: "#666666",
        dashArray: '',
        fillOpacity: 0.65,
        fillColor: fill
    };

}

function getAreaColor(venue) {
    var fill = "#000000";
    switch (venue) {
        case "Ontario, CA #1":
            fill = "#739cdf";
            break;
        case "Ontario, CA #2":
            fill = "#8fdf73";
            break;
        case "Ontario, CA #3":
            fill = "#d173df";
            break;
        case "Ontario, CA #4":
            fill = "#df7373";
            break;
        case "Ontario, CA #5":
            fill = "Orange";
            break;
    }
    return fill;
}

function onEachCity(feature, layer) {
    layer.bindPopup(cityPopUp(feature));
}

function cityPopUp(feature) {
    var prop = feature.properties;
    var blurb;
    var s1 = "<tr class='popupRow'><td class='popupKey'>";
    var s2 = "</td><td class='popupValue'>";
    var s3 = "</td></tr>";
    if (prop) {
        blurb = "<center><span class='popupTitle'>" + prop['NAME'] + "</span></center><table>" + s1 + "2010 Pop: " + s2 + prop['Pop2010'] + s3;
        blurb += "</table>";
    }
    return blurb;

}

function cityStyle(feature) {
    return {
        weight: 3,
        opacity: 0.5,
        color: "#ff0000",
        dashArray: '',
        fillOpacity: 0.25,
        fillColor: "#fff"
    };

}

function faPopUp(feature) {
    var prop = feature.properties;
    var blurb;
    if (prop) {
        blurb = "<center><b>Congregation Attending Ontario Venue</b></center><br/>";
        for (var i = 0; i < faColumns.length; i++) {
            var val = prop[faColumns[i]];
            if (val != undefined && val != null) {
                blurb += "<b>" + faAlias[i] + ":</b> " + val + "</br>";
            }
        }

    }
    return blurb;
}


function onEachFA(feature, layer) {
    layer.bindPopup(faPopUp(feature));
}

function onEachMedia (feature, layer) {
    layer.bindPopup(mediaPopUp(feature));
}

function mediaPopUp(feature) {
    var prop = feature.properties;
    var blurb;
    if (prop) {
        blurb = "<center><b>" + prop.Name + "</b></center><br/>";
        for (var i = 0; i < mediaColumns.length; i++) {
            var val = prop[mediaColumns[i]];
            if (val != undefined && val != null) {
                blurb += "<b>" + mediaAlias[i] + ":</b> " + val + "</br>";
            }
        }

    }
    return blurb;
}

function mediaMarker(feature, latlon) {
    var prop = feature.properties;
    //var hex = "#006600";
    var hex = prop["Type"] == "Newspaper" ?  "#0066ff" : "#ff4400" ;
    var mrkr = L.circleMarker(latlon, {
        opacity: 1,
        outlineOpacity: 0.01,
        fillOpacity: 1,
        radius: 3,
        weight: 1,
        color: hex,
        fillColor: hex
    });
    return mrkr;
}

function filterJSONCall(rawjson) {
    var json = {},
        key, loc, disp = [];

    for (var i in rawjson) {
        key = rawjson[i].formatted_address;

        loc = L.latLng(rawjson[i].geometry.location.lat(), rawjson[i].geometry.location.lng());

        json[key] = loc;	//key,value format
    }

    return json;
}




//
// Layer visibility toggle functions
//

// toggle for the layers
function toggleLayer(layer, checked) {
    if (checked) {
        if (layer == faLayer3) {
            if (fa3bVisibilityToggle.checked) {
                map.addLayer(faLayer3b);
            } 
            map.addLayer(layer);
        } else if (layer == faLayer3b) {
            if (fa3VisibilityToggle.checked) {
                map.addLayer(layer);
            } 
        } else
            map.addLayer(layer);

    } else {
        map.removeLayer(layer);
        if (layer == faLayer3) {
            map.removeLayer(faLayer3b);
        }
    }
}



map.fitBounds(faLayer.getBounds());

map.on('zoomend', function(e) {
    if (map.hasLayer(cityLayer)) {
        cityLayer.bringToFront();
    }
});
map.on('moveend', function (e) {
    if (map.hasLayer(cityLayer)) {
        cityLayer.bringToFront();
    }
});


//
// congregation backdrop
//
var geoParam = getParam('geohost');
if (geoParam && geoParam.length > 0) {
    appObj.geohost = geoParam;
} else {
    appObj.geohost = "usapp103.bethel.jw.org:8080"; // branch internal web site
    //appObj.geohost = "geo.jwmap.org"; // external web site
    //appObj.geohost = "localhost:8080"; // debug web site
}

//var proxyUrl = "../map_proxy/proxy.php?" // web server that supports php
var proxyUrl = ""; // geoserver configured to not need proxy (CORS)

// cong data headers and display text
congHeader = [
    "Congregati",
    "Congrega_1",
    "Publishers",
    "Circuit"
],
congHeaderDisplay = [
    "<b>Congregation: </b>",
    "<b>Congregation #: </b>",
    "<b>Publishers: </b>",
    "<b>Circuit: </b>"
];

var wmsUrl = "http://localhost:8080/geoserver/congs/wms";
if (appObj.geohost != undefined) {
    wmsUrl = "http://" + appObj.geohost + "/geoserver/congs/wms";
}

var congLayer = L.tileLayer.wms(wmsUrl, {
    layers: "congs:Congs_English",
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    opacity: 1
});

var congPopup = new L.Popup({ maxWidth: 450 });

function getCongregationInfo(e) {
    //note used to defer click events elsewhere, important so not to have multi popups on a single click
    if (window.hasOwnProperty('busy')) {
        if (busy) return;
    }
    if (anyCongLayers()) {
        var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
        var bbox = map.getBounds()._southWest.lng + ',' + map.getBounds()._southWest.lat + ',' + map.getBounds()._northEast.lng + ',' + map.getBounds()._northEast.lat;
        var width = map.getSize().x;
        var height = map.getSize().y;
        var x = map.layerPointToContainerPoint(e.layerPoint).x;
        var y = map.layerPointToContainerPoint(e.layerPoint).y;
        var layerStr = "congs:Congs_English";

        var url = proxyUrl + wmsUrl + '?request=GetFeatureInfo&service=WMS&version=1.1.1&layers=' + layerStr + '&styles=&srs=EPSG%3A4326&format=image%2Fpng&bbox=' + bbox +
            '&width=' + width + '&height=' + height + '&query_layers=' + layerStr +
            '&info_format=application/json' +
            '&feature_count=10&x=' + x + '&y=' + y +
            '&exceptions=application%2Fvnd.ogc.se_xml';
        var showResults = L.Util.bind(showGetFeatureInfo, this);
        $.ajax({
            url: url,
            success: function (data, status, xhr) {
                var err = typeof data === 'string' ? null : data;
                showResults(err, e.latlng, data);
            },
            error: function (xhr, status, error) {
                showResults(error);
            }
        });

    } else {
        // turn off map click handler if there are no congregation layers
        map.off('click', getCongregationInfo);
    }
}

function showGetFeatureInfo(err, latlng, response) {
    if (response && response.features) {
        var features = response.features;
        var blurb = "<center><b>Congregation</b></center><br/>";
        var total = features.length;
        if (total > 0) {
            for (var i = 0; i < total; i++) {
                var feature = features[i];
                var prop = feature.properties;
                if (total > 1) {
                    blurb += "<sub><i>" + (i + 1) + " of " + total + "</i></sub><br/>";
                }
                for (var j = 0; j < congHeader.length; j++) {
                    if (prop[congHeader[j]]) {
                        blurb += congHeaderDisplay[j] + prop[congHeader[j]] + "<br/>";
                    }
                }

            }
            //blurb += '<a onclick="getAllCongregationData([' + latlng.lat.toFixed(3) + ', ' + latlng.lng.toFixed(3) + '], \'Congregation Boundary Data\');" style="cursor: pointer;" >Get all Congregations at this location</a>';

        } else {
            blurb += "No Congregation data currently available at this location.<br/>";
        }
        L.popup({ maxHeight: 325, maxWidth: 500, minWidth: 200 })
          .setLatLng(latlng)
          .setContent('<div class="congregation-boundary-info">' + blurb + '</div>')
          .openOn(map);
    } else {
        alert("No Congregation data currently available at click location.");
    }
}

function mapHasLayer(layer) {
    return map.hasLayer(layer)
}

function anyCongLayers() {
    var has = false;
        if (mapHasLayer(congLayer)) {
            has = true;
        }
    return has;
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

function getConventionList(index) {
    if (index > 0) {
        var data = eval("faLayer" + index);
        var features = data._layers;
        blurb = "";
        var count = 0;
        for (var key in features) {
            var item = features[key];
            var feature = item.feature;
            var prop = feature.properties;
            var pubs = prop.Publishers_1;
            blurb += "<div >" + prop.CongregationName + " [" + pubs + "]</div>";
            count += pubs
        }
        blurb += "<br/><div>Total publishers: " + count + "</div>";
        listResults.innerHTML = blurb;
        listBanner.style.backgroundColor = listColors[index];
    }
}
