import React from 'react';
import { Mountain, AlertTriangle } from 'lucide-react';

export default function LandslidePredictor() {
  const slopes = [
    { zone: 'Northern Ridge Sector 9', slopeAngle: '28° Slope', riskScore: 88, status: 'HIGH LANDSLIDE RISK' },
    { zone: 'Eastern Highway Pass', slopeAngle: '14° Slope', riskScore: 42, status: 'MODERATE STABILITY' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-amber-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-700">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 18: LANDSLIDE & SLOPE STABILITY PREDICTOR</h4>
            <p className="text-[10px] text-slate-400">Geo-AI Terrain Shear Stress Calculation</p>
          </div>
        </div>
        <span className="text-amber-400 font-bold text-[10px]">SLOPE MONITORING</span>
      </div>

      <div className="space-y-1.5">
        {slopes.map((s, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{s.zone}</div>
              <div className="text-[10px] text-slate-400">Gradient: {s.slopeAngle}</div>
            </div>
            <div className="text-right">
              <div className={s.riskScore > 70 ? "text-red-400 font-bold" : "text-amber-400 font-bold"}>{s.riskScore}% RISK</div>
              <span className={`px-1 rounded text-[8px] ${s.riskScore > 70 ? "bg-red-950 text-red-300" : "bg-amber-950 text-amber-300"}`}>{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
