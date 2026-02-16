var backgroundMapImagePath = "../images/BaseMaps/";
var lastBackgroundIndex = -1;

// var backgroundMaps = [
//     { name: "EsriWorldStreetMap", basemap: L.tileLayer.provider('Esri.WorldStreetMap'), title: "Esri World Street Map", image: "Esri_World_Street_Map.png" }
//     ,{ name: "EsriWorldTopoMap", basemap: L.tileLayer.provider('Esri.WorldTopoMap'), title: "Esri World Topo Map", image: "Esri_World_Topo_Map.png" }
//     ,{ name: "EsriWorldImagery", basemap: L.tileLayer.provider('Esri.WorldImagery'), title: "Esri World Imagery Map", image: "Esri_World_Imagery.png" }
//     ,{ name: "EsriNatGeoMap", basemap: L.tileLayer.provider('Esri.NatGeoWorldMap'), title: "Esri Nat Geographic Map", image: "Esri_National_Geographic.png" }
//     ,{ name: "EsriGrayCanvasMap", basemap: L.tileLayer.provider('Esri.WorldGrayCanvas'), title: "Esri Gray Canvas Map", image: "Esri_Gray_Canvas.png" }
//     ,{ name: "EsriDeLorme", basemap: L.tileLayer.provider('Esri.DeLorme'), title: "Esri DeLorme (Limited)", image: "Esri_DeLorme.png" }
//     ,{ name: "OpenStreetMapDefault", basemap: L.tileLayer.provider('OpenStreetMap.Mapnik'), title: "OpenStreetMap", image: "OpenStreetMap_Default.png" }
//     ,{ name: "OpenStreetMapGerman", basemap: L.tileLayer.provider('OpenStreetMap.DE'), title: "OSM German Style", image: "OpenStreetMap_German_Style.png" }
//     , { name: "OpenStreetMapBW", basemap: L.tileLayer.provider('OpenStreetMap.BlackAndWhite'), title: "OSM B&W", image: "OpenStreetMap_Black_White.png" }
//     , { name: "OpenStreetMapHOT", basemap: L.tileLayer.provider('OpenStreetMap.HOT'), title: "OSM H.O.T", image: "OpenStreetMap_HOT.png" }
//     ,{ name: "NokiaNormalDay", basemap: L.tileLayer.provider('Nokia.normalDay'), title: "Nokia Normal Day", image: "Nokia_Normal_Day.png" }
//     ,{ name: "NokiaNormalGreyDay", basemap: L.tileLayer.provider('Nokia.normalGreyDay'), title: "Nokia Normal Day Grey", image: "Nokia_Normal_Day_Gray.png" }
//     ,{ name: "NokiaTerrain", basemap: L.tileLayer.provider('Nokia.terrainDay'), title: "Nokia Terrain", image: "Nokia_Terrain.png" }
//     ,{ name: "NokiaSatellite", basemap: L.tileLayer.provider('Nokia.satelliteYesLabelsDay'), title: "Nokia Satellite", image: "Nokia_Satellite_Labeled.png" }
//     ,{ name: "ThunderforestOpenCycleMap", basemap: L.tileLayer.provider('Thunderforest.OpenCycleMap'), title: "Thunderforest OpenCycle", image: "Thunderforest_OpenCycleMap.png" }
//     ,{ name: "ThunderforestTransport", basemap: L.tileLayer.provider('Thunderforest.Transport'), title: "Thunderforest Transport", image: "Thunderforest_Transport.png" }
//     , { name: "ThunderforestLandscape", basemap: L.tileLayer.provider('Thunderforest.Landscape'), title: "Thunderforest Landscape", image: "Thunderforest_Landscape.png" }
//     , { name: "MapQuestOSM", basemap: L.tileLayer.provider('MapQuestOpen.OSM'), title: "MapQuest OSM", image: "MapQuest_OSM.png" }
//     , { name: "MapQuestOpenAerial", basemap: L.tileLayer.provider('MapQuestOpen.Aerial'), title: "MapQuest Aerial", image: "MapQuest_Aerial.png" }
//     , { name: "OpenMapSurfer", basemap: L.tileLayer.provider('OpenMapSurfer'), title: "OpenMapSurfer", image: "OpenMapSurfer.png" }
//     , { name: "OpenMapSurferGrayscale", basemap: L.tileLayer.provider('OpenMapSurfer.Grayscale'), title: "OpenMapSurfer Grayscale", image: "OpenMapSurfer_Grayscale.png" }
//     ,{ name: "StamenToner", basemap: L.tileLayer.provider('Stamen.Toner'), title: "Stamen Toner", image: "Stamen_Toner.png" }
//     ,{ name: "StamenTerrain", basemap: L.tileLayer.provider('Stamen.Terrain'), title: "Stamen Terrain", image: "Stamen_Terrain.png" }
//     ,{ name: "StamenWatercolor", basemap: L.tileLayer.provider('Stamen.Watercolor'), title: "Stamen Watercolor", image: "Stamen_Watercolor.png" }
//     , { name: "Acetate", basemap: L.tileLayer.provider('Acetate'), title: "Acetate", image: "Acetate.png" }
//     //, { name: "", basemap: L.tileLayer.provider(''), title: "", image: ".png" }

