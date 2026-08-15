import React from 'react';
import { Home, Droplet, ShieldCheck } from 'lucide-react';

export default function ReliefCampAllocator() {
  const camps = [
    { name: 'Shelter Alpha Camp', evacuees: 380, toilets: 16, waterKits: 400, status: 'STABLE' },
    { name: 'Shelter Beta Camp', evacuees: 220, toilets: 10, waterKits: 250, status: 'STABLE' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 17: RELIEF CAMP SANITATION ALLOCATOR</h4>
            <p className="text-[10px] text-slate-400">Humanitarian Hygiene & Water Purification Balance</p>
          </div>
        </div>
        <span className="text-emerald-400 font-bold text-[10px]">600 EVACUEES SERVED</span>
      </div>

      <div className="space-y-1.5">
        {camps.map((c, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{c.name} ({c.evacuees} evacuees)</div>
              <div className="text-[10px] text-slate-400">Sanitation: {c.toilets} Toilets | {c.waterKits} Purification Packs</div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] font-bold border border-emerald-800">
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
