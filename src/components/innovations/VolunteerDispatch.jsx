import React from 'react';
import { Users, CheckCircle2 } from 'lucide-react';

export default function VolunteerDispatch() {
  const volunteers = [
    { name: 'Arun V. (First Aid Cert)', task: 'Assigned to Shelter Alpha Clinic', skill: 'Medical Paramedic' },
    { name: 'Kavitha M. (Heavy Vehicle Driver)', task: 'Assigned to Ration Transport Truck 4', skill: 'Logistics' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 23: VOLUNTEER WORKFORCE ROUTER</h4>
            <p className="text-[10px] text-slate-400">Skill-Based Civilian Task Dispatch Queue</p>
          </div>
        </div>
        <span className="text-emerald-400 font-bold text-[10px]">142 VOLUNTEERS ACTIVE</span>
      </div>

      <div className="space-y-1.5">
        {volunteers.map((v, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{v.name}</div>
              <div className="text-[10px] text-slate-400">Assignment: {v.task}</div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] font-bold border border-emerald-800">
              {v.skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
