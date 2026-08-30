import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Star, Shield, Wallet, Award, BookOpen, Phone } from 'lucide-react';
import { MOCK_WORKERS } from '../../data/mockWorkers';

const BENEFITS = [
  { icon: Wallet, title: 'Guaranteed Earnings', desc: '80% of every job goes directly to you. No middlemen, no deductions beyond welfare contributions.', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: Shield, title: 'Welfare & Insurance', desc: '₹5 Lakh health & accidental insurance, pension contributions, and emergency advance from the cooperative fund.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: BookOpen, title: 'Upskilling Programs', desc: 'Free NSDC-certified training courses sponsored by the cooperative. Level up your skills, earn more.', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Award, title: 'Digital Skill Passport', desc: 'Verifiable credentials recognized by all partner cooperatives and government institutions.', color: 'text-amber-600', bg: 'bg-amber-50' },
];

export const ForWorkersPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gray-900 py-16 px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">For Workers</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Work with Dignity.<br />Earn What You Deserve.
        </h1>
        <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
          Join the Sahyog Cooperative Federation. Fair wages, social security, digital credentials, and technology that works for you — not against you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/signup" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
            Register as a Worker <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/how-it-works" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-colors">
            Learn More
          </Link>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Why Join the Sahyog Cooperative?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {BENEFITS.map(b => (
            <div key={b.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${b.bg} rounded-xl flex items-center justify-center mb-4`}>
                <b.icon className={`w-5 h-5 ${b.color}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Worker Profiles preview */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 p-8">
          <h3 className="text-lg font-black text-gray-900 mb-6 text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Meet Our Cooperative Workers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MOCK_WORKERS.slice(0, 4).map(w => (
              <div key={w.id} className="text-center bg-white rounded-2xl border border-gray-200 p-4">
                <img src={w.avatar} alt={w.name} className="w-16 h-16 rounded-xl object-cover mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-900">{w.name.split(' ')[0]}</p>
                <p className="text-xs text-gray-500">{w.primarySkill}</p>
                <p className="text-xs font-semibold text-amber-600 mt-1">⭐ {w.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-green-600 py-14 px-4 text-center">
        <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Ready to Join the Cooperative?
        </h2>
        <p className="text-green-100 mb-6">Registration is free. Benefits start from Day 1.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2">
            Register Now <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+912045678900" className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </div>
      </div>
    </div>
  );
};
