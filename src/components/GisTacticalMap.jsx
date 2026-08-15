import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Layers, ShieldAlert, Navigation, Home, AlertCircle, Eye, EyeOff, Radio } from 'lucide-react';

// Custom Marker Icons using Leaflet divIcon with HTML/CSS
const createCustomIcon = (type, severity = 'CRITICAL') => {
  let colorClass = 'bg-red-500 text-white border-red-300';
  let iconSymbol = '🚨';

  if (type === 'shelter') {
    colorClass = 'bg-emerald-500 text-white border-emerald-300';
    iconSymbol = '🏠';
  } else if (type === 'blocked') {
    colorClass = 'bg-amber-500 text-white border-amber-300';
    iconSymbol = '🚧';
  } else if (type === 'rescue') {
    colorClass = 'bg-purple-600 text-white border-purple-300';
    iconSymbol = '🚤';
  } else if (type === 'hospital') {
    colorClass = 'bg-blue-600 text-white border-blue-300';
    iconSymbol = '🏥';
  }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div class="w-8 h-8 rounded-full border-2 ${colorClass} flex items-center justify-center text-sm font-bold shadow-lg transform transition-transform hover:scale-125">${iconSymbol}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Map Recenter Helper Component
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center]);
  return null;
}

export default function GisTacticalMap({ incidents, evacuationRoute, selectedIncident, onSelectIncident }) {
  const center = [13.0850, 80.2700];

  // Map Layer Toggles
  const [layers, setLayers] = useState({
    satellite: false,
    heatmap: true,
    shelters: true,
    blockedRoads: true,
    evacRoute: true,
    radarOverlay: true
  });

  // Shelters database
  const shelters = [
    { id: 'S1', name: 'Shelter Alpha (St. Mary School)', coords: [13.1000, 80.2800], capacity: 450, occupied: 380 },
    { id: 'S2', name: 'Shelter Beta (City Stadium)', coords: [13.0700, 80.2850], capacity: 800, occupied: 220 },
    { id: 'S3', name: 'Shelter Gamma (North Community Center)', coords: [13.1080, 80.2650], capacity: 300, occupied: 110 }
  ];

  // Flood Risk Heatmap Polygons
  const floodZones = [
    {
      name: 'Critical Flood Zone A (River Sector)',
      color: '#ff0055',
      opacity: 0.45,
      coords: [
        [13.0800, 80.2600],
        [13.0920, 80.2580],
        [13.0950, 80.2720],
        [13.0840, 80.2780],
        [13.0780, 80.2680]
      ]
    },
    {
      name: 'High Risk Buffer Zone B',
      color: '#ff9900',
      opacity: 0.3,
      coords: [
        [13.0720, 80.2500],
        [13.0980, 80.2500],
        [13.1020, 80.2820],
        [13.0740, 80.2900]
      ]
    }
  ];

  // Tile URL: Dark CartoDB vs OpenStreetMap vs Esri Satellite
  const tileUrl = layers.satellite
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  const attribution = layers.satellite
    ? '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    : '&copy; <a href="https://carto.com/">CARTO</a>';

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      
      {/* Map Control Bar Overlay */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-2 bg-[#090d16]/90 backdrop-blur-md p-2 rounded-xl border border-cyan-500/30 text-xs font-mono">
        <span className="flex items-center gap-1 font-bold text-cyan-400 px-2 py-1 bg-cyan-950/60 rounded">
          <Layers className="w-3.5 h-3.5" /> GIS LAYERS:
        </span>

        <button
          onClick={() => setLayers(l => ({ ...l, satellite: !l.satellite }))}
          className={`px-2.5 py-1 rounded transition-colors ${layers.satellite ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          🛰 Satellite
        </button>

        <button
          onClick={() => setLayers(l => ({ ...l, heatmap: !l.heatmap }))}
          className={`px-2.5 py-1 rounded transition-colors ${layers.heatmap ? 'bg-red-600/80 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          🌊 Risk Heatmap
        </button>

        <button
          onClick={() => setLayers(l => ({ ...l, shelters: !l.shelters }))}
          className={`px-2.5 py-1 rounded transition-colors ${layers.shelters ? 'bg-emerald-600/80 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          🏠 Shelters ({shelters.length})
        </button>

        <button
          onClick={() => setLayers(l => ({ ...l, evacRoute: !l.evacRoute }))}
          className={`px-2.5 py-1 rounded transition-colors ${layers.evacRoute ? 'bg-cyan-500 text-slate-900 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          🛣 Safe Route
        </button>
      </div>

      {/* Map Legend Floating Box */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-[#090d16]/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-[11px] font-mono shadow-2xl hidden md:block">
        <div className="font-bold text-cyan-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse text-cyan-400" /> TACTICAL LEGEND
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-slate-300">Critical Flood / Rescue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500"></span>
            <span className="text-slate-300">Blocked / Flooded Road</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            <span className="text-slate-300">Evacuation Shelter</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-1 rounded bg-cyan-400"></span>
            <span className="text-slate-300">AI Optimized Safe Route</span>
          </div>
        </div>
      </div>

      {/* Actual React-Leaflet Canvas */}
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[480px] z-10"
      >
        <ChangeView center={selectedIncident ? selectedIncident.coordinates : center} />
        
        <TileLayer
          attribution={attribution}
          url={tileUrl}
        />

        {/* Flood Risk Heatmap Polygons */}
        {layers.heatmap && floodZones.map((zone, idx) => (
          <Polygon
            key={idx}
            positions={zone.coords}
            pathOptions={{
              color: zone.color,
              fillColor: zone.color,
              fillOpacity: zone.opacity,
              weight: 2,
              dashArray: '5, 5'
            }}
          >
            <Popup>
              <div className="text-xs font-mono">
                <div className="font-bold text-red-400">{zone.name}</div>
                <div className="text-slate-300 mt-1">Inundation Level: High</div>
                <div className="text-slate-400">Estimated Depth: 1.2m - 1.8m</div>
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Dynamic Incidents Markers */}
        {incidents && incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={inc.coordinates}
            icon={createCustomIcon(inc.category.toLowerCase(), inc.status)}
            eventHandlers={{
              click: () => onSelectIncident && onSelectIncident(inc)
            }}
          >
            <Popup>
              <div className="p-1 min-w-[200px] text-xs font-mono">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
                  <span className="font-bold text-red-400 uppercase">{inc.category}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950 text-red-300 border border-red-800">
                    URGENCY: {inc.urgency}
                  </span>
                </div>
                <div className="font-semibold text-slate-100 mb-1">{inc.title}</div>
                <p className="text-slate-300 text-[11px] mb-2">{inc.text}</p>
                <div className="flex flex-wrap gap-1">
                  {inc.needs && inc.needs.map((need, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-cyan-950 text-cyan-300 rounded text-[9px] border border-cyan-800">
                      {need}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Shelters Markers */}
        {layers.shelters && shelters.map((sh) => (
          <Marker
            key={sh.id}
            position={sh.coords}
            icon={createCustomIcon('shelter')}
          >
            <Popup>
              <div className="p-1 text-xs font-mono">
                <div className="font-bold text-emerald-400">{sh.name}</div>
                <div className="text-slate-300 mt-1">Capacity: {sh.occupied} / {sh.capacity} persons</div>
                <div className="w-full bg-slate-800 h-2 rounded mt-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full" 
                    style={{ width: `${(sh.occupied / sh.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* AI Evacuation Route Polyline Overlay */}
        {layers.evacRoute && evacuationRoute && evacuationRoute.waypoints && (
          <Polyline
            positions={evacuationRoute.waypoints}
            pathOptions={{
              color: '#00f2fe',
              weight: 5,
              opacity: 0.9,
              dashArray: '10, 5'
            }}
          >
            <Popup>
              <div className="p-1 text-xs font-mono">
                <div className="font-bold text-cyan-400">AI OPTIMIZED EVACUATION ROUTE</div>
                <div className="text-slate-200 mt-1">Distance: {evacuationRoute.total_distance_km} km</div>
                <div className="text-slate-300">Est. Time: {evacuationRoute.estimated_travel_time_min} mins</div>
                <div className="text-emerald-400 font-bold mt-1">Status: {evacuationRoute.safety_rating}</div>
              </div>
            </Popup>
          </Polyline>
        )}

      </MapContainer>
    </div>
  );
}
