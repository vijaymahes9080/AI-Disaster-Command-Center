import React, { useState } from 'react';
import { Radio, Crosshair, BatteryCharging, Shield, Eye, Flame } from 'lucide-react';

export default function DroneScanner() {
  const [thermalMode, setThermalMode] = useState(true);
  const [scannedHotspots, setScannedHotspots] = useState([
    { id: 'DRONE-H1', lat: 13.0890, lng: 80.2620, temp: '38.4°C (Human Signature)', status: 'RESCUE NEEDED' },
    { id: 'DRONE-H2', lat: 13.0830, lng: 80.2710, temp: '42.1°C (Substation Electrical Fire)', status: 'HAZARD' }
  ]);

  return (
    <div className="glass-panel p-4 rounded-xl border border-red-500/30 flex flex-col gap-3 font-mono text-xs shadow-glow-red">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-950 text-red-400 border border-red-700">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 02: DRONE THERMAL RECONNAISSANCE</h4>
            <p className="text-[10px] text-slate-400">Autonomous UAV Survivor Heat & Hazard Scanner</p>
          </div>
        </div>

        <button
          onClick={() => setThermalMode(!thermalMode)}
          className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
            thermalMode ? 'bg-red-950 text-red-300 border-red-600' : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {thermalMode ? '🔥 INFRARED THERMAL' : '📷 OPTICAL HD'}
        </button>
      </div>

      {/* UAV Display Canvas Viewfinder */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-950 border border-red-900/50 flex items-center justify-center">
        
        {/* Synthetic Thermal Noise background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            thermalMode ? 'bg-gradient-to-tr from-purple-950 via-red-950 to-amber-950 opacity-90' : 'bg-slate-900'
          }`}
        ></div>

        {/* Viewfinder Crosshair Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 border border-cyan-400/40 rounded-full flex items-center justify-center">
            <Crosshair className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Floating Drone Metrics Overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-2 text-[9px] bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
          <span className="text-cyan-400">ALT: 120M</span>
          <span>•</span>
          <span className="text-emerald-400">BATT: 84%</span>
          <span>•</span>
          <span className="text-amber-400">GPS: LOCK (12 SAT)</span>
        </div>

        {/* Thermal Hotspot Markers */}
        {scannedHotspots.map(hs => (
          <div 
            key={hs.id} 
            className="absolute p-1 rounded bg-red-600/80 text-white text-[9px] font-bold border border-red-300 animate-pulse shadow-lg"
            style={{
              top: hs.id === 'DRONE-H1' ? '25%' : '65%',
              left: hs.id === 'DRONE-H1' ? '60%' : '30%'
            }}
          >
            🔥 {hs.temp}
          </div>
        ))}
      </div>

      {/* Scanned Hotspot Log */}
      <div className="space-y-1">
        <span className="text-[10px] text-slate-400 uppercase font-semibold">UAV SCAN TARGET LOGS</span>
        <div className="space-y-1">
          {scannedHotspots.map(hs => (
            <div key={hs.id} className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between text-[11px]">
              <div>
                <span className="font-bold text-red-400">{hs.id}: </span>
                <span className="text-slate-300">{hs.temp}</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 text-[9px] border border-red-800">
                {hs.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
