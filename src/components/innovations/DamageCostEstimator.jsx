import React from 'react';
import { DollarSign, Landmark, Building2, ShieldAlert } from 'lucide-react';

export default function DamageCostEstimator() {
  const damageItems = [
    { sector: 'Residential Structures', lossUsd: '$5.4M', lossInr: '₹45 Crores', status: 'CRITICAL' },
    { sector: 'Bridges & Highways', lossUsd: '$4.2M', lossInr: '₹35 Crores', status: 'HIGH' },
    { sector: 'Electrical Power Grid', lossUsd: '$2.8M', lossInr: '₹23 Crores', status: 'MEDIUM' },
    { sector: 'Agricultural Crops', lossUsd: '$1.8M', lossInr: '₹15 Crores', status: 'MEDIUM' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 07: DISASTER FINANCIAL LOSS ESTIMATOR</h4>
            <p className="text-[10px] text-slate-400">AI Infrastructure Damage Valuation Model</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-emerald-400 font-bold text-sm">$14.2M USD</div>
          <div className="text-[9px] text-slate-400">₹118 Crores Est. Total</div>
        </div>
      </div>

      <div className="space-y-1.5">
        {damageItems.map((item, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-200">{item.sector}</span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">{item.lossUsd}</span>
              <span className="text-slate-400 text-[10px]">({item.lossInr})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
