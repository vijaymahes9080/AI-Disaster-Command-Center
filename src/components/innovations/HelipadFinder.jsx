import React from 'react';
import { Navigation, CheckCircle2 } from 'lucide-react';

export default function HelipadFinder() {
  const landingZones = [
    { name: 'LZ-1: City Stadium Complex', lat: 13.0700, lng: 80.2850, surface: 'Asphalt/Grass (Flat)', status: 'CLEAR FOR LANDING' },
    { name: 'LZ-2: North College Grounds', lat: 13.1020, lng: 80.2750, surface: 'Open Lawn (Elevated)', status: 'CLEAR FOR LANDING' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 22: HELIPAD LANDING ZONE FINDER</h4>
            <p className="text-[10px] text-slate-400">GIS Terrain Flatness & Air Evac Spotter</p>
          </div>
        </div>
        <span className="text-cyan-400 font-bold text-[10px]">2 LZ CLEAR</span>
      </div>

      <div className="space-y-1.5">
        {landingZones.map((lz, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{lz.name}</div>
              <div className="text-[10px] text-slate-400">Surface: {lz.surface}</div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] font-bold border border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {lz.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