// ];
var backgroundMaps = [
    { name: "EsriWorldTopoMap", basemap: L.tileLayer.provider('Esri.WorldTopoMap'), title: "Esri World Topo Map", image: "Esri_World_Topo_Map.png" } // 0
    ,{ name: "EsriWorldStreetMap", basemap: L.tileLayer.provider('Esri.WorldStreetMap'), title: "Esri World Street Map", image: "Esri_World_Street_Map.png" } // 1
    ,{ name: "EsriGrayCanvasMap", basemap: L.tileLayer.provider('Esri.WorldGrayCanvas'), title: "Esri Gray Canvas Map", image: "Esri_Gray_Canvas.png" } // 2
    ,{ name: "EsriDarkGrayCanvasMap", basemap: L.tileLayer.provider('Esri.WorldDarkGrayCanvas'), title: "Esri Dark Gray Canvas Map", image: "Esri_Dark_Gray_Canvas.png" } // 2
    ,{ name: "EsriWorldImagery", basemap: L.tileLayer.provider('Esri.WorldImagery'), title: "Esri World Imagery Map", image: "Esri_World_Imagery.png" } // 3
    ,{ name: "EsriNatGeoMap", basemap: L.tileLayer.provider('Esri.NatGeoWorldMap'), title: "Esri Nat Geographic Map", image: "Esri_National_Geographic.png" } // 4
    // ,{ name: "EsriDeLorme", basemap: L.tileLayer.provider('Esri.DeLorme'), title: "Esri DeLorme", image: "Esri_DeLorme.png" } // 5
    // ,{ name: "NokiaNormalDay", basemap: L.tileLayer.provider('Nokia.normalDay'), title: "Nokia Normal Day", image: "Nokia_Normal_Day.png" }
    // ,{ name: "NokiaNormalGreyDay", basemap: L.tileLayer.provider('Nokia.normalGreyDay'), title: "Nokia Normal Day Grey", image: "Nokia_Normal_Day_Gray.png" }
    // ,{ name: "NokiaTerrain", basemap: L.tileLayer.provider('Nokia.terrainDay'), title: "Nokia Terrain", image: "Nokia_Terrain.png" }
    // ,{ name: "NokiaSatellite", basemap: L.tileLayer.provider('Nokia.satelliteYesLabelsDay'), title: "Nokia Satellite", image: "Nokia_Satellite_Labeled.png" }
    ,{ name: "OpenStreetMapDefault", basemap: L.tileLayer.provider('OpenStreetMap.Mapnik'), title: "OpenStreetMap", image: "OpenStreetMap_Default.png" } // 6
    ,{ name: "OpenStreetMapGerman", basemap: L.tileLayer.provider('OpenStreetMap.DE'), title: "OSM German Style", image: "OpenStreetMap_German_Style.png" } // 7
    ,{ name: "OpenStreetMapBW", basemap: L.tileLayer.provider('OpenStreetMap.BlackAndWhite'), title: "OSM B&W", image: "OpenStreetMap_Black_White.png" } // 8
    ,{ name: "OpenStreetMapHOT", basemap: L.tileLayer.provider('OpenStreetMap.HOT'), title: "OSM H.O.T", image: "OpenStreetMap_HOT.png" } // 9
    // ,{ name: "StamenToner", basemap: L.tileLayer.provider('Stamen.Toner'), title: "Stamen Toner", image: "Stamen_Toner.png" } // 10
    // ,{ name: "StamenTonerLite", basemap: L.tileLayer.provider('Stamen.TonerLite'), title: "Stamen Toner Lite", image: "Stamen_Toner_Lite.png" } // 11
    // ,{ name: "StamenTerrain", basemap: L.tileLayer.provider('Stamen.Terrain'), title: "Stamen Terrain", image: "Stamen_Terrain.png" } // 12
    // ,{ name: "StamenWatercolor", basemap: L.tileLayer.provider('Stamen.Watercolor'), title: "Stamen Watercolor", image: "Stamen_Watercolor.png" } // 13
    ,{ name: "ThunderforestOpenCycleMap", basemap: L.tileLayer.provider('Thunderforest.OpenCycleMap'), title: "Thunderforest OpenCycle", image: "Thunderforest_OpenCycleMap.png" } // 14
    ,{ name: "ThunderforestTransport", basemap: L.tileLayer.provider('Thunderforest.Transport'), title: "Thunderforest Transport", image: "Thunderforest_Transport.png" } // 15
    , { name: "ThunderforestLandscape", basemap: L.tileLayer.provider('Thunderforest.Landscape'), title: "Thunderforest Landscape", image: "Thunderforest_Landscape.png" } // 16
    , { name: "ThunderforestOutdoors", basemap: L.tileLayer.provider('Thunderforest.Outdoors'), title: "Thunderforest Outdoors", image: "Thunderforest_Outdoors.png" } // 17
    //  , { name: "", basemap: L.tileLayer.provider(''), title: "", image: ".png" }

];

