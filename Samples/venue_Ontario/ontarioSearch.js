// Search Features
var f_fa, f_br, faItems, brItems, faData, brData;
function switchSearchType(type) {
    var fas = document.getElementById('faSearch');
    var brs = document.getElementById('brSearch');
    var khhs = document.getElementById('khSearch');
    var box = document.getElementById("searchResults");
    switch (type) {
        case "FA":
            fas.style.display = "block";
            khhs.style.display = "none";

            break;
        case "BR":
            fas.style.display = "none";
            khhs.style.display = "block";
            break;
        case "KH":
            fas.style.display = "none";
            khhs.style.display = "block";
    }
    box.innerHTML = "";
}

if (ontarioVenueData) {
    faData = ontarioVenueData.features;
    faOptions = {
        threshold: searchTolerance,
        keys: ["propties.Congregati", "properties.CongFullNm", "properties.CongNbr"]
    }
    faItems = [];

    f_fa = new Fuse(faData, faOptions);

}

function processFASearch(text) {
    var box = document.getElementById("searchResults");
    var result = "";
    if (text.length > 1) {
        var brInput = document.getElementById("searchBRInput");
        if (brInput)
            brInput.value = "";
        var raw = f_fa.search(text);
        faItems = [];
        for (var i = 0; i < raw.length; i++) {
            faItems.push(raw[i]);
            result += getFAListItem(raw[i].properties, i);
        }
        if (faItems && faItems.length && faItems.length > 1)
            box.innerHTML = "<div style='font-size: smaller; margin-bottom: 10px;'>" + faItems.length + " Attending Congregation" + (faItems.length != 1 ? "s" : "") + " found.</div>" + result;
        else 
            box.innerHTML = result;

    }

}

function getFAListItem(prop, index) {
    var blurb = "<div onclick='buildFAPopUp(" + index + ");' class='getSearchListItem'>" + prop.CongFullNm + "</div>";
    blurb += "<div class='buildSearchPopup'>" + prop.Dates + "</div>";
    return blurb;
}

function buildFAPopUp(index) {
    var feature = faItems[index];
    var latlng = getCentroid2(feature.geometry.coordinates[0]);
    map.setView(latlng, searchZoomLevel);
    // add layer if not currently on map
    //var venueStr = feature.properties.Venue;
    //var venue = venueStr.substring(venueStr.length - 2);
    //if (!map.hasLayer(faLayer)) {
    //    map.addLayer(faLayer);
    //    var togg = document.getElementById('faVisibilityToggle');
    //    togg.checked = true;
    //}
    var popup = L.popup({ offset: L.point(0, 0)})
    .setLatLng(latlng)
    .setContent(faPopUp(feature))
    .openOn(map);

}

var getCentroid2 = function (arr) {
    var twoTimesSignedArea = 0;
    var cxTimes6SignedArea = 0;
    var cyTimes6SignedArea = 0;

    var length = arr.length

    var x = function (i) { return arr[i % length][0] };
    var y = function (i) { return arr[i % length][1] };

    for ( var i = 0; i < arr.length; i++) {
        var twoSA = x(i)*y(i+1) - x(i+1)*y(i);
        twoTimesSignedArea += twoSA;
        cxTimes6SignedArea += (x(i) + x(i+1)) * twoSA;
        cyTimes6SignedArea += (y(i) + y(i+1)) * twoSA;
    }
    var sixSignedArea = 3 * twoTimesSignedArea;
    return [ cyTimes6SignedArea / sixSignedArea, cxTimes6SignedArea / sixSignedArea];        
}


