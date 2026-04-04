// CREATE MAP
var map = L.map('map', {
    preferCanvas: true
}).setView([32.7157, -117.1611], 11);

// BASEMAP
var baseMap = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    { attribution: '&copy; OpenStreetMap & CartoDB' }
).addTo(map);

// COLOR FUNCTION
function getColor(d) {
    return d > 0.8 ? '#8c1d13' :
           d > 0.6 ? '#b24a2f' :
           d > 0.4 ? '#d07a5c' :
           d > 0.2 ? '#e6b8a2' :
                     '#f5e6dc';
}

// STYLE
function style(feature) {
    return {
        fillColor: getColor(feature.properties.Walkability),
        weight: 0.3,
        opacity: 1,
        color: '#666',
        fillOpacity: 0.85
    };
}

// HOVER
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 1.5,
        color: '#000',
        fillOpacity: 0.95
    });
    layer.bringToFront();
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

// POPUP
function onEachFeature(feature, layer) {
    let p = feature.properties;

    layer.bindPopup(`
        <strong>Walkability Index:</strong> ${p.Walkability.toFixed(2)}<br>
        <strong>Population:</strong> ${p.pop}<br>
        <strong>Area (m²):</strong> ${p.Area_m2.toLocaleString()}
    `);

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

// LOAD DATA
var geojson;

fetch('blockgroups.geojson')
    .then(res => res.json())
    .then(data => {

        geojson = L.geoJSON(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

        map.fitBounds(geojson.getBounds());

        L.control.layers(
            { "Basemap": baseMap },
            { "Walkability Index": geojson },
            { collapsed: false }
        ).addTo(map);
    });

// LEGEND
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'legend');

    div.innerHTML += "<h4>Walkability Index</h4>";
    div.innerHTML += "<p style='font-size:12px;margin:0 0 8px 0;'>0 = Low<br>1 = High</p>";

    var grades = [
        [0.0, 0.2],
        [0.2, 0.4],
        [0.4, 0.6],
        [0.6, 0.8],
        [0.8, 1.0]
    ];

    grades.forEach(function(range) {
        div.innerHTML +=
            '<div class="legend-item">' +
            '<span style="background:' + getColor(range[0] + 0.001) + '"></span>' +
            range[0].toFixed(1) + ' – ' + range[1].toFixed(1) +
            '</div>';
    });

    return div;
};

legend.addTo(map);
