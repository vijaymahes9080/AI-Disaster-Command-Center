import React, { useState } from 'react';
import { WifiOff, Cpu, Share2, Radio, CheckCircle2 } from 'lucide-react';

export default function MeshNetworkSim() {
  const [meshNodes, setMeshNodes] = useState([
    { id: 'NODE-A', name: 'Victim Phone (Sector 4)', rssi: '-64 dBm', hops: 0, status: 'CONNECTED' },
    { id: 'NODE-B', name: 'Relay Router (Substation)', rssi: '-72 dBm', hops: 1, status: 'FORWARDING' },
    { id: 'NODE-C', name: 'Drone Mesh Gateway', rssi: '-58 dBm', hops: 2, status: 'RELAYING' },
    { id: 'GATEWAY', name: 'Command Center Receiver', rssi: '-45 dBm', hops: 3, status: 'DELIVERED' }
  ]);

  return (
    <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 flex flex-col gap-3 font-mono text-xs shadow-glow-cyan">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700">
            <WifiOff className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 uppercase tracking-wider">INNOVATION 04: OFFLINE P2P EMERGENCY MESH</h4>
            <p className="text-[10px] text-slate-400">Zero-Cellular Multi-Hop Bluetooth/Wi-Fi Direct Protocol</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] font-bold border border-emerald-700">
          GRID DOWN: MESH ACTIVE
        </span>
      </div>

      {/* Mesh Multi-Hop Pipeline Graph */}
      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
        <div className="text-[10px] text-slate-400 uppercase font-semibold">AD-HOC MESH HOP ROUTE:</div>
        
        <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
          {meshNodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div className="p-2 rounded bg-slate-950 border border-emerald-500/40 text-center shrink-0 min-w-[90px]">
                <div className="font-bold text-emerald-400 text-[10px]">{node.id}</div>
                <div className="text-[9px] text-slate-300 truncate max-w-[80px]">{node.name}</div>
                <div className="text-[8px] text-cyan-400 mt-1">{node.rssi}</div>
              </div>
              {idx < meshNodes.length - 1 && (
                <div className="text-emerald-500 font-bold shrink-0 animate-pulse">➔</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400">
        <span>Packet Delivery Success: <strong className="text-emerald-400">99.4%</strong></span>
        <span>Latency: <strong className="text-cyan-400">120ms (3 hops)</strong></span>
      </div>

    </div>
  );
}
