import React from 'react';
import { Stethoscope, HeartPulse, Droplet } from 'lucide-react';

export default function MedicalInventoryTracker() {
  const supplies = [
    { item: 'O-Negative Blood Reserves', qty: '42 Units', status: 'CRITICAL LOW', color: 'text-red-400' },
    { item: 'Trauma & Burn Surgical Kits', qty: '120 Kits', status: 'ADEQUATE', color: 'text-emerald-400' },
    { item: 'Emergency Ventilators', qty: '18 Units', status: 'HIGH DEMAND', color: 'text-amber-400' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-blue-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-700">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 15: MEDICAL & BLOOD BANK NETWORK</h4>
            <p className="text-[10px] text-slate-400">Emergency Hospital Supply Telemetry</p>
          </div>
        </div>
        <span className="text-blue-400 font-bold text-[10px]">3 HOSPITALS LINKED</span>
      </div>

      <div className="space-y-1.5">
        {supplies.map((s, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-200">{s.item}</span>
            <div className="flex items-center gap-3">
              <span className={`font-bold ${s.color}`}>{s.qty}</span>
              <span className="px-1 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300">{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
