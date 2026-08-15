import React, { useState } from 'react';
import { Flame, Wind, AlertTriangle } from 'lucide-react';

export default function FireSpreadSimulator() {
  const [windSpeed, setWindSpeed] = useState(28);

  return (
    <div className="glass-panel p-4 rounded-xl border border-red-500/30 flex flex-col gap-3 font-mono text-xs shadow-glow-red">
      <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-950 text-red-400 border border-red-700">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 14: DYNAMIC FIRE SPREAD SIMULATOR</h4>
            <p className="text-[10px] text-slate-400">Cellular Automata Wind Vector Propagation</p>
          </div>
        </div>
        <span className="text-red-400 font-bold text-[10px]">WIND: {windSpeed} KM/H NE</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-slate-300">
          <span>Wind Velocity Factor</span>
          <span className="text-amber-400 font-bold">FRONT SPREAD: 4.2 KM/H</span>
        </div>
        <input 
          type="range"
          min="10"
          max="60"
          value={windSpeed}
          onChange={(e) => setWindSpeed(Number(e.target.value))}
          className="w-full accent-red-500 cursor-pointer"
        />
        <div className="p-2 bg-slate-900/80 rounded border border-slate-800 text-[10px] text-slate-200">
          🔥 FIRE PERIMETER PREDICTION: Moving towards North Market Square. Recommended buffer zone: 1.5 km.
        </div>
      </div>
    </div>
  );
}
