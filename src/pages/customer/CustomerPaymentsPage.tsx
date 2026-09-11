import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, ShieldCheck, ArrowRight, TrendingUp, AlertTriangle, Undo2, CheckCircle2, Tag } from 'lucide-react';
import { PaymentStatusBadge } from '../../components/common/PaymentStatusBadge';
import { calculateRateCardPricing } from '../../utils/pricingAndPayment';

export const CustomerPaymentsPage: React.FC = () => {
  const { bookings } = useApp();
  const [filter, setFilter] = useState<'all' | 'held' | 'additional' | 'released' | 'refunded'>('all');

  const releasedBookings = bookings.filter(b => b.paymentStatus === 'payment_released' || b.paymentStatus === 'paid_to_worker');
  const heldBookings = bookings.filter(b => b.paymentStatus === 'payment_protected_held' || b.paymentStatus === 'held_in_coop_escrow');
  const additionalRequestedBookings = bookings.filter(b => b.paymentStatus === 'additional_amount_requested');
  const refundedBookings = bookings.filter(b => b.paymentStatus === 'refund_completed' || b.paymentStatus === 'refund_initiated' || b.paymentStatus === 'refunded');

  const totalSpent = releasedBookings.reduce((a, b) => a + b.paymentBreakdown.totalAmount, 0);
  const totalHeldInEscrow = heldBookings.reduce((a, b) => a + b.paymentBreakdown.totalAmount, 0);
  const totalWorkerPaid = releasedBookings.reduce((a, b) => a + b.paymentBreakdown.workerEarnings, 0);
  const totalWelfare = releasedBookings.reduce((a, b) => a + b.paymentBreakdown.welfareInsurance, 0);
  const totalRefunded = refundedBookings.reduce((a, b) => a + (b.refundDetails?.amount || b.paymentBreakdown.totalAmount), 0);

  const filteredBookings = 
    filter === 'held' ? heldBookings :
    filter === 'additional' ? additionalRequestedBookings :
    filter === 'released' ? releasedBookings :
    filter === 'refunded' ? refundedBookings :
    bookings;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 font-display">
          Payments & Cooperative Escrow Ledger
        </h1>
        <p className="text-xs text-gray-500">
          Full transparent payment lifecycle: Payment Pending, Protected/Held, Additional Requested, Released, and Refunded.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-gray-500 block mb-1">Protected in Escrow</span>
          <p className="text-2xl font-black text-blue-700 font-display">₹{totalHeldInEscrow.toLocaleString()}</p>
          <p className="text-[10px] text-blue-600/80 mt-0.5 font-medium">Safe until you approve work</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-gray-500 block mb-1">Released to Workers</span>
          <p className="text-2xl font-black text-emerald-700 font-display">₹{totalWorkerPaid.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-600/80 mt-0.5 font-medium">80% direct technician wage</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-gray-500 block mb-1">Welfare & Insurance</span>
          <p className="text-2xl font-black text-coop-800 font-display">₹{totalWelfare.toLocaleString()}</p>
          <p className="text-[10px] text-coop-600/80 mt-0.5 font-medium">5% to worker health & accident fund</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] text-gray-500 block mb-1">Refunds Settled</span>
          <p className="text-2xl font-black text-gray-800 font-display">₹{totalRefunded.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 mt-0.5 font-medium">100% money-back guarantee</p>
        </div>
      </div>

      {/* Cooperative Payment Distribution Philosophy */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cooperative Transparency Distribution (Every ₹100 Paid)</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            Zero Private VC Margins
          </span>
        </div>

        <div className="space-y-2.5 pt-1">
          {[
            { label: 'Technician Direct Wage (Instant Settlement)', pct: 80, color: 'bg-emerald-600' },
            { label: 'Worker Welfare, Health & ₹5L Accident Cover', pct: 5, color: 'bg-blue-600' },
            { label: 'Labour Cooperative Society Local Fund', pct: 10, color: 'bg-amber-600' },
            { label: 'Digital Platform Maintenance & Contingency', pct: 5, color: 'bg-gray-400' },
          ].map(row => (
            <div key={row.label}>
              <div className="flex justify-between text-xs text-gray-700 mb-1">
                <span className="font-medium">{row.label}</span>
                <span className="font-bold font-mono">₹{row.pct}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs by Payment Status */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-surface-100 rounded-2xl w-fit text-xs font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'all' ? 'bg-white text-gray-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'}`}
        >
          All Ledger ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('held')}
          className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'held' ? 'bg-white text-blue-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Protected/Held ({heldBookings.length})
        </button>
        <button
          onClick={() => setFilter('additional')}
          className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'additional' ? 'bg-white text-purple-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Additional Requested ({additionalRequestedBookings.length})
        </button>
        <button
          onClick={() => setFilter('released')}
          className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'released' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Payment Released ({releasedBookings.length})
        </button>
        <button
          onClick={() => setFilter('refunded')}
          className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'refunded' ? 'bg-white text-gray-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Refunds ({refundedBookings.length})
        </button>
      </div>

      {/* Transaction List with Itemized Rate Card Breakdown */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-gray-900">Itemized Payment & Rate Card Records</h2>
        
        {filteredBookings.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-8">No transactions matching this filter</p>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map(bk => {
              const pricing = bk.rateCardPricing || calculateRateCardPricing(bk.paymentBreakdown.totalAmount, bk.isEmergency);

              return (
                <div key={bk.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3 hover:border-gray-300 transition-colors">
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-200">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{bk.subServiceName}</h4>
                      <p className="text-[11px] text-gray-500">
                        #{bk.bookingNumber} • {bk.date} • Specialist: <strong>{bk.assignedWorker?.name}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <PaymentStatusBadge status={bk.paymentStatus} size="sm" />
                      <span className="text-base font-black text-gray-900 font-display">
                        ₹{bk.paymentBreakdown.totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* 4 Line Item Rate Card Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-2 bg-white rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Base Charge</span>
                      <span className="font-semibold text-gray-800 font-mono">₹{pricing.baseServiceCharge}</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Labour Work</span>
                      <span className="font-semibold text-gray-800 font-mono">₹{pricing.labourCharge}</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Materials/Parts</span>
                      <span className="font-semibold text-gray-800 font-mono">₹{pricing.materialCharge}</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Travel/Visit</span>
                      <span className={`font-semibold font-mono ${pricing.travelCharge === 0 ? 'text-emerald-700' : 'text-gray-800'}`}>
                        {pricing.travelCharge === 0 ? 'FREE' : `₹${pricing.travelCharge}`}
                      </span>
                    </div>
                  </div>

                  {/* Additional Note or Refund info */}
                  {bk.paymentStatus === 'additional_amount_requested' && bk.changeRequests && bk.changeRequests[0] && (
                    <div className="p-2 bg-purple-50 border border-purple-200 rounded-xl text-[11px] text-purple-900 flex items-center justify-between">
                      <span>
                        ⚠️ Worker requested extra <strong>+₹{bk.changeRequests[0].totalExtraAmount}</strong>: "{bk.changeRequests[0].reason}"
                      </span>
                      <span className="font-bold underline cursor-pointer">Review on Bookings tab</span>
                    </div>
                  )}

                  {bk.refundDetails && (
                    <div className="p-2 bg-orange-50 border border-orange-200 rounded-xl text-[11px] text-orange-900 flex items-center justify-between">
                      <span>
                        ↩️ Refund of <strong>₹{bk.refundDetails.amount}</strong>: {bk.refundDetails.reason}
                      </span>
                      <span className="font-mono text-[10px]">{bk.refundDetails.completedAt || 'In progress'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
