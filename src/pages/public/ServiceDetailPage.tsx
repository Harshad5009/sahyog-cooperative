import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CheckCircle2, Star, Clock, Wrench, ArrowRight } from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockServices';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = MOCK_SERVICES.find(s => s.id === serviceId) || MOCK_SERVICES[0];

  return (
    <div className="pt-28 pb-20 bg-surface-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-coop-800 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-surface-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-coop-800 bg-coop-100 px-2.5 py-1 rounded-md">
                Cooperative Rate Card
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-surface-900 mt-2 font-display">
                {service.name}
              </h1>
              <p className="text-xs text-surface-500 mt-1">{service.description}</p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs text-surface-400 block font-medium">Standard Base Fare</span>
              <span className="text-2xl font-black text-coop-950 font-display">
                ₹{service.basePrice}
              </span>
            </div>
          </div>

          {/* Subservices Rate Table */}
          <div className="py-6 border-b border-surface-100">
            <h3 className="text-sm font-bold text-surface-900 mb-4">
              Detailed Scope of Work & Pricing
            </h3>
            <div className="space-y-3">
              {service.subServices.map(sub => (
                <div
                  key={sub.id}
                  className="p-4 bg-surface-50 rounded-2xl border border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-surface-900">{sub.name}</h4>
                    <p className="text-[11px] text-surface-500 mt-0.5">{sub.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-surface-900 font-display shrink-0">
                      ₹{sub.price}
                    </span>
                    <button
                      onClick={() => navigate('/customer/book', { state: { initialCategory: service.id, initialProblem: sub.name } })}
                      className="px-3 py-1.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality & Safety Checklist */}
          <div className="py-6">
            <h3 className="text-sm font-bold text-surface-900 mb-3">
              Cooperative Quality & Safety Guarantee
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-surface-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-surface-100 flex justify-end">
            <button
              onClick={() => navigate('/customer/book', { state: { initialCategory: service.id } })}
              className="px-6 py-3 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Instant AI Booking for {service.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
