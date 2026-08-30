import type { DemandHotspot, AIWorkforceRecommendation } from '../types';

export const MOCK_DEMAND_HOTSPOTS: DemandHotspot[] = [
  {
    id: 'dh-kothrud-plumbing',
    zone: 'Kothrud (Zone 4)',
    city: 'Pune',
    service: 'Plumbing & Water Systems',
    currentDemandIndex: 32, // +32%
    availableWorkers: 14,
    expectedRequests: 45,
    predictedGap: 17,
    urgency: 'critical',
    recommendation: 'Plumbing demand in Kothrud is 32% above average due to municipal water line maintenance. Reallocate 5 available plumbers from Bavdhan / Warje zones.',
    actionTaken: false,
  },
  {
    id: 'dh-hadapsar-electrical',
    zone: 'Hadapsar & Magarpatta (Zone 7)',
    city: 'Pune',
    service: 'Electrical & Power Systems',
    currentDemandIndex: 24, // +24%
    availableWorkers: 18,
    expectedRequests: 36,
    predictedGap: 8,
    urgency: 'high',
    recommendation: 'Electrical requests surging in IT townships. Deploy 3 reserve wiremen from Wanowrie cluster.',
    actionTaken: false,
  },
  {
    id: 'dh-baner-cleaning',
    zone: 'Baner & Balewadi (Zone 2)',
    city: 'Pune',
    service: 'Deep Cleaning & Sanitization',
    currentDemandIndex: 18, // +18%
    availableWorkers: 22,
    expectedRequests: 32,
    predictedGap: 4,
    urgency: 'normal',
    recommendation: 'Weekend deep cleaning surge forecasted. Pre-notify Mahila Cooperative shift leads.',
    actionTaken: false,
  },
  {
    id: 'dh-hinjawadi-appliance',
    zone: 'Hinjawadi Phase 1-3',
    city: 'Pune',
    service: 'Appliance Repair & Servicing',
    currentDemandIndex: 28, // +28%
    availableWorkers: 12,
    expectedRequests: 29,
    predictedGap: 9,
    urgency: 'high',
    recommendation: 'Summer/monsoon transition AC servicing spike. Activate 4 certified technician trainees.',
    actionTaken: false,
  }
];

export const MOCK_AI_RECOMMENDATIONS: AIWorkforceRecommendation[] = [
  {
    id: 'rec-1',
    type: 'shortage',
    title: 'Urgent Plumbing Shortage in Kothrud',
    zone: 'Kothrud (Zone 4)',
    service: 'Plumbing',
    severity: 'high',
    reason: 'PMC scheduled pipeline shutdown triggered a 32% surge in residential leakage & valve calls.',
    impact: 'Average customer wait time may increase from 18 mins to 65 mins if unmitigated.',
    suggestedAction: 'Auto-rebalance 5 certified plumbers from neighboring Bavdhan cooperative society.',
    actionButtonText: 'Deploy 5 Plumbers to Kothrud',
    actionPayload: { fromZone: 'Bavdhan', toZone: 'Kothrud', workerCount: 5, service: 'plumbing' },
    resolved: false,
  },
  {
    id: 'rec-2',
    type: 'reallocation',
    title: 'Surplus Electrical Workers in Shivajinagar',
    zone: 'Shivajinagar (Zone 1)',
    service: 'Electrical',
    severity: 'medium',
    reason: '6 licensed wiremen currently idle with 0 jobs today; Hadapsar cluster has 8 pending dispatches.',
    impact: 'Improves cooperative daily wage equity and reduces Hadapsar dispatch lag.',
    suggestedAction: 'Route upcoming Hadapsar high-priority jobs to Shivajinagar cooperative mobile fleet.',
    actionButtonText: 'Route 3 Wiremen to Hadapsar',
    actionPayload: { fromZone: 'Shivajinagar', toZone: 'Hadapsar', workerCount: 3, service: 'electrical' },
    resolved: false,
  },
  {
    id: 'rec-3',
    type: 'training',
    title: 'Solar Rooftop Upskilling Opportunity',
    zone: 'All Pune Zones',
    service: 'Solar Installation',
    severity: 'medium',
    reason: 'PM Surya Ghar Muft Bijli Yojana has increased rooftop solar installation requests by 140% in Pune.',
    impact: 'Workers with Solar Level 4 certification earn 45% higher cooperative daily payouts.',
    suggestedAction: 'Sponsor 12 certified electricians for the 3-day NSDC Solar Grid Master Class.',
    actionButtonText: 'Enroll 12 Workers in Solar Batch',
    actionPayload: { workersRecommended: 12, program: 'NSDC Solar Grid Level 4' },
    resolved: false,
  },
  {
    id: 'rec-4',
    type: 'workload_imbalance',
    title: 'Workload Imbalance Alert: Senior Plumber Cohort',
    zone: 'Zone 4 & 5',
    service: 'Plumbing',
    severity: 'low',
    reason: 'Top 5% rated workers received 38% of total allocations last week due to customer repeat preference.',
    impact: 'Newer certified cooperative members experiencing underutilization (avg 1.2 jobs/day).',
    suggestedAction: 'Increase fairness equity weighting ($w_3$) in AI matching engine by +15%.',
    actionButtonText: 'Apply Fair Workload Boost',
    actionPayload: { fairnessWeightBoost: 0.15 },
    resolved: false,
  }
];

