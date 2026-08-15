import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';

export default function HistoricalAnalytics() {
  const history = [
    { year: '2015 Severe Flood', rainfall: '1020 mm', casualties: 'Minimized via Evacuation', score: '94% Damage' },
    { year: '2021 Heavy Monsoon', rainfall: '680 mm', casualties: 'Zero Casualties in Zone A', score: '52% Damage' },
    { year: '2026 CURRENT DISASTER', rainfall: '85.4 mm/h', casualties: 'AI Predictive Early Evac Active', score: '82% Risk' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-blue-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-700">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 24: HISTORICAL TREND ANALYTICS</h4>
            <p className="text-[10px] text-slate-400">Multi-Decade Disaster Comparative Baseline</p>
          </div>
        </div>
        <span className="text-blue-400 font-bold text-[10px]">3-EVENT COMPARISON</span>
      </div>

      <div className="space-y-1.5">
        {history.map((h, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{h.year}</div>
              <div className="text-[10px] text-slate-400">Rainfall: {h.rainfall} | {h.casualties}</div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[9px] font-bold border border-blue-800">
              {h.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
