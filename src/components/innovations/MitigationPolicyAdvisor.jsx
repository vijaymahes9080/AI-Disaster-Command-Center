import React from 'react';
import { Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function MitigationPolicyAdvisor() {
  const policies = [
    { title: 'Sector 4 Riverbank Retaining Wall', rec: 'Construct 2.5m reinforced concrete embankment wall to mitigate 100-year flood events.', priority: 'HIGH' },
    { title: 'Substation Drainage Redundancy', rec: 'Elevate electrical transformers by +1.8m above ground level.', priority: 'MEDIUM' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-purple-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 27: AI DISASTER MITIGATION POLICY ADVISOR</h4>
            <p className="text-[10px] text-slate-400">Long-Term Infrastructure Resiliency Advisor</p>
          </div>
        </div>
        <span className="text-purple-400 font-bold text-[10px]">POLICY ADVISOR</span>
      </div>

      <div className="space-y-1.5">
        {policies.map((p, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between font-bold text-purple-300">
              <span>{p.title}</span>
              <span className="text-amber-400 text-[9px]">{p.priority} PRIORITY</span>
            </div>
            <div className="text-[10px] text-slate-300">{p.rec}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
