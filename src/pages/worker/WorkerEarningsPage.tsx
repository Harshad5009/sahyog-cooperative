import React, { useState } from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, ShieldCheck, Download, CheckCircle2, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkerEarningsPage: React.FC = () => {
  const { activeWorker, bookings } = useApp();
  const [withdrawn, setWithdrawn] = useState(false);

  const completed = bookings.filter(b => b.status === 'completed');
  const totalEarned = completed.reduce((acc, curr) => acc + curr.paymentBreakdown.workerEarnings, 0) + 800;

  const handleWithdraw = () => {
    setWithdrawn(true);
    setTimeout(() => setWithdrawn(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          Earnings & Cooperative Payouts
        </h1>
        <p className="text-xs text-surface-500">
          Transparent 80% direct earnings ledger with zero hidden deductions.
        </p>
      </div>

      {/* 3 Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card">
          <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block mb-1">
            Available Wallet Payout
          </span>
          <span className="text-3xl font-black text-emerald-800 font-display block">
            ₹{totalEarned.toLocaleString()}
          </span>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-surface-400">Direct Bank Deposit (IMPS)</span>
            <button
              onClick={handleWithdraw}
              className="px-3 py-1.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              {withdrawn ? 'Deposited ✓' : 'Instant Payout'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card">
          <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block mb-1">
            Welfare Contributions Accumulated
          </span>
          <span className="text-3xl font-black text-amber-800 font-display block">
            ₹{(totalEarned * 0.0625).toFixed(0)}
          </span>
          <div className="mt-4 text-[11px] text-amber-900 font-semibold">
            Credited to ₹5 Lakh Health Cover
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-surface-200 shadow-card">
          <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block mb-1">
            Cooperative Society Dividend
          </span>
          <span className="text-3xl font-black text-coop-950 font-display block">
            8.4% p.a.
          </span>
          <div className="mt-4 text-[11px] text-coop-800 font-semibold">
            Annual shareholder profit share
          </div>
        </div>
      </div>

      {/* Breakdown Ledger Table */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-surface-900">
            Recent Service Settlements & Ledger
          </h3>
          <button
            onClick={() => alert('Monthly earnings statement PDF exported.')}
            className="text-xs font-bold text-coop-800 hover:underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            Download Statement
          </button>
        </div>

        <div className="space-y-3">
          {completed.map(bk => (
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

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="text-sm font-black text-emerald-800 block font-display">
                    +₹{bk.paymentBreakdown.workerEarnings}
                  </span>
                  <span className="text-[10px] text-surface-400">
                    Gross: ₹{bk.paymentBreakdown.totalAmount} (80% Take-Home)
                  </span>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Deposited
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
