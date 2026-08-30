import React, { useState } from 'react';
import { Shield, Award, HeartHandshake, CheckCircle2, AlertCircle, PlusCircle, ArrowRight, FileText } from 'lucide-react';
import type { Worker } from '../../types';
import { Modal } from '../common/Modal';

interface WelfareCardProps {
  worker: Worker;
}

export const WelfareCard: React.FC<WelfareCardProps> = ({ worker }) => {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimReason, setClaimReason] = useState('Medical Hospitalization Advance');
  const [claimAmount, setClaimAmount] = useState('15000');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimSubmitted(true);
    setTimeout(() => {
      setIsClaimModalOpen(false);
      setClaimSubmitted(false);
      alert('Emergency claim request dispatched to Pune Labour Federation Welfare Officer.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* 3 Top Welfare KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Insurance Card */}
        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">
                Group Health & Accident Cover
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Shield className="w-5 h-5" />
              </div>
            </div>

            <span className="text-2xl sm:text-3xl font-black text-surface-900 font-display block">
              ₹{(worker.welfare.insuranceCoverage / 100000).toFixed(1)} Lakhs
            </span>

            <p className="text-xs text-surface-500 mt-1">
              Cooperative policy underwritten with New India Assurance.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Active & Paid
            </span>
            <span className="text-surface-400">Renewal: 2027</span>
          </div>
        </div>

        {/* Training Credits Card */}
        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">
                Training & Upskilling Credits
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <span className="text-2xl sm:text-3xl font-black text-surface-900 font-display block">
              {worker.welfare.trainingCredits} Credits
            </span>

            <p className="text-xs text-surface-500 mt-1">
              Accumulated through 5-star ratings and on-time service delivery.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs">
            <span className="text-amber-800 font-bold">
              Eligible for Solar PV Level 4
            </span>
            <span className="text-coop-800 font-semibold cursor-pointer hover:underline">
              Redeem →
            </span>
          </div>
        </div>

        {/* Pension & Gratuity Card */}
        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">
                Cooperative Pension Reserve
              </span>
              <div className="p-2 rounded-xl bg-coop-50 text-coop-700">
                <HeartHandshake className="w-5 h-5" />
              </div>
            </div>

            <span className="text-2xl sm:text-3xl font-black text-coop-950 font-display block">
              ₹{worker.welfare.pensionFundBalance.toLocaleString()}
            </span>

            <p className="text-xs text-surface-500 mt-1">
              Compound interest accumulated with 5% matching cooperative contributions.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs">
            <span className="text-coop-800 font-bold">
              Annual Dividend: 8.4%
            </span>
            <span className="text-surface-400">Passbook #842</span>
          </div>
        </div>

      </div>

      {/* Welfare Actions & Emergency Assistance Panel */}
      <div className="bg-gradient-to-br from-coop-950 via-coop-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Emergency Worker Assistance Protocol</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-1 font-display">
            Need Instant Emergency Welfare Advance?
          </h3>

          <p className="text-xs text-surface-300 max-w-xl leading-relaxed">
            Cooperative members can claim zero-interest medical or emergency tool replacement assistance within 2 hours approved by the society board.
          </p>
        </div>

        <button
          onClick={() => setIsClaimModalOpen(true)}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-surface-950 text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Apply for Emergency Advance</span>
        </button>
      </div>

      {/* Emergency Claim Modal */}
      <Modal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        title="Submit Cooperative Welfare Claim"
        subtitle="Zero-interest welfare advance processed by Pune Labour Cooperative Society."
      >
        <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-xs font-bold text-surface-800 block mb-1">Claim Purpose</label>
            <select
              value={claimReason}
              onChange={(e) => setClaimReason(e.target.value)}
              className="w-full bg-surface-50 border border-surface-200 p-2.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <option value="Medical Hospitalization Advance">Medical Hospitalization Advance</option>
              <option value="Tool / Equipment Replacement">Tool / Equipment Breakage Replacement</option>
              <option value="Family Education Grant">Children Education Scholarship Grant</option>
              <option value="Festival Advance">Annual Cooperative Festival Advance</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-surface-800 block mb-1">Requested Amount (₹)</label>
            <input
              type="number"
              value={claimAmount}
              onChange={(e) => setClaimAmount(e.target.value)}
              className="w-full bg-surface-50 border border-surface-200 p-2.5 rounded-xl text-xs font-bold"
            />
          </div>

          <div className="p-3 bg-coop-50 rounded-xl border border-coop-200 text-[11px] text-coop-900 leading-relaxed">
            ✓ Your current available pension & welfare collateral limit is <strong>₹48,600</strong>.
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-surface-100">
            <button
              type="button"
              onClick={() => setIsClaimModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-surface-600 hover:bg-surface-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={claimSubmitted}
              className="px-5 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{claimSubmitted ? 'Processing...' : 'Submit Claim Request'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
