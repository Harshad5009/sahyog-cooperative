import React from 'react';
import { useApp } from '../../context/AppContext';
import { SkillPassportCard } from '../../components/worker/SkillPassportCard';
import { Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export const WorkerSkillsPage: React.FC = () => {
  const { activeWorker } = useApp();

  const upskillCourses = [
    {
      title: 'NSDC Solar PV Rooftop Grid Specialist (Level 4)',
      duration: '3-Day Practical Workshop (Pune Lab)',
      subsidy: '100% Cooperative Sponsored (Uses 100 Credits)',
      earningBoost: '+45% Daily Earning Potential',
    },
    {
      title: 'Digital Home Automation & Smart Valve Systems',
      duration: '2-Day Certification Course',
      subsidy: '50% Cooperative Subsidy',
      earningBoost: '+30% High-Value Society Jobs',
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          Digital Skill Passport & Verified Credentials
        </h1>
        <p className="text-xs text-surface-500">
          Your immutable cooperative identity. Verified by Pune Labour Cooperative Society under National Skill Development standards.
        </p>
      </div>

      {/* Main Verifiable Passport Card */}
      <SkillPassportCard worker={activeWorker} />

      {/* AI Recommended Upskilling Programs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-surface-900">
            AI Recommended Certification Pathways for Ramesh
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upskillCourses.map((c, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface-50 border border-surface-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {c.earningBoost}
                </span>
                <h4 className="text-xs font-bold text-surface-900 mt-2 mb-1">
                  {c.title}
                </h4>
                <p className="text-[11px] text-surface-500 mb-1">{c.duration}</p>
                <p className="text-[11px] text-coop-800 font-semibold">{c.subsidy}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-200 flex justify-end">
                <button
                  onClick={() => alert(`Enrolled in ${c.title}. Society Welfare Officer will contact you.`)}
                  className="px-4 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1"
                >
                  <span>Redeem Credits & Enroll</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
