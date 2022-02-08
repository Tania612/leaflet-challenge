var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

colors = ["purple", "red", "orange", "yellow", "green", "blue"];

var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
                  categories = ['>500', '400 to 499', '300 to 399', '200 to 299', '100 to 199', '>100'],
                  labels =[];
    
    div.innerHTML += '<strong> Depth </strong> <br>'
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            categories[i] + " " +colors[i] + '<br>';
    };
    return div;
 };
legend.addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

d3.json(url).then(function(response) {

  //console.log(response);
  console.log(response.features)

  var heatArray = [];

  for (var i = 0; i < response.features.length; i++) {
    var geometry = response.features[i].geometry;

    if (geometry) {
        //console.log([geometry.coordinates[1], geometry.coordinates[0]]);
        heatArray.push([geometry.coordinates[1], geometry.coordinates[0]]);
        coords = [geometry.coordinates[1], geometry.coordinates[0]];
        mag = response.features[i].properties.mag;
        loc = response.features[i].properties.place;
        depth = geometry.coordinates[2];
        console.log(depth);
        
    }
  var marker = L.circleMarker(coords,{
      radius: response.features[i].properties.mag**2/3,
      color: colours(depth)
  })
      .addTo(myMap);
    marker.bindPopup("Location: " + loc + " | Magnitude: "+ mag + " | Depth: " + depth).openPopup();
  }
  function colours(depth){
      if (depth>500) {
    return "purple"}
  else if (depth>400) {
     return "red"}
  else if (depth>300) {
     return "orange"}
  else if (depth>200) {
     return "yellow"}
  else if (depth>100) {
     return "green"}
  else if (depth<100) {
     return "blue"}
  else {
     return "black"}
  }
});