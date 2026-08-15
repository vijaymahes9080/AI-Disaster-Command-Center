import React, { useState } from 'react';
import { Languages, Volume2, Send, Globe, Check } from 'lucide-react';

export default function MultilingualBroadcast() {
  const [selectedLang, setSelectedLang] = useState('TA');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const broadcasts = {
    EN: { lang: "English", text: "CRITICAL FLOOD ALERT: Sector 4 low-lying areas must evacuate to Shelter Alpha within 3 hours. Avoid Main River Bridge.", audio: "en-alert.mp3" },
    TA: { lang: "Tamil (தமிழ்)", text: "அவசர வெள்ள எச்சரிக்கை: மண்டலம் 4 தாழ்வான பகுதிகளில் உள்ள மக்கள் அடுத்த 3 மணி நேரத்திற்குள் ஷெல்டர் அல்ஃபாவிற்கு வெளியேற வேண்டும்.", audio: "ta-alert.mp3" },
    HI: { lang: "Hindi (हिन्दी)", text: "गंभीर बाढ़ चेतावनी: सेक्टर 4 के निचले इलाकों के लोग अगले 3 घंटे में शेल्टर अल्फा में चले जाएं। मुख्य नदी पुल से बचें।", audio: "hi-alert.mp3" },
    ES: { lang: "Spanish (Español)", text: "ALERTA CRÍTICA DE INUNDACIÓN: Evacuen el Sector 4 hacia el Refugio Alfa dentro de 3 horas.", audio: "es-alert.mp3" }
  };

  const current = broadcasts[selectedLang];

  const handleAudioPlayback = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-amber-500/30 flex flex-col gap-3 font-mono text-xs shadow-glow-amber">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-700">
            <Globe className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 03: MULTILINGUAL EMERGENCY BROADCAST</h4>
            <p className="text-[10px] text-slate-400">Automated NLP Translation & Voice Siren Dispatch</p>
          </div>
        </div>

        <button
          onClick={handleAudioPlayback}
          className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors flex items-center gap-1 ${
            isPlayingAudio ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse' : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isPlayingAudio ? 'PLAYING SIREN...' : 'PLAY AUDIO'}</span>
        </button>
      </div>

      {/* Language Selector Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
        {Object.keys(broadcasts).map(code => (
          <button
            key={code}
            onClick={() => setSelectedLang(code)}
            className={`px-2 py-1 rounded font-bold border transition-colors whitespace-nowrap ${
              selectedLang === code
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {broadcasts[code].lang}
          </button>
        ))}
      </div>

      {/* Translated Broadcast Card */}
      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold">
          <span>BROADCAST TEXT ({current.lang}):</span>
          <span className="text-slate-400">AUTO-TRANSLATED</span>
        </div>
        <p className="text-slate-100 font-sans text-xs leading-relaxed">
          "{current.text}"
        </p>
      </div>

      {/* Broadcast Dispatch Trigger */}
      <button 
        onClick={() => alert(`Broadcast sent in ${current.lang} across all emergency channels!`)}
        className="w-full py-1.5 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs shadow-lg"
      >
        <Send className="w-3.5 h-3.5" />
        <span>BROADCAST TO CELL TOWER SIRENS & FM RADIO</span>
      </button>

    </div>
  );
}
