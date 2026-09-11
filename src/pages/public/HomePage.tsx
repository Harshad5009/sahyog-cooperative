import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  IndianRupee, 
  Heart, 
  Users, 
  Zap, 
  Droplet, 
  Hammer, 
  Paintbrush, 
  Sparkles, 
  HeartHandshake, 
  Car, 
  Sprout, 
  Wrench, 
  Settings, 
  Home, 
  MoreHorizontal, 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Star, 
  Building2,
  CheckCircle2,
  Cpu,
  ShieldAlert
} from 'lucide-react';

import heroWorkersWide from '../../assets/hero-workers-wide.jpg';
import workerWoman from '../../assets/worker-woman.jpg';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('Pune, Maharashtra');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/customer/book', { 
      state: { 
        initialProblem: searchService || 'General household service required', 
        location: searchLocation 
      } 
    });
  };

  const handleCategoryClick = (category: string) => {
    navigate('/customer/book', { state: { initialCategory: category, location: searchLocation } });
  };

  // 12 Standard Services with Standard Symbols (NO EMOJIS)
  const popularServices = [
    {
      id: 'electrical',
      name: 'Electrical',
      startingPrice: '₹400',
      workers: '124+ workers',
      icon: Zap,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      id: 'plumbing',
      name: 'Plumbing',
      startingPrice: '₹350',
      workers: '98+ workers',
      icon: Droplet,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-500',
    },
    {
      id: 'carpentry',
      name: 'Carpentry',
      startingPrice: '₹450',
      workers: '76+ workers',
      icon: Hammer,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      id: 'painting',
      name: 'Painting',
      startingPrice: '₹400',
      workers: '64+ workers',
      icon: Paintbrush,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
    },
    {
      id: 'cleaning',
      name: 'Cleaning',
      startingPrice: '₹300',
      workers: '112+ workers',
      icon: Sparkles,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'caregiving',
      name: 'Caregiving',
      startingPrice: '₹500',
      workers: '48+ workers',
      icon: Heart,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      id: 'driver',
      name: 'Driving',
      startingPrice: '₹600',
      workers: '72+ workers',
      icon: Car,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-600',
    },
    {
      id: 'gardening',
      name: 'Gardening',
      startingPrice: '₹350',
      workers: '56+ workers',
      icon: Sprout,
      iconBg: 'bg-lime-50',
      iconColor: 'text-lime-600',
    },
    {
      id: 'appliance',
      name: 'Appliance Repair',
      startingPrice: '₹450',
      workers: '83+ workers',
      icon: Wrench,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 'technician',
      name: 'Technician',
      startingPrice: '₹500',
      workers: '69+ workers',
      icon: Settings,
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
    },
    {
      id: 'domestic',
      name: 'Domestic Help',
      startingPrice: '₹300',
      workers: '95+ workers',
      icon: Home,
      iconBg: 'bg-slate-50',
      iconColor: 'text-slate-600',
    },
    {
      id: 'other',
      name: 'Other Services',
      startingPrice: '₹400',
      workers: '42+ workers',
      icon: MoreHorizontal,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans overflow-x-hidden">

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          SECTION 1: HERO SECTION
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Subtitle, Search Bar, Trust Badges */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Cooperative Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-teal-800">
              <Sprout className="w-3.5 h-3.5 text-teal-700" />
              <span className="tracking-wide uppercase text-[10px] sm:text-[11px]">
                COOPERATIVE-OWNED DIGITAL SERVICE MARKETPLACE
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black leading-[1.12] text-gray-900 tracking-tight font-display">
              Trusted Services.<br />
              Fair Work. <span className="text-teal-700">Stronger<br />Cooperatives.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed">
              Sahyog connects households and institutions with verified local workers through cooperative-owned digital infrastructure.
            </p>

            {/* Unified Search Bar Pill */}
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white border border-gray-200 rounded-2xl sm:rounded-full p-2 sm:p-2 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl"
            >
              {/* Service Input */}
              <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchService}
                  onChange={e => setSearchService(e.target.value)}
                  placeholder="What service do you need?"
                  className="w-full text-xs sm:text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="hidden sm:block w-px h-6 bg-gray-200" />

              {/* Location Select */}
              <div className="flex items-center gap-2 px-3 py-2 shrink-0 relative">
                <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
                <select
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                  className="text-xs sm:text-sm font-semibold text-gray-800 bg-transparent focus:outline-none appearance-none cursor-pointer pr-5"
                >
                  <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                  <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                  <option value="Nagpur, Maharashtra">Nagpur, Maharashtra</option>
                  <option value="Nashik, Maharashtra">Nashik, Maharashtra</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-2" />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-full shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </form>

            {/* 4 Trust Check Badges */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-gray-600 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Verified Workers</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Fair Wages</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Worker Welfare</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Cooperative Owned</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Wide Image & Flow Diagram */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Handwriting Label on Top Right */}
            <div className="self-end mr-4 mb-2 hidden sm:flex items-center gap-2 text-right">
              <div className="leading-tight">
                <span className="text-xs font-bold text-gray-700 block font-handwriting italic">
                  Local Skilled Workers
                </span>
                <span className="text-[11px] text-gray-500 font-handwriting italic">
                  for a Stronger Tomorrow
                </span>
              </div>
              <svg className="w-8 h-8 text-gray-400 rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4c6 2 12 6 14 12" />
                <path d="M14 16l4 0l0-4" />
              </svg>
            </div>

            {/* Hero Image */}
            <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={heroWorkersWide}
                alt="Sahyog Verified Cooperative Workers"
                className="w-full h-[280px] sm:h-[360px] lg:h-[390px] object-cover object-top"
              />
            </div>

            {/* Connected Flow Capsule Overlapping Bottom */}
            <div className="w-[94%] -mt-6 sm:-mt-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-gray-200/90 shadow-xl px-4 py-2.5 sm:py-3">
              <div className="grid grid-cols-2 sm:flex sm:items-center justify-between gap-3 text-center">
                
                {/* Node 1 */}
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    Households<br />& Institutions
                  </span>
                </div>

                <div className="hidden sm:block text-gray-300 font-bold">⇄</div>

                {/* Node 2 */}
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0">
                    <Sprout className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-teal-900 leading-tight">
                    Sahyog<br />Platform
                  </span>
                </div>

                <div className="hidden sm:block text-gray-300 font-bold">⇄</div>

                {/* Node 3 */}
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    Cooperative<br />Federation / Society
                  </span>
                </div>

                <div className="hidden sm:block text-gray-300 font-bold">⇄</div>

                {/* Node 4 */}
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    Verified<br />Workers
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          SECTION 2: POPULAR SERVICES & BE A WORKER CARD
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 border-t border-gray-100">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 bg-teal-700 rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-display">
                Popular Services
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Find skilled workers for your home, office or institution.
              </p>
            </div>
          </div>

          <Link
            to="/services"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Content Layout: 12 Services Grid (Left) + Be a Worker Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: 12 Service Cards (6 cols x 2 rows on desktop) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {popularServices.map(svc => {
                const IconComponent = svc.icon;
                return (
                  <div
                    key={svc.id}
                    onClick={() => handleCategoryClick(svc.id)}
                    className="bg-white border border-gray-200/80 hover:border-teal-500 rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group text-left"
                  >
                    <div>
                      {/* Standard Icon Symbol with Tinted Background */}
                      <div className={`w-9 h-9 ${svc.iconBg} ${svc.iconColor} rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      
                      <h3 className="text-xs font-bold text-gray-900 leading-tight group-hover:text-teal-700 transition-colors">
                        {svc.name}
                      </h3>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <span className="text-[11px] text-gray-500 block">
                        Starting at <strong className="text-gray-800 font-bold">{svc.startingPrice}</strong>
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        {svc.workers}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Join Our Cooperative - Be a Worker Card */}
          <div className="lg:col-span-4 bg-teal-50/60 border border-teal-100 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-800 block">
                JOIN OUR COOPERATIVE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 font-display">
                Be a Worker
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                Get verified, get work, get fair wages and welfare support.
              </p>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <span>Register Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Worker Woman Portrait with Transparent Blend */}
            <div className="my-4 flex justify-center">
              <img
                src={workerWoman}
                alt="Smiling Indian Female Cooperative Worker"
                className="w-36 sm:w-44 h-44 sm:h-52 object-cover object-top rounded-2xl shadow-md border-2 border-white"
              />
            </div>

            {/* 4 Footer Feature Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-teal-100 text-center">
              <div className="flex flex-col items-center">
                <GraduationCap className="w-4 h-4 text-teal-700 mb-1" />
                <span className="text-[10px] font-semibold text-gray-700">Skill Training</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-teal-700 mb-1" />
                <span className="text-[10px] font-semibold text-gray-700">Insurance</span>
              </div>
              <div className="flex flex-col items-center">
                <IndianRupee className="w-4 h-4 text-teal-700 mb-1" />
                <span className="text-[10px] font-semibold text-gray-700">Better Earnings</span>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="w-4 h-4 text-teal-700 mb-1" />
                <span className="text-[10px] font-semibold text-gray-700">Career Growth</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          SECTION 3: HOW IT WORKS & TRUSTED BY STATS
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 border-t border-gray-100">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 bg-teal-700 rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-display">
                How It Works
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Simple steps to get the service you need.
              </p>
            </div>
          </div>

          <Link
            to="/how-it-works"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
          >
            <span>View Full Process</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: 5 Connected Step Nodes */}
          <div className="lg:col-span-8 bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md mb-2 relative">
                  <Search className="w-5 h-5" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-teal-700 font-bold text-[10px] rounded-full border border-teal-200 flex items-center justify-center shadow-xs">
                    1
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-1">Search Service</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight max-w-[120px]">
                  Find the right service for your needs
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md mb-2 relative">
                  <Cpu className="w-5 h-5" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-teal-700 font-bold text-[10px] rounded-full border border-teal-200 flex items-center justify-center shadow-xs">
                    2
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-1">AI Finds Worker</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight max-w-[120px]">
                  Get the best matched verified workers
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md mb-2 relative">
                  <Calendar className="w-5 h-5" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-teal-700 font-bold text-[10px] rounded-full border border-teal-200 flex items-center justify-center shadow-xs">
                    3
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-1">Book & Schedule</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight max-w-[120px]">
                  Choose date, time and location
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md mb-2 relative">
                  <CreditCard className="w-5 h-5" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-teal-700 font-bold text-[10px] rounded-full border border-teal-200 flex items-center justify-center shadow-xs">
                    4
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-1">Pay Securely</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight max-w-[120px]">
                  Multiple payment options (UPI, Card, etc.)
                </p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md mb-2 relative">
                  <Star className="w-5 h-5 fill-white" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-teal-700 font-bold text-[10px] rounded-full border border-teal-200 flex items-center justify-center shadow-xs">
                    5
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-1">Rate & Review</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight max-w-[120px]">
                  Help us improve and support workers
                </p>
              </div>

            </div>
          </div>

          {/* Right: Trusted by Card */}
          <div className="lg:col-span-4 bg-gray-50 border border-gray-200/80 rounded-3xl p-6 shadow-xs">
            <h3 className="text-sm font-black text-gray-900 font-display">
              Trusted by
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 mb-5">
              Homes, Businesses, Institutions, Cooperatives.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              
              <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-2xs">
                <Users className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                <span className="text-sm font-black text-gray-900 block font-display">2,500+</span>
                <span className="text-[10px] text-gray-400">Verified Workers</span>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-2xs">
                <Heart className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                <span className="text-sm font-black text-gray-900 block font-display">1,200+</span>
                <span className="text-[10px] text-gray-400">Happy Customers</span>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                <span className="text-sm font-black text-gray-900 block font-display">98%</span>
                <span className="text-[10px] text-gray-400">Service Completion</span>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-2xs">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 mx-auto mb-1.5" />
                <span className="text-sm font-black text-gray-900 block font-display">4.8★</span>
                <span className="text-[10px] text-gray-400">Average Rating</span>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          SECTION 4: WHY CHOOSE SAHYOG?
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 border-t border-gray-100">
        
        {/* Section Header */}
        <div className="flex items-center gap-2.5 mb-7">
          <span className="w-1.5 h-6 bg-teal-700 rounded-full" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-display">
              Why Choose Sahyog?
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              More than just a service marketplace.
            </p>
          </div>
        </div>

        {/* 5 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          
          {/* Card 1 */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Cooperative Owned</h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                Built for workers, by workers. Not profit-driven.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Fair wages</h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                Transparent earnings for a better tomorrow.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Worker welfare</h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                Insurance, training & support for a secure future.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Local Employment</h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                Strengthening local communities.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-mint-50 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Trust & Safety</h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                Verified workers, secure payments, real reviews.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          SECTION 5: BOTTOM MOTTO & FLUID GREEN WAVE
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      <section className="pt-6 pb-0 overflow-hidden relative text-center">
        
        {/* Decorative Motto Line */}
        <div className="flex items-center justify-center gap-3 mb-6 text-teal-800 text-xs font-bold tracking-wide">
          <span className="w-12 h-px bg-teal-300" />
          <span className="italic font-display">Together We Build a Stronger, Fairer Future</span>
          <span className="w-12 h-px bg-teal-300" />
        </div>

        {/* Curved Green Cooperative Wave SVG matching screenshot */}
        <div className="w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-14 sm:h-20 lg:h-24 block preserve-3d"
          >
            <path
              d="M0,45 C320,85 640,10 960,55 C1200,90 1360,35 1440,25 L1440,90 L0,90 Z"
              fill="#0F766E"
            />
            <path
              d="M0,60 C280,30 580,75 880,40 C1140,10 1340,65 1440,50 L1440,90 L0,90 Z"
              fill="#0D6A63"
              opacity="0.6"
            />
          </svg>
        </div>

      </section>

    </div>
  );
};
