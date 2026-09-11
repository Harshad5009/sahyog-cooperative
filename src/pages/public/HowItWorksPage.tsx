import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, PhoneCall, MapPin, Wrench, CreditCard, ShieldCheck, Cpu, Users, IndianRupee } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Describe Your Need',
    description: 'Tell us your problem in plain language — Hindi, Marathi, or English. Our AI classifies it and creates a technical service ticket automatically.',
    icon: PhoneCall,
    color: 'bg-sky-50 border-sky-200',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
  },
  {
    number: '02',
    title: 'AI Matches Nearest Worker',
    description: 'Our Fair Allocation engine scores every qualified cooperative worker on skill, proximity, current workload, and reliability — ensuring fair distribution.',
    icon: Cpu,
    color: 'bg-teal-50 border-teal-200',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    number: '03',
    title: 'Verified Professional Arrives',
    description: 'Your allocated worker is background-verified with biometric ID, police clearance, and cooperative membership. Track arrival in real-time.',
    icon: ShieldCheck,
    color: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    number: '04',
    title: 'Transparent Payment',
    description: '80% to the worker directly, 5% to the worker welfare fund, 10% to the cooperative society, and 5% platform operations. No hidden charges.',
    icon: IndianRupee,
    color: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
];

const FAQS = [
  { q: 'How are workers verified?', a: 'Every cooperative worker completes Aadhaar eKYC, police verification, and NSDC skill certification before being registered on the platform.' },
  { q: 'What if I am not satisfied?', a: 'We offer a 100% service guarantee. If you are not satisfied, we will re-send a qualified worker at no additional charge.' },
  { q: 'How does AI fair allocation work?', a: 'Our algorithm scores every qualified worker on skill match (30%), proximity (25%), current workload (25%), and past reliability (20%) — ensuring no single worker is overloaded.' },
  { q: 'When does the worker receive payment?', a: "Payment is released directly to the worker's bank account within 2 hours of service completion — no middlemen." },
];

export const HowItWorksPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-200 py-14 px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs font-bold text-teal-800 mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>How It Works</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 font-display">
          Simple. Transparent. Cooperative.
        </h1>
        <p className="text-base text-gray-500 max-w-2xl mx-auto">
          From problem description to service completion in under 30 minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-5">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className={`flex gap-5 p-6 rounded-2xl border ${step.color}`}>
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center shadow-xs`}>
                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 rounded-full" />
                  )}
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[10px] font-black text-gray-400 tracking-widest">STEP {step.number}</span>
                    <h3 className="text-base font-bold text-gray-900 font-display">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wage breakdown infographic */}
        <div className="mt-12 bg-teal-950 rounded-3xl p-6 sm:p-8 text-white">
          <h3 className="text-base font-black font-display mb-5 text-center text-teal-100">Transparent Wage Distribution</h3>
          <div className="flex h-8 rounded-xl overflow-hidden mb-4">
            <div className="bg-emerald-400 flex items-center justify-center text-xs font-black text-emerald-950 transition-all" style={{ width: '80%' }}>80%</div>
            <div className="bg-teal-400 flex items-center justify-center text-xs font-black text-teal-950" style={{ width: '5%' }}></div>
            <div className="bg-cyan-500 flex items-center justify-center text-xs font-black text-cyan-950" style={{ width: '10%' }}></div>
            <div className="bg-slate-500 flex items-center justify-center text-xs font-black text-slate-100" style={{ width: '5%' }}></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div><div className="w-3 h-3 bg-emerald-400 rounded-sm mx-auto mb-1" /><strong className="text-white block">80%</strong><span className="text-teal-300">Worker Direct Wage</span></div>
            <div><div className="w-3 h-3 bg-teal-400 rounded-sm mx-auto mb-1" /><strong className="text-white block">5%</strong><span className="text-teal-300">Worker Welfare Fund</span></div>
            <div><div className="w-3 h-3 bg-cyan-500 rounded-sm mx-auto mb-1" /><strong className="text-white block">10%</strong><span className="text-teal-300">Cooperative Society</span></div>
            <div><div className="w-3 h-3 bg-slate-500 rounded-sm mx-auto mb-1" /><strong className="text-white block">5%</strong><span className="text-teal-300">Platform Operations</span></div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/customer/book" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-xs transition-colors">
            Book Your First Service <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-gray-50 border-t border-gray-200 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center font-display">
            Common Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((item, idx) => (
              <div
                key={item.q}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 text-sm font-semibold text-gray-900 flex items-center justify-between gap-2"
                >
                  {item.q}
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
