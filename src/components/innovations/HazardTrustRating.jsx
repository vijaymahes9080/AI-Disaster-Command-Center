import React from 'react';
import { ShieldCheck, ThumbsUp, AlertCircle } from 'lucide-react';

export default function HazardTrustRating() {
  const reports = [
    { title: "Main River Bridge Pillar Erosion", verifications: 14, trustScore: 98.4, status: "VERIFIED GENUINE" },
    { title: "Substation Transformer Sparking", verifications: 8, trustScore: 91.2, status: "VERIFIED GENUINE" },
    { title: "Unconfirmed Dam Crack Claim", verifications: 1, trustScore: 24.0, status: "FLAGGED SPAM/HOAX" }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 13: CROWDSOURCED TRUST VERIFIER</h4>
            <p className="text-[10px] text-slate-400">Bayesian Anti-Hoax Credibility Engine</p>
          </div>
        </div>
        <span className="text-emerald-400 font-bold text-[10px]">BAYESIAN FILTER ACTIVE</span>
      </div>

      <div className="space-y-1.5">
        {reports.map((r, idx) => (
          <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{r.title}</div>
              <div className="text-[10px] text-slate-400">{r.verifications} Citizen Witnesses</div>
            </div>
            <div className="text-right">
              <div className={r.trustScore > 80 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>{r.trustScore}% TRUST</div>
              <span className={`px-1 rounded text-[8px] ${r.trustScore > 80 ? "bg-emerald-950 text-emerald-300" : "bg-red-950 text-red-300"}`}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
