import React from 'react';
import { Package, Truck, Anchor, Utensils, Droplets, Stethoscope, Home, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ResourceOptimizer({ resourceData }) {
  if (!resourceData) return null;

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col gap-3 font-mono text-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
            <Package className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              MODULE 8: RESOURCE ALLOCATION MATRIX
            </h3>
            <p className="text-xs text-slate-400">
              AI Priority Dispatch (Risk × Population × Accessibility)
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 text-[10px] font-bold border border-red-800">
          {resourceData.priority_level}
        </span>
      </div>

      {/* Resource Allocation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Ambulances Needed</div>
            <div className="text-red-400 font-bold text-xl mt-0.5">{resourceData.ambulances_needed} <span className="text-xs font-normal text-slate-400">units</span></div>
          </div>
          <Truck className="w-6 h-6 text-red-400 opacity-80" />
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Rescue Boats</div>
            <div className="text-purple-400 font-bold text-xl mt-0.5">{resourceData.rescue_boats_needed} <span className="text-xs font-normal text-slate-400">crafts</span></div>
          </div>
          <Anchor className="w-6 h-6 text-purple-400 opacity-80" />
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Food Meals (2.5d)</div>
            <div className="text-amber-400 font-bold text-xl mt-0.5">{resourceData.food_packets_needed.toLocaleString()} <span className="text-xs font-normal text-slate-400">pkts</span></div>
          </div>
          <Utensils className="w-6 h-6 text-amber-400 opacity-80" />
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Clean Water</div>
            <div className="text-cyan-400 font-bold text-xl mt-0.5">{resourceData.water_liters_needed.toLocaleString()} <span className="text-xs font-normal text-slate-400">L</span></div>
          </div>
          <Droplets className="w-6 h-6 text-cyan-400 opacity-80" />
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Medical Teams</div>
            <div className="text-blue-400 font-bold text-xl mt-0.5">{resourceData.medical_teams_needed} <span className="text-xs font-normal text-slate-400">teams</span></div>
          </div>
          <Stethoscope className="w-6 h-6 text-blue-400 opacity-80" />
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Shelters Required</div>
            <div className="text-emerald-400 font-bold text-xl mt-0.5">{resourceData.shelters_required} <span className="text-xs font-normal text-slate-400">hubs</span></div>
          </div>
          <Home className="w-6 h-6 text-emerald-400 opacity-80" />
        </div>

      </div>

      {/* Explanation Box */}
      <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-300">
        <span className="font-bold text-cyan-400">OPTIMIZATION MODEL RATIONALE: </span>
        {resourceData.explanation}
      </div>

    </div>
  );
}
