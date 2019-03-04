var khLayer;
var itemIndex = 0;

// possible default layers - KHs, Assembly Halls, and SFTS locations
// var brLayer, faLayer, waLabelList = [], naaLayer, naaLabelList = [];
// if (branchesLayerData) {
//     brLayer = L.geoJson(branchesLayerData, { onEachFeature: onEachBranch, pointToLayer: branchMarker }); //.addTo(map);
//     brLayer.id = "Branches";
//     brLayer.name = "Branches";
// }

function onEachBranch(feature, layer) {
    layer.bindPopup(branchPopUp(feature));
}

function branchPopUp(feature) {
    var prop = feature.properties;
    var blurb;
    var s1 = "<tr class='popupRow'><td class='popupKey'>";
    var s2 = "</td><td class='popupValue'>";
    var s3 = "</td></tr>";
    if (prop) {
        blurb = "<center><span class='popupTitle'>" + prop['Branch'] + "</span></center><table>" + s1 + "Address: " + s2 + prop['Address'] + s3 +
            s1 + "City: " + s2 + prop['City'] + s3 +
            s1 + "Country: " + s2 + prop['Country'] + s3 +
            s1 + "Lat/Lng: " + s2 + feature.geometry.coordinates[1] + ", " + feature.geometry.coordinates[0] + s3;
        if (prop.Printery)
            blurb += s1 + "Printery: " + s2 + prop.Printery + s3;
        if (prop.Primary_Language)
            blurb += s1 + "Primary Language: " + s2 + prop.Primary_Language + s3;
        if (prop.Translation)
            blurb += s1 + "Translation: " + s2 + prop.Translation + s3;
        if (prop.Notes)
            blurb += s1 + "Notes: " + s2 + prop.Notes + s3;
        // bing's bird's eye view
        //blurb += "<b>Bing Birds Eye: </b><a href='http://ww.bing.com/maps/?v=2&where1=" + feature.geometry.coordinates[1] + ", " + feature.geometry.coordinates[0] + "&sty=o&lvl=20' target='_blank'>View</a><br/>";

        if (prop.Brochure)
            blurb += s1 + "Tour Brochure: " + s2 + "<a href='../Branches/Brochures/" + prop.Brochure + "' target='_blank'>View</a>" + s3;

        blurb += "</table>";
    }
    return blurb;

}


function pushDataToMarkers(feature, layer) {
    var properties = feature.properties;
    var loc = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];

    var marker = faMarker(feature, loc);
    marker.bindPopup(faPopUp(feature), { maxHeight: popupMaxHeight, maxWidth: popupMaxWidth, minWidth: popupMinWidth, autoClose: false });

    waLabelList.push(marker);
    faLayer.addLayer(marker);
}

function pushNADataToMarkers(feature, layer) {
    var properties = feature.properties;
    var loc = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];

    var marker = naaMarker(feature, loc);
    marker.bindPopup(faPopUp(feature), { maxHeight: popupMaxHeight, maxWidth: popupMaxWidth, minWidth: popupMinWidth, autoClose: false });

    naaLabelList.push(marker);
    naaLayer.addLayer(marker);
}



function getDateBlurb(feature) {
    var prop = feature.properties;
    var blurb = "";
    var blurb2 = "";
    if (prop["Start_Date"]) {
        var endDate = prop["End_Date"] ? prop["End_Date"] : "?";
        blurb2 = prop["Start_Date"] + " - " + endDate;
    }
    blurb = "<b>" + prop['Name'] + "</b><br/>" + blurb2;

    return blurb;

}


function branchMarker(feature, latlon) {
    var properties = feature.properties;

    mrkr = L.circleMarker(latlon, {
        opacity: 1,
        fillOpacity: 0.75,
        radius: 3,
        color: "#776600",
        fillColor: "#ffffff"
    });

    mrkr.feature = feature;
    mrkr.desc = properties["MPName"];
    return mrkr;
}

// toggle for the point layers
function togglePointLayer(layer, checked) {
    if (checked) {
        map.addLayer(layer);
    } else {
        map.removeLayer(layer);
    }
}


var markerLayer = L.featureGroup().addTo(map);
var pinkIcon = L.icon({
    iconUrl: 'images/photoPink.png',
    iconAnchor: [6, 6]
});

function nextItem() {
    itemIndex++;
    if (itemIndex>=mapItems.length) {
        itemIndex = 0;
    }
    moveToEvent(itemIndex);
}
 function prevItem() {
     itemIndex--;
     if (itemIndex<0) {
         itemIndex = mapItems.length - 1;
     }
     moveToEvent(itemIndex);
 }

function moveToEvent(index) {
    var mapItem = mapItems[index]
    var coords = [mapItem[1], mapItem[0]];
    markerLayer.clearLayers();
    // var circle = L.circle(coords, {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 2500
    // }).addTo(markerLayer);
    var bMarker = L.marker(coords,{icon: pinkIcon}).addTo(markerLayer);
    var marker = L.marker(coords).addTo(markerLayer);
    mapItemTitle.innerHTML = mapItem[2]
    mapItemText.innerHTML = mapItem[3];

}

moveToEvent(0);