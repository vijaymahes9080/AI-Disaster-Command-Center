import React, { useState } from 'react';
import { Palette, Eye } from 'lucide-react';

export default function TacticalThemeCustomizer() {
  const [activeTheme, setActiveTheme] = useState('CYBER');

  const themes = [
    { id: 'CYBER', name: 'Cyber Teal', color: 'text-cyan-400 border-cyan-500' },
    { id: 'INFRARED', name: 'Infrared Red', color: 'text-red-400 border-red-500' },
    { id: 'NIGHTVISION', name: 'NightVision Green', color: 'text-emerald-400 border-emerald-500' }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-purple-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-700">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 25: TACTICAL THEME CUSTOMIZER</h4>
            <p className="text-[10px] text-slate-400">Infrared & Night Vision Optics Theme Engine</p>
          </div>
        </div>
        <span className="text-purple-400 font-bold text-[10px]">{activeTheme} MODE</span>
      </div>

      <div className="flex items-center gap-2">
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTheme(t.id)}
            className={`flex-1 py-1.5 rounded font-bold border text-[10px] transition-colors ${
              activeTheme === t.id ? 'bg-slate-900 ' + t.color : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
