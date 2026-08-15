import React from 'react';
import { Truck, Navigation, Anchor } from 'lucide-react';

export default function EvacVehicleMatcher() {
  const fleets = [
    { type: 'State Transport Buses', capacity: '50 persons/bus', dispatched: 14, status: 'HIGHWAY EVAC' },
    { type: 'Assault Rescue Boats', capacity: '8 persons/boat', dispatched: 22, status: 'FLOOD ZONE' },
    { type: 'IAF Mi-17 Helicopters', capacity: '24 persons/heli', dispatched: 3, status: 'AIRLIFT SECTOR 4' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 16: EVACUATION VEHICLE MATCHER</h4>
            <p className="text-[10px] text-slate-400">Multi-Modal Rescue Fleet Capacity Matcher</p>
          </div>
        </div>
        <span className="text-cyan-400 font-bold text-[10px]">39 VEHICLES DISPATCHED</span>
      </div>

      <div className="space-y-1.5">
        {fleets.map((f, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{f.type}</div>
              <div className="text-[10px] text-slate-400">{f.capacity}</div>
            </div>
            <div className="text-right">
              <div className="text-cyan-400 font-bold">{f.dispatched} DISPATCHED</div>
              <span className="px-1 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[8px] font-bold">{f.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
