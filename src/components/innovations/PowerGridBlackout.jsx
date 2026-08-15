import React from 'react';
import { Zap, AlertOctagon } from 'lucide-react';

export default function PowerGridBlackout() {
  const substations = [
    { name: 'Substation 4 (Sector 4 River)', load: '110 kV', status: 'TRIPPED / FLOODED' },
    { name: 'Substation 9 (North Grid)', load: '220 kV', status: 'OPERATIONAL' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-amber-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-700">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 20: POWER GRID BLACKOUT RISK MAPPER</h4>
            <p className="text-[10px] text-slate-400">Electrical Substation Failure Cascading Graph</p>
          </div>
        </div>
        <span className="text-amber-400 font-bold text-[10px]">BLACKOUT: SECTOR 4</span>
      </div>

      <div className="space-y-1.5">
        {substations.map((s, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{s.name}</div>
              <div className="text-[10px] text-slate-400">Capacity: {s.load}</div>
            </div>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
              s.status.includes('TRIPPED') ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
