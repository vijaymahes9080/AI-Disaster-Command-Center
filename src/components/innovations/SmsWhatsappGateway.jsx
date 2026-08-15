import React from 'react';
import { Send, Phone, CheckCircle2 } from 'lucide-react';

export default function SmsWhatsappGateway() {
  const handleDispatchSms = () => {
    alert("Emergency SOS SMS Broadcast sent to 14,800 mobile subscribers in Sector 4!");
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 26: SMS & WHATSAPP SOS GATEWAY</h4>
            <p className="text-[10px] text-slate-400">Mass Telecom Cell-Broadcast Dispatcher</p>
          </div>
        </div>

        <button 
          onClick={handleDispatchSms}
          className="px-2.5 py-1 bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-700 rounded font-bold flex items-center gap-1"
        >
          <Send className="w-3.5 h-3.5" />
          <span>SEND MASS SMS</span>
        </button>
      </div>

      <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 text-[11px] text-slate-300 flex justify-between items-center">
        <span>Cell Towers Connected: <strong className="text-emerald-400">18 Towers</strong></span>
        <span>Est. Reach: <strong className="text-cyan-400">14,800 phones</strong></span>
      </div>
    </div>
  );
}
