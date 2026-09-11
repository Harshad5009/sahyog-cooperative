import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Navigation, 
  Star, 
  ShieldCheck, 
  Award, 
  Wallet, 
  Clock, 
  Briefcase, 
  Siren, 
  Check, 
  QrCode,
  AlertCircle
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { SkillPassportCard } from '../../components/worker/SkillPassportCard';

export const WorkerDashboard: React.FC = () => {
  const { activeWorker, bookings, updateBookingStatus } = useApp();
  const [isAvailable, setIsAvailable] = useState(activeWorker.isAvailable);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'completed'>('active');

  const activeJobs = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const completedJobs = bookings.filter(b => b.status === 'completed');
  
  // Real demo metrics as required: Today's jobs: 4, Month earnings: ₹28,450, Rating: 4.8★, Completed: 126
  const todaysJobsCount = 4;
  const thisMonthEarnings = 28450;
  const jobsCompletedCount = 126;
  const ratingScore = 4.8;

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Availability Card */}
      <div className="bg-white border border-surface-200 rounded-3xl p-5 sm:p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img 
            src={activeWorker.avatar} 
            alt={activeWorker.name} 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm shrink-0" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-surface-900 font-display">
                Namaste, {activeWorker.name}
              </h1>
              <span className="p-0.5 bg-emerald-100 text-emerald-800 rounded-full" title="KYC & Skill Verified">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xs text-surface-500">{activeWorker.cooperativeSociety}</p>
            <p className="text-[11px] text-surface-400 font-mono mt-0.5">Worker ID: {activeWorker.membershipId}</p>
          </div>
        </div>

        {/* Availability Toggle & Passport Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Availability Toggle */}
          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
              isAvailable 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-surface-100 border-surface-300 text-surface-600'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-surface-400'}`} />
            <span>{isAvailable ? 'Online & Ready for Jobs' : 'Offline (On Break)'}</span>
          </button>

          {/* Skill Passport Trigger */}
          <button
            type="button"
            onClick={() => setIsPassportModalOpen(true)}
            className="px-4 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-2xl shadow-xs flex items-center gap-1.5 transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>My Skill Passport</span>
          </button>
        </div>
      </div>

      {/* 5 Core Evaluation KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-coop-50 text-coop-700 flex items-center justify-center mb-2">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-surface-900 font-display block">{todaysJobsCount}</span>
          <span className="text-[11px] text-surface-500 font-medium">Today's Jobs</span>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
            <Wallet className="w-4 h-4" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-900 font-display block">₹{thisMonthEarnings.toLocaleString()}</span>
          <span className="text-[11px] text-surface-500 font-medium">This Month Earnings</span>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
            <Star className="w-4 h-4 fill-amber-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-amber-900 font-display block">{ratingScore} ★</span>
          <span className="text-[11px] text-surface-500 font-medium">Customer Rating</span>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-surface-900 font-display block">{jobsCompletedCount}</span>
          <span className="text-[11px] text-surface-500 font-medium">Jobs Completed</span>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs col-span-2 sm:col-span-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-800 font-display block">100% ✓</span>
          <span className="text-[11px] text-surface-500 font-medium">Profile Verified</span>
        </div>
      </div>

      {/* Active Service Dispatch Card */}
      {activeJobs.length > 0 ? (
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-5 sm:p-6 shadow-elevated space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-surface-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="text-sm font-bold text-surface-900">Current Assigned Service Order</h2>
              <span className="text-xs font-mono font-bold bg-surface-100 px-2 py-0.5 rounded text-surface-700">
                #{activeJobs[0].bookingNumber}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-900">
              {activeJobs[0].status.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-surface-400 block mb-0.5">Service & Customer</span>
              <p className="font-bold text-surface-900 text-sm">{activeJobs[0].subServiceName}</p>
              <p className="text-surface-600 font-medium">{activeJobs[0].customerName} • {activeJobs[0].customerPhone}</p>
            </div>
            <div>
              <span className="text-surface-400 block mb-0.5">Location & Slot</span>
              <p className="font-semibold text-surface-800">{activeJobs[0].address.street}</p>
              <p className="text-surface-500">{activeJobs[0].address.area} • {activeJobs[0].timeSlot}</p>
            </div>
            <div>
              <span className="text-surface-400 block mb-0.5">Your Net Earning</span>
              <p className="text-xl font-black text-emerald-800 font-display">
                ₹{activeJobs[0].paymentBreakdown.workerEarnings}
              </p>
              <p className="text-[11px] text-surface-400">+ ₹{activeJobs[0].paymentBreakdown.welfareInsurance} health fund</p>
            </div>
          </div>

          <div className="p-3.5 bg-surface-50 rounded-2xl border border-surface-200 text-xs text-surface-700">
            <span className="font-bold text-surface-900">Reported Problem: </span>
            "{activeJobs[0].problemDescription}"
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-100">
            <div className="flex items-center gap-2">
              <a
                href={`tel:${activeJobs[0].customerPhone}`}
                className="px-3.5 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </a>
              <span className="text-xs text-surface-400 font-medium hidden sm:inline">
                Address: {activeJobs[0].address.area} (~1.8 km)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {activeJobs[0].status === 'allocated' && (
                <button
                  type="button"
                  onClick={() => updateBookingStatus(activeJobs[0].id, 'accepted_by_worker')}
                  className="px-4 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                >
                  Accept Job
                </button>
              )}
              {activeJobs[0].status === 'accepted_by_worker' && (
                <button
                  type="button"
                  onClick={() => updateBookingStatus(activeJobs[0].id, 'en_route')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                >
                  Start Trip (En Route)
                </button>
              )}
              {activeJobs[0].status === 'en_route' && (
                <button
                  type="button"
                  onClick={() => updateBookingStatus(activeJobs[0].id, 'arrived')}
                  className="px-4 py-2 bg-coop-800 hover:bg-coop-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                >
                  Mark Arrived
                </button>
              )}
              {activeJobs[0].status === 'arrived' && (
                <button
                  type="button"
                  onClick={() => updateBookingStatus(activeJobs[0].id, 'in_progress')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                >
                  Start Working
                </button>
              )}
              {activeJobs[0].status === 'in_progress' && (
                <button
                  type="button"
                  onClick={() => updateBookingStatus(activeJobs[0].id, 'completed')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Job Completed & Release ₹{activeJobs[0].paymentBreakdown.workerEarnings}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-surface-200 rounded-3xl p-8 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-surface-900 text-base">No Pending Assigned Jobs</h3>
          <p className="text-xs text-surface-500 max-w-sm mx-auto">
            You have successfully cleared your active job queue. Keep your availability toggle ON to receive nearby requests.
          </p>
        </div>
      )}

      {/* Welfare & Social Security Quick Status Banner */}
      <div className="p-5 bg-gradient-to-r from-emerald-50 to-coop-50/60 rounded-3xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
            Maharashtra Labour Welfare Board • Member Benefit
          </span>
          <h3 className="text-sm font-bold text-surface-900 mt-0.5">
            ₹5 Lakh Health Cover & Pension Fund Active
          </h3>
          <p className="text-xs text-surface-600 mt-0.5">
            Next renewal covered by cooperative reserve. Training credits: <strong>{activeWorker.welfare.trainingCredits} credits accumulated</strong>.
          </p>
        </div>
        <Link
          to="/worker/welfare"
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          View Welfare Vault →
        </Link>
      </div>

      {/* Skill Passport Modal */}
      {isPassportModalOpen && (
        <Modal
          isOpen={isPassportModalOpen}
          onClose={() => setIsPassportModalOpen(false)}
          title="Digital Skill Passport"
          maxWidth="lg"
        >
          <SkillPassportCard worker={activeWorker} />
        </Modal>
      )}

    </div>
  );
};
