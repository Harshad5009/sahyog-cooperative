import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  TrendingUp,
  FileText,
  Printer,
  X,
  Building2,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkerEarningsPage: React.FC = () => {
  const { activeWorker, bookings } = useApp();
  const [withdrawn, setWithdrawn] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'lifetime'>('month');
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);

  const completed = bookings.filter(b => b.status === 'completed');
  
  // Demonstrative totals aligned with SIH requirements
  const grossEarnings = timeFilter === 'week' ? 7800 : timeFilter === 'month' ? 34200 : 184500;
  const netEarnings = Math.round(grossEarnings * 0.8);
  const coopContrib = Math.round(grossEarnings * 0.1);
  const welfareContrib = Math.round(grossEarnings * 0.05);
  const platformFee = Math.round(grossEarnings * 0.05);

  const handleWithdraw = () => {
    setWithdrawn(true);
    setTimeout(() => setWithdrawn(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-900 font-display">
            Earnings & Cooperative Payouts
          </h1>
          <p className="text-xs text-surface-500">
            Transparent 80% direct earnings ledger with zero hidden deductions.
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-1 bg-surface-100 p-1 rounded-2xl border border-surface-200 text-xs self-start sm:self-auto">
          {[
            { id: 'week', label: 'This Week' },
            { id: 'month', label: 'This Month' },
            { id: 'lifetime', label: 'All Time' },
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTimeFilter(t.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                timeFilter === t.id
                  ? 'bg-white text-surface-950 shadow-xs'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block mb-1">
              Net Take-Home Earnings (80%)
            </span>
            <span className="text-3xl font-black text-emerald-800 font-display block">
              ₹{netEarnings.toLocaleString()}
            </span>
            <p className="text-xs text-surface-400 mt-1">From Gross: ₹{grossEarnings.toLocaleString()}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between">
            <span className="text-[11px] text-surface-500 font-medium">Bank IMPS Ready</span>
            <button
              onClick={handleWithdraw}
              className="px-3.5 py-1.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              {withdrawn ? 'Deposited ✓' : 'Instant Payout'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block mb-1">
              Welfare & Insurance Reserve (5%)
            </span>
            <span className="text-3xl font-black text-amber-800 font-display block">
              ₹{welfareContrib.toLocaleString()}
            </span>
            <p className="text-xs text-surface-400 mt-1">Credited to ₹5 Lakh Health Cover</p>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-100 text-[11px] text-amber-900 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Policy #PMJAY-COOP-882</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block mb-1">
              Cooperative Patronage Share (10%)
            </span>
            <span className="text-3xl font-black text-coop-950 font-display block">
              ₹{coopContrib.toLocaleString()}
            </span>
            <p className="text-xs text-surface-400 mt-1">Annual member dividend pool</p>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-100 text-[11px] text-coop-800 font-semibold flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-coop-600" />
            <span>8.4% p.a. Projected Dividend</span>
          </div>
        </div>
      </div>

      {/* Breakdown Ledger Table */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-surface-900">
              Recent Service Settlements & Ledger
            </h3>
            <p className="text-xs text-surface-500">Every booking payout itemized with cooperative deductions</p>
          </div>
          <button
            type="button"
            onClick={() => setIsStatementModalOpen(true)}
            className="px-3 py-1.5 bg-surface-100 hover:bg-surface-200 text-coop-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Statement PDF</span>
          </button>
        </div>

        <div className="space-y-3">
          {completed.length > 0 ? (
            completed.map(bk => (
              <div
                key={bk.id}
                className="p-4 rounded-2xl bg-surface-50 border border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-surface-900">{bk.subServiceName}</h4>
                  <p className="text-[11px] text-surface-500">
                    Customer: {bk.customerName} • Booking #{bk.bookingNumber} • {bk.date}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <span className="text-surface-400 block text-[10px]">Customer Paid</span>
                    <span className="font-bold text-surface-800">₹{bk.paymentBreakdown.totalAmount}</span>
                  </div>
                  <div>
                    <span className="text-surface-400 block text-[10px]">Your 80% Payout</span>
                    <span className="font-black text-emerald-800 text-sm">₹{bk.paymentBreakdown.workerEarnings}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Settled
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-surface-400 text-center py-6">No completed job settlements yet</p>
          )}
        </div>
      </div>

      {/* Printable Statement Modal */}
      {isStatementModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-surface-200 space-y-5">
            <div className="flex items-start justify-between border-b border-surface-200 pb-3">
              <div>
                <h3 className="text-base font-black text-surface-900 font-display">
                  Worker Monthly Settlement Statement
                </h3>
                <p className="text-xs text-surface-500">Maharashtra Labour Cooperative Societies Federation</p>
              </div>
              <button
                type="button"
                onClick={() => setIsStatementModalOpen(false)}
                className="p-1 rounded-lg text-surface-500 hover:bg-surface-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-surface-500">Specialist:</span>
                <span className="font-bold text-surface-900">{activeWorker.name} ({activeWorker.membershipId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Affiliated Society:</span>
                <span className="font-semibold text-surface-800">{activeWorker.cooperativeSociety}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Gross Service Revenue:</span>
                <span className="font-bold text-surface-900">₹{grossEarnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Direct Take-Home (80%):</span>
                <span className="font-black text-emerald-800 text-sm">₹{netEarnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Welfare & Health (5%):</span>
                <span className="font-bold text-amber-800">₹{welfareContrib.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Cooperative Society Fund (10%):</span>
                <span className="font-bold text-coop-800">₹{coopContrib.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsStatementModalOpen(false)}
                className="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 bg-coop-900 hover:bg-coop-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Statement PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
