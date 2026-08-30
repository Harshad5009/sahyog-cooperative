import React from 'react';
import { Scale, TrendingUp, Users, HeartHandshake, ShieldCheck, Award } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const fairData = [
    { cohort: 'Bottom 20% Workers', sahyogShare: 18, commercialAppsShare: 3 },
    { cohort: '20-40% Cohort', sahyogShare: 20, commercialAppsShare: 7 },
    { cohort: '40-60% Cohort', sahyogShare: 21, commercialAppsShare: 14 },
    { cohort: '60-80% Cohort', sahyogShare: 20, commercialAppsShare: 24 },
    { cohort: 'Top 20% Elite', sahyogShare: 21, commercialAppsShare: 52 },
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          Analytics & Democratic Workload Equity
        </h1>
        <p className="text-xs text-surface-500">
          Auditing the Gini balance of job distribution, financial throughput, and cooperative retention.
        </p>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Gini Equity Index"
          value="0.18"
          subtitle="Optimal democratic balance"
          icon={Scale}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Customer NPS"
          value="+76"
          subtitle="World-class satisfaction"
          icon={Award}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-700"
        />
        <StatCard
          title="Worker Retention"
          value="98.4%"
          subtitle="Annual federation renewal"
          icon={HeartHandshake}
          iconBgColor="bg-coop-50"
          iconColor="text-coop-700"
        />
        <StatCard
          title="Monthly Throughput"
          value="₹1.42 Cr"
          subtitle="Across Maharashtra federations"
          icon={TrendingUp}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-700"
        />
      </div>

      {/* Gini Comparison Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-surface-900">
              Workload Equity Comparison: Job Distribution by Worker Decile (%)
            </h3>
            <p className="text-xs text-surface-500">
              Sahyog's multi-factor workload balancing algorithm prevents monopoly concentration.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
            Gini Coefficient: 0.18 (Democratic) vs 0.64 (Commercial App)
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fairData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="cohort" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="sahyogShare" name="Sahyog Cooperative Platform (%)" fill="#047857" radius={[6, 6, 0, 0]} />
              <Bar dataKey="commercialAppsShare" name="Commercial Gig Platforms (%)" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs text-surface-700 leading-relaxed">
          💡 <strong>Key Analytical Finding:</strong> In commercial platforms, the top 20% highest rated workers receive <strong>52% of all allocations</strong>, causing extreme fatigue, whereas Sahyog maintains an even ~20% distribution across all skill-certified members.
        </div>
      </div>

    </div>
  );
};
