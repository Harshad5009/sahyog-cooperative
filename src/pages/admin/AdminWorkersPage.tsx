import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Star, 
  Award, 
  Filter, 
  CheckCircle2, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { SkillPassportCard } from '../../components/worker/SkillPassportCard';
import type { Worker } from '../../types';

export const AdminWorkersPage: React.FC = () => {
  const { workers } = useApp();
  const [search, setSearch] = useState('');
  const [selectedSociety, setSelectedSociety] = useState('all');
  const [inspectedWorker, setInspectedWorker] = useState<Worker | null>(null);

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) ||
                          w.primarySkill.toLowerCase().includes(search.toLowerCase()) ||
                          w.membershipId.toLowerCase().includes(search.toLowerCase());
    if (selectedSociety === 'all') return matchesSearch;
    return matchesSearch && w.cooperativeSociety.includes(selectedSociety);
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-900 font-display">
            Federation Worker Registry
          </h1>
          <p className="text-xs text-surface-500">
            Registered cooperative specialists across Pune and Maharashtra Labour Societies.
          </p>
        </div>

        <div className="text-xs font-bold text-coop-800 bg-coop-100 px-3 py-1.5 rounded-xl border border-coop-200">
          Total Registered: 1,240 Verified Workers
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 border border-surface-200 shadow-card flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search worker by name, skill, or society ID..."
            className="w-full bg-surface-50 border border-surface-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-coop-600"
          />
        </div>

        <select
          value={selectedSociety}
          onChange={(e) => setSelectedSociety(e.target.value)}
          className="bg-surface-50 border border-surface-200 text-xs font-semibold text-surface-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-coop-600 cursor-pointer"
        >
          <option value="all">All Cooperative Societies</option>
          <option value="Pune Labour">Pune Labour Cooperative Society</option>
          <option value="Maharashtra Mahila">Maharashtra Mahila Kamgar</option>
          <option value="Kothrud Shramik">Kothrud Shramik Mandal</option>
          <option value="Sahyadri Motor">Sahyadri Motor Kamgar</option>
        </select>
      </div>

      {/* Workers Table */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 border-b border-surface-200 text-[11px] font-bold uppercase text-surface-500">
              <tr>
                <th className="p-4">Worker & ID</th>
                <th className="p-4">Society Affiliation</th>
                <th className="p-4">Primary Skill</th>
                <th className="p-4">Workload Today</th>
                <th className="p-4">Rating & Reliability</th>
                <th className="p-4 text-right">Passport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredWorkers.map(w => (
                <tr key={w.id} className="hover:bg-surface-50/70 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={w.avatar}
                        alt={w.name}
                        className="w-10 h-10 rounded-xl object-cover border border-surface-200 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-surface-900 block">{w.name}</span>
                        <span className="text-[10px] text-surface-400 font-mono">{w.membershipId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-surface-700">
                    {w.cooperativeSociety.split('(')[0]}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-coop-800">{w.primarySkill}</span>
                    <span className="text-[10px] text-surface-400 block">{w.experienceYears} Yrs Exp</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      w.jobsToday >= 5
                        ? 'bg-rose-100 text-rose-800'
                        : w.jobsToday <= 2
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-surface-100 text-surface-700'
                    }`}>
                      {w.jobsToday} Jobs Completed
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {w.rating} ({w.totalReviews})
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{w.reliabilityScore}% Reliability</span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setInspectedWorker(w)}
                      className="px-3 py-1.5 bg-surface-100 hover:bg-coop-50 text-coop-800 hover:text-coop-900 rounded-xl font-bold border border-surface-200 hover:border-coop-300 transition-all flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Passport</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Worker Skill Passport Modal */}
      <Modal
        isOpen={!!inspectedWorker}
        onClose={() => setInspectedWorker(null)}
        maxWidth="2xl"
      >
        {inspectedWorker && <SkillPassportCard worker={inspectedWorker} />}
      </Modal>

    </div>
  );
};
