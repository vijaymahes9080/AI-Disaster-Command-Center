import React from 'react';
import { Cpu, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SystemTelemetryMonitor() {
  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 28: COMMAND SYSTEM TELEMETRY MONITOR</h4>
            <p className="text-[10px] text-slate-400">Node Latency & Core Server Operations Monitor</p>
          </div>
        </div>
        <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> ALL SYSTEMS GO
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-[10px]">
        <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-slate-400">API LATENCY</div>
          <div className="text-cyan-400 font-bold text-xs">14 ms</div>
        </div>
        <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-slate-400">CPU LOAD</div>
          <div className="text-emerald-400 font-bold text-xs">18.4%</div>
        </div>
        <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-slate-400">RAM USED</div>
          <div className="text-amber-400 font-bold text-xs">412 MB</div>
        </div>
        <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-slate-400">UPTIME</div>
          <div className="text-purple-400 font-bold text-xs">99.99%</div>
        </div>
      </div>
    </div>
  );
}
