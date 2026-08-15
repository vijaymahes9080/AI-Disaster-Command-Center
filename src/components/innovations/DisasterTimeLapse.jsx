import React, { useState } from 'react';
import { Play, Pause, Clock, Film } from 'lucide-react';

export default function DisasterTimeLapse() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hourIndex, setHourIndex] = useState(2);

  const timeline = [
    { label: "T-12h (Initial Rain)", risk: "LOW (25%)", area: "12 km²" },
    { label: "T-06h (River Rise)", risk: "MODERATE (55%)", area: "28 km²" },
    { label: "T-00h (CURRENT)", risk: "CRITICAL (91%)", area: "42.8 km²" },
    { label: "T+06h (Peak Surge)", risk: "EXTREME (98%)", area: "58 km²" },
    { label: "T+12h (Receding)", risk: "HIGH (72%)", area: "35 km²" }
  ];

  const current = timeline[hourIndex];

  return (
    <div className="glass-panel p-4 rounded-xl border border-purple-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-700">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 10: 24-HOUR GIS TIME-LAPSE PLAYER</h4>
            <p className="text-[10px] text-slate-400">Temporal Flood Spreading Animation</p>
          </div>
        </div>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-700 rounded font-bold flex items-center gap-1"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>
      </div>

      <div className="space-y-2">
        <input 
          type="range"
          min="0"
          max="4"
          value={hourIndex}
          onChange={(e) => setHourIndex(Number(e.target.value))}
          className="w-full accent-purple-500 cursor-pointer"
        />

        <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 flex justify-between items-center text-[11px]">
          <span className="font-bold text-purple-400">{current.label}</span>
          <span className="text-red-400 font-bold">RISK: {current.risk}</span>
          <span className="text-cyan-400">COVERAGE: {current.area}</span>
        </div>
      </div>
    </div>
  );
}
