import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User, Phone, Mail, MapPin, ShieldCheck, Star,
  Edit3, Save, X, Loader2, Building2, Award
} from 'lucide-react';

export const WorkerProfilePage: React.FC = () => {
  const { workerProfile, fetchWorkerProfile, authUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => { setLoading(true); await fetchWorkerProfile(); setLoading(false); };
    load();
  }, []);

  const wp = workerProfile;
  const user = wp?.userId ?? authUser;

  if (loading) return (
    <div className="flex items-center justify-center py-20 text-surface-400">
      <Loader2 className="w-6 h-6 animate-spin mr-2" />Loading profile…
    </div>
  );

  if (!wp) return (
    <div className="text-center py-20 text-surface-400 text-sm">
      Worker profile not found. Please contact your cooperative administrator.
    </div>
  );

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-coop-900 to-emerald-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black shrink-0">
            {(user?.name ?? 'W').charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-black font-display">{user?.name ?? '—'}</h1>
            <p className="text-emerald-300 text-sm">{wp.primarySkillCategory} Specialist</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs">
              <span className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                {wp.verificationStatus}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                {wp.ratingAverage?.toFixed(1)} ({wp.totalReviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Jobs Done', value: wp.completedJobsCount },
          { label: 'Experience', value: `${wp.experienceYears}y` },
          { label: 'Reliability', value: `${wp.reliabilityScore}%` },
        ].map(s => (
          <div key={s.label} className="bg-white border border-surface-200 rounded-2xl p-4 text-center shadow-xs">
            <p className="text-xl font-black text-surface-900">{s.value}</p>
            <p className="text-[10px] text-surface-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card space-y-4">
        <h2 className="text-sm font-bold text-surface-900">Profile Details</h2>
        {[
          { icon: Phone, label: 'Phone', value: user?.phone },
          { icon: Mail, label: 'Email', value: user?.email ?? '—' },
          { icon: Building2, label: 'Society', value: wp.cooperativeSocietyId?.name ?? '—' },
          { icon: Award, label: 'Membership #', value: wp.membershipNumber },
        ].map(f => {
          const Icon = f.icon;
          return (
            <div key={f.label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-surface-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-surface-500" />
              </div>
              <div>
                <p className="text-[10px] text-surface-400 font-medium">{f.label}</p>
                <p className="text-xs font-bold text-surface-800">{f.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card">
        <h2 className="text-sm font-bold text-surface-900 mb-4">Skills & Certifications</h2>
        <div className="space-y-3">
          {wp.skills?.map((skill: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
              <div>
                <p className="text-xs font-bold text-surface-800">{skill.skillName}</p>
                <p className="text-[10px] text-surface-400">{skill.category}</p>
                {skill.certified && <span className="text-[10px] text-emerald-600 font-bold">✓ Certified</span>}
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => (
                  <div key={n} className={`w-2.5 h-2.5 rounded-full ${n <= skill.proficiencyLevel ? 'bg-coop-700' : 'bg-surface-200'}`} />
                ))}
              </div>
            </div>
          )) ?? <p className="text-xs text-surface-400">No skills listed</p>}
        </div>
      </div>
    </div>
  );
};
