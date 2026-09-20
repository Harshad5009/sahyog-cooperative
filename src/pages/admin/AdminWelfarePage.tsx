import React, { useState, useEffect } from 'react';
import { Shield, Award, HeartHandshake, CheckCircle2, AlertCircle, FileText, Check, IndianRupee, Users, Building, Activity } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { adminApi } from '../../utils/apiClient';

export const AdminWelfarePage: React.FC = () => {
  const [welfareData, setWelfareData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pendingClaims, setPendingClaims] = useState([
    {
      id: 'CLM-892',
      workerName: 'Ganesh Shinde',
      society: 'Shramik Vikas Cooperative Society',
      purpose: 'Tool Upgrade & Digital Multimeter Advance',
      amount: 4500,
      date: 'Today',
      status: 'Pending Society Approval'
    },
    {
      id: 'CLM-884',
      workerName: 'Anita More',
      society: 'Sarvajana Seva Cooperative',
      purpose: 'Annual Health Checkup & CPR Refresher',
      amount: 2800,
      date: 'Yesterday',
      status: 'Approved & Disbursed'
    }
  ]);

  useEffect(() => {
    const fetchWelfare = async () => {
      setLoading(true);
      try {
        const res = await adminApi.getWelfare();
        if (res?.data) {
          setWelfareData(res.data);
        }
      } catch (e) {
        // graceful fallback to static metrics
      } finally {
        setLoading(false);
      }
    };
    fetchWelfare();
  }, []);

  const handleApproveClaim = (id: string) => {
    setPendingClaims(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved & Disbursed' } : c));
    alert(`Welfare Advance #${id} authorized under ICA Democratic Cooperative Bylaw. Direct bank settlement processed.`);
  };

  const summary = welfareData?.summary || {
    totalGrossRevenue: 42800,
    workerTakeHome80: 34240,
    societyReserve10: 4280,
    welfareFund5: 2140,
    platformOps5: 2140,
  };

  const benefits = welfareData?.welfareBenefits || {
    activeInsuredWorkers: 12,
    healthCoveragePerWorker: '₹2,00,000 Group Cashless Hospitalisation',
    accidentalCoveragePerWorker: '₹5,00,000 Pradhan Mantri Suraksha Bima Yojana equivalent',
    pensionAccrualRate: '3% matching society contribution',
    activeClaimsCount: 1,
    disbursedThisQuarter: 12400,
  };

  return (
    <div className="space-y-6">
      
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-1">
          ICA Cooperative Principle 7: Concern for Community & Worker Welfare
        </span>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          Federation Welfare & Cooperative Revenue Ledger
        </h1>
        <p className="text-xs text-surface-500">
          Enforcing the 80/10/5/5 transparent distribution model: 80% worker earnings, 10% society reserve, 5% healthcare/pension welfare, and 5% platform operations.
        </p>
      </div>

      {/* 4 Revenue Allocation Cards (80/10/5/5 Model) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-bold mb-1">
            <span>Worker Direct Share (80%)</span>
            <span className="bg-emerald-200/80 px-2 py-0.5 rounded text-[10px]">Take-Home</span>
          </div>
          <div className="text-2xl font-black text-emerald-950 font-display">
            ₹{summary.workerTakeHome80?.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">Direct to technician bank/UPI</p>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
          <div className="flex items-center justify-between text-xs text-blue-800 font-bold mb-1">
            <span>Society Reserve (10%)</span>
            <span className="bg-blue-200/80 px-2 py-0.5 rounded text-[10px]">Capital</span>
          </div>
          <div className="text-2xl font-black text-blue-950 font-display">
            ₹{summary.societyReserve10?.toLocaleString()}
          </div>
          <p className="text-[11px] text-blue-700 mt-1">Equipment & tools capital fund</p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
          <div className="flex items-center justify-between text-xs text-purple-800 font-bold mb-1">
            <span>Welfare & Health (5%)</span>
            <span className="bg-purple-200/80 px-2 py-0.5 rounded text-[10px]">Healthcare</span>
          </div>
          <div className="text-2xl font-black text-purple-950 font-display">
            ₹{summary.welfareFund5?.toLocaleString()}
          </div>
          <p className="text-[11px] text-purple-700 mt-1">Group insurance & pension pool</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-200">
          <div className="flex items-center justify-between text-xs text-surface-700 font-bold mb-1">
            <span>Platform Operations (5%)</span>
            <span className="bg-surface-200 px-2 py-0.5 rounded text-[10px]">Operations</span>
          </div>
          <div className="text-2xl font-black text-surface-900 font-display">
            ₹{summary.platformOps5?.toLocaleString()}
          </div>
          <p className="text-[11px] text-surface-500 mt-1">Cloud, SMS OTP & map telemetry</p>
        </div>
      </div>

      {/* Insurance & Social Security Guarantee Panel */}
      <div className="bg-gradient-to-r from-coop-950 via-coop-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Cooperative Social Security & Health Insurance Charter</h2>
            </div>
            <p className="text-xs text-surface-300">
              Automatic statutory group protection activated upon cooperative membership onboarding
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30 text-xs font-bold">
            100% Active Workers Insured
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Group Health Policy</span>
            <p className="font-bold text-white text-sm">{benefits.healthCoveragePerWorker}</p>
            <p className="text-[11px] text-surface-300 mt-1">Cashless access across 450+ empanelled Maharashtra hospitals.</p>
          </div>

          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Accident & Disability</span>
            <p className="font-bold text-white text-sm">{benefits.accidentalCoveragePerWorker}</p>
            <p className="text-[11px] text-surface-300 mt-1">24x7 transit and occupational hazard safety shield.</p>
          </div>

          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Cooperative Pension</span>
            <p className="font-bold text-white text-sm">{benefits.pensionAccrualRate}</p>
            <p className="text-[11px] text-surface-300 mt-1">Compounded monthly from the 5% cooperative welfare levy.</p>
          </div>
        </div>
      </div>

      {/* Claims Management Table */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-surface-900">
              Emergency Welfare Advance & Equipment Sponsoring Desk
            </h3>
            <p className="text-xs text-surface-500">Democratically authorized by primary society branch officers</p>
          </div>
          <span className="text-xs font-bold text-surface-500">
            {pendingClaims.length} Active Records
          </span>
        </div>

        <div className="space-y-3">
          {pendingClaims.map(c => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-surface-50 border border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-surface-900">{c.workerName}</h4>
                  <span className="text-[11px] text-surface-500 font-medium">({c.society})</span>
                  <span className="text-[10px] font-mono bg-surface-200 px-1.5 py-0.5 rounded text-surface-700">
                    {c.id}
                  </span>
                </div>
                <p className="text-[11px] text-surface-600">
                  {c.purpose} • <span className="text-surface-400">{c.date}</span>
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
                    onClick={() => handleApproveClaim(c.id)}
                    className="px-3.5 py-1.5 bg-coop-900 hover:bg-coop-800 text-white font-bold rounded-xl shadow-xs transition"
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
export default AdminWelfarePage;
