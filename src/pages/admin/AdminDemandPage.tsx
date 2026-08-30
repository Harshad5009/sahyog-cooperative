import React from 'react';
import { DemandForecastingPreview } from '../../components/home/DemandForecastingPreview';
import { WorkforceAdvisor } from '../../components/admin/WorkforceAdvisor';

export const AdminDemandPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          AI Demand Forecaster & Workforce Advisor
        </h1>
        <p className="text-xs text-surface-500">
          Predictive capacity modeling and automated recommendations to prevent worker shortages and fatigue.
        </p>
      </div>

      <DemandForecastingPreview />
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
        <WorkforceAdvisor />
      </div>
    </div>
  );
};
