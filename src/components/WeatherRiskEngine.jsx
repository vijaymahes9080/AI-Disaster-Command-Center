import React from 'react';
import { CloudRain, Waves, Wind, Thermometer, AlertCircle, Info, ShieldCheck, TrendingUp } from 'lucide-react';

export default function WeatherRiskEngine({ sensorData, riskData }) {
  if (!sensorData || !riskData) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-red-500 stroke-red-500';
    if (score >= 60) return 'text-amber-500 stroke-amber-500';
    if (score >= 35) return 'text-yellow-500 stroke-yellow-500';
    return 'text-emerald-500 stroke-emerald-500';
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
      
      {/* Module Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
            <CloudRain className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              MODULE 2: WEATHER INTELLIGENCE & AI RISK ENGINE
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Real-time Telemetry & ML Risk Prediction
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-800">
          CONFIDENCE: {(riskData.confidence * 100).toFixed(0)}%
        </span>
      </div>

      {/* Grid: Left Weather Gauges | Right AI Risk Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
        {/* Weather Telemetry Tiles */}
        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-[10px] uppercase">Rainfall Rate</div>
              <div className="text-cyan-400 font-bold text-lg mt-0.5">{sensorData.rainfall_mm_hr} <span className="text-xs">mm/h</span></div>
            </div>
            <CloudRain className="w-5 h-5 text-cyan-400 opacity-80" />
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-[10px] uppercase">River Level Surge</div>
              <div className="text-red-400 font-bold text-lg mt-0.5">+{sensorData.river_level_m} <span className="text-xs">m</span></div>
            </div>
            <Waves className="w-5 h-5 text-red-400 opacity-80" />
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-[10px] uppercase">Soil Saturation</div>
              <div className="text-amber-400 font-bold text-lg mt-0.5">{sensorData.soil_moisture_pct}%</div>
            </div>
            <Thermometer className="w-5 h-5 text-amber-400 opacity-80" />
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-[10px] uppercase">Time to Surge Peak</div>
              <div className="text-purple-400 font-bold text-lg mt-0.5">{riskData.estimated_time_to_peak_hr} <span className="text-xs">hrs</span></div>
            </div>
            <TrendingUp className="w-5 h-5 text-purple-400 opacity-80" />
          </div>

        </div>

        {/* AI Risk Score Circle & Summary */}
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className="flex items-center gap-4">
            {/* SVG Semi Gauge */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={getScoreColor(riskData.risk_score)}
                  strokeDasharray={`${riskData.risk_score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center font-mono">
                <span className="text-2xl font-black text-slate-100">{riskData.risk_score}%</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">RISK SCORE</span>
              </div>
            </div>

            {/* Severity Status Box */}
            <div className="space-y-1 font-mono">
              <div className="text-[10px] text-slate-400 uppercase">AI Severity Classification</div>
              <div className={`text-base font-extrabold tracking-wider ${
                riskData.severity === 'CRITICAL' ? 'text-red-500' : 'text-amber-400'
              }`}>
                ⚠️ {riskData.severity}
              </div>
              <div className="text-[11px] text-slate-300">
                Est. Civilians Impacted: <span className="text-cyan-400 font-bold">{riskData.affected_population.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Explainable AI (XAI) Feature Importance Waterfall */}
      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 font-mono text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 font-semibold flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-cyan-400" /> EXPLAINABLE AI (XAI) FEATURE CONTRIBUTION
          </span>
          <span className="text-[10px] text-slate-500">Shapley Value Attribution</span>
        </div>

        <div className="space-y-2">
          {riskData.xai_breakdown && riskData.xai_breakdown.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">{item.feature}</span>
                <span className="text-cyan-400 font-bold">{item.contribution_pct}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    idx === 0 ? 'bg-cyan-400' : (idx === 1 ? 'bg-red-400' : 'bg-amber-400')
                  }`}
                  style={{ width: `${item.contribution_pct}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
