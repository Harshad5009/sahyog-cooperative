import React from 'react';
import { InteractiveMap } from '../../components/admin/InteractiveMap';
import { MOCK_DEMAND_HOTSPOTS } from '../../data/mockDemand';
import { AlertTriangle, TrendingUp, Users, ShieldCheck } from 'lucide-react';

export const AdminMapPage: React.FC = () => {
  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          GIS Live Telemetry & Demand Hotspots
        </h1>
        <p className="text-xs text-surface-500">
          Geographic real-time mapping of active cooperative workers, SOS emergency dispatches, and ward-level shortage zones.
        </p>
      </div>

      {/* Main Interactive Map */}
      <InteractiveMap />

      {/* Demand Hotspots Grid */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-card">
        <h3 className="text-sm font-bold text-surface-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Active Municipal Ward Shortages & Deficit Forecaster
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_DEMAND_HOTSPOTS.map(h => (
            <div
              key={h.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between text-xs ${
                h.urgency === 'critical'
                  ? 'bg-rose-50/50 border-rose-200 text-rose-900'
                  : 'bg-surface-50 border-surface-200 text-surface-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <h4 className="font-bold truncate">{h.zone}</h4>
                  <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    h.urgency === 'critical' ? 'bg-rose-600 text-white' : 'bg-amber-100 text-amber-900'
                  }`}>
                    +{h.currentDemandIndex}% Surge
                  </span>
                </div>
                <p className="text-[11px] text-surface-600 mb-2">{h.service}</p>
                <div className="space-y-1 bg-white p-2 rounded-xl border border-surface-200 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-surface-400">Available:</span>
                    <span className="font-bold">{h.availableWorkers} Workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-400">Expected:</span>
                    <span className="font-bold text-rose-600">{h.expectedRequests} Jobs</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-surface-200 text-[10px] text-surface-500">
                {h.actionTaken ? '✓ Reallocation Executed' : '⚡ Reallocation Recommended'}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
