const map = L.map('leaflet-map', {
  zoomControl: false,
}).setView([64.990556, 17.307778], 3.5);

map.touchZoom.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.dragging.disable();

L.geoJSON(geoJSON).addTo(map);
