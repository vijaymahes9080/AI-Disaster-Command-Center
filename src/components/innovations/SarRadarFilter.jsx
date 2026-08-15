import React, { useState } from 'react';
import { Satellite, Sliders, ShieldCheck } from 'lucide-react';

export default function SarRadarFilter() {
  const [filterDb, setFilterDb] = useState(18);

  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
            <Satellite className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 12: SAR RADAR NOISE FILTER</h4>
            <p className="text-[10px] text-slate-400">Sentinel-1 Cloud-Penetrating Speckle Filter</p>
          </div>
        </div>
        <span className="text-cyan-400 font-bold text-[10px]">FILTER: -{filterDb} dB</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-slate-300">
          <span>Atmospheric Speckle Suppression</span>
          <span className="text-emerald-400 font-bold">99.1% CLARITY</span>
        </div>
        <input 
          type="range"
          min="5"
          max="30"
          value={filterDb}
          onChange={(e) => setFilterDb(Number(e.target.value))}
          className="w-full accent-cyan-500 cursor-pointer"
        />
        <div className="p-2 bg-slate-900/80 rounded border border-slate-800 text-[10px] text-slate-300">
          STATUS: Cloud cover bypassed via 5.4 GHz C-band Synthetic Aperture Radar beam.
        </div>
      </div>
    </div>
  );
}
