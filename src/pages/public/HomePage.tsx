import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, ChevronDown, ArrowRight, ShieldCheck, 
  IndianRupee, Clock, Heart, Star, Users
} from 'lucide-react';
import heroWorkers from '../../assets/hero-workers.jpg';

const SERVICES_LIST = [
  'Plumbing & Water',
  'Electrical Work',
  'Carpentry & Joinery',
  'Painting & Waterproofing',
  'Deep Cleaning',
  'Caregiving & Elderly',
  'Driver Services',
  'Gardening',
  'Pest Control',
  'Appliance Repair',
];

const SERVICE_CARDS = [
  { name: 'Plumbing', emoji: '🔧', color: 'bg-blue-50', href: '/services/plumbing' },
  { name: 'Electrical', emoji: '⚡', color: 'bg-yellow-50', href: '/services/electrical' },
  { name: 'Carpentry', emoji: '🪚', color: 'bg-orange-50', href: '/services/carpentry' },
  { name: 'Painting', emoji: '🎨', color: 'bg-purple-50', href: '/services/painting' },
  { name: 'Cleaning', emoji: '🧹', color: 'bg-cyan-50', href: '/services/cleaning' },
  { name: 'Caregivers', emoji: '💙', color: 'bg-pink-50', href: '/services/caregiving' },
];

const MORE_SERVICES = [
  { name: 'Drivers', emoji: '🚗' },
  { name: 'Gardening', emoji: '🌿' },
  { name: 'Pest Control', emoji: '🐛' },
  { name: 'Appliance Repair', emoji: '🔌' },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Verified Professionals', color: 'text-green-600' },
  { icon: IndianRupee, label: 'Fair Prices\nTransparent Billing', color: 'text-blue-600' },
  { icon: Clock, label: 'On-time\nServices', color: 'text-amber-600' },
  { icon: Heart, label: 'Worker Welfare\n& Insurance', color: 'text-rose-500' },
];

