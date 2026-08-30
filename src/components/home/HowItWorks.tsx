import React from 'react';
import { MessageSquare, Cpu, Navigation, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Tell us what you need',
      desc: 'Speak or type your household issue in simple Marathi, Hindi, or English. No technical jargon required.',
      icon: MessageSquare,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      step: '02',
      title: 'AI finds the right cooperative worker',
      desc: 'Our ethical algorithm matches verified professionals based on skill, certification, proximity, and fair daily workload.',
      icon: Cpu,
      color: 'bg-coop-50 text-coop-800 border-coop-200',
    },
    {
      step: '03',
      title: 'Track the service in real time',
      desc: 'Follow your worker’s arrival live on map, inspect their Digital Skill Passport, and verify safety checklist.',
      icon: Navigation,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      step: '04',
      title: 'Pay securely and rate the service',
      desc: 'Transparent pricing with zero hidden cuts: 80% goes directly to worker wages, and 5% funds health and accident welfare.',
      icon: CreditCard,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
            <span>Seamless 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display mb-4">
            How Sahyog Works
          </h2>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
            From speaking your problem to transparent digital settlement, experience the next generation of cooperative technology.
          </p>
        </div>

        {/* 4 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface-50 rounded-3xl p-6 border border-surface-200 flex flex-col justify-between hover:shadow-card hover:border-coop-300 transition-all duration-200 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-coop-950 font-mono tracking-tighter">
                      {item.step}
                    </span>
                    <div className={`p-3 rounded-2xl border ${item.color} shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-surface-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-surface-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-surface-200/60 flex items-center gap-1 text-[11px] font-semibold text-coop-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-coop-600" />
                  <span>Standardized Quality</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
