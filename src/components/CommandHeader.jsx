import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Activity, Satellite, Radio, AlertTriangle, 
  Clock, Zap, Sliders, Layers, Users, RefreshCw
} from 'lucide-react';

export default function CommandHeader({ 
  riskData, 
  activeIncidentsCount, 
  simMode, 
  setSimMode, 
  onReset 
}) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/50 pulse-red';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50 pulse-amber';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
    }
  };

  return (
    <header className="bg-[#0e1424]/90 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 z-50 px-4 py-2.5">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        
        {/* Left: Branding & Core Operational Status */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-wider text-slate-100 uppercase font-mono">
                AI DISASTER COMMAND CENTER
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                v1.0 REAL-TIME
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span>GIS Multi-Source Data Intelligence Platform</span>
              <span className="text-cyan-500/50">•</span>
              <span className="text-cyan-400">LAT: 13.0827° N, LNG: 80.2707° E</span>
            </p>
          </div>
        </div>

        {/* Center: Live Emergency Alert Ticker */}
        <div className="flex-1 max-w-xl mx-4 hidden xl:block">
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-3 text-xs overflow-hidden">
            <span className="flex items-center gap-1.5 font-semibold text-red-400 shrink-0 uppercase font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> GOVT ALERT:
            </span>
            <div className="whitespace-nowrap overflow-hidden text-slate-300 font-mono text-[11px] animate-pulse">
              ⚠️ FLASH FLOOD WARNING: Sector 4 River Level Surge +4.2m | Immediate evacuation route N1 → Shelter Alpha active
            </div>
          </div>
        </div>

        {/* Right: Operational Status Badges & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Risk Level Badge */}
          {riskData && (
            <div className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold flex items-center gap-2 ${getSeverityBadge(riskData.severity)}`}>
              <Activity className="w-4 h-4" />
              <span>RISK: {riskData.risk_score}% ({riskData.severity})</span>
            </div>
          )}

          {/* Incidents Counter */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">ACTIVE INCIDENTS:</span>
            <span className="text-amber-400 font-bold">{activeIncidentsCount}</span>
          </div>

          {/* Digital Clock */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-cyan-900/50 text-cyan-400 font-mono text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{time}</span>
          </div>

          {/* Simulation Mode Toggle Button */}
          <button
            onClick={() => setSimMode(!simMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 border ${
              simMode 
                ? 'bg-purple-950/80 text-purple-300 border-purple-500 shadow-glow-cyan animate-pulse' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-cyan-500'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{simMode ? 'DIGITAL TWIN SIM (ON)' : 'SIMULATION MODE'}</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onReset}
            title="Reset to default telemetry"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}
