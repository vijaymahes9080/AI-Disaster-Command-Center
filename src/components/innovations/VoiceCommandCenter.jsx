import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Radio, CheckCircle } from 'lucide-react';

export default function VoiceCommandCenter({ onTriggerCommand }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognizedIntent, setRecognizedIntent] = useState(null);
  const [commandHistory, setCommandHistory] = useState([
    { id: 1, text: "Evacuate Sector 4 lowlands immediately", intent: "EVACUATION_DISPATCH", confidence: 0.96, status: "EXECUTED" },
    { id: 2, text: "Deploy 2 rescue boats to Main River Bridge", intent: "RESOURCE_DISPATCH", confidence: 0.92, status: "EXECUTED" }
  ]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setTranscript("Listening for emergency voice command...");

    // Simulated speech recognition cycle
    setTimeout(() => {
      const sampleCommands = [
        { text: "Recalculate safe evacuation route to Shelter Alpha", intent: "RECALCULATE_ROUTE", target: "Shelter Alpha" },
        { text: "Dispatch 3 ambulances and 1 medical team to Sector 4", intent: "DISPATCH_AMBULANCE", target: "Sector 4" },
        { text: "Activate Disaster Digital Twin flood simulation", intent: "TRIGGER_SIMULATION", target: "Digital Twin" }
      ];
      const picked = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
      setTranscript(picked.text);
      setRecognizedIntent({ intent: picked.intent, confidence: 0.94, target: picked.target });
      setIsListening(false);

      setCommandHistory(prev => [
        { id: Date.now(), text: picked.text, intent: picked.intent, confidence: 0.94, status: "EXECUTED" },
        ...prev
      ]);

      if (onTriggerCommand) onTriggerCommand(picked);
    }, 2500);
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3 font-mono text-xs shadow-glow-cyan">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
            <Mic className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 01: AI VOICE COMMAND CENTER</h4>
            <p className="text-[10px] text-slate-400">Speech-to-Text Tactical Emergency Intent Parsing</p>
          </div>
        </div>

        <button
          onClick={toggleListening}
          className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-all border ${
            isListening
              ? 'bg-red-600 text-white border-red-400 animate-pulse'
              : 'bg-cyan-950 text-cyan-300 border-cyan-600 hover:bg-cyan-900'
          }`}
        >
          {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          <span>{isListening ? 'LISTENING...' : 'VOICE DISPATCH'}</span>
        </button>
      </div>

      {/* Live Voice Waveform Visualizer & Transcript */}
      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>SPEECH STREAM TRANSCRIPT</span>
          {isListening && <span className="text-red-400 font-bold animate-pulse">● AUDIO ACTIVE</span>}
        </div>

        <div className="text-slate-200 min-h-[32px] flex items-center font-sans italic text-xs">
          "{transcript || 'Click VOICE DISPATCH and speak a command...'}"
        </div>

        {/* Audio Wave Bars */}
        {isListening && (
          <div className="flex items-center justify-center gap-1 h-6">
            {[40, 70, 30, 90, 60, 100, 50, 80, 40, 70].map((h, idx) => (
              <div 
                key={idx} 
                className="w-1 bg-cyan-400 rounded animate-pulse" 
                style={{ height: `${h}%`, animationDelay: `${idx * 0.1}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Command History Stream */}
      <div className="space-y-1">
        <span className="text-[10px] text-slate-400 uppercase font-semibold">EXECUTED VOICE COMMAND LOGS</span>
        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
          {commandHistory.map(cmd => (
            <div key={cmd.id} className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 truncate text-slate-300">
                <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate font-sans">"{cmd.text}"</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[9px] font-bold shrink-0">
                {(cmd.confidence * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
