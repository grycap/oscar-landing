(() => {
  const mapContainer = document.getElementById('oscar-map');
  if (!mapContainer) return;

  const feedbackEl = document.getElementById('oscar-map-feedback');
  const fallbackEl = document.getElementById('oscar-map-fallback');
  const filterEl = document.getElementById('oscar-map-filter');
  const DATA_URL = '/data/oscar-clusters.json';
  const geocodeCache = new Map();
  let applyMapFilter = null;

  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'active') return '#28a745';
    if (s.includes('decom')) return '#6c757d';
    if (s === 'pilot') return '#ffc107';
    return '#0AA8A7';
  };

  const markerIcon = (status) =>
    L.divIcon({
      className: 'oscar-marker',
      iconSize: [18, 18],
      iconAnchor: [9, 18],
      popupAnchor: [0, -18],
      html: `<span class="oscar-marker-dot" style="background:${getStatusColor(status)}"></span>`
    });

  const setFeedback = (msg) => {
    if (feedbackEl) feedbackEl.textContent = msg || '';
  };

  const renderFallback = (clusters) => {
    if (!fallbackEl || !Array.isArray(clusters)) return;
    fallbackEl.innerHTML = clusters
      .map(
        (c) => `<div class="col-md-4 col-sm-6 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-2">${c.name || 'Unknown cluster'}</h5>
              ${c.project_icon ? `<div class="mb-2"><img class="oscar-project-icon" src="${c.project_icon}" alt="Project icon for ${c.name || 'cluster'}"></div>` : ''}
              <p class="card-text mb-1"><strong>City:</strong> ${c.city || 'N/A'}</p>
              ${c.provider ? `<p class="card-text mb-1"><strong>Provider:</strong> ${c.provider}</p>` : ''}
              ${c.capacity ? `<p class="card-text mb-1"><strong>Capacity:</strong> ${c.capacity}</p>` : ''}
              ${c.status ? `<p class="card-text mb-0"><strong>Status:</strong> ${c.status}</p>` : ''}
              ${c.project ? `<p class="card-text mb-0"><strong>Project:</strong> <a href="${c.project}" target="_blank" rel="noopener noreferrer">${c.project}</a></p>` : ''}
            </div>
          </div>
        </div>`
      )
      .join('');
  };

  const geocodeCity = async (query) => {
    if (geocodeCache.has(query)) return geocodeCache.get(query);
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', '1');
    url.searchParams.set('q', query);
    const res = await fetch(url.toString(), {
      headers: {
        'Accept-Language': 'en',
      },
    });
    if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) throw new Error('No geocoding results');
    const { lat, lon } = data[0];
    const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
    geocodeCache.set(query, coords);
    return coords;
  };

  const init = async () => {
    setFeedback('Loading map data...');
    let clusters = [];
    try {
      const res = await fetch(DATA_URL);
      if (!res.ok) throw new Error(`Unable to load cluster data (${res.status})`);
      clusters = await res.json();
    } catch (err) {
      console.error(err);
      setFeedback('Could not load cluster data.');
      return;
    }

    if (!Array.isArray(clusters) || !clusters.length) {
      setFeedback('No clusters available yet.');
      return;
    }

    // Show initial list
    renderFallback(clusters);

    // Prepare map
    try {
      const map = L.map(mapContainer).setView([20, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const markers = L.layerGroup().addTo(map);
      const geocodePromises = [];
      for (const cluster of clusters) {
        if (!cluster.city) continue;
        geocodePromises.push(
          geocodeCity(cluster.city)
            .then((coords) => {
              cluster.coords = coords;
            })
            .catch((geoErr) => {
              console.warn(`Geocoding failed for ${cluster.city}:`, geoErr);
            })
        );
      }

      await Promise.all(geocodePromises);

      const renderMarkers = (filtered) => {
        markers.clearLayers();
        const bounds = [];
        for (const cluster of filtered) {
          if (!cluster.coords) continue;
          const marker = L.marker([cluster.coords.lat, cluster.coords.lng], {
            icon: markerIcon(cluster.status),
          }).addTo(markers);
          const popup = `
            <strong>${cluster.name || 'OSCAR cluster'}</strong><br>
            ${cluster.city}<br>
            ${cluster.provider ? `${cluster.provider}<br>` : ''}
            ${cluster.capacity ? `Capacity: ${cluster.capacity}<br>` : ''}
            ${cluster.status ? `Status: ${cluster.status}` : ''}
            ${cluster.project ? `<br><strong>Project:</strong> <a href="${cluster.project}" target="_blank" rel="noopener noreferrer">${cluster.project}</a>` : ''}
          `;
          marker.bindPopup(popup);
          bounds.push([cluster.coords.lat, cluster.coords.lng]);
        }
        if (bounds.length) {
          map.fitBounds(bounds, { padding: [20, 20] });
          setFeedback('');
        } else {
          setFeedback('Could not place any markers with the provided data.');
        }
      };

      applyMapFilter = (filtered) => renderMarkers(filtered);
    } catch (err) {
      console.error(err);
      setFeedback('Map could not be initialized.');
    }

    const applyFilter = (filterValue) => {
      const filtered =
        filterValue === 'active'
          ? clusters.filter((c) => (c.status || '').toLowerCase() === 'active')
          : clusters;
      renderFallback(filtered);
      if (applyMapFilter) {
        applyMapFilter(filtered);
      }
    };

    applyFilter(filterEl ? filterEl.value : 'all');

    if (filterEl) {
      filterEl.addEventListener('change', (e) => {
        applyFilter(e.target.value);
      });
    }
  };

  init();
})();
