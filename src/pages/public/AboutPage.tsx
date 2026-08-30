import React from 'react';
import { Users, Award, ShieldCheck, HeartHandshake, Sparkles, Scale, Target } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-surface-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Smart India Hackathon 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-coop-950 font-display tracking-tight mb-4">
            About Sahyog Initiative
          </h1>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed max-w-2xl mx-auto">
            A cooperative-first digital infrastructure engineered to transform household and community gig services from exploitative monopoly platforms into worker-owned democratic ecosystems.
          </p>
        </div>

        {/* Core Vision & Mission */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6 mb-8">
          <div>
            <h2 className="text-lg font-bold text-surface-900 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-coop-700" />
              The Problem Statement
            </h2>
            <p className="text-xs sm:text-sm text-surface-600 leading-relaxed">
              Commercial gig marketplaces operate as extractive middlemen — deducting steep 25%–35% commissions, offering zero healthcare or pension protection, and locking workers into opaque algorithmic reward games. Meanwhile, traditional labour cooperatives hold trusted, skilled workforces but lack modern AI dispatch, GIS tracking, and multilingual digital interfaces.
            </p>
          </div>

          <div className="pt-4 border-t border-surface-100">
            <h2 className="text-lg font-bold text-surface-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              The Sahyog Solution
            </h2>
            <p className="text-xs sm:text-sm text-surface-600 leading-relaxed">
              Sahyog bridges this gap by providing an open digital infrastructure tailored specifically for Labour Cooperative Societies under the Ministry of Cooperation. With <strong>ethical multi-factor AI worker matching</strong>, <strong>natural language problem decomposition</strong>, <strong>GIS demand heatmaps</strong>, and <strong>transparent welfare fund ledgers</strong>, Sahyog delivers a superior service experience for citizens while securing sustainable livelihoods for workers.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface-50 p-5 rounded-2xl border border-surface-200 text-center">
            <Scale className="w-6 h-6 text-coop-800 mx-auto mb-2" />
            <h3 className="text-xs font-bold text-surface-900 mb-1">Democratic Workload</h3>
            <p className="text-[11px] text-surface-500">Zero algorithmic favoritism; fair daily job distribution across all society members.</p>
          </div>

          <div className="bg-surface-50 p-5 rounded-2xl border border-surface-200 text-center">
            <ShieldCheck className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
            <h3 className="text-xs font-bold text-surface-900 mb-1">Guaranteed Social Security</h3>
            <p className="text-[11px] text-surface-500">₹5 Lakh health and accidental coverage baked directly into transparent pricing.</p>
          </div>

          <div className="bg-surface-50 p-5 rounded-2xl border border-surface-200 text-center">
            <Award className="w-6 h-6 text-amber-700 mx-auto mb-2" />
            <h3 className="text-xs font-bold text-surface-900 mb-1">Digital Skill Passport</h3>
            <p className="text-[11px] text-surface-500">NSDC-aligned immutable digital credentials with verified ratings and skills.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
