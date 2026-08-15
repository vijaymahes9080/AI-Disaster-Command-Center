import React from 'react';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export default function SitrepReportGenerator() {
  const handleExport = () => {
    alert("Official Executive SITREP Document generated and downloaded!");
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 19: AUTOMATED SITREP GENERATOR</h4>
            <p className="text-[10px] text-slate-400">Official Executive Command Situation Briefing Engine</p>
          </div>
        </div>

        <button 
          onClick={handleExport}
          className="px-2.5 py-1 bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-700 rounded font-bold flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>EXPORT SITREP</span>
        </button>
      </div>

      <div className="p-2.5 bg-slate-900/90 rounded border border-slate-800 space-y-1 text-[11px] text-slate-300">
        <div className="font-bold text-cyan-400">EXECUTIVE BRIEFING SUMMARY:</div>
        <div>• <strong>Flood Severity:</strong> CRITICAL (Risk Score 91.2%)</div>
        <div>• <strong>Civilians Impacted:</strong> ~21,600 across 4 Sectors</div>
        <div>• <strong>Evacuation Route:</strong> Route N1 → Shelter Alpha Active (380 Occupied)</div>
      </div>
    </div>
  );
}
