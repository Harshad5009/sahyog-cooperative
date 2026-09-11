import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  Clock, 
  Star, 
  IndianRupee,
  Zap,
  Droplet,
  Hammer,
  Paintbrush,
  Sparkles,
  Heart,
  Car,
  Sprout,
  Bug,
  Tv,
  Wrench,
  Lock,
  type LucideIcon
} from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockServices';

const SERVICE_ICONS: Record<string, { icon: LucideIcon; bg: string; color: string }> = {
  plumbing: { icon: Droplet, bg: 'bg-sky-50', color: 'text-sky-600' },
  electrical: { icon: Zap, bg: 'bg-amber-50', color: 'text-amber-600' },
  carpentry: { icon: Hammer, bg: 'bg-orange-50', color: 'text-orange-600' },
  painting: { icon: Paintbrush, bg: 'bg-rose-50', color: 'text-rose-600' },
  cleaning: { icon: Sparkles, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  caregiving: { icon: Heart, bg: 'bg-red-50', color: 'text-red-600' },
  driver: { icon: Car, bg: 'bg-teal-50', color: 'text-teal-600' },
  gardening: { icon: Sprout, bg: 'bg-lime-50', color: 'text-lime-600' },
  'pest-control': { icon: Bug, bg: 'bg-yellow-50', color: 'text-yellow-600' },
  appliance: { icon: Tv, bg: 'bg-blue-50', color: 'text-blue-600' },
  technician: { icon: Wrench, bg: 'bg-cyan-50', color: 'text-cyan-600' },
  security: { icon: Lock, bg: 'bg-slate-50', color: 'text-slate-600' },
};

export const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">All Cooperative Services</p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 font-display">
            What can we help you with today?
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            10+ verified cooperative services across Pune. Every worker is background-verified with health insurance and fair wages.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_SERVICES.map(service => {
            const meta = SERVICE_ICONS[service.id] || { icon: Wrench, bg: 'bg-teal-50', color: 'text-teal-700' };
            const Icon = meta.icon;
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-teal-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-teal-700">
                        ₹{service.basePrice}/hr
                      </span>
                      <span className="text-xs font-semibold text-teal-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Book Now <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Why Choose Banner */}
      <div className="bg-green-600 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: Shield, label: 'Verified Workers', sub: 'Background-checked' },
            { icon: IndianRupee, label: 'Transparent Pricing', sub: 'No hidden charges' },
            { icon: Clock, label: 'On-time Guarantee', sub: 'Punctual service' },
            { icon: Star, label: '4.9★ Rated', sub: '12,400+ reviews' },
          ].map(item => (
            <div key={item.label} className="text-white">
              <item.icon className="w-6 h-6 mx-auto mb-2 text-green-200" />
              <p className="text-sm font-bold">{item.label}</p>
              <p className="text-xs text-green-200">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