export const HOURLY_DEMAND_FORECAST = [
  { time: '08:00 AM', actualDemand: 18, predictedDemand: 20, availableWorkers: 35, gap: 0 },
  { time: '09:00 AM', actualDemand: 34, predictedDemand: 38, availableWorkers: 42, gap: 0 },
  { time: '10:00 AM', actualDemand: 52, predictedDemand: 58, availableWorkers: 45, gap: 13 },
  { time: '11:00 AM', actualDemand: 68, predictedDemand: 74, availableWorkers: 50, gap: 24 },
  { time: '12:00 PM', actualDemand: 60, predictedDemand: 62, availableWorkers: 52, gap: 10 },
  { time: '01:00 PM', actualDemand: 40, predictedDemand: 44, availableWorkers: 48, gap: 0 },
  { time: '02:00 PM', actualDemand: 45, predictedDemand: 50, availableWorkers: 46, gap: 4 },
  { time: '03:00 PM', actualDemand: 58, predictedDemand: 64, availableWorkers: 48, gap: 16 },
  { time: '04:00 PM', actualDemand: 72, predictedDemand: 80, availableWorkers: 54, gap: 26 },
  { time: '05:00 PM', actualDemand: 85, predictedDemand: 92, availableWorkers: 58, gap: 34 },
  { time: '06:00 PM', actualDemand: 78, predictedDemand: 82, availableWorkers: 55, gap: 27 },
  { time: '07:00 PM', actualDemand: 50, predictedDemand: 54, availableWorkers: 45, gap: 9 },
  { time: '08:00 PM', actualDemand: 28, predictedDemand: 30, availableWorkers: 38, gap: 0 },
];

export const SERVICE_DEMAND_DISTRIBUTION = [
  { name: 'Plumbing', value: 34, color: '#047857' },
  { name: 'Electrical', value: 26, color: '#0d9488' },
  { name: 'Cleaning', value: 18, color: '#10b981' },
  { name: 'Carpentry', value: 12, color: '#f59e0b' },
  { name: 'Appliance', value: 6, color: '#6366f1' },
  { name: 'Caregiving & Others', value: 4, color: '#8b5cf6' },
];

export const DISTRICT_WORKFORCE_STATS = [
  { district: 'Kothrud & Karve Nagar', activeWorkers: 284, jobsToday: 112, utilization: 86, avgRating: 4.84 },
  { district: 'Baner & Aundh', activeWorkers: 240, jobsToday: 94, utilization: 79, avgRating: 4.88 },
  { district: 'Hadapsar & Magarpatta', activeWorkers: 215, jobsToday: 88, utilization: 82, avgRating: 4.79 },
  { district: 'Shivajinagar & Camp', activeWorkers: 195, jobsToday: 72, utilization: 74, avgRating: 4.82 },
  { district: 'Viman Nagar & Nagar Rd', activeWorkers: 168, jobsToday: 68, utilization: 81, avgRating: 4.86 },
  { district: 'Pimpri-Chinchwad', activeWorkers: 138, jobsToday: 52, utilization: 75, avgRating: 4.81 },
];
