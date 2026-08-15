import React from 'react';
import { Home, TrendingUp, AlertTriangle } from 'lucide-react';

export default function ShelterCapacityPredictor() {
  const forecast = [
    { hour: '10:00 AM', occupancy: 320, pct: 71 },
    { hour: '12:00 PM', occupancy: 380, pct: 84 },
    { hour: '02:00 PM', occupancy: 430, pct: 95 },
    { hour: '04:00 PM (Predicted)', occupancy: 450, pct: 100 }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 06: SHELTER CAPACITY FORECASTER</h4>
            <p className="text-[10px] text-slate-400">LSTM Time-Series Evacuee Inflow Prediction</p>
          </div>
        </div>
        <span className="text-amber-400 text-[10px] font-bold">FULL CAP: T+4 HOURS</span>
      </div>

      <div className="space-y-1.5">
        {forecast.map((f, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-300">{f.hour}</span>
              <span className={f.pct === 100 ? "text-red-400 font-bold" : "text-cyan-400"}>{f.occupancy} / 450 ({f.pct}%)</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded overflow-hidden border border-slate-800">
              <div 
                className={`h-full ${f.pct === 100 ? 'bg-red-500 animate-pulse' : 'bg-cyan-400'}`} 
                style={{ width: `${f.pct}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
