import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Siren, Star, Briefcase, Clock, Wallet,
  ShieldCheck, ArrowRight, CheckCircle2, AlertCircle,
  Loader2, WifiOff, Zap, MapPin, Phone, RefreshCw
} from 'lucide-react';
import { sosApi } from '../../utils/apiClient';

const STATUS_COLORS: Record<string, string> = {
  PENDING_MATCH: 'bg-amber-100 text-amber-700',
  ALLOCATED: 'bg-blue-100 text-blue-700',
  ACCEPTED_BY_WORKER: 'bg-indigo-100 text-indigo-700',
  EN_ROUTE: 'bg-cyan-100 text-cyan-700',
  ARRIVED: 'bg-violet-100 text-violet-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-600',
};

const JOB_STATUS_TRANSITIONS: Record<string, string | null> = {
  ALLOCATED: 'ACCEPTED_BY_WORKER',
  ACCEPTED_BY_WORKER: 'EN_ROUTE',
  EN_ROUTE: 'ARRIVED',
  ARRIVED: 'IN_PROGRESS',
  IN_PROGRESS: 'COMPLETED',
};

export const WorkerDashboard: React.FC = () => {
  const { workerProfile, bookings, fetchWorkerProfile, setAvailability, updateBookingStatus, fetchBookings } = useAuth();
  const [isAvail, setIsAvail] = useState(false);
  const [availLoading, setAvailLoading] = useState(false);
  const [sosLoading, setSosLoading] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    fetchWorkerProfile();
    fetchBookings();
  }, []);

  useEffect(() => {
    if (workerProfile) setIsAvail(workerProfile.isAvailable);
  }, [workerProfile]);

  const toggleAvail = async () => {
    setAvailLoading(true);
    const newVal = !isAvail;
    await setAvailability(newVal);
    setIsAvail(newVal);
    setAvailLoading(false);
  };

  const handleSos = async () => {
    setSosLoading(true);
    await sosApi.trigger(18.5204, 73.8567); // Current location — ideally from geolocation API
    setSosSent(true);
    setSosLoading(false);
    setTimeout(() => setSosSent(false), 5000);
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setStatusUpdating(bookingId);
    await updateBookingStatus(bookingId, newStatus);
    setStatusUpdating(null);
  };

  const activeJobs = bookings.filter(b => !['COMPLETED','CANCELLED'].includes(b.status));
  const completedJobs = bookings.filter(b => b.status === 'COMPLETED');
  const monthEarnings = completedJobs.reduce((sum: number, b: any) => sum + (b.workerEarnings ?? 0), 0);

  const wp = workerProfile;
  const userName = wp?.userId?.name ?? 'Worker';

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-coop-900 flex items-center justify-center text-white text-2xl font-black shrink-0">
            {userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-surface-900 font-display">Namaste, {userName}</h1>
              {wp?.kycVerified && <span title="KYC Verified"><ShieldCheck className="w-4 h-4 text-emerald-500" /></span>}
            </div>
            <p className="text-xs text-surface-500">{wp?.primarySkillCategory} · {wp?.membershipNumber}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="text-xs font-bold text-surface-700">{wp?.ratingAverage?.toFixed(1) ?? '—'}</span>
              <span className="text-xs text-surface-400">({wp?.totalReviewsCount ?? 0} reviews)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Availability Toggle */}
          <button onClick={toggleAvail} disabled={availLoading}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isAvail ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
            }`}>
            {availLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : (isAvail ? <Zap className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />)}
            <span>{isAvail ? 'Available' : 'Go Online'}</span>
          </button>

          {/* SOS Button */}
          <button onClick={handleSos} disabled={sosLoading || sosSent}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              sosSent ? 'bg-emerald-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
            }`}>
            {sosLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Siren className="w-3.5 h-3.5" />}
            <span>{sosSent ? 'SOS Sent!' : 'SOS'}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Today's Jobs", value: wp?.todayJobCount ?? 0, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Month Earnings', value: `₹${monthEarnings.toLocaleString()}`, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Completed Jobs', value: wp?.completedJobsCount ?? completedJobs.length, icon: CheckCircle2, color: 'text-coop-700', bg: 'bg-coop-50' },
          { label: 'Reliability', value: `${wp?.reliabilityScore ?? 100}%`, icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
              <div className={`w-8 h-8 ${stat.bg} rounded-xl flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-lg font-black text-surface-900">{stat.value}</p>
              <p className="text-[10px] text-surface-400 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Jobs Tabs */}
      <div className="bg-white border border-surface-200 rounded-3xl shadow-card overflow-hidden">
        <div className="flex border-b border-surface-100">
          {(['active', 'completed'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 py-3 text-xs font-bold capitalize transition-colors ${
                activeTab === t ? 'border-b-2 border-coop-700 text-coop-900' : 'text-surface-400 hover:text-surface-700'
              }`}>
              {t} ({t === 'active' ? activeJobs.length : completedJobs.length})
            </button>
          ))}
        </div>

        <div className="p-4 space-y-3">
          {(activeTab === 'active' ? activeJobs : completedJobs).length === 0 ? (
            <div className="py-10 text-center text-surface-400 text-xs">
              {activeTab === 'active' ? 'No active jobs right now' : 'No completed jobs yet'}
            </div>
          ) : (activeTab === 'active' ? activeJobs : completedJobs).map((b: any) => {
            const nextStatus = JOB_STATUS_TRANSITIONS[b.status];
            return (
              <div key={b._id} className="border border-surface-100 rounded-2xl p-4 hover:border-surface-200 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs font-black text-surface-900">{b.bookingNumber}</p>
                    <p className="text-xs font-semibold text-surface-700 mt-0.5">{b.serviceCategory}</p>
                    <p className="text-[10px] text-surface-500">{b.scheduledDate} · {b.scheduledTimeSlot}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {b.status?.replace(/_/g,' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-surface-500 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{b.address?.area}, {b.address?.city}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700">Your share: ₹{b.workerEarnings}</span>
                    <span className="text-[10px] text-surface-400">(80% of ₹{b.totalAmount})</span>
                  </div>
                  {nextStatus && (
                    <button
                      onClick={() => handleStatusUpdate(b._id, nextStatus)}
                      disabled={statusUpdating === b._id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-coop-900 hover:bg-coop-800 text-white text-[10px] font-bold rounded-lg transition-colors disabled:opacity-60">
                      {statusUpdating === b._id ? <Loader2 className="w-3 h-3 animate-spin" /> : <ArrowRight className="w-3 h-3" />}
                      {nextStatus.replace(/_/g,' ')}
                    </button>
                  )}
                </div>

                {/* Change Request CTA for IN_PROGRESS */}
                {b.status === 'IN_PROGRESS' && (
                  <div className="mt-3 pt-3 border-t border-surface-100">
                    <Link to="/worker/jobs" className="text-[10px] text-amber-700 font-bold hover:underline flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Request additional material/labour cost
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
