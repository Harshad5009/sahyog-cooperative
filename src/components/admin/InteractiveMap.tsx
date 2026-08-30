import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  Siren, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Check, 
  RefreshCw,
  ShieldCheck,
  Zap,
  Navigation
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';

export const InteractiveMap: React.FC = () => {
  const { workers, demandHotspots, reallocateWorkersAction } = useApp();

  const [selectedZone, setSelectedZone] = useState<string>('Kothrud');
  const [filterLayer, setFilterLayer] = useState<'all' | 'workers' | 'hotspots' | 'emergency'>('all');
  const [isReallocateModalOpen, setIsReallocateModalOpen] = useState(false);
  const [reallocateCount, setReallocateCount] = useState(5);
  const [sourceZone, setSourceZone] = useState('Bavdhan & Warje (Zone 3)');
  const [targetZone, setTargetZone] = useState('Kothrud (Zone 4)');

  // Geographic nodes in Pune Metropolitan Area
  const zoneNodes = [
    { id: 'z-kothrud', name: 'Kothrud', zoneNumber: 'Zone 4', x: 28, y: 55, demandSurge: '+32%', workers: 14, isHotspot: true, urgency: 'critical', emergency: true },
    { id: 'z-baner', name: 'Baner & Aundh', zoneNumber: 'Zone 2', x: 25, y: 30, demandSurge: '+18%', workers: 22, isHotspot: true, urgency: 'normal', emergency: false },
    { id: 'z-shivajinagar', name: 'Shivajinagar', zoneNumber: 'Zone 1', x: 48, y: 40, demandSurge: 'Normal', workers: 36, isHotspot: false, urgency: 'normal', emergency: false },
    { id: 'z-hadapsar', name: 'Hadapsar', zoneNumber: 'Zone 7', x: 75, y: 62, demandSurge: '+24%', workers: 18, isHotspot: true, urgency: 'high', emergency: false },
    { id: 'z-vimannagar', name: 'Viman Nagar', zoneNumber: 'Zone 5', x: 68, y: 32, demandSurge: '+12%', workers: 26, isHotspot: false, urgency: 'normal', emergency: false },
    { id: 'z-pimpri', name: 'Pimpri-Chinchwad', zoneNumber: 'Zone 8', x: 35, y: 15, demandSurge: 'Normal', workers: 30, isHotspot: false, urgency: 'normal', emergency: false },
    { id: 'z-bavdhan', name: 'Bavdhan / Warje', zoneNumber: 'Zone 3', x: 20, y: 68, demandSurge: 'Surplus', workers: 24, isHotspot: false, urgency: 'normal', emergency: false },
    { id: 'z-katraj', name: 'Katraj & Kondhwa', zoneNumber: 'Zone 6', x: 50, y: 80, demandSurge: '+8%', workers: 20, isHotspot: false, urgency: 'normal', emergency: false },
  ];

  const activeZoneData = zoneNodes.find(z => z.name.includes(selectedZone)) || zoneNodes[0];

  const handleExecuteReallocation = () => {
    reallocateWorkersAction(sourceZone, targetZone, reallocateCount, 'Plumbing');
    setIsReallocateModalOpen(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-surface-200 shadow-card overflow-hidden flex flex-col">
      {/* Map Control Header */}
      <div className="p-4 sm:p-5 border-b border-surface-200 bg-surface-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-surface-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-coop-700" />
            Pune District Geographic GIS Command Center
          </h3>
          <p className="text-xs text-surface-500">
            Real-time telemetry of cooperative workers, demand clusters, and active emergency dispatches.
          </p>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-surface-200 text-xs">
          {(['all', 'workers', 'hotspots', 'emergency'] as const).map(layer => (
            <button
              key={layer}
              onClick={() => setFilterLayer(layer)}
              className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-all ${
                filterLayer === layer
                  ? 'bg-coop-900 text-white shadow-xs'
                  : 'text-surface-600 hover:bg-surface-100'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Visual Surface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[480px]">
        
        {/* Vector Map Canvas */}
        <div className="lg:col-span-8 bg-surface-900 relative p-6 overflow-hidden flex items-center justify-center select-none min-h-[420px]">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
          
          {/* River / Road lines simulation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 100 Q 200 150 400 250 T 800 300" fill="none" stroke="#38bdf8" strokeWidth="4" />
            <path d="M 150 0 Q 300 200 450 450 T 600 800" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Interactive Zone Hotspot Nodes */}
          {zoneNodes.map(node => {
            const isSelected = activeZoneData.id === node.id;
            const isCritical = node.urgency === 'critical';

            return (
              <div
                key={node.id}
                onClick={() => setSelectedZone(node.name.split(' ')[0])}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform hover:scale-110 z-20"
              >
                {/* Pulsing Radar Ring for Hotspots */}
                {node.isHotspot && (
                  <span className={`absolute -inset-3 rounded-full animate-ping opacity-75 ${
                    isCritical ? 'bg-rose-500' : 'bg-amber-500'
                  }`} />
                )}

                {/* Pin Circle */}
                <div className={`relative px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl border font-bold text-xs ${
                  isSelected
                    ? 'bg-white text-surface-900 border-emerald-400 ring-4 ring-emerald-500/30'
                    : isCritical
                    ? 'bg-rose-600 text-white border-rose-400'
                    : node.isHotspot
                    ? 'bg-amber-500 text-surface-950 border-amber-300'
                    : 'bg-surface-800 text-surface-200 border-surface-700 hover:bg-surface-700'
                }`}>
                  {node.emergency && (
                    <Siren className="w-3.5 h-3.5 text-rose-300 animate-bounce" />
                  )}
                  <span>{node.name.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-80 font-mono font-normal">
                    ({node.workers}w)
                  </span>
                </div>

                {/* Tooltip on hover */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 bg-surface-950 text-white text-[10px] p-2 rounded-xl border border-surface-700 shadow-2xl z-30 pointer-events-none text-center">
                  <p className="font-bold text-emerald-300">{node.name}</p>
                  <p className="text-surface-400">{node.demandSurge} Demand Surge</p>
                  <p className="text-surface-300 font-semibold">{node.workers} Active Workers</p>
                </div>
              </div>
            );
          })}

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 bg-surface-950/90 backdrop-blur-sm border border-surface-800 p-3 rounded-2xl text-[11px] text-surface-300 space-y-1.5 z-20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Critical Demand Deficit (+30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Moderate Surge (+15-25%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-surface-600" />
              <span>Balanced Capacity</span>
            </div>
          </div>
        </div>

        {/* Right Details & Reallocation Panel */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-surface-50 border-t lg:border-t-0 lg:border-l border-surface-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500">
                Selected Geographic Cluster
              </span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                activeZoneData.urgency === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-coop-100 text-coop-800'
              }`}>
                {activeZoneData.zoneNumber}
              </span>
            </div>

            <h3 className="text-lg font-black text-surface-900 mb-1 font-display">
              {activeZoneData.name}
            </h3>

            <p className="text-xs text-surface-500 leading-relaxed mb-4">
              Pune Municipal Zone. Monitored under Pune Labour Federation Cooperative Society.
            </p>

            <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-surface-200 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-surface-500">Current Demand Index:</span>
                <span className={`font-bold ${activeZoneData.urgency === 'critical' ? 'text-rose-600 font-extrabold' : 'text-emerald-700'}`}>
                  {activeZoneData.demandSurge}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Available Registered Workers:</span>
                <span className="font-bold text-surface-900">{activeZoneData.workers} On Shift</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Fulfillment Health:</span>
                <span className="font-bold text-emerald-700">94.2%</span>
              </div>
            </div>

            {activeZoneData.isHotspot && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 mb-4 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Shortage Alert:</strong> Plumbing requests expected to peak between 4 PM–7 PM due to local water supply valve shifts.
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-surface-200">
            <button
              onClick={() => setIsReallocateModalOpen(true)}
              className="w-full py-2.5 px-4 bg-coop-900 hover:bg-coop-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Trigger AI Workforce Reallocation</span>
            </button>

            <p className="text-[10px] text-surface-400 text-center">
              Rebalancing shifts reserve specialists from surplus zones without disrupting existing bookings.
            </p>
          </div>
        </div>

      </div>

      {/* Dynamic Reallocation Modal */}
      <Modal
        isOpen={isReallocateModalOpen}
        onClose={() => setIsReallocateModalOpen(false)}
        title="Deploy AI Workforce Reallocation"
        subtitle="Democratically rebalance idle cooperative workers to high-demand shortage clusters."
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="text-xs font-bold text-surface-800 block mb-1">Source Cluster (Surplus Workers)</label>
            <input
              type="text"
              value={sourceZone}
              disabled
              className="w-full bg-surface-100 border border-surface-200 text-surface-700 p-2.5 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-surface-800 block mb-1">Target Cluster (Deficit Hotspot)</label>
            <input
              type="text"
              value={targetZone}
              disabled
              className="w-full bg-surface-100 border border-surface-200 text-surface-700 p-2.5 rounded-xl font-medium"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-surface-800">Workers to Reallocate</label>
              <span className="font-bold text-coop-800 bg-coop-100 px-2 py-0.5 rounded">{reallocateCount} Certified Plumbers</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={reallocateCount}
              onChange={(e) => setReallocateCount(Number(e.target.value))}
              className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-coop-700"
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed">
            ✓ Workers will receive a ₹150 cooperative mobility stipend for cross-zone dispatch.
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-surface-100">
            <button
              onClick={() => setIsReallocateModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-surface-600 hover:bg-surface-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleExecuteReallocation}
              className="px-5 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm & Dispatch</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
