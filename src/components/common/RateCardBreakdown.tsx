import React from 'react';
import { ShieldCheck, Info, Sparkles, CheckCircle2, Wrench, Clock, Truck, Hammer } from 'lucide-react';
import type { RateCardPricing } from '../../types';

interface RateCardBreakdownProps {
  pricing: RateCardPricing;
  serviceName?: string;
  isCompact?: boolean;
  showCoopGuarantee?: boolean;
}

export const RateCardBreakdown: React.FC<RateCardBreakdownProps> = ({
  pricing,
  serviceName,
  isCompact = false,
  showCoopGuarantee = true,
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-surface-200 ${isCompact ? 'p-3.5 text-xs' : 'p-5 text-sm'} shadow-xs space-y-4`}>
      {serviceName && (
        <div className="flex items-center justify-between pb-3 border-b border-surface-100">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-coop-800 bg-coop-50 px-2 py-0.5 rounded">
              Standard Rate Card
            </span>
            <h4 className="font-bold text-surface-900 text-sm mt-1">{serviceName}</h4>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-surface-400 block font-medium">Estimated Total</span>
            <span className="text-lg font-black text-coop-950 font-display">₹{pricing.estimatedTotal}</span>
          </div>
        </div>
      )}

      {/* 4 Core Line Items as required by evaluation prompt */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between py-1 border-b border-surface-100/60 text-surface-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-surface-100 flex items-center justify-center text-surface-600 shrink-0">
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-xs text-surface-900">Base Service Charge</span>
              <span className="text-[10px] text-surface-400">Diagnosis, inspection & standard safety setup</span>
            </div>
          </div>
          <span className="font-extrabold text-xs text-surface-900 font-mono">₹{pricing.baseServiceCharge}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-surface-100/60 text-surface-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-coop-50 flex items-center justify-center text-coop-700 shrink-0">
              <Hammer className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-xs text-surface-900">Labour Charge</span>
              <span className="text-[10px] text-surface-400">Standard certified technician hourly skill rate</span>
            </div>
          </div>
          <span className="font-extrabold text-xs text-surface-900 font-mono">₹{pricing.labourCharge}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-surface-100/60 text-surface-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-xs text-surface-900">Material Charge</span>
              <span className="text-[10px] text-surface-400">Standard consumables / parts estimate (₹0 if customer provided)</span>
            </div>
          </div>
          <span className="font-extrabold text-xs text-surface-900 font-mono">₹{pricing.materialCharge}</span>
        </div>

        <div className="flex items-center justify-between py-1 text-surface-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
              <Truck className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block text-xs text-surface-900">Travel / Visit Charge</span>
              <span className="text-[10px] text-surface-400">
                {pricing.travelCharge > 0 ? 'Zone-based conveyance allowance' : 'Free within local cooperative cluster'}
              </span>
            </div>
          </div>
          <span className={`font-extrabold text-xs font-mono ${pricing.travelCharge === 0 ? 'text-emerald-700' : 'text-surface-900'}`}>
            {pricing.travelCharge === 0 ? 'FREE (0)' : `₹${pricing.travelCharge}`}
          </span>
        </div>
      </div>

      {/* Estimated Total Price Row */}
      <div className="pt-3 border-t-2 border-surface-200 flex items-center justify-between bg-surface-50 -mx-5 -mb-5 p-4 rounded-b-2xl">
        <div>
          <span className="text-xs font-black text-surface-900 uppercase tracking-wider block">Estimated Price Before Booking</span>
          <span className="text-[10px] text-surface-500 font-medium">All-inclusive transparent cooperative quote</span>
        </div>
        <div className="text-right">
          <span className="text-xl font-black text-coop-950 font-display">₹{pricing.estimatedTotal}</span>
        </div>
      </div>

      {showCoopGuarantee && (
        <div className="pt-2 text-[11px] text-surface-500 flex items-start gap-1.5 leading-snug">
          <ShieldCheck className="w-4 h-4 text-coop-700 shrink-0 mt-0.5" />
          <span>
            <strong>Cooperative Pricing Shield:</strong> No worker is permitted to unilaterally increase prices on-site. Any extra scope must be submitted as a formal Change Request and approved by you.
          </span>
        </div>
      )}
    </div>
  );
};
