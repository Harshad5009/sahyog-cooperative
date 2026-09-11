import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ShieldAlert, Sparkles, Wrench, Hammer } from 'lucide-react';
import type { Booking, ChangeRequest } from '../../types';

interface ChangeRequestAlertProps {
  booking: Booking;
  changeRequest: ChangeRequest;
  onApprove: (bookingId: string, requestId: string) => void;
  onReject: (bookingId: string, requestId: string, note?: string) => void;
}

export const ChangeRequestAlert: React.FC<ChangeRequestAlertProps> = ({
  booking,
  changeRequest,
  onApprove,
  onReject,
}) => {
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const isPending = changeRequest.status === 'pending';

  return (
    <div className="bg-gradient-to-br from-amber-50/90 via-purple-50/60 to-white rounded-2xl border-2 border-purple-300 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-purple-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
              Action Required • Change Request
            </span>
            <h4 className="font-black text-surface-900 text-sm mt-0.5">
              Additional Work Requested by {changeRequest.workerName}
            </h4>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-surface-500 block font-medium">Extra Amount</span>
          <span className="text-lg font-black text-purple-900 font-display">
            +₹{changeRequest.totalExtraAmount}
          </span>
        </div>
      </div>

      {/* Reason Given by Worker */}
      <div className="p-3.5 bg-white rounded-xl border border-purple-100 text-xs space-y-1.5 shadow-2xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 block">
          Technician's Diagnosis & Justification
        </span>
        <p className="text-surface-800 leading-relaxed font-medium">
          "{changeRequest.reason}"
        </p>
      </div>

      {/* Cost Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-surface-50 rounded-xl border border-surface-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hammer className="w-4 h-4 text-coop-700" />
            <div>
              <span className="font-bold text-surface-900 block">Additional Labour</span>
              <span className="text-[10px] text-surface-400">Extra on-site physical work</span>
            </div>
          </div>
          <span className="font-extrabold text-surface-900 font-mono">₹{changeRequest.labourCost}</span>
        </div>

        <div className="p-3 bg-surface-50 rounded-xl border border-surface-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-700" />
            <div>
              <span className="font-bold text-surface-900 block">Material & Parts</span>
              <span className="text-[10px] text-surface-400 truncate max-w-[130px] block">
                {changeRequest.materialsList || 'Hardware & consumables'}
              </span>
            </div>
          </div>
          <span className="font-extrabold text-surface-900 font-mono">₹{changeRequest.materialCost}</span>
        </div>
      </div>

      {/* Comparison: Original vs New Total */}
      <div className="p-3 bg-white rounded-xl border border-surface-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-surface-400 block text-[10px] uppercase font-bold">Current Escrow Total</span>
          <span className="font-extrabold text-surface-700 font-mono text-sm">₹{booking.paymentBreakdown.totalAmount}</span>
        </div>
        <div className="text-purple-600 font-black text-sm">
          + ₹{changeRequest.totalExtraAmount} extra
        </div>
        <div className="text-right">
          <span className="text-purple-700 block text-[10px] uppercase font-bold">New Total If Approved</span>
          <span className="font-black text-purple-950 font-display text-base">
            ₹{booking.paymentBreakdown.totalAmount + changeRequest.totalExtraAmount}
          </span>
        </div>
      </div>

      {/* Cooperative Guarantee Notice */}
      <div className="p-2.5 bg-purple-50/70 border border-purple-200/60 rounded-xl text-[11px] text-purple-900 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
        <span>
          <strong>Strict Cooperative Policy: No unilateral price increase.</strong> You are never required to pay unexpected cash. If you reject this request, the technician must proceed with the original agreed work scope or contact the cooperative supervisor.
        </span>
      </div>

      {/* Action Buttons */}
      {isPending ? (
        <div>
          {!rejecting ? (
            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setRejecting(true)}
                className="px-4 py-2 border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Additional Work</span>
              </button>

              <button
                type="button"
                onClick={() => onApprove(booking.id, changeRequest.id)}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Additional Work (+₹{changeRequest.totalExtraAmount})</span>
              </button>
            </div>
          ) : (
            <div className="pt-2 space-y-2">
              <label className="text-[11px] font-bold text-surface-600 block">
                Reason for Rejection (Optional)
              </label>
              <input
                type="text"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Will manage material independently, or unnecessary extra scope"
                className="w-full text-xs p-2.5 border border-surface-300 rounded-xl focus:outline-none focus:border-purple-600"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejecting(false)}
                  className="px-3 py-1.5 text-xs text-surface-500 hover:text-surface-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onReject(booking.id, changeRequest.id, rejectReason);
                    setRejecting(false);
                  }}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
          changeRequest.status === 'approved' 
            ? 'bg-emerald-100 text-emerald-900' 
            : 'bg-rose-100 text-rose-900'
        }`}>
          {changeRequest.status === 'approved' ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Approved by customer. ₹{changeRequest.totalExtraAmount} added to escrow.</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-rose-700" />
              <span>Rejected by customer. Worker instructed to stick to original scope.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
