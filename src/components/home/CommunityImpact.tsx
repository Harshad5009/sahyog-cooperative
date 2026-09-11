import React from 'react';
import { Users, Shield, TrendingUp, Award, CheckCircle2, XCircle, ArrowRight, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommunityImpact: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Socio-Economic Value Creation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display mb-4">
            Strengthening Communities, Not Corporations
          </h2>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
            Every booking on Sahyog strengthens a local cooperative society instead of routing commissions to private venture capital.
          </p>
        </div>

        {/* 4 Big Stat Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-surface-50 rounded-3xl p-6 border border-surface-200 text-center">
            <span className="text-3xl sm:text-4xl font-black text-coop-950 font-display block mb-1">
              50K+
            </span>
            <span className="text-xs font-bold text-surface-700 block">Services Completed</span>
            <span className="text-[11px] text-surface-400">Zero arbitration disputes</span>
          </div>

          <div className="bg-surface-50 rounded-3xl p-6 border border-surface-200 text-center">
            <span className="text-3xl sm:text-4xl font-black text-emerald-700 font-display block mb-1">
              10K+
            </span>
            <span className="text-xs font-bold text-surface-700 block">Workers Empowered</span>
            <span className="text-[11px] text-surface-400">Under registered federations</span>
          </div>

          <div className="bg-surface-50 rounded-3xl p-6 border border-surface-200 text-center">
            <span className="text-3xl sm:text-4xl font-black text-amber-700 font-display block mb-1">
              15+
            </span>
            <span className="text-xs font-bold text-surface-700 block">Maharashtra Cities</span>
            <span className="text-[11px] text-surface-400">Pune, Mumbai, Nashik, Nagpur</span>
          </div>

          <div className="bg-surface-50 rounded-3xl p-6 border border-surface-200 text-center">
            <span className="text-3xl sm:text-4xl font-black text-coop-900 font-display block mb-1">
              4.8 / 5.0
            </span>
            <span className="text-xs font-bold text-surface-700 block">Customer Trust Rating</span>
            <span className="text-[11px] text-surface-400">From verified households</span>
          </div>
        </div>

        {/* Comparison: Private Platform vs Sahyog Cooperative Ecosystem */}
        <div className="bg-surface-900 text-white rounded-3xl p-6 sm:p-10 shadow-elevated border border-surface-800 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 px-3 py-1 bg-surface-800 rounded-full border border-surface-700">
              Structural Transformation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-3 text-white font-display">
              Commercial Gig Apps vs Sahyog Cooperative Platform
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Commercial App */}
            <div className="bg-surface-800/80 rounded-2xl p-5 border border-rose-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-surface-700">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <h4 className="text-sm font-bold text-surface-200">
                    Commercial Gig Platforms
                  </h4>
                </div>

                <ul className="space-y-3 text-xs text-surface-400">
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                    <span><strong>20%–35% High Commissions</strong> deducted from worker earnings.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                    <span><strong>No Social Security or Health Insurance:</strong> Zero safety net during injuries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                    <span><strong>Monopolistic Algorithm:</strong> Overworks top 5% while leaving other workers with zero calls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                    <span><strong>No Worker Voice:</strong> Arbitrary account blocking without human appeals.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sahyog Cooperative */}
            <div className="bg-coop-950 rounded-2xl p-5 border border-emerald-500/30 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-coop-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h4 className="text-sm font-bold text-emerald-300">
                    Sahyog Cooperative Platform
                  </h4>
                </div>

                <ul className="space-y-3 text-xs text-emerald-100/90">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>80% Guaranteed Direct Wage:</strong> Transparent society ledger breakdown.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>₹5 Lakh Group Health & Accident Cover:</strong> 100% funded through welfare pool.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Fair Workload AI:</strong> Distributes jobs evenly across all certified society members.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Democratic Governance:</strong> Workers are voting shareholders in their cooperative federation.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-surface-400 text-center sm:text-left">
              Aligning with the Ministry of Cooperation vision: <em>"Sahakar se Samriddhi"</em>.
            </span>
            <Link
              to="/for-cooperatives"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-surface-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Onboard Your Labour Society</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
