import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Star, Shield, Clock, PhoneCall, MapPin, Wrench, CreditCard, Eye } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Describe Your Need',
    description: 'Tell us your problem in plain language — Hindi, Marathi, or English. Our AI classifies it and creates a technical service ticket automatically.',
    icon: PhoneCall,
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    number: '02',
    title: 'AI Matches Nearest Worker',
    description: 'Our Fair Allocation engine scores every qualified cooperative worker on skill, proximity, current workload, and reliability — ensuring fair distribution.',
    icon: MapPin,
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
  },
  {
    number: '03',
    title: 'Verified Professional Arrives',
    description: 'Your allocated worker is background-verified with biometric ID, police clearance, and cooperative membership. Track arrival in real-time.',
    icon: Wrench,
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
  },
  {
    number: '04',
    title: 'Transparent Payment',
    description: '80% to the worker directly, 5% to the worker welfare fund, 10% to the cooperative society, and 5% platform operations. No hidden charges.',
    icon: CreditCard,
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
  },
];

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-200 py-14 px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">How It Works</p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Simple, Transparent, Cooperative
        </h1>
        <p className="text-base text-gray-500 max-w-2xl mx-auto">
          From problem description to service completion in under 30 minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {STEPS.map((step, idx) => (
            <div key={step.number} className={`flex gap-6 p-6 rounded-2xl border ${step.color}`}>
              <div className="shrink-0">
                <div className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-black text-gray-400">STEP {step.number}</span>
                  <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{step.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="hidden sm:flex shrink-0 items-center">
                  <ArrowRight className="w-5 h-5 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/customer/book" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-sm transition-colors">
            Book Your First Service <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-gray-50 border-t border-gray-200 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Common Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'How are workers verified?', a: 'Every cooperative worker completes Aadhaar eKYC, police verification, and NSDC skill certification before being registered on the platform.' },
              { q: 'What if I am not satisfied?', a: 'We offer a 100% service guarantee. If you are not satisfied, we will re-send a qualified worker at no additional charge.' },
              { q: 'How does AI fair allocation work?', a: 'Our algorithm scores every qualified worker on skill match (30%), proximity (25%), current workload (25%), and past reliability (20%) — ensuring no single worker is overloaded.' },
              { q: 'When does the worker receive payment?', a: 'Payment is released directly to the worker\'s bank account within 2 hours of service completion — no middlemen.' },
            ].map(item => (
              <details key={item.q} className="bg-white border border-gray-200 rounded-2xl px-5 py-4 group">
                <summary className="text-sm font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <ArrowRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
