import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  UserCheck, Star, MapPin, Briefcase, ShieldCheck,
  Search, RefreshCw, Loader2, ChevronLeft, ChevronRight, Badge
} from 'lucide-react';

export const AdminWorkersPage: React.FC = () => {
  const { adminWorkers, fetchAdminWorkers } = useAuth();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = async (p = page) => {
    setLoading(true);
    await fetchAdminWorkers(p);
    setLoading(false);
  };

  useEffect(() => { load(1); }, []);

  const filtered = adminWorkers.filter(w => {
    const name = (w.userId as any)?.name ?? '';
    return !search || name.toLowerCase().includes(search.toLowerCase()) ||
      w.primarySkillCategory?.toLowerCase().includes(search.toLowerCase()) ||
      w.membershipNumber?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-surface-900 font-display">Workers Registry</h1>
          <p className="text-xs text-surface-500 mt-0.5">Live worker data from MongoDB · {adminWorkers.length} loaded</p>
        </div>
        <button onClick={() => load(1)} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-coop-900 text-white text-xs font-bold rounded-xl hover:bg-coop-800 disabled:opacity-60 transition-colors">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />Refresh
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, skill, or membership number…"
          className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-surface-200 rounded-xl focus:outline-none focus:border-coop-600" />
      </div>

      {loading && adminWorkers.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-surface-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />Loading workers…
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-surface-400">No workers found</div>
          ) : filtered.map((w: any) => {
            const userName = w.userId?.name ?? 'Worker';
            const societyName = w.cooperativeSocietyId?.name ?? 'Cooperative';
            return (
              <div key={w._id} className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-coop-100 flex items-center justify-center text-coop-700 font-black text-sm">
                      {userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-surface-900 text-sm">{userName}</p>
                      <p className="text-[10px] text-surface-500 font-mono">{w.membershipNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {w.kycVerified && <span className="p-1 bg-emerald-100 rounded-lg" title="KYC Verified"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /></span>}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      w.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {w.isAvailable ? 'Available' : 'Offline'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-surface-600">
                    <Briefcase className="w-3.5 h-3.5 text-surface-400" />
                    <span className="font-semibold">{w.primarySkillCategory}</span>
                  </div>
                  <div className="flex items-center gap-2 text-surface-600">
                    <MapPin className="w-3.5 h-3.5 text-surface-400" />
                    <span className="truncate">{societyName}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-100">
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      <span>{w.ratingAverage?.toFixed(1) ?? '—'}</span>
                      <span className="font-normal text-surface-400">({w.totalReviewsCount} reviews)</span>
                    </div>
                    <span className="text-[10px] text-surface-500">{w.completedJobsCount} jobs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-500">{w.experienceYears}y experience</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      w.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' :
                      w.verificationStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
                    }`}>
                      {w.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-surface-400">{filtered.length} workers</span>
        <div className="flex items-center gap-2">
          <button onClick={() => { setPage(p => Math.max(1,p-1)); load(page-1); }} disabled={page===1}
            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 disabled:opacity-40 transition-colors">
            <ChevronLeft className="w-4 h-4 text-surface-600" />
          </button>
          <span className="text-xs font-bold text-surface-700">Page {page}</span>
          <button onClick={() => { setPage(p=>p+1); load(page+1); }} disabled={adminWorkers.length < 20}
            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 disabled:opacity-40 transition-colors">
            <ChevronRight className="w-4 h-4 text-surface-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
