import React from 'react';
import { Sparkles, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Zap, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { AIWorkforceRecommendation } from '../../types';

export const WorkforceAdvisor: React.FC = () => {
  const { aiRecommendations, resolveRecommendation } = useApp();

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'high':
        return 'bg-rose-50 border-rose-200 text-rose-800';
      case 'medium':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      default:
        return 'bg-coop-50 border-coop-200 text-coop-800';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'training':
        return <BookOpen className="w-5 h-5 text-coop-700" />;
      case 'shortage':
        return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-coop-700" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-surface-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-coop-600" />
            AI Workforce Advisor & Policy Recommendations
          </h3>
          <p className="text-xs text-surface-500">
            Real-time recommendations to balance demand, prevent fatigue, and upskill cooperative workers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiRecommendations.map(rec => (
          <div
            key={rec.id}
            className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
              rec.resolved
                ? 'bg-surface-50 border-surface-200 opacity-60'
                : 'bg-white border-surface-200 shadow-card hover:shadow-elevated'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-surface-100 border border-surface-200 shrink-0">
                    {getIcon(rec.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-surface-900">
                      {rec.title}
                    </h4>
                    <span className="text-[10px] text-surface-400 font-medium">
                      {rec.zone} • {rec.service}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border shrink-0 ${getSeverityStyle(rec.severity)}`}>
                  {rec.severity}
                </span>
              </div>

              <div className="space-y-2 text-xs text-surface-600 mb-4">
                <div className="p-2.5 bg-surface-50 rounded-xl border border-surface-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 block mb-0.5">
                    Root Cause:
                  </span>
                  <p className="text-xs text-surface-700 leading-relaxed">{rec.reason}</p>
                </div>

                <div className="p-2.5 bg-coop-50/50 rounded-xl border border-coop-100 text-coop-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-coop-700 block mb-0.5">
                    Impact & Suggested Action:
                  </span>
                  <p className="text-xs font-medium leading-relaxed">{rec.suggestedAction}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-100 flex items-center justify-between">
              <span className="text-[10px] text-surface-400">
                {rec.resolved ? 'Action Executed' : 'Awaiting Approval'}
              </span>

              {!rec.resolved ? (
                <button
                  onClick={() => resolveRecommendation(rec.id)}
                  className="px-3.5 py-1.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span>{rec.actionButtonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Resolved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
