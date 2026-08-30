import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, RotateCcw, User, Wrench, Building, Sparkles, ChevronUp, ChevronDown, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoFlowController: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    isDemoRunning, 
    demoStep, 
    demoMessage, 
    runFullDemoScenario, 
    resetDemoScenario 
  } = useApp();

  const [isOpen, setIsOpen] = useState(false); // Default collapsed into bottom-right pill
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleRoleChange = (role: 'customer' | 'worker' | 'admin') => {
    setCurrentRole(role);
    if (role === 'customer') navigate('/customer/dashboard');
    if (role === 'worker') navigate('/worker/dashboard');
    if (role === 'admin') navigate('/admin/dashboard');
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-gray-900/90 text-white hover:bg-gray-900 px-3 py-2 rounded-full shadow-lg border border-gray-700 text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition-all hover:scale-105"
        title="Open SIH Demo Controller"
      >
        <Sparkles className="w-3.5 h-3.5 text-green-400" />
        <span>SIH Demo</span>
      </button>
    );
  }

  return (
    <aside aria-label="SIH 2026 Presentation Controller" className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Minimized Pill Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-900/95 hover:bg-gray-900 text-white px-3.5 py-2.5 rounded-2xl shadow-xl border border-gray-700/80 text-xs font-bold flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105 group"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-green-400 group-hover:rotate-12 transition-transform" />
          <span>SIH 2026 Demo Controller</span>
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        </button>
      ) : (
        /* Expanded Floating Card */
        <div className="w-[92vw] max-w-lg bg-gray-900/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-3.5 animate-fade-in text-xs">
          
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-bold text-gray-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-green-400" />
                SIH 2026 Presentation Controller
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                title="Minimize controller"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-800 transition-colors"
                title="Hide controller"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span className="text-[11px] text-gray-400 font-medium">Switch Role:</span>
            <div className="flex items-center gap-1 bg-gray-800/80 p-1 rounded-xl border border-gray-700">
              <button
                onClick={() => handleRoleChange('customer')}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                  currentRole === 'customer'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <User className="w-3 h-3" />
                <span>Customer</span>
              </button>

              <button
                onClick={() => handleRoleChange('worker')}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                  currentRole === 'worker'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Wrench className="w-3 h-3" />
                <span>Worker</span>
              </button>

              <button
                onClick={() => handleRoleChange('admin')}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                  currentRole === 'admin'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Building className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Live Scenario Runner */}
          <div className="mt-3 pt-2.5 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              {isDemoRunning ? (
                <div className="flex items-center gap-1.5 text-green-300 font-medium animate-pulse">
                  <span className="px-1.5 py-0.5 bg-green-950 text-green-300 rounded text-[10px] font-mono font-bold">
                    Step {demoStep}/7
                  </span>
                  <span className="truncate text-[11px]">{demoMessage}</span>
                </div>
              ) : (
                <div className="text-gray-300 text-[11px] leading-tight">
                  {demoStep === 7 ? (
                    <span className="text-green-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Simulation Complete
                    </span>
                  ) : (
                    <span className="text-gray-400">Automated 7-step presentation flow</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
              <button
                onClick={runFullDemoScenario}
                disabled={isDemoRunning}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isDemoRunning ? 'Simulating...' : 'Run Demo Flow'}</span>
              </button>

              <button
                onClick={resetDemoScenario}
                className="p-1.5 text-gray-400 hover:text-white bg-gray-800 rounded-xl border border-gray-700 transition-colors"
                title="Reset Demo State"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      )}
    </aside>
  );
};
