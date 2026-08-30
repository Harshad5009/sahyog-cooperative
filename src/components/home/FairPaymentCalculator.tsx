import React, { useState } from 'react';
import { DollarSign, Shield, HeartHandshake, Building2, Laptop, Info, ArrowRight } from 'lucide-react';
import { calculatePaymentBreakdown } from '../../utils/aiMatchingEngine';

export const FairPaymentCalculator: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState(1000);
  const breakdown = calculatePaymentBreakdown(totalAmount);

  const workerPercent = 80;
  const welfarePercent = 5;
  const coopPercent = 10;
  const opsPercent = 5;

  return (
    <section className="py-20 bg-white border-y border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>100% Financial Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display mb-4">
            Know Where Your Money Goes
          </h2>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
            Unlike commercial gig apps that extract up to 35% in commissions without providing health cover, Sahyog is governed by cooperative federations. Every rupee is democratically accounted for.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-surface-50 rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          
          {/* Interactive Amount Slider */}
          <div className="mb-8 pb-6 border-b border-surface-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <label className="text-xs font-bold text-surface-700 uppercase tracking-wider">
                Simulate Customer Service Payment (₹)
              </label>
              <div className="text-2xl sm:text-3xl font-black text-coop-950 font-display">
                ₹{totalAmount.toLocaleString()}
              </div>
            </div>

            <input
              type="range"
              min="300"
              max="5000"
              step="50"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-coop-700"
            />
            <div className="flex justify-between text-[11px] text-surface-400 mt-1.5 font-medium">
              <span>₹300 (Basic repair)</span>
              <span>₹2,500 (Deep cleaning)</span>
              <span>₹5,000 (Major wiring/carpentry)</span>
            </div>
          </div>

          {/* Progress Split Bar */}
          <div className="mb-8">
            <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner bg-surface-200 mb-3">
              <div style={{ width: `${workerPercent}%` }} className="bg-emerald-600 transition-all duration-300" title="Worker Take-Home (80%)" />
              <div style={{ width: `${welfarePercent}%` }} className="bg-amber-500 transition-all duration-300" title="Welfare & Insurance (5%)" />
              <div style={{ width: `${coopPercent}%` }} className="bg-coop-900 transition-all duration-300" title="Cooperative Federation (10%)" />
              <div style={{ width: `${opsPercent}%` }} className="bg-surface-600 transition-all duration-300" title="Platform Operations (5%)" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-surface-600">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Worker (80%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Welfare & Health (5%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-coop-900" />
                Coop Federation (10%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-surface-600" />
                Platform Ops (5%)
              </span>
            </div>
          </div>

          {/* Detailed 4-Box Split Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Box 1: Worker */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800">Worker Payout</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">80%</span>
              </div>
              <div>
                <span className="text-xl font-black text-emerald-950 font-display block">
                  ₹{breakdown.workerEarnings}
                </span>
                <p className="text-[10px] text-surface-500 mt-1 leading-normal">
                  Direct, instant deposit into worker bank account. Zero arbitrary penalties.
                </p>
              </div>
            </div>

            {/* Box 2: Welfare */}
            <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900">Health & Welfare</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">5%</span>
              </div>
              <div>
                <span className="text-xl font-black text-amber-950 font-display block">
                  ₹{breakdown.welfareInsurance}
                </span>
                <p className="text-[10px] text-surface-500 mt-1 leading-normal">
                  Funds group health cover, accident insurance, and upskilling training.
                </p>
              </div>
            </div>

            {/* Box 3: Cooperative */}
            <div className="bg-white rounded-2xl p-4 border border-coop-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-coop-900">Coop Federation</span>
                <span className="text-[10px] font-bold bg-coop-100 text-coop-900 px-1.5 py-0.5 rounded">10%</span>
              </div>
              <div>
                <span className="text-xl font-black text-coop-950 font-display block">
                  ₹{breakdown.cooperativeFund}
                </span>
                <p className="text-[10px] text-surface-500 mt-1 leading-normal">
                  Funds local tool libraries, society equipment, and emergency worker aid.
                </p>
              </div>
            </div>

            {/* Box 4: Platform Operations */}
            <div className="bg-white rounded-2xl p-4 border border-surface-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-surface-700">Platform Ops</span>
                <span className="text-[10px] font-bold bg-surface-100 text-surface-700 px-1.5 py-0.5 rounded">5%</span>
              </div>
              <div>
                <span className="text-xl font-black text-surface-900 font-display block">
                  ₹{breakdown.platformOperations}
                </span>
                <p className="text-[10px] text-surface-500 mt-1 leading-normal">
                  Server hosting, cloud AI models, map APIs, and customer verification.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-surface-200 text-center">
            <span className="text-[11px] text-surface-400 font-normal italic">
              *Percentages represent configurable cooperative standard guidelines per state federation bylaws.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
