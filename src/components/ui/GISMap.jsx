import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issues in Vite/Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// A custom icon for Farmer/Farm locations (Green)
export const farmIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// A custom icon for Customer locations (Blue)
export const customerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically update map view
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const GISMap = ({ 
  center = [20.5937, 78.9629], // Default India
  zoom = 5,
  height = '400px',
  markers = [], // Array of { position: [lat, lng], popup: string/node, type: 'farm'|'customer'|'default' }
  circles = [], // Array of { center: [lat, lng], radius: number, color: string }
  routes = [] // Array of { positions: [[lat,lng], ...], color: string }
}) => {
  return (
    <div style={{ height, width: '100%', borderRadius: '0.75rem', overflow: 'hidden', zIndex: 0 }} className="border border-gray-200 shadow-sm relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <ChangeView center={center} zoom={zoom} />
        
        {/* OpenStreetMap Tiles - Free and Open Source */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render Circles (e.g. delivery zones or farm reach) */}
        {circles.map((circle, idx) => (
          <Circle 
            key={`circle-${idx}`}
            center={circle.center}
            pathOptions={{ color: circle.color || 'green', fillColor: circle.color || 'green', fillOpacity: 0.2 }}
            radius={circle.radius}
          />
        ))}

        {/* Render Routes (e.g. delivery driver path) */}
        {routes.map((route, idx) => (
          <Polyline 
            key={`route-${idx}`}
            positions={route.positions}
            pathOptions={{ color: route.color || 'blue', weight: 3, dashArray: route.dashed ? '5, 10' : undefined }}
          />
        ))}

        {/* Render Markers */}
        {markers.map((marker, idx) => {
          let mIcon = DefaultIcon;
          if (marker.type === 'farm') mIcon = farmIcon;
          if (marker.type === 'customer') mIcon = customerIcon;
          
          return (
            <Marker key={`marker-${idx}`} position={marker.position} icon={mIcon}>
              {marker.popup && (
                <Popup>
                  {marker.popup}
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default GISMap;
