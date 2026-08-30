import React from 'react';
import { useApp } from '../../context/AppContext';
import { WelfareCard } from '../../components/worker/WelfareCard';

export const WorkerWelfarePage: React.FC = () => {
  const { activeWorker } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          Worker Welfare, Insurance & Pension Vault
        </h1>
        <p className="text-xs text-surface-500">
          Collective social safety net managed under Maharashtra Cooperative Societies Act.
        </p>
      </div>

      <WelfareCard worker={activeWorker} />
    </div>
  );
};
