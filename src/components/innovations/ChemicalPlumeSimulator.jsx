import React from 'react';
import { Wind, AlertTriangle } from 'lucide-react';

export default function ChemicalPlumeSimulator() {
  return (
    <div className="glass-panel p-4 rounded-xl border border-purple-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-700">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 21: TOXIC CHEMICAL PLUME DISPERSION MODEL</h4>
            <p className="text-[10px] text-slate-400">Gaussian Plume Atmospheric Gas Drift Simulator</p>
          </div>
        </div>
        <span className="text-purple-400 font-bold text-[10px]">HAZMAT ACTIVE</span>
      </div>

      <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 space-y-1 text-[11px] text-slate-300">
        <div className="font-bold text-purple-400">PLUME DISPERSION PARAMS:</div>
        <div>• <strong>Agent:</strong> Ammonia (NH3) Industrial Release</div>
        <div>• <strong>Drift Vector:</strong> North-East @ 18 km/h</div>
        <div>• <strong>Hazard Zone Radius:</strong> 850m Downwind Evacuation Zone</div>
      </div>
    </div>
  );
}
