import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Building2, 
  HeartHandshake, 
  Award, 
  Lock, 
  TrendingUp,
  Star,
  Siren,
  FileCheck2,
  Percent,
  Compass
} from 'lucide-react';
import { HeroSection } from '../../components/home/HeroSection';
import { HowItWorks } from '../../components/home/HowItWorks';
import { ServiceGrid } from '../../components/home/ServiceGrid';
import { EmergencyBanner } from '../../components/home/EmergencyBanner';
import { FairPaymentCalculator } from '../../components/home/FairPaymentCalculator';
import { FairAllocationSection } from '../../components/home/FairAllocationSection';
import { DemandForecastingPreview } from '../../components/home/DemandForecastingPreview';
import { CommunityImpact } from '../../components/home/CommunityImpact';
import { AIProblemClassifier } from '../../components/home/AIProblemClassifier';
import { MultilingualVoiceDemo } from '../../components/home/MultilingualVoiceDemo';
import { MOCK_WORKERS } from '../../data/mockWorkers';
import { SkillPassportCard } from '../../components/worker/SkillPassportCard';

export const HomePage: React.FC = () => {
  const featuredWorkers = MOCK_WORKERS.slice(0, 2);

  return (
    <div className="bg-white overflow-hidden space-y-0">
      
      {/* ─── SECTION 1: HERO WITH AI SEARCH & AUDIO DIAGNOSTICS ─── */}
      <HeroSection />

      {/* ─── SECTION 2: HOW SAHYOG COOPERATIVE PLATFORM WORKS ─── */}
      <HowItWorks />

      {/* ─── SECTION 3: 12+ POPULAR SERVICES CATALOG ─── */}
      <ServiceGrid />

      {/* ─── SECTION 4: 24/7 RAPID EMERGENCY DISPATCH CALLOUT ─── */}
      <EmergencyBanner />

      {/* ─── SECTION 5: WHY SAHYOG — PRIVATE PLATFORM VS COOPERATIVE MODEL ─── */}
      <section className="py-20 bg-surface-50 border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Paradigm Shift</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display mb-4">
              Private Monopolies vs. Cooperative Ownership
            </h2>
            <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
              Commercial service marketplaces view workers as disposable gig contractors. Sahyog builds worker-owned digital public infrastructure governed by registered Labour Cooperative Federations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Private Platform Column */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Commercial Gig App</span>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">High Exploitation</span>
              </div>
              <ul className="space-y-3.5 text-xs text-surface-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black text-sm">✕</span>
                  <span><strong>25% to 35% Commission Deductions:</strong> Massive margins taken from every household job.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black text-sm">✕</span>
                  <span><strong>Zero Health or Accident Insurance:</strong> Workers bear 100% of workplace medical risks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black text-sm">✕</span>
                  <span><strong>Algorithmic Exhaustion:</strong> Black-box algorithms penalize workers for declining unscheduled trips.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black text-sm">✕</span>
                  <span><strong>Surge Price Gouging:</strong> Customers pay 2x-3x during rain or emergency distress.</span>
                </li>
              </ul>
            </div>

            {/* Sahyog Cooperative Column */}
            <div className="bg-gradient-to-br from-emerald-50 to-coop-50/70 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-elevated space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-display">Sahyog Cooperative Platform</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">Worker Owned</span>
              </div>
              <ul className="space-y-3.5 text-xs text-surface-800">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>80% Direct Worker Take-Home:</strong> Only 10% to cooperative fund and 5% for tech maintenance.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>₹5 Lakh Group Health & Accident Cover:</strong> Institutional medical protection for worker families.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AI Workload Balancing:</strong> Fair distribution prevents fatigue and distributes jobs democratically.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Transparent Fixed Rates:</strong> Regulated by district societies with zero hidden charges.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: VERIFIED WORKER SKILL PASSPORTS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Professionals</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight font-display">
                Sahyog Digital Skill Passports
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-surface-500 max-w-md">
              Every technician carries an authenticated QR-verified skill credential validated by Municipal Societies and NSDC India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredWorkers.map(w => (
              <SkillPassportCard key={w.id} worker={w} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: FAIR WAGE CALCULATOR (80/20 ECONOMICS) ─── */}
      <FairPaymentCalculator />

      {/* ─── SECTION 8: AI MULTILINGUAL VOICE & PROBLEM CLASSIFIER ─── */}
      <AIProblemClassifier />

      {/* ─── SECTION 9: AI FAIR WORKFORCE ALLOCATION ─── */}
      <FairAllocationSection />

      {/* ─── SECTION 10: DEMAND FORECASTING FOR SOCIETIES ─── */}
      <DemandForecastingPreview />

      {/* ─── SECTION 11: MULTILINGUAL SYSTEM LIVE DEMO ─── */}
      <MultilingualVoiceDemo />

      {/* ─── SECTION 12: COMMUNITY IMPACT & VERIFIED METRICS ─── */}
      <CommunityImpact />

      {/* ─── SECTION 13: COOPERATIVE NETWORK & FEDERATION GOVERNANCE ─── */}
      <section className="py-16 bg-surface-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Institutional Backbone</span>
            <h3 className="text-2xl sm:text-3xl font-black mt-2 font-display">
              Federation Governance Hierarchy
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
            <div className="p-6 bg-surface-800/80 rounded-2xl border border-surface-700 space-y-2">
              <Building2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-sm text-white">State Labour Cooperative Federation</h4>
              <p className="text-surface-400">Apex policy supervision, insurance underwriting, and dispute mediation.</p>
            </div>
            <div className="p-6 bg-surface-800/80 rounded-2xl border border-surface-700 space-y-2">
              <Users className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-sm text-white">Primary Cooperative Societies</h4>
              <p className="text-surface-400">Local ward level management, worker KYC, equipment subsidy, and skill certification.</p>
            </div>
            <div className="p-6 bg-surface-800/80 rounded-2xl border border-surface-700 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-sm text-white">Verified Cooperative Members</h4>
              <p className="text-surface-400">Voting shareholder technicians with guaranteed minimum daily wage floor and patronage dividend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 14: BOTTOM CALL TO ACTION ─── */}
      <section className="py-20 bg-gradient-to-r from-coop-950 via-coop-900 to-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            SIH 2026 Ready Platform
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Empower Local Workers. Book Trusted Services.
          </h2>
          <p className="text-sm sm:text-base text-surface-300 max-w-2xl mx-auto leading-relaxed">
            Experience fair digital governance. Fast booking, certified technicians, 90-day guarantee, and 100% transparent cooperative pricing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/customer/book"
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-surface-950 font-black text-sm rounded-2xl shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Book a Service Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/emergency"
              className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <Siren className="w-4 h-4 animate-bounce" />
              <span>Emergency 24/7 SOS</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
