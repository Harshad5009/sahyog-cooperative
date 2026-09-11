import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, Shield, BookOpen, Award, Star, Phone, Users, CheckCircle2 } from 'lucide-react';
import { MOCK_WORKERS } from '../../data/mockWorkers';

const BENEFITS = [
  { icon: Wallet, title: 'Guaranteed Earnings', desc: '80% of every job goes directly to you. No middlemen, no deductions beyond welfare contributions.', color: 'text-teal-700', bg: 'bg-teal-50' },
  { icon: Shield, title: 'Welfare & Insurance', desc: '₹5 Lakh health & accidental insurance, pension contributions, and emergency advance from the cooperative fund.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: BookOpen, title: 'Upskilling Programs', desc: 'Free NSDC-certified training courses sponsored by the cooperative. Level up your skills, earn more.', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Award, title: 'Digital Skill Passport', desc: 'Verifiable credentials recognized by all partner cooperatives and government institutions.', color: 'text-amber-600', bg: 'bg-amber-50' },
];

const STEPS = [
  { n: '01', t: 'Register & Verify', d: 'Aadhaar eKYC + NSDC skill certification' },
  { n: '02', t: 'Join Cooperative Society', d: 'Become a member of your local Labour Cooperative' },
  { n: '03', t: 'Get Your Skill Passport', d: 'Digital certificate valid across all partner societies' },
  { n: '04', t: 'Receive Fair Work Orders', d: 'AI dispatches you fairly based on skill & availability' },
];

export const ForWorkersPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-teal-950 py-16 px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-800 border border-teal-700 rounded-full text-xs font-bold text-teal-200 mb-4">
          <Users className="w-3.5 h-3.5" />
          <span>For Cooperative Workers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 font-display">
          Work with Dignity.<br />Earn What You Deserve.
        </h1>
        <p className="text-base text-teal-300 max-w-2xl mx-auto mb-8">
          Join the Sahyog Cooperative Federation. Fair wages, social security, digital credentials, and technology that works for you — not against you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/signup" className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-teal-900/40">
            Register as a Worker <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/how-it-works" className="px-6 py-3 bg-teal-900 hover:bg-teal-800 text-teal-100 font-bold rounded-xl transition-colors border border-teal-700">
            Learn More
          </Link>
        </div>
      </div>

      {/* 4-Step registration */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-100">
        <h2 className="text-xl font-black text-gray-900 text-center mb-8 font-display">How to Join in 4 Steps</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STEPS.map(s => (
            <div key={s.n} className="text-center">
              <div className="w-10 h-10 rounded-full bg-teal-700 text-white text-sm font-black flex items-center justify-center mx-auto mb-2">{s.n}</div>
              <p className="text-xs font-bold text-gray-900">{s.t}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10 font-display">
          Why Join the Sahyog Cooperative?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {BENEFITS.map(b => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-teal-300 transition-all">
                <div className={`w-10 h-10 ${b.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${b.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-display">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Worker Profiles preview */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 p-8">
          <h3 className="text-lg font-black text-gray-900 mb-6 text-center font-display">
            Meet Our Cooperative Workers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MOCK_WORKERS.slice(0, 4).map(w => (
              <div key={w.id} className="text-center bg-white rounded-2xl border border-gray-200 p-4 hover:border-teal-300 hover:shadow-sm transition-all">
                <img src={w.avatar} alt={w.name} className="w-16 h-16 rounded-xl object-cover mx-auto mb-2 border-2 border-teal-100" />
                <p className="text-sm font-bold text-gray-900">{w.name.split(' ')[0]}</p>
                <p className="text-xs text-gray-500">{w.primarySkill}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-semibold text-amber-700">{w.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-teal-700 py-14 px-4 text-center">
        <h2 className="text-2xl font-black text-white mb-3 font-display">
          Ready to Join the Cooperative?
        </h2>
        <p className="text-teal-100 mb-6 text-sm">Registration is free. Benefits start from Day 1.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="px-6 py-3 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition-colors flex items-center gap-2 shadow-md">
            Register Now <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+912045678900" className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl transition-colors flex items-center gap-2 border border-teal-600">
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </div>
      </div>
    </div>
  );
};