var backgroundLayers = {
    'Esri World Street Map': L.tileLayer.provider('Esri.WorldStreetMap'),
    'Esri WorldTopoMap': L.tileLayer.provider('Esri.WorldTopoMap'),
    'Esri WorldImagery': L.tileLayer.provider('Esri.WorldImagery'),
    'Esri NatGeoWorldMap': L.tileLayer.provider('Esri.NatGeoWorldMap'),
    'Esri WorldGrayCanvas': L.tileLayer.provider('Esri.WorldGrayCanvas'),
    'Esri DeLorme (Limited scale)': L.tileLayer.provider('Esri.DeLorme'),
    //'Esri WorldTerrain': L.tileLayer.provider('Esri.WorldTerrain'),
    //'Esri WorldShadedRelief': L.tileLayer.provider('Esri.WorldShadedRelief'),
    //'Esri WorldPhysical': L.tileLayer.provider('Esri.WorldPhysical'),
    //'Esri OceanBasemap': L.tileLayer.provider('Esri.OceanBasemap'),
    'Nokia Normal Day Grey': L.tileLayer.provider('Nokia.normalGreyDay'),
    'Nokia Normal Day': L.tileLayer.provider('Nokia.normalDay'),
    //'Nokia Satellite': L.tileLayer.provider('Nokia.satelliteNoLabelsDay'),
    'Nokia Terrain': L.tileLayer.provider('Nokia.terrainDay'),
    'Nokia Satellite (Labeled)': L.tileLayer.provider('Nokia.satelliteYesLabelsDay'),
    'OpenStreetMap Default': L.tileLayer.provider('OpenStreetMap.Mapnik'),
    'OpenStreetMap German Style': L.tileLayer.provider('OpenStreetMap.DE'),
    'OpenStreetMap Black and White': L.tileLayer.provider('OpenStreetMap.BlackAndWhite'),
    'OpenStreetMap H.O.T.': L.tileLayer.provider('OpenStreetMap.HOT'),
    'Thunderforest OpenCycleMap': L.tileLayer.provider('Thunderforest.OpenCycleMap'),
    'Thunderforest Transport': L.tileLayer.provider('Thunderforest.Transport'),
    'Thunderforest Landscape': L.tileLayer.provider('Thunderforest.Landscape'),
    'MapQuest OSM': L.tileLayer.provider('MapQuestOpen.OSM'),
    'MapQuest Aerial': L.tileLayer.provider('MapQuestOpen.Aerial'),
    'OpenMapSurfer': L.tileLayer.provider('OpenMapSurfer'),
    'OpenMapSurfer Grayscale': L.tileLayer.provider('OpenMapSurfer.Grayscale'),
    //'CloudMade': L.tileLayer.provider('CloudMade'), // requires key and is old data
    //'MapBox Example': L.tileLayer.provider('MapBox.examples.map-zr0njcqy'),
    'Stamen Toner': L.tileLayer.provider('Stamen.Toner'),
    'Stamen Terrain': L.tileLayer.provider('Stamen.Terrain'),
    'Stamen Watercolor': L.tileLayer.provider('Stamen.Watercolor'),
    'Acetate': L.tileLayer.provider('Acetate')
};


function setUpBasemapList() {
    var code = "";
    for (var i = 0; i < backgroundMaps.length; i++) {
        var backgroundMap = backgroundMaps[i];
        code += "<li class='baseMapLiStyle'><div style='text-align: center;' >"
			+ "<span style='padding: 3px;'>" + backgroundMap.title + "</span><br/>"
            + "<img src='" + backgroundMapImagePath + backgroundMap.image + "' class='fm_basemap_image'  />"
        + "</div></li>";
    }
    $("#basemapUL").html(code);
    $('#basemapUL').selectable({
        selected: function (event, ui) {
            $(".ui-selected", this).each(function () {
                var index = $("#basemapUL li").index(this);

                //alert(backgroundMaps[index].title);
                if (lastBackgroundIndex != index)
                    switchBaseMap(index);
            });
        }
    });
    $('#basemapUL li:first').addClass('ui-selected');
}

function switchBaseMap(index) {
    //alert(backgroundMaps[index].title);
    var newBackground = backgroundMaps[index].basemap;
    map.removeLayer(lastBackground);
    map.addLayer(newBackground, true);
    lastBackground = newBackground;
    lastBackgroundIndex = index;
    newBackground.bringToBack();

}
