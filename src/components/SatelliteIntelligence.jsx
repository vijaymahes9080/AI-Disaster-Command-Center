import React, { useState } from 'react';
import { Satellite, Eye, Cpu, AlertTriangle, Layers, Layers3, CheckCircle2 } from 'lucide-react';

export default function SatelliteIntelligence({ stats }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [overlayActive, setOverlayActive] = useState(true);

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Satellite className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              MODULE 1: SATELLITE CHANGE DETECTION
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Before/After Optical & Synthetic Aperture Radar (SAR) Inundation Analysis
            </p>
          </div>
        </div>

        <button
          onClick={() => setOverlayActive(!overlayActive)}
          className={`px-2.5 py-1 rounded text-xs font-mono font-semibold border flex items-center gap-1.5 transition-colors ${
            overlayActive 
              ? 'bg-cyan-950 text-cyan-400 border-cyan-500' 
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>AI DAMAGE OVERLAY: {overlayActive ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Interactive Before / After Image Split Slider Canvas */}
      <div className="relative w-full h-56 rounded-lg overflow-hidden border border-slate-800 select-none group">
        
        {/* BEFORE IMAGE (PRE-FLOOD) */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop')`
          }}
        >
          <span className="absolute top-2 left-2 px-2 py-1 rounded bg-slate-900/90 text-slate-200 text-[10px] font-mono border border-slate-700">
            PRE-DISASTER (2026-08-01)
          </span>
        </div>

        {/* AFTER IMAGE (POST-FLOOD INUNDATION) */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1200&auto=format&fit=crop')`,
            filter: 'brightness(0.85) contrast(1.1)'
          }}
        >
          <span className="absolute top-2 left-2 px-2 py-1 rounded bg-red-950/90 text-red-300 text-[10px] font-mono border border-red-800">
            POST-DISASTER INUNDATED (2026-08-14)
          </span>

          {/* AI Computer Vision Synthetic Overlay Polygons */}
          {overlayActive && (
            <div className="absolute inset-0 bg-red-600/30 backdrop-hue-rotate-90 pointer-events-none flex items-center justify-center">
              <div className="border-2 border-red-500 border-dashed rounded-lg p-2 bg-red-950/60 text-red-300 text-[10px] font-mono font-bold animate-pulse">
                ⚠️ CV DETECTED FLOOD INUNDATION: 42.8 KM²
              </div>
            </div>
          )}
        </div>

        {/* Center Split Slider Bar */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg">
            ↔
          </div>
        </div>

        {/* Hidden Range Input overlay for easy drag slider */}
        <input 
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize z-30"
        />
      </div>

      {/* Satellite Analytics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
        
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Inundated Area</div>
          <div className="text-cyan-400 font-bold text-base mt-0.5">
            {stats ? stats.inundated_area_sq_km : 42.8} <span className="text-xs">km²</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Damaged Structures</div>
          <div className="text-red-400 font-bold text-base mt-0.5">
            {stats ? stats.structures_damaged : 128} <span className="text-xs">units</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Road Inundation</div>
          <div className="text-amber-400 font-bold text-base mt-0.5">
            35.4% <span className="text-xs">compromised</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">AI Confidence</div>
          <div className="text-emerald-400 font-bold text-base mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {stats ? stats.ai_confidence_pct : 94.5}%
          </div>
        </div>

      </div>

    </div>
  );
}