export const HomePage: React.FC = () => {
  const [location, setLocation] = useState('Kothrud, Pune');
  const [service, setService] = useState('');

  return (
    <div className="bg-white overflow-hidden">

      {/* ─── HERO SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Copy & Search */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full mb-4 sm:mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[11px] sm:text-xs font-semibold text-green-700">
                Cooperative. Trusted. Transparent.
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight sm:leading-tight text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Trusted Services.<br />
              Empowered Workers.<br />
              <span className="text-green-600">Stronger Communities.</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-7 leading-relaxed max-w-md mx-auto lg:mx-0">
              Sahyog is a cooperative-owned platform that connects you with verified local experts for all your household and community needs.
            </p>

            {/* Modern Search Bar Pill */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-white border border-gray-200 rounded-2xl p-2 shadow-md max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-7 text-left">
              {/* Location */}
              <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-gray-50 sm:bg-transparent rounded-xl sm:rounded-none">
                <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full text-xs sm:text-sm text-gray-800 font-medium placeholder-gray-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="hidden sm:block w-px bg-gray-200 self-stretch my-1" />

              {/* Service Select */}
              <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-gray-50 sm:bg-transparent rounded-xl sm:rounded-none relative">
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full text-xs sm:text-sm text-gray-800 font-medium focus:outline-none bg-transparent appearance-none cursor-pointer pr-6"
                >
                  <option value="">Select a service</option>
                  {SERVICES_LIST.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 pointer-events-none absolute right-3" />
              </div>

              {/* Book CTA */}
              <Link
                to="/customer/book"
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm whitespace-nowrap"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 text-left justify-center lg:justify-start">
              {TRUST_BADGES.map(b => (
                <div key={b.label} className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-600">
                  <b.icon className={`w-4 h-4 ${b.color} shrink-0`} />
                  <span className="font-medium whitespace-pre-line">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Worker Hero Image & Floating Badges */}
          <div className="order-1 lg:order-2 relative flex justify-center items-center">
            {/* Fluid organic backdrop */}
            <div className="absolute w-[88%] h-[88%] bg-green-50/90 rounded-[60%_40%_55%_45%/50%_60%_40%_50%] scale-105" />

            <img
              src={heroWorkers}
              alt="Sahyog Cooperative Service Workers"
              className="relative z-10 w-full max-w-[360px] sm:max-w-[440px] h-[320px] sm:h-[420px] object-cover object-top rounded-3xl shadow-xl border-2 border-white"
            />

            {/* Floating Top Badge: 10K+ Workers */}
            <div className="absolute top-3 right-2 sm:-right-2 z-20 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2.5 border border-gray-100 animate-float">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
              </div>
              <div className="text-left">
                <span className="text-sm sm:text-base font-black text-gray-900 block leading-tight">10K+</span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Verified Workers</span>
              </div>
            </div>

            {/* Floating Bottom Card: Cooperative Trust */}
            <div className="absolute -bottom-4 left-2 sm:bottom-6 sm:-left-4 z-20 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-3 sm:p-4 max-w-[190px] sm:max-w-[210px] border border-gray-100 text-left">
              <p className="text-[11px] sm:text-xs font-bold text-gray-800 mb-0.5">Cooperative Movement</p>
              <p className="text-[10px] sm:text-[11px] text-gray-500 mb-2">Empowering local service technicians with fair wages.</p>
              <Link to="/for-cooperatives" className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 hover:underline">
                <span>Know More</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ─── SERVICES SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left 2 Cols: Services Catalog Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">OUR SERVICES</p>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  What do you need help with?
                </h2>
              </div>
              <Link to="/services" className="text-xs sm:text-sm font-semibold text-green-600 hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Primary Service Cards (2 cols on small mobile, 3 on tablet, 6 on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 mb-3">
              {SERVICE_CARDS.map(s => (
                <Link
                  key={s.name}
                  to={s.href}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group bg-white active:scale-98 text-center"
                >
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 ${s.color} rounded-xl flex items-center justify-center text-xl sm:text-2xl`}>
                    {s.emoji}
                  </div>
                  <span className="text-xs font-semibold text-gray-800">{s.name}</span>
                  <span className="text-[10px] text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Book Now <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Secondary Services Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {MORE_SERVICES.map(s => (
                <Link
                  key={s.name}
                  to="/services"
                  className="flex items-center gap-2.5 p-3 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-xs transition-all bg-white"
                >
                  <span className="text-lg">{s.emoji}</span>
                  <span className="text-xs font-semibold text-gray-700">{s.name}</span>
                </Link>
              ))}
            </div>

            {/* Join Movement Banner */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-green-600 rounded-2xl p-4 sm:p-5 text-center sm:text-left">
              <span className="text-xs sm:text-sm font-bold text-white">Join the cooperative movement today!</span>
              <Link
                to="/for-cooperatives"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-white text-green-700 text-xs sm:text-sm font-bold rounded-xl hover:bg-green-50 transition-colors shrink-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Col: Making an Impact Together */}
          <div className="bg-gray-50 rounded-3xl p-5 sm:p-6 border border-gray-100">
            <h3 className="text-sm sm:text-base font-black text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Making an Impact Together
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { stat: '50K+', label: 'Services Done', emoji: '📋', bg: 'bg-green-50' },
                { stat: '10K+', label: 'Happy Users', emoji: '😊', bg: 'bg-yellow-50' },
                { stat: '15+',  label: 'Cities Covered', emoji: '🏙️', bg: 'bg-blue-50' },
                { stat: '8K+',  label: 'Workers Joined', emoji: '👷', bg: 'bg-orange-50' },
              ].map(item => (
                <div key={item.stat} className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 ${item.bg} rounded-lg flex items-center justify-center text-base mb-1.5`}>
                    {item.emoji}
                  </div>
                  <span className="text-lg sm:text-xl font-black text-gray-900 block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {item.stat}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* 4.9 Star Rating badge */}
            <div className="mt-3.5 p-3.5 bg-white rounded-2xl border border-gray-100">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-700 font-bold">4.9 / 5.0 Average Rating</p>
              <p className="text-[10px] text-gray-400 mt-0.5">From 12,400+ verified customer ratings</p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <section className="border-t border-gray-100 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { emoji: '🔒', title: 'Secure Payments', sub: 'Multiple safe payment options' },
              { emoji: '📍', title: 'Real-time Tracking', sub: 'Track your worker in real time' },
              { emoji: '📅', title: 'Easy Rescheduling', sub: 'Flexible booking adjustments' },
              { emoji: '🎧', title: '24/7 Support', sub: "We're always here to assist" },
            ].map(t => (
              <div key={t.title} className="flex items-center gap-2.5">
                <span className="text-lg sm:text-xl shrink-0">{t.emoji}</span>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-gray-800">{t.title}</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
