---
layout: default
title: Tog
permalink: /tog/
---
## 🎈 Tog

Her finner du et kart over ruten som 17 mai toget skal gå.

<hr>

<div class="container-fluid my-3">
  <div class="row g-3 align-items-start">
    <!-- Flowchart Card -->
    <div class="col-md-auto" style="min-width: 100px; max-width: 140px;">
      <div class="card shadow-sm rounded-3">
        <div class="card-body">
          <h6 class="card-title mb-3">Oppstilling</h6>
          <div class="mermaid">
            graph TD
              1(7. Klasse) --> 2(Kleppestø<br>barnehage)
              2(Kleppestø<br>barnehage) --> 3(Stognafjell<br>barnehage)
              3(Stognafjell<br>barnehage) --> 4(Korpset)
              4(Korpset) --> 5(1. Klasse)
              5(1. Klasse) --> 6(1. Klasse)
              6(2. Klasse) --> 7(3. Klasse)
              7(3. Klasse) --> 8(4. Klasse)
              8(4. Klasse) --> 9(5. Klasse)
              9(5. Klasse) --> 10(6. Klasse)
          </div>
        </div>
      </div>
    </div>
    <!-- Map Section -->
    <div class="col">
      <div class="map-container position-relative" style="height: 80vh; width: 100%;">
        <div id="map" class="w-100 h-100 rounded shadow-sm"></div>
      </div>
    </div>
  </div>
</div>

<!-- Leaflet CSS and JS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>

<style>
  .line-label {
    text-align: center;
    font-size: 12px;
    color: #333;
    white-space: nowrap;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  }
</style>

<script>
  mermaid.initialize({ startOnLoad: true });
  document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map', {
      zoomControl: true,
      minZoom: 10,
      maxZoom: 19
    }).setView([60.41208772896303, 5.2243880385484545], 15);
          

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    fetch('{{ site.baseurl }}/assets/maps/tog.geojson')
      .then(res => res.json())
      .then(data => {
        L.geoJSON(data, {
          onEachFeature: function(feature, layer) {
            // Add popup with title & description if present
            if (feature.properties) {
              let popupContent = '';

              if (feature.properties.title) {
                popupContent += `<strong>${feature.properties.title}</strong>`;
              }

              if (feature.properties.description) {
                if (popupContent) popupContent += '<br>';
                popupContent += feature.properties.description;
              }

              if (popupContent) {
                layer.bindPopup(popupContent);
              }

              // Optional: Add label at center of LineString (midpoint of bounds)
              if (feature.geometry.type === "LineString" && feature.properties.title) {
                const bounds = layer.getBounds();
                const center = bounds.getCenter();

                const labelMarker = L.marker(center, {
                  icon: L.divIcon({
                    className: 'line-label',
                    html: `<div>${feature.properties.title}</div>`,
                    iconSize: [100, 20],
                    iconAnchor: [50, -10],
                  }),
                  interactive: false
                }).addTo(map);
              }
            }
          },
          style: function(feature) {
            return {
              color: feature.properties.color || '#FF0000',
              weight: feature.properties.weight || 4,
              opacity: feature.properties.opacity || 1
            };
          }
        }).addTo(map);
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
  });
</script>