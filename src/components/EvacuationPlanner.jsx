import React, { useState } from 'react';
import { Navigation, ShieldCheck, AlertOctagon, CheckCircle2, Clock, ArrowRight, Home } from 'lucide-react';

export default function EvacuationPlanner({ routeData, onCalculateRoute }) {
  const [avoidFlooded, setAvoidFlooded] = useState(true);
  const [avoidBlocked, setAvoidBlocked] = useState(true);

  if (!routeData) return null;

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col gap-3 font-mono text-xs">
      
      {/* Module Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              MODULE 5: AI EVACUATION ROUTE PLANNER
            </h3>
            <p className="text-xs text-slate-400">
              Dijkstra Graph Routing with Flooded Edge Avoidance
            </p>
          </div>
        </div>

        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
          routeData.safety_rating === 'OPTIMAL' 
            ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
            : 'bg-amber-950 text-amber-400 border-amber-800'
        }`}>
          {routeData.safety_rating}
        </span>
      </div>

      {/* Router Control Parameters */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px]">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input 
              type="checkbox" 
              checked={avoidFlooded} 
              onChange={(e) => {
                setAvoidFlooded(e.target.checked);
                onCalculateRoute && onCalculateRoute(e.target.checked, avoidBlocked);
              }}
              className="accent-cyan-500 rounded"
            />
            <span>Avoid Flooded Edges</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input 
              type="checkbox" 
              checked={avoidBlocked} 
              onChange={(e) => {
                setAvoidBlocked(e.target.checked);
                onCalculateRoute && onCalculateRoute(avoidFlooded, e.target.checked);
              }}
              className="accent-cyan-500 rounded"
            />
            <span>Avoid Infrastructure Blockages</span>
          </label>
        </div>

        <button 
          onClick={() => onCalculateRoute && onCalculateRoute(avoidFlooded, avoidBlocked)}
          className="px-2.5 py-1 bg-cyan-950 text-cyan-400 hover:bg-cyan-900 border border-cyan-800 rounded font-bold transition-colors"
        >
          RECALCULATE ROUTE
        </button>
      </div>

      {/* Route Metrics Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Total Distance</div>
          <div className="text-cyan-400 font-bold text-base mt-0.5">{routeData.total_distance_km} km</div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Est. Travel Time</div>
          <div className="text-emerald-400 font-bold text-base mt-0.5">{routeData.estimated_travel_time_min} mins</div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Target Shelter</div>
          <div className="text-slate-100 font-bold text-xs mt-0.5 truncate">{routeData.shelter_name}</div>
        </div>
      </div>

      {/* Turn-by-Turn Route Segment Steps */}
      <div className="space-y-1.5">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
          Step-By-Step Segment Safety Breakdown:
        </div>

        <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
          {routeData.segments && routeData.segments.map((seg, idx) => (
            <div 
              key={idx} 
              className={`p-2 rounded bg-slate-900/60 border flex items-center justify-between text-[11px] ${
                seg.status === 'SAFE' ? 'border-slate-800' : 'border-amber-800/60 bg-amber-950/20'
              }`}
            >
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span>{seg.from_name}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="font-semibold text-slate-100">{seg.to_name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">{seg.distance_km} km</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                  seg.status === 'SAFE' 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
                    : 'bg-red-950 text-red-400 border border-red-900'
                }`}>
                  {seg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
