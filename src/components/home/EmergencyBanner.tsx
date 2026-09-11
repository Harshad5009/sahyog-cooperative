import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Siren, ArrowRight, MapPin, ShieldAlert, Zap, Radio, PhoneCall } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleEmergencySOS = () => {
    navigate('/customer/book', {
      state: {
        isEmergency: true,
        initialProblem: 'EMERGENCY: Immediate burst pipe / electrical short hazard.',
      }
    });
  };

  const steps = [
    { num: '01', title: 'SOS Request', desc: '1-Tap emergency beacon' },
    { num: '02', title: 'GPS Location', desc: 'Instant geofence lock' },
    { num: '03', title: 'Qualified Worker', desc: 'Filtered for active duty' },
    { num: '04', title: 'Instant Notification', desc: 'Direct priority ping' },
    { num: '05', title: 'Worker Accepts', desc: 'Guaranteed 15-min ETA' },
    { num: '06', title: 'Live Arrival Tracking', desc: 'Real-time GPS tracker' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-surface-900 via-surface-950 to-coop-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left CTA Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Rapid Emergency Response Unit</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Need Help Right Now?
            </h2>

            <p className="text-sm text-surface-300 leading-relaxed">
              Burst water pipes, sparking circuit breakers, or critical door locks? Sahyog’s Emergency SOS mode bypasses scheduled queues to dispatch the closest on-duty certified specialist within 15–20 minutes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleEmergencySOS}
                className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-900/40 flex items-center gap-2 active:scale-95 transition-all"
              >
                <Siren className="w-4 h-4 animate-bounce" />
                <span>Emergency Service SOS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:18002667249"
                className="px-4 py-3.5 bg-surface-800 hover:bg-surface-700 text-surface-200 text-xs font-bold rounded-2xl border border-surface-700 flex items-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Cooperative Hotline: 1800-266-7249</span>
              </a>
            </div>
          </div>

          {/* Right Flow Visualization */}
          <div className="lg:col-span-7 bg-surface-900/70 backdrop-blur-md rounded-3xl border border-surface-800 p-6 sm:p-7">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-800">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-400 flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-400" />
                Real-Time Emergency Dispatch Protocol
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Avg Response: 14 Mins
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-surface-800/60 border border-surface-700/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-rose-500/40 transition-colors"
                >
                  <span className="text-[10px] font-black text-rose-400/80 font-mono">
                    {s.num}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{s.title}</h4>
                    <p className="text-[10px] text-surface-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-surface-800 text-[11px] text-surface-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Standardized transparent emergency surcharge applies — zero price gouging.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
