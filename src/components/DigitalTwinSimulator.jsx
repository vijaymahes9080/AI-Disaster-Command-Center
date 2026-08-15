import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, AlertTriangle, Cpu, Layers } from 'lucide-react';

export default function DigitalTwinSimulator({ onRunSimulation, onResetSimulation }) {
  const [surgePct, setSurgePct] = useState(25);
  const [damBreach, setDamBreach] = useState(false);
  const [bridgeCollapse, setBridgeCollapse] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/simulate-digital-twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rainfall_surge_pct: surgePct,
          dam_breach: damBreach,
          bridge_collapse: bridgeCollapse,
          time_horizon_hrs: 6
        })
      });
      const data = await res.json();
      setSimResult(data);
      onRunSimulation && onRunSimulation(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleReset = () => {
    setSurgePct(0);
    setDamBreach(false);
    setBridgeCollapse(false);
    setSimResult(null);
    onResetSimulation && onResetSimulation();
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-purple-500/30 flex flex-col gap-3 font-mono text-xs shadow-glow-cyan">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 text-purple-300 border border-purple-700">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              DISASTER DIGITAL TWIN — WHAT-IF SCENARIO SIMULATOR
            </h3>
            <p className="text-xs text-purple-300/80">
              Predictive Cascading Flood & Infrastructure Stress Test
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 text-[10px] flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> RESET
        </button>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
        
        {/* Rainfall Surge Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300">Rainfall Surge Intensity</span>
            <span className="text-purple-400 font-bold">+{surgePct}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={surgePct}
            onChange={(e) => setSurgePct(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 text-[11px]">
            <input
              type="checkbox"
              checked={damBreach}
              onChange={(e) => setDamBreach(e.target.checked)}
              className="accent-red-500 rounded"
            />
            <span>Dam Overflow Surge</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 text-[11px]">
            <input
              type="checkbox"
              checked={bridgeCollapse}
              onChange={(e) => setBridgeCollapse(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            <span>Bridge Failure</span>
          </label>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSimulating ? 'RUNNING DIGITAL TWIN...' : 'RUN STRESS TEST'}</span>
          </button>
        </div>

      </div>

      {/* Cascading Events Timeline Output */}
      {simResult && (
        <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-500/30 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-purple-300 border-b border-purple-500/20 pb-1">
            <span>CASCADING DISASTER IMPACT PREDICTION (T+6h)</span>
            <span className="text-red-400">FLOODED ROADS: {simResult.flooded_road_pct}%</span>
          </div>

          <div className="space-y-1 text-[11px]">
            {simResult.cascading_events && simResult.cascading_events.map((event, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>{event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
