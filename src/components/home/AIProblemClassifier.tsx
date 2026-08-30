import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Zap, 
  RotateCcw 
} from 'lucide-react';
import { MOCK_WORKERS } from '../../data/mockWorkers';
import { analyzeProblemWithAI } from '../../utils/aiMatchingEngine';

export const AIProblemClassifier: React.FC = () => {
  const navigate = useNavigate();
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);

  const demoExamples = [
    {
      text: 'My bathroom pipe is leaking heavily and water is spreading across the floor.',
      tag: 'Plumbing Emergency',
    },
    {
      text: 'The main hall switchboard made a loud pop with sparks and all power went out.',
      tag: 'Electrical Safety',
    },
    {
      text: 'Modular kitchen hydraulic cabinets are sagging and the main door lock is jammed.',
      tag: 'Carpentry & Joinery',
    },
    {
      text: 'Need post-festival complete 3BHK deep cleaning and balcony scrub.',
      tag: 'Deep Sanitation',
    }
  ];

  const currentExample = demoExamples[selectedExampleIndex];
  const analysis = analyzeProblemWithAI(currentExample.text);
  const matchedWorker = MOCK_WORKERS[0]; // Ramesh Patil for plumbing, or appropriate worker

  const handleAssignWorker = () => {
    navigate('/customer/book', {
      state: {
        initialProblem: currentExample.text,
        initialAnalysis: analysis,
        assignedWorker: matchedWorker,
      }
    });
  };

  return (
    <section className="py-20 bg-white border-y border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Context-Aware NLP Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display mb-4">
            Your Problem. Our Intelligence.
          </h2>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
            Customers do not need to diagnose technical codes or struggle through confusing categories. Just describe your issue in plain language, and Sahyog’s AI extracts the requirements, urgency, and matches the ideal verified cooperative professional.
          </p>
        </div>

        {/* Interactive Example Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {demoExamples.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedExampleIndex(idx)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                selectedExampleIndex === idx
                  ? 'bg-coop-900 text-white shadow-md'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200 hover:text-surface-900'
              }`}
            >
              {item.tag}
            </button>
          ))}
        </div>

        {/* The 3-Column AI Conversion Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Step 1: User Voice/Text Input */}
          <div className="lg:col-span-4 bg-surface-50 rounded-3xl p-6 border border-surface-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-surface-400">
                  Step 1: Plain Input
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-surface-200 text-surface-700 rounded-md">
                  Customer Voice/Text
                </span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-surface-200 shadow-xs mb-4">
                <p className="text-xs text-surface-400 font-medium mb-1">User says:</p>
                <p className="text-sm font-semibold text-surface-900 leading-relaxed italic">
                  "{currentExample.text}"
                </p>
              </div>
            </div>

            <div className="p-3 bg-coop-50/70 rounded-xl border border-coop-200 text-[11px] text-coop-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-coop-600 shrink-0" />
              <span>Multi-lingual NLP: English, Hindi & Marathi supported.</span>
            </div>
          </div>

          {/* Step 2: AI Diagnostic Decomposition */}
          <div className="lg:col-span-4 bg-coop-950 text-white rounded-3xl p-6 border border-coop-900 shadow-elevated flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Step 2: AI Decomposition
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-900/60 text-emerald-300 rounded border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" />
                  {analysis.confidenceScore}% Confidence
                </span>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-coop-900">
                  <span className="text-surface-400">Service Category:</span>
                  <span className="font-bold text-white uppercase tracking-wider">{analysis.detectedCategory}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-coop-900">
                  <span className="text-surface-400">Identified Subservice:</span>
                  <span className="font-bold text-emerald-300 text-right">{analysis.subService}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-coop-900">
                  <span className="text-surface-400">Urgency Level:</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] uppercase ${
                    analysis.urgency === 'high' || analysis.urgency === 'emergency'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {analysis.urgency}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-coop-900">
                  <span className="text-surface-400">Required Skill:</span>
                  <span className="font-bold text-surface-200">{analysis.requiredSkill}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-surface-400">Estimated Duration:</span>
                  <span className="font-bold text-amber-300">{analysis.estimatedDuration}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-coop-900 text-[11px] text-surface-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Standards verified against NSDC & Cooperative Bylaws</span>
            </div>
          </div>

          {/* Step 3: Recommended Cooperative Worker */}
          <div className="lg:col-span-4 bg-surface-50 rounded-3xl p-6 border border-surface-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-surface-400">
                  Step 3: Fair Allocation Match
                </span>
                <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                  Recommended
                </span>
              </div>

              {/* Worker Card */}
              <div className="p-4 bg-white rounded-2xl border border-surface-200 shadow-xs mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={matchedWorker.avatar}
                    alt={matchedWorker.name}
                    className="w-12 h-12 rounded-xl object-cover border border-coop-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-surface-900 flex items-center gap-1.5">
                      {matchedWorker.name}
                      <ShieldCheck className="w-4 h-4 text-coop-600" />
                    </h4>
                    <p className="text-xs text-coop-700 font-medium">
                      {analysis.requiredSkill}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-surface-500">
                      <span className="flex items-center text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                        {matchedWorker.rating}
                      </span>
                      <span>•</span>
                      <span>{matchedWorker.distanceKm} km away</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-50 p-2.5 rounded-xl text-[11px] text-surface-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-surface-400">Cooperative Society:</span>
                    <span className="font-semibold text-surface-800">Pune Labour Coop</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-400">Jobs Today:</span>
                    <span className="font-bold text-emerald-700">{matchedWorker.jobsToday} (Optimal Workload)</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleAssignWorker}
              className="w-full bg-gradient-to-r from-coop-900 to-coop-800 hover:from-coop-800 hover:to-coop-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Assign {matchedWorker.name.split(' ')[0]} Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
