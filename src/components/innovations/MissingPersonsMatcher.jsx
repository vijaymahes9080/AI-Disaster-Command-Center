import React, { useState } from 'react';
import { UserCheck, Search, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MissingPersonsMatcher() {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([
    { id: 'MP-801', name: 'Ramesh Kumar (Age 42)', reportedLoc: 'Sector 4 Riverbank', shelterLoc: 'Shelter Alpha (Room 12)', matchPct: 96.8, status: 'LOCATED SAFE' },
    { id: 'MP-802', name: 'Priya Sharma (Age 28)', reportedLoc: 'Main Market Square', shelterLoc: 'Shelter Beta (Medical Unit)', matchPct: 92.4, status: 'LOCATED SAFE' }
  ]);

  return (
    <div className="glass-panel p-4 rounded-xl border border-purple-500/30 flex flex-col gap-3 font-mono text-xs shadow-glow-cyan">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-700">
            <UserCheck className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 05: AI MISSING PERSONS MATCHER</h4>
            <p className="text-[10px] text-slate-400">Facial & Attribute Vector Similarity Registry Search</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[9px] font-bold border border-purple-700">
          AI MATCHING ACTIVE
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="flex gap-2">
        <input 
          type="text"
          placeholder="Search missing person by name, age, or clothing description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[11px] text-slate-100 focus:outline-none focus:border-purple-500"
        />
        <button className="px-3 py-1 bg-purple-600 text-white rounded font-bold text-[11px]">
          SEARCH
        </button>
      </div>

      {/* Match Results Stream */}
      <div className="space-y-1.5">
        {matches.map(m => (
          <div key={m.id} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-100">{m.name}</div>
              <div className="text-[10px] text-slate-400">Last Seen: {m.reportedLoc} → Found: <span className="text-emerald-400 font-semibold">{m.shelterLoc}</span></div>
            </div>
            <div className="text-right">
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] font-bold border border-emerald-800">
                {m.matchPct}% MATCH
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
