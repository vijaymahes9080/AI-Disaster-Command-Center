import React from 'react';
import { Shield, Truck, Anchor, Navigation } from 'lucide-react';

export default function RescueForceMatrix() {
  const units = [
    { id: 'NDRF-B4', type: 'Rescue Battalion 4', personnel: 45, status: 'DISPATCHED TO SECTOR 4' },
    { id: 'BOAT-U9', type: 'Inflatable Boat Craft 9', personnel: 12, status: 'EN ROUTE RIVER BRIDGE' },
    { id: 'AIR-W2', type: 'IAF Air Wing Helicopter', personnel: 6, status: 'AIRLIFT STAGING ACTIVE' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-red-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-950 text-red-400 border border-red-700">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 11: NDRF RESCUE FORCE MATRIX</h4>
            <p className="text-[10px] text-slate-400">Military & NDRF Staging Logistics Router</p>
          </div>
        </div>
        <span className="text-red-400 font-bold text-[10px]">63 PERSONNEL ACTIVE</span>
      </div>

      <div className="space-y-1.5">
        {units.map(u => (
          <div key={u.id} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{u.type} ({u.id})</div>
              <div className="text-[10px] text-slate-400">Troop Strength: {u.personnel} personnel</div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 text-[9px] font-bold border border-red-800">
              {u.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
