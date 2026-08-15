import React from 'react';
import { GitFork, CheckCircle2, ChevronRight } from 'lucide-react';

export default function XaiTreeVisualizer() {
  const treeNodes = [
    { step: 1, condition: "Rainfall Rate > 75.0 mm/h", pass: true, label: "TRUE (85.4 mm/h)" },
    { step: 2, condition: "River Level Surge > 3.5m", pass: true, label: "TRUE (+4.2m)" },
    { step: 3, condition: "Terrain Elevation < 15.0m", pass: true, label: "TRUE (12.0m)" },
    { step: 4, condition: "Classification Output", pass: true, label: "CRITICAL RISK (91.2%)" }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 09: XAI DECISION TREE INSPECTOR</h4>
            <p className="text-[10px] text-slate-400">Auditable ML Decision Logic Trace</p>
          </div>
        </div>
        <span className="text-cyan-400 text-[10px] font-bold">4-NODE TRAVERSAL</span>
      </div>

      <div className="space-y-1.5">
        {treeNodes.map((n) => (
          <div key={n.step} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-[9px]">
                {n.step}
              </span>
              <span className="text-slate-300">{n.condition}</span>
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {n.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
