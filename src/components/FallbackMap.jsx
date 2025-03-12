// FallbackMap.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function FallbackMap({ setCoords, error }) {
  const [city, setCity] = useState('');
  const [coordsFallback, setCoordsFallback] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setCoordsFallback({ lat, lng: lon });
        
        setCoords({ lat, lon });
      }
    } catch (err) {
      console.error("Error searching for city:", err);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <p>{error}</p>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter your city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '0.5rem', width: '200px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Buscar
        </button>
      </form>

      {coordsFallback && (
        <div style={{ marginTop: '1rem' }}>
          <MapContainer
            center={[coordsFallback.lat, coordsFallback.lng]}
            zoom={13}
            style={{ height: '400px', width: '100%', maxWidth: '600px', margin: '0 auto' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[coordsFallback.lat, coordsFallback.lng]} />
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default FallbackMap;
