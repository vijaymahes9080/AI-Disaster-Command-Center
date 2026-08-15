import React, { useState } from 'react';
import { MessageSquare, Send, MapPin, AlertCircle, Sparkles, Filter, CheckCircle } from 'lucide-react';

export default function SocialNlpFeed({ incidents, onAddPost, onSelectIncident }) {
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('CivilianAlert');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterCat, setFilterCat] = useState('ALL');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSubmitting(true);
    onAddPost(inputText, username);
    setInputText('');
    setTimeout(() => setIsSubmitting(false), 400);
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Flood': return 'bg-cyan-950 text-cyan-400 border-cyan-800';
      case 'Rescue': return 'bg-purple-950 text-purple-400 border-purple-800';
      case 'Infrastructure': return 'bg-amber-950 text-amber-400 border-amber-800';
      case 'Resource Request': return 'bg-blue-950 text-blue-400 border-blue-800';
      case 'Fire': return 'bg-red-950 text-red-400 border-red-800';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const filteredIncidents = incidents.filter(item => {
    if (filterCat === 'ALL') return true;
    return item.category === filterCat;
  });

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col gap-3 h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
            <MessageSquare className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              MODULE 3: SOCIAL MEDIA NLP INTELLIGENCE
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Zero-Shot Emergency Classification & Geocoding
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-mono border border-purple-800">
          NLP ACTIVE
        </span>
      </div>

      {/* Interactive Input Form to test custom emergency post classification */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type emergency report (e.g. 'Water entering houses near Main Bridge, 5 trapped')..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={isSubmitting || !inputText.trim()}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-mono text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-lg disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI CLASSIFY & PLOT</span>
          </button>
        </div>
      </form>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-none">
        {['ALL', 'Flood', 'Rescue', 'Infrastructure', 'Resource Request', 'Fire'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-2 py-0.5 rounded border whitespace-nowrap transition-colors ${
              filterCat === cat
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed List Container */}
      <div className="flex-1 overflow-y-auto max-h-[320px] space-y-2.5 pr-1 font-mono text-xs">
        {filteredIncidents && filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => onSelectIncident && onSelectIncident(inc)}
            className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadge(inc.category)}`}>
                {inc.category}
              </span>

              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-red-400 font-bold">
                  URGENCY: {inc.urgency} / 10
                </span>
                <span>• {inc.id}</span>
              </div>
            </div>

            <p className="text-slate-200 text-xs mb-2 leading-relaxed font-sans">
              "{inc.text}"
            </p>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
              <span className="flex items-center gap-1 text-cyan-400">
                <MapPin className="w-3 h-3" />
                {inc.coordinates ? `${inc.coordinates[0]}, ${inc.coordinates[1]}` : 'Sector 4'}
              </span>

              <div className="flex items-center gap-1">
                {inc.needs && inc.needs.map((n, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
