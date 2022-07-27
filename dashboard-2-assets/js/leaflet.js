const map = L.map('leaflet-map', {
  zoomControl: false,
}).setView([64.990556, 17.307778], 4);

map.touchZoom.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.dragging.disable();

L.geoJSON(geoJSON).addTo(map);

const markers = [
  [59.911491, 10.757933], // Oslo
  [60.397976, 5.324383], // Bergen
  //   [59.2181, 10.9298], // Fredrikstad
  [69.649208, 18.955324], // Tromsø
  [63.446827, 10.421906], // Trondheim
];

fetch('https://fakestoreapi.com/users?limit=4')
  .then(res => res.json())
  .then(json => {
    json.forEach((user, index) => {
      let marker = L.marker(markers[index], {
        icon: L.divIcon({
          className: 'leaflet-marker-div',
          html: '',
        }),
      }).addTo(map);

      marker.bindTooltip(user.username);
    });
  });
