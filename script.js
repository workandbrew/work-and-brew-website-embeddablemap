// SUPA DUPA NEED //

import { API_KEY } from './key.js';
// script.js this lidewally has my API key
const map = new maplibregl.Map({
    container: 'map', // div id
    style: `https://api.maptiler.com/maps/dataviz-v4/style.json?key=${API_KEY}`,
    center: [-73.97539, 40.76460], // starting position [lng, lat]
    zoom: 13.2 // starting zoom
});

// zoom and rotation controls
map.addControl(new maplibregl.NavigationControl());


// fetch and parse
fetch('markers.csv') // path to your CSV
  .then(response => response.text())
  .then(csvText => {
    // Parse CSV into objects
    const data = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;

    data.forEach(row => {
      const lat = parseFloat(row.Latitude);
      const lon = parseFloat(row.Longitude);
      const name = row.Name;
      const description = row.Description;

      if (!isNaN(lat) && !isNaN(lon)) {
        const marker = new maplibregl.Marker({ color: 'red' })
          .setLngLat([lon, lat])
          .addTo(map);

        const popup = new maplibregl.Popup({ offset: 25 })
          .setHTML(`<strong>${name}</strong><br>${description}`);

        marker.setPopup(popup);
      }
    });
  })
  .catch(err => console.error('Error fetching CSV:', err));