import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Radio, Waves } from 'lucide-react';

export default function IotSensorStream() {
  const [sensors, setSensors] = useState([
    { id: 'IOT-01', name: 'River Bridge Ultrasonic Gauge', depth: 4.82, velocity: 3.4, status: 'SURGING' },
    { id: 'IOT-02', name: 'Sector 4 Lowland Pressure Sensor', depth: 1.45, velocity: 1.2, status: 'FLOODED' },
    { id: 'IOT-03', name: 'Dam Spillway Hydro Sensor', depth: 8.90, velocity: 6.8, status: 'CRITICAL' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(s => ({
        ...s,
        depth: +(s.depth + (Math.random() - 0.48) * 0.05).toFixed(2),
        velocity: +(s.velocity + (Math.random() - 0.48) * 0.08).toFixed(2)
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-4 rounded-xl border border-blue-500/30 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-700">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 08: IOT TELEMETRY SENSOR STREAM</h4>
            <p className="text-[10px] text-slate-400">Ultrasonic Hydro Level & Flow Telemetry Stream</p>
          </div>
        </div>
        <span className="text-cyan-400 text-[10px] font-bold flex items-center gap-1">
          <Activity className="w-3 h-3 animate-spin" /> LIVE STREAM
        </span>
      </div>

      <div className="space-y-1.5">
        {sensors.map(s => (
          <div key={s.id} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-bold text-slate-200">{s.name}</div>
              <div className="text-[10px] text-slate-400">Depth: <span className="text-cyan-400 font-bold">{s.depth}m</span> | Flow: <span className="text-blue-400">{s.velocity} m/s</span></div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 text-[9px] font-bold border border-red-800">
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
