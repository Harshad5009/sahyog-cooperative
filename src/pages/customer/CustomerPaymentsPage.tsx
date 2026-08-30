import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Shield, TrendingUp } from 'lucide-react';

export const CustomerPaymentsPage: React.FC = () => {
  const { bookings } = useApp();
  const completed = bookings.filter(b => b.status === 'completed');
  const totalSpent = completed.reduce((a, b) => a + b.paymentBreakdown.totalAmount, 0);
  const totalWorkerPaid = completed.reduce((a, b) => a + b.paymentBreakdown.workerEarnings, 0);
  const totalWelfare = completed.reduce((a, b) => a + b.paymentBreakdown.welfareInsurance, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Payments & Transactions</h1>
        <p className="text-xs text-gray-500">Full transparent payment history with cooperative impact breakdown</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, sub: 'All services combined', color: 'text-gray-900' },
          { label: 'Paid to Workers', value: `₹${totalWorkerPaid.toLocaleString()}`, sub: '80% direct to cooperative members', color: 'text-green-700' },
          { label: 'Welfare Fund', value: `₹${totalWelfare.toLocaleString()}`, sub: 'Health & insurance contributions', color: 'text-blue-700' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Payment Breakdown Visual */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Payment Distribution (per ₹100)</h2>
        <div className="space-y-3">
          {[
            { label: 'Worker Direct Earnings', pct: 80, color: 'bg-green-500' },
            { label: 'Worker Welfare & Insurance', pct: 5, color: 'bg-blue-500' },
            { label: 'Cooperative Society Fund', pct: 10, color: 'bg-amber-500' },
            { label: 'Platform Operations', pct: 5, color: 'bg-gray-400' },
          ].map(row => (
            <div key={row.label}>
              <div className="flex justify-between text-xs text-gray-700 mb-1">
                <span className="font-medium">{row.label}</span>
                <span className="font-bold">₹{row.pct}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className={`h-2 ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Transaction History</h2>
        {completed.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No transactions yet</p>
        ) : (
          <div className="space-y-2">
            {completed.map(bk => (
              <div key={bk.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{bk.subServiceName}</p>
                    <p className="text-xs text-gray-500">{bk.date} · {bk.assignedWorker?.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹{bk.paymentBreakdown.totalAmount}</p>
                  <p className="text-xs text-green-600 font-semibold">Paid</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
