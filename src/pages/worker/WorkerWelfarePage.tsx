import React, { useState } from 'react';
import { 
  Shield, 
  HeartHandshake, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  FileText, 
  PlusCircle, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';

interface WelfareScheme {
  id: string;
  name: string;
  category: string;
  status: 'ACTIVE' | 'PENDING' | 'NOT ELIGIBLE' | 'ACTION REQUIRED';
  benefit: string;
  coverage: string;
  authority: string;
  renewal: string;
}

export const WorkerWelfarePage: React.FC = () => {
  const { activeWorker } = useApp();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimReason, setClaimReason] = useState('Family Hospitalization Advance');
  const [claimAmount, setClaimAmount] = useState('15000');
  const [claimDispatched, setClaimDispatched] = useState(false);

  const welfareSchemes: WelfareScheme[] = [
    {
      id: 'ws1',
      name: 'Cooperative Group Health & Medical Cover',
      category: 'Health Insurance',
      status: 'ACTIVE',
      benefit: 'Cashless hospitalization in 140+ network hospitals in Pune',
      coverage: '₹5,00,000 / Year',
      authority: 'New India Assurance • Pune Labour Federation Policy',
      renewal: 'Active till March 2027',
    },
    {
      id: 'ws2',
      name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      category: 'Accidental Disability',
      status: 'ACTIVE',
      benefit: 'Permanent or partial accidental disability compensation',
      coverage: '₹2,00,000 Accidental Cover',
      authority: 'Govt of India • Integrated through Cooperative Ledger',
      renewal: 'Auto-debited by Society Fund',
    },
    {
      id: 'ws3',
      name: 'Cooperative Children Higher Education Scholarship',
      category: 'Education Grant',
      status: 'PENDING',
      benefit: 'Annual textbook and tuition assistance for 10th/12th students',
      coverage: '₹12,000 / Academic Year',
      authority: 'Maharashtra Labour Welfare Board (Pilot Scheme)',
      renewal: 'Under Committee Review (Docs verified)',
    },
    {
      id: 'ws4',
      name: 'Solar Rooftop & Smart EV Technician Subsidy',
      category: 'Upskilling Tool Grant',
      status: 'ACTION REQUIRED',
      benefit: '50% tool kit reimbursement upon completing Level 4 certification',
      coverage: '₹8,500 Tool Allowance',
      authority: 'National Skill Development Corporation (NSDC)',
      renewal: 'Upload practical exam completion certificate',
    },
    {
      id: 'ws5',
      name: 'Maternity / Paternity Family Welfare Benefit',
      category: 'Family Assistance',
      status: 'NOT ELIGIBLE',
      benefit: 'Paid family leave stipend for secondary domestic workers',
      coverage: '₹15,000 One-time Grant',
      authority: 'State Cooperative Welfare Fund',
      renewal: 'Requires 24 months continuous voting membership',
    },
  ];

  const getStatusBadge = (status: WelfareScheme['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold';
      case 'PENDING':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold';
      case 'ACTION REQUIRED':
        return 'bg-rose-100 text-rose-900 border-rose-300 font-extrabold animate-pulse';
      case 'NOT ELIGIBLE':
        return 'bg-surface-200 text-surface-600 border-surface-300 font-semibold';
    }
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimDispatched(true);
    setTimeout(() => {
      setIsClaimModalOpen(false);
      setClaimDispatched(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold mb-1.5 border border-emerald-200">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cooperative Social Safety Vault</span>
          </div>
          <h1 className="text-2xl font-black text-surface-900 font-display">
            Worker Welfare, Health Cover & Pension Center
          </h1>
          <p className="text-xs text-surface-500 max-w-xl">
            Social security managed collectively under Maharashtra Cooperative Societies Act. Every job contributes 5% to your medical and retirement buffer.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsClaimModalOpen(true)}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Apply for Welfare Claim</span>
        </button>
      </div>

      {/* 4 Status Cards Overview Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border-2 border-emerald-400 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Status Card</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-lg font-black text-emerald-900 block font-display">ACTIVE</span>
          <p className="text-xs text-surface-500 mt-0.5">2 Schemes fully funded & active</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border-2 border-amber-400 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">Status Card</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <span className="text-lg font-black text-amber-900 block font-display">PENDING</span>
          <p className="text-xs text-surface-500 mt-0.5">1 Grant under society audit</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border-2 border-rose-400 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-800">Status Card</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <span className="text-lg font-black text-rose-900 block font-display">ACTION REQUIRED</span>
          <p className="text-xs text-surface-500 mt-0.5">Upload exam certificate for ₹8,500</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-surface-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400">Status Card</span>
            <span className="w-2 h-2 rounded-full bg-surface-400" />
          </div>
          <span className="text-lg font-black text-surface-600 block font-display">NOT ELIGIBLE</span>
          <p className="text-xs text-surface-500 mt-0.5">Requires 24 months tenure</p>
        </div>
      </div>

      {/* Primary Welfare Schemes Table */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-card overflow-hidden">
        <div className="p-5 border-b border-surface-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-surface-900">Registered Welfare Schemes & Benefits</h3>
            <p className="text-xs text-surface-500">Government of Maharashtra & Federation Group Policies (Demo Data)</p>
          </div>
          <span className="text-[11px] font-bold text-surface-400 bg-surface-100 px-2 py-1 rounded">
            Audited Q3 2026
          </span>
        </div>

        <div className="divide-y divide-surface-100">
          {welfareSchemes.map(scheme => (
            <div key={scheme.id} className="p-5 hover:bg-surface-50/70 transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-surface-900 text-sm">{scheme.name}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] border uppercase ${getStatusBadge(scheme.status)}`}>
                      {scheme.status}
                    </span>
                  </div>
                  <p className="text-xs text-surface-500">{scheme.category} • {scheme.authority}</p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-sm font-black text-surface-900 font-display block">{scheme.coverage}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">{scheme.renewal}</span>
                </div>
              </div>
              <p className="text-xs text-surface-600 bg-surface-50 p-2.5 rounded-xl border border-surface-200/60">
                <strong>Benefit Scope:</strong> {scheme.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Upskilling Training Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Safety Training Card */}
        <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-surface-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Safety Training & Compliance Records
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              100% Compliant
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-surface-600">
            <div className="p-3 bg-surface-50 rounded-xl border border-surface-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-surface-900">OSHA 1000V Insulated Electrical Work</p>
                <p className="text-[11px] text-surface-500">Certified by Maharashtra Skill Mission</p>
              </div>
              <span className="font-bold text-emerald-700">Valid till 2028</span>
            </div>

            <div className="p-3 bg-surface-50 rounded-xl border border-surface-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-surface-900">Household Water Pressure Testing & Safety</p>
                <p className="text-[11px] text-surface-500">Certified by Pune Municipal Plumbing Guild</p>
              </div>
              <span className="font-bold text-emerald-700">Valid till 2027</span>
            </div>

            <div className="p-3 bg-surface-50 rounded-xl border border-surface-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-surface-900">Emergency First-Aid & CPR Certification</p>
                <p className="text-[11px] text-surface-500">Red Cross Society Pune Chapter</p>
              </div>
              <span className="font-bold text-emerald-700">Valid till 2027</span>
            </div>
          </div>
        </div>

        {/* Emergency Welfare Contact & Grievance */}
        <div className="bg-surface-900 text-white rounded-3xl p-6 border border-surface-800 shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[11px] font-bold">
              <PhoneCall className="w-3 h-3" />
              <span>Dedicated Welfare Officer</span>
            </div>
            <h3 className="text-base font-bold text-white">Need Emergency Welfare Assistance?</h3>
            <p className="text-xs text-surface-300 leading-relaxed">
              If you or an enrolled dependent face sudden medical hospitalization or accident, you can reach out directly to the Federation Welfare Grievance Cell.
            </p>
          </div>

          <div className="p-4 bg-surface-800/80 rounded-2xl border border-surface-700 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-surface-400">Welfare Officer:</span>
              <span className="font-bold text-white">Shri V. R. Deshmukh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-400">Helpline:</span>
              <span className="font-bold text-emerald-400">020-2567-9941 / 1800-266-7249</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-400">Office:</span>
              <span className="text-surface-300 truncate">Labour Bhavan, Shivajinagar, Pune</span>
            </div>
          </div>

          <p className="text-[10px] text-surface-400">
            Demo notice: Schemes and numbers are demonstrative for SIH evaluation.
          </p>
        </div>

      </div>

      {/* Welfare Claim Application Modal */}
      {isClaimModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-surface-200 space-y-5 animate-scale-up">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Cooperative Welfare Fund
              </span>
              <h3 className="text-lg font-black text-surface-900 font-display mt-1">
                Emergency Welfare Advance Application
              </h3>
              <p className="text-xs text-surface-500">
                Zero interest emergency financial advance disbursed directly to your verified bank account within 6 hours.
              </p>
            </div>

            {claimDispatched ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">Claim Dispatched Successfully!</h4>
                <p className="text-xs text-emerald-800">
                  Application #WLF-2026-8941 registered. Welfare Officer Shri Deshmukh has been notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-surface-800 block mb-1">Reason for Claim</label>
                  <select
                    value={claimReason}
                    onChange={e => setClaimReason(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-medium"
                  >
                    <option value="Family Hospitalization Advance">Family Hospitalization Advance</option>
                    <option value="Accidental Injury Recovery">Accidental Injury Recovery</option>
                    <option value="Tool Loss / Heavy Equipment Replacement">Tool Loss / Heavy Equipment Replacement</option>
                    <option value="Children Education Semester Fee">Children Education Semester Fee</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-surface-800 block mb-1">Requested Advance Amount (₹)</label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={e => setClaimAmount(e.target.value)}
                    min="5000"
                    max="50000"
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-bold"
                  />
                  <span className="text-[10px] text-surface-400 mt-0.5 block">Eligible credit limit: ₹45,000</span>
                </div>

                <div className="p-3 bg-surface-50 rounded-xl border border-surface-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-surface-500">Disbursement Account:</span>
                    <span className="font-bold text-surface-800 font-mono">••• 4892 (Pune DCC Bank)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Interest Rate:</span>
                    <span className="font-bold text-emerald-700">0% (Cooperative Benefit)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsClaimModalOpen(false)}
                    className="flex-1 py-2.5 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md"
                  >
                    Submit Claim
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
