---
layout: default
title: 🗺️ Kart over området
permalink: /omraade/
---
# 🗺️ Kart over området
Her finner du et kart over skoleområdet med oversikt over leker, aktiviteter, kafeer og m.m.

<hr>

<div id="map" style="height: 70vh; width: 100%; margin-bottom: 2rem;"></div>

<!-- Leaflet CSS and JS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<style>
  .map-icon {
    font-size: 24px;
    line-height: 1;
    text-align: center;
  }

  .map-label {
    text-align: center;
    font-size: 12px;
    color: #333;
    font-weight: bold;
    white-space: nowrap;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  }
  
  .polygon-label {
    background: none;
    border: none;
    box-shadow: none;
  }
  
  .polygon-label div {
    color: #333;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  }
</style>

<script>
  document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map', {
    zoomControl: true,  // Show zoom controls
    minZoom: 16,        // Prevent zooming out too far
    maxZoom: 18         // Maximum zoom level
  }).setView([60.4120909, 5.2203144], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    fetch('{{ site.baseurl }}/assets/maps/area.geojson')
      .then(res => res.json())
      .then(data => {
        // Add the GeoJSON layer directly
        L.geoJSON(data, {
          pointToLayer: function(feature, latlng) {
            const emoji = feature.properties.icon || '📍';

            // Main emoji marker
            const iconMarker = L.marker(latlng, {
              icon: L.divIcon({
                className: 'map-icon',
                html: emoji,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
              })
            });

            // Add label marker below emoji if title exists
            if (feature.properties.title) {
              const labelMarker = L.marker(latlng, {
                icon: L.divIcon({
                  className: 'map-label',
                  html: `<div>${feature.properties.title}</div>`,
                  iconSize: [100, 20],
                  iconAnchor: [50, -10]  // Push label below the icon
                }),
                interactive: false // Non-clickable label
              });

              // Group the emoji icon and label together
              return L.layerGroup([iconMarker, labelMarker]);
            } else {
              return iconMarker;
            }
          },
          onEachFeature: function(feature, layer) {
            // Create a popup with title and description
            if (feature.properties) {
              let popupContent = '';
              
              // Add title if available
              if (feature.properties.title) {
                popupContent += `<strong>${feature.properties.title}</strong>`;
              }
              
              // Add description if available
              if (feature.properties.description) {
                // Add a line break if we already have a title
                if (popupContent) popupContent += '<br>';
                popupContent += feature.properties.description;
              }
              
              // Bind the popup if we have content
              if (popupContent) {
                layer.bindPopup(popupContent);
              }
              
              // Add label inside polygon
              if (feature.geometry.type === "Polygon" && feature.properties.title) {
                // Calculate center of polygon
                let bounds = layer.getBounds();
                let center = bounds.getCenter();
                
                // Create and add label
                let label = L.divIcon({
                  className: 'polygon-label',
                  html: `<div>${feature.properties.title}</div>`,
                  iconSize: [100, 40],
                  iconAnchor: [50, 20]
                });
                
                L.marker(center, {
                  icon: label,
                  interactive: false // Makes the label non-clickable
                }).addTo(map);
              }
            }
          },
          style: function(feature) {
            // Style for line and polygon features
            return {
              color: feature.properties.color || '#3388ff',
              weight: feature.properties.weight || 3,
              opacity: feature.properties.opacity || 1,
              fillColor: feature.properties.fillColor || '#3388ff',
              fillOpacity: feature.properties.fillOpacity || 0.2
            };
          }
        }).addTo(map);
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
  });
</script>

