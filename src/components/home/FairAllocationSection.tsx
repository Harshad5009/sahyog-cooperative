import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Sliders, Info, Zap } from 'lucide-react';
import { Badge } from '../common/Badge';

export const FairAllocationSection: React.FC = () => {
  // Interactive sandbox state
  const [workerAJobs, setWorkerAJobs] = useState(7);
  const [workerBJobs, setWorkerBJobs] = useState(1);

  // Dynamic score calculations
  const calculateScore = (distanceKm: number, rating: number, jobsToday: number, certCount: number) => {
    const skillScore = 95 + (certCount * 2.5); // ~100
    const distanceScore = Math.max(20, Math.round(100 - (distanceKm * 7)));
    const workloadScore = Math.max(10, Math.round(100 - (jobsToday * 12))); // High penalty for fatigue
    const reliabilityScore = (rating / 5) * 60 + 38; // ~97
    
    // Composite: 30% Skill + 25% Distance + 25% Workload Equity + 20% Reliability
    const composite = Math.round(
      (skillScore * 0.30) + 
      (distanceScore * 0.25) + 
      (workloadScore * 0.25) + 
      (reliabilityScore * 0.20)
    );

    return { skillScore, distanceScore, workloadScore, composite };
  };

  const scoreA = calculateScore(1.2, 4.9, workerAJobs, 1);
  const scoreB = calculateScore(2.1, 4.8, workerBJobs, 3);

  const isBWinning = scoreB.composite >= scoreA.composite;

  return (
    <section className="py-20 bg-gradient-to-b from-surface-50 via-coop-50/40 to-surface-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-coop-900 text-emerald-300 rounded-full text-xs font-bold mb-4 shadow-sm">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Ethical AI Workload Balancer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-coop-950 tracking-tight font-display mb-4">
            AI That Distributes Work Fairly
          </h2>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
            Conventional gig platforms use "winner-takes-all" algorithms that exhaust the highest-rated 5% of workers while starving the rest. <strong>Sahyog’s cooperative algorithm</strong> balances proximity and skill with <em>workload equity</em>, ensuring shared livelihood, rested professionals, and zero burnout.
          </p>
        </div>

        {/* Interactive Comparison Sandbox Container */}
        <div className="bg-white rounded-3xl shadow-elevated border border-surface-200 p-6 sm:p-8 max-w-5xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-surface-100 gap-3">
            <div>
              <h3 className="text-base font-bold text-surface-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-coop-700" />
                Live Fairness Simulation Sandbox
              </h3>
              <p className="text-xs text-surface-500">
                Adjust today's completed jobs to see how the cooperative algorithm balances equity and prevents fatigue.
              </p>
            </div>
            <span className="text-xs font-bold text-coop-800 bg-coop-100 px-3 py-1 rounded-full shrink-0">
              Active Multi-Factor Weights: Skill 30% | Workload 25% | Proximity 25% | Rating 20%
            </span>
          </div>

          {/* Cards Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* VS Divider in middle on desktop */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface-900 text-white font-black text-xs items-center justify-center shadow-lg border-2 border-white">
              VS
            </div>

            {/* Worker A Card */}
            <div className={`rounded-2xl p-5 border transition-all duration-200 ${
              !isBWinning
                ? 'bg-coop-50/50 border-coop-400 shadow-md ring-2 ring-coop-500/20'
                : 'bg-surface-50 border-surface-200'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt="Suresh Kulkarni"
                    className="w-12 h-12 rounded-xl object-cover border border-surface-300"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-surface-900">Suresh Kulkarni</h4>
                    <p className="text-xs text-surface-500">Senior Plumber • 12 Yrs Exp</p>
                    <p className="text-[11px] text-amber-600 font-bold">4.9 ★ (540 Reviews)</p>
                  </div>
                </div>

                {!isBWinning && (
                  <Badge variant="coop" glow>
                    Recommended
                  </Badge>
                )}
              </div>

              {/* Attributes Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-surface-200/60">
                  <span className="text-surface-500">Distance from Customer:</span>
                  <span className="font-bold text-surface-800">1.2 km (Closest)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-200/60">
                  <span className="text-surface-500">Skill & Certification Match:</span>
                  <span className="font-bold text-surface-800">100%</span>
                </div>

                {/* Interactive Slider for Worker A */}
                <div className="py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-surface-700 font-semibold">Jobs Completed Today:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                      workerAJobs >= 5 ? 'bg-rose-100 text-rose-800' : 'bg-surface-200 text-surface-800'
                    }`}>
                      {workerAJobs} Jobs ({workerAJobs >= 5 ? 'High Fatigue' : 'Moderate'})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={workerAJobs}
                    onChange={(e) => setWorkerAJobs(Number(e.target.value))}
                    className="w-full h-1.5 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-coop-700"
                  />
                </div>

                <div className="flex justify-between py-1 border-b border-surface-200/60">
                  <span className="text-surface-500">Workload Equity Score:</span>
                  <span className={`font-bold ${scoreA.workloadScore < 40 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {scoreA.workloadScore} / 100
                  </span>
                </div>
                <div className="flex justify-between py-1.5 bg-white p-2 rounded-xl border border-surface-200">
                  <span className="font-bold text-surface-700">Composite AI Score:</span>
                  <span className="font-extrabold text-sm text-surface-900">{scoreA.composite} pts</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-surface-100/80 rounded-xl text-[11px] text-surface-600 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-surface-400 shrink-0 mt-0.5" />
                <span>
                  {workerAJobs >= 5 
                    ? 'Excessive allocations on a single worker leads to fatigue and denies income to other cooperative members.'
                    : 'Balanced workload allows fair dispatch.'}
                </span>
              </div>
            </div>

            {/* Worker B Card (Recommended) */}
            <div className={`rounded-2xl p-5 border transition-all duration-200 relative ${
              isBWinning
                ? 'bg-gradient-to-b from-coop-50/70 to-emerald-50/40 border-coop-500 shadow-elevated ring-2 ring-coop-500/20'
                : 'bg-surface-50 border-surface-200'
            }`}>
              {/* Highlight ribbon */}
              {isBWinning && (
                <div className="absolute -top-3 right-6 bg-coop-900 text-emerald-300 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Sahyog Recommended Match
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"
                    alt="Ramesh Patil"
                    className="w-12 h-12 rounded-xl object-cover border border-coop-300 ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-surface-900 flex items-center gap-1">
                      Ramesh Patil
                      <ShieldCheck className="w-4 h-4 text-coop-600" />
                    </h4>
                    <p className="text-xs text-coop-700 font-medium">Certified Plumber • 8 Yrs Exp</p>
                    <p className="text-[11px] text-amber-600 font-bold">4.8 ★ (312 Reviews)</p>
                  </div>
                </div>
              </div>

              {/* Attributes Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-surface-200/60">
                  <span className="text-surface-500">Distance from Customer:</span>
                  <span className="font-bold text-surface-800">2.1 km (Nearby)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-200/60">
                  <span className="text-surface-500">Skill & Certification Match:</span>
                  <span className="font-bold text-emerald-700">100% (3 Govt Certs)</span>
                </div>

                {/* Interactive Slider for Worker B */}
                <div className="py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-surface-700 font-semibold">Jobs Completed Today:</span>
                    <span className="font-bold px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-800">
                      {workerBJobs} Job ({workerBJobs <= 2 ? 'Optimal & Rested' : 'Moderate'})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={workerBJobs}
                    onChange={(e) => setWorkerBJobs(Number(e.target.value))}
                    className="w-full h-1.5 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-coop-700"
                  />
                </div>

                <div className="flex justify-between py-1 border-b border-surface-200/60">
                  <span className="text-surface-500">Workload Equity Score:</span>
                  <span className="font-bold text-emerald-700">
                    {scoreB.workloadScore} / 100
                  </span>
                </div>
                <div className="flex justify-between py-1.5 bg-white p-2 rounded-xl border border-coop-300 shadow-xs">
                  <span className="font-bold text-coop-900">Composite AI Score:</span>
                  <span className="font-extrabold text-sm text-coop-900">{scoreB.composite} pts</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-coop-100/70 rounded-xl text-[11px] text-coop-900 leading-relaxed flex items-start gap-2 border border-coop-200">
                <CheckCircle2 className="w-4 h-4 text-coop-700 shrink-0 mt-0.5" />
                <span className="font-medium">
                  <strong>Why Recommended:</strong> High skill certification, close distance, and lower current workload guarantees a focused, punctual, and high-quality customer experience while preserving democratic wage distribution.
                </span>
              </div>
            </div>

          </div>

          {/* Key Takeaway Banner */}
          <div className="mt-6 pt-6 border-t border-surface-100 text-center">
            <p className="text-xs font-semibold text-coop-950">
              ✨ <strong>Cooperative Advantage:</strong> Customer gets a verified, energized expert • All society workers earn equitable daily livelihoods.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
