import React from 'react';
import { Shield, Award, HeartHandshake, CheckCircle2, AlertCircle, FileText, Check } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';

export const AdminWelfarePage: React.FC = () => {
  const pendingClaims = [
    {
      id: 'CLM-892',
      workerName: 'Ganesh Shinde',
      society: 'Kothrud Shramik Mandal',
      purpose: 'Tool Upgrade & Digital Multimeter Advance',
      amount: 4500,
      date: 'Today',
      status: 'Pending Society Approval'
    },
    {
      id: 'CLM-884',
      workerName: 'Anita More',
      society: 'Punyashlok Ahilyadevi Coop',
      purpose: 'Annual Health Checkup & CPR Refresher',
      amount: 2800,
      date: 'Yesterday',
      status: 'Approved & Disbursed'
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          Federation Welfare & Pension Fund Monitor
        </h1>
        <p className="text-xs text-surface-500">
          Supervising group insurance solvency, healthcare claims, and upskilling sponsorships.
        </p>
      </div>

      {/* 3 Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Welfare Reserves"
          value="₹38.4 Lakhs"
          subtitle="Audited reserve capital"
          icon={Shield}
          iconBgColor="bg-coop-50"
          iconColor="text-coop-800"
        />
        <StatCard
          title="Workers Health Covered"
          value="1,240 / 1,240"
          subtitle="100% full coverage compliance"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Training Subsidies Disbursed"
          value="₹4.2 Lakhs"
          subtitle="142 workers certified this quarter"
          icon={Award}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-700"
        />
      </div>

      {/* Claims Management Table */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-card">
        <h3 className="text-sm font-bold text-surface-900 mb-4">
          Emergency Welfare Advance & Insurance Claims
        </h3>

        <div className="space-y-3">
          {pendingClaims.map(c => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-surface-50 border border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-surface-900">{c.workerName} ({c.society})</h4>
                  <span className="text-[10px] font-mono bg-surface-200 px-1.5 py-0.2 rounded text-surface-700">
                    {c.id}
                  </span>
                </div>
                <p className="text-[11px] text-surface-600">
                  {c.purpose} • {c.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-surface-900 font-display">
                  ₹{c.amount.toLocaleString()}
                </span>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  c.status.includes('Approved') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                }`}>
                  {c.status}
                </span>

                {c.status.includes('Pending') && (
                  <button
                    onClick={() => alert(`Claim #${c.id} approved for instant bank transfer.`)}
                    className="px-3 py-1.5 bg-coop-900 hover:bg-coop-800 text-white font-bold rounded-xl shadow-xs"
                  >
                    Approve Advance
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
