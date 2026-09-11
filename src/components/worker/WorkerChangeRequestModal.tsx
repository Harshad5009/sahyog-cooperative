import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, IndianRupee, Hammer, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Booking } from '../../types';

interface WorkerChangeRequestModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    reason: string;
    labourCost: number;
    materialCost: number;
    materialsList: string;
  }) => void;
}

export const WorkerChangeRequestModal: React.FC<WorkerChangeRequestModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState('');
  const [labourCost, setLabourCost] = useState<number>(150);
  const [materialCost, setMaterialCost] = useState<number>(200);
  const [materialsList, setMaterialsList] = useState('');

  if (!isOpen) return null;

  const totalExtra = (Number(labourCost) || 0) + (Number(materialCost) || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || totalExtra <= 0) return;

    onSubmit({
      reason,
      labourCost: Number(labourCost) || 0,
      materialCost: Number(materialCost) || 0,
      materialsList: materialsList.trim() || 'Spare parts & consumables',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-surface-200 space-y-5 animate-scale-up">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-surface-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded">
                Cooperative Governance
              </span>
              <h3 className="font-black text-surface-900 text-base mt-0.5">
                Request Additional Work / Scope
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-surface-400 hover:text-surface-700 rounded-xl hover:bg-surface-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info on the Booking */}
        <div className="p-3 bg-surface-50 rounded-2xl border border-surface-200/80 text-xs flex justify-between items-center">
          <div>
            <span className="text-surface-400 block text-[10px] uppercase font-bold">Booking #{booking.bookingNumber}</span>
            <span className="font-bold text-surface-900">{booking.subServiceName}</span>
          </div>
          <div className="text-right">
            <span className="text-surface-400 block text-[10px] uppercase font-bold">Current Escrow</span>
            <span className="font-extrabold text-surface-900 font-mono">₹{booking.paymentBreakdown.totalAmount}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Reason */}
          <div>
            <label className="block text-surface-700 font-bold mb-1">
              Reason for Extra Work / Diagnosis <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Discovered rusted main supply pipe inside wall requiring cutting, new coupler and 2ft extension..."
              className="w-full p-3 rounded-xl border border-surface-300 text-xs focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Cost Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-surface-700 font-bold mb-1 flex items-center gap-1">
                <Hammer className="w-3.5 h-3.5 text-coop-700" />
                <span>Extra Labour Cost (₹)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-surface-400 font-bold">₹</span>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={labourCost}
                  onChange={(e) => setLabourCost(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-surface-300 text-xs font-bold font-mono focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-surface-700 font-bold mb-1 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-amber-700" />
                <span>Material / Spare Cost (₹)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-surface-400 font-bold">₹</span>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-surface-300 text-xs font-bold font-mono focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Material description */}
          <div>
            <label className="block text-surface-700 font-bold mb-1">
              List of Parts / Hardware Needed
            </label>
            <input
              type="text"
              value={materialsList}
              onChange={(e) => setMaterialsList(e.target.value)}
              placeholder="e.g. 1x CPVC 3/4 Ball Valve, 1x Teflon Sealant, 2x Brass Elbows"
              className="w-full p-2.5 rounded-xl border border-surface-300 text-xs focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Summary Banner */}
          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-purple-700 uppercase block">Total Additional Amount</span>
              <span className="text-xl font-black text-purple-950 font-display">+₹{totalExtra}</span>
            </div>
            <div className="text-right text-[11px] text-purple-700">
              New Customer Total: <strong className="font-mono text-xs">₹{booking.paymentBreakdown.totalAmount + totalExtra}</strong>
            </div>
          </div>

          {/* Cooperative Transparency Rule */}
          <div className="p-2.5 bg-surface-100 rounded-xl text-[11px] text-surface-600 flex items-start gap-1.5 leading-snug">
            <ShieldCheck className="w-4 h-4 text-coop-700 shrink-0 mt-0.5" />
            <span>
              <strong>No Unilateral Price Hike:</strong> Under Sahyog Cooperative guidelines, this request will be sent to the customer for digital approval. You must not start additional chargeable work until the customer approves.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-surface-600 hover:text-surface-900 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={totalExtra <= 0 || !reason.trim()}
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-40 text-white font-extrabold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Send Request to Customer (+₹{totalExtra})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
