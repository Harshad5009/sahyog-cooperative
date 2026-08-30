import type { AIAnalysisResult, UrgencyLevel, Worker, WorkerComparisonScore } from '../types';

/**
 * Intelligent NLP Parser for Service Requests
 * Parses natural language input (in English, Hindi, or Marathi)
 */
export function analyzeProblemWithAI(problemText: string): AIAnalysisResult {
  const lower = problemText.toLowerCase();

  // Language detection
  let detectedLanguage: 'en' | 'hi' | 'mr' = 'en';
  if (/[\u0900-\u097F]/.test(problemText)) {
    if (/नळ|खराब|पाणी|गळत|कामगार|घर|वीज|पंख|सुतार/i.test(problemText)) {
      detectedLanguage = 'mr';
    } else {
      detectedLanguage = 'hi';
    }
  }

  // Plumbing indicators
  if (/pipe|leak|tap|water|drain|flush|sink|basin|tank|valve|faucet|plumb|नळ|पाणी|गळत|नल|टपक/i.test(lower)) {
    const isEmergency = /urgent|emergency|flood|burst|heavily|spreading|तातडीने|लवकर|जलद|तुरंत/i.test(lower);
    return {
      detectedCategory: 'plumbing',
      subService: /pipe|burst|leak/i.test(lower) ? 'Pipe Leakage & Burst Repair' : 'Tap & Shower Installation/Repair',
      urgency: isEmergency ? 'high' : 'medium',
      requiredSkill: 'Certified Plumber Level 4',
      requiredCertifications: ['NSDC Master Plumbing Level 4', 'Municipal Water Safety License'],
      toolsNeeded: ['Pipe Wrench 12"', 'Teflon Sealant', 'PVC Joint Cutter', 'Pressure Tester'],
      estimatedCostRange: [299, 499],
      estimatedDuration: '45-60 mins',
      confidenceScore: 98.6,
      problemSummary: 'Water pipeline joint breach / pressure leakage requiring immediate isolation and seal fitting.',
      detectedLanguage
    };
  }

  // Electrical indicators
  if (/electric|light|wire|spark|mcb|switch|fan|shock|power|short|fuse|inverter|वीज|वायर|शॉर्ट|पंखा|बिजली/i.test(lower)) {
    const isEmergency = /spark|shock|smoke|fire|आग|धूर|आपात/i.test(lower);
    return {
      detectedCategory: 'electrical',
      subService: /mcb|short|trip/i.test(lower) ? 'Short Circuit & MCB Tripping Fix' : 'Switchboard & Socket Repair',
      urgency: isEmergency ? 'emergency' : 'medium',
      requiredSkill: 'Licensed Wireman',
      requiredCertifications: ['Govt. Electrical Wireman Supervisor License', 'Electrical Safety OSHA Protocol'],
      toolsNeeded: ['Digital Multimeter', 'Insulated 1000V Screwdrivers', 'Continuity Tester'],
      estimatedCostRange: [249, 450],
      estimatedDuration: '30-75 mins',
      confidenceScore: 97.2,
      problemSummary: 'Circuit overload / breaker tripping requiring load diagnostic & safe terminal re-wiring.',
      detectedLanguage
    };
  }

  // Carpentry indicators
  if (/door|wood|lock|hinge|cabinet|cupboard|table|chair|furniture|कपाट|दरवाजा|लाकूड|फर्नीचर/i.test(lower)) {
    return {
      detectedCategory: 'carpentry',
      subService: /lock|latch/i.test(lower) ? 'Door Lock & Latch Replacement' : 'Hinge, Drawer & Channel Realignment',
      urgency: 'low',
      requiredSkill: 'Architectural Carpenter',
      requiredCertifications: ['Master Craftsman in Architectural Joinery'],
      toolsNeeded: ['Cordless Drill', 'Chisel Set', 'Precision Level', 'Mortise Jig'],
      estimatedCostRange: [349, 599],
      estimatedDuration: '60-90 mins',
      confidenceScore: 95.8,
      problemSummary: 'Woodwork alignment / hardware lock mechanism repair and stability calibration.',
      detectedLanguage
    };
  }

  // Cleaning indicators
  if (/clean|dust|scrub|bathroom clean|kitchen clean|stain|deep clean|सफाई|स्वच्छता/i.test(lower)) {
    return {
      detectedCategory: 'cleaning',
      subService: /kitchen/i.test(lower) ? 'Kitchen Chimney & Counter Degreasing' : 'Intensive Bathroom Deep Scrubbing',
      urgency: 'low',
      requiredSkill: 'Sanitation Specialist',
      requiredCertifications: ['Professional Sanitation & Chemical Safety Level 3'],
      toolsNeeded: ['High-Pressure Steam Machine', 'Industrial Floor Scrubber', 'Eco-Solvent Degreasers'],
      estimatedCostRange: [499, 899],
      estimatedDuration: '90-150 mins',
      confidenceScore: 96.5,
      problemSummary: 'Intensive deep sanitization, hard-water scaling removal, and eco-chemical wash.',
      detectedLanguage
    };
  }

  // Caregiving indicators
  if (/care|elder|senior|patient|nurse|hospital|physio|मदत|परिचर्या|वृद्ध/i.test(lower)) {
    return {
      detectedCategory: 'caregiving',
      subService: 'Daytime Companion & Mobility Aid (4 Hrs)',
      urgency: 'medium',
      requiredSkill: 'Certified Geriatric Assistant',
      requiredCertifications: ['Certified Geriatric Care & BLS/CPR Provider'],
      toolsNeeded: ['Digital BP Monitor', 'Pulse Oximeter', 'First-Aid Kit'],
      estimatedCostRange: [599, 1299],
      estimatedDuration: '4-8 hours',
      confidenceScore: 94.0,
      problemSummary: 'Compassionate assistance, vitals tracking, and mobility companionship support.',
      detectedLanguage
    };
  }

  // Default fallback classification
  return {
    detectedCategory: 'plumbing',
    subService: 'General Household Diagnostics & Repair',
    urgency: 'medium',
    requiredSkill: 'Certified Multi-Skill Technician',
    requiredCertifications: ['Cooperative Safety & Quality Certified'],
    toolsNeeded: ['Universal Tool Kit', 'Diagnostic Multimeter'],
    estimatedCostRange: [299, 499],
    estimatedDuration: '45-60 mins',
    confidenceScore: 92.0,
    problemSummary: problemText.trim() || 'General household service diagnostic and resolution.',
    detectedLanguage
  };
}

/**
 * AI Fair Worker Allocation Engine
 * Balances customer suitability with democratic cooperative workload equity.
 */
export function calculateFairWorkerScores(
  workers: Worker[],
  serviceCategory: string,
  _urgency: UrgencyLevel = 'medium'
): WorkerComparisonScore[] {
  // Filter or prioritize workers by relevant skill category
  const scoredList: WorkerComparisonScore[] = workers.map(worker => {
    // 1. Skill & Certification Match (0 - 100)
    const matchesCategory = worker.primarySkill.toLowerCase().includes(serviceCategory.toLowerCase());
    const skillBonus = matchesCategory ? 100 : 70;
    const certBonus = Math.min(worker.certifications.length * 15, 30);
    const skillMatchScore = Math.min(100, (skillBonus * 0.7) + certBonus);

    // 2. Distance Proximity Score (0 - 100)
    // 1 km = 95, 5 km = 65, >10 km = 30
    const distanceScore = Math.max(20, Math.round(100 - (worker.distanceKm * 7)));

    // 3. Workload Balance Score (0 - 100) -> CRITICAL FOR COOPERATIVE FAIRNESS!
    // 0 jobs today = 100, 1 job = 90, 2 jobs = 80, 7 jobs = 20
    const workloadScore = Math.max(10, 100 - (worker.jobsToday * 12));

    // 4. Reliability & Rating Score (0 - 100)
    const reliabilityScore = Math.round((worker.rating / 5) * 60 + (worker.reliabilityScore * 0.4));

    // Composite Weighted Score
    // Weights: Skill (30%), Proximity (25%), Workload Equity (25%), Reliability (20%)
    const compositeScore = Math.round(
      (skillMatchScore * 0.30) +
      (distanceScore * 0.25) +
      (workloadScore * 0.25) +
      (reliabilityScore * 0.20)
    );

    return {
      worker,
      skillMatchScore,
      distanceScore,
      workloadScore,
      reliabilityScore,
      compositeScore,
      isRecommended: false,
      recommendationReason: ''
    };
  });

  // Sort descending by composite score
  scoredList.sort((a, b) => b.compositeScore - a.compositeScore);

  if (scoredList.length > 0) {
    scoredList[0].isRecommended = true;
    const winner = scoredList[0].worker;
    scoredList[0].recommendationReason = 
      `Top match: ${winner.name} has optimal skill certification (${winner.certifications.length} verified credentials), close proximity (${winner.distanceKm} km), and fair daily workload (${winner.jobsToday} job completed today, preventing fatigue).`;
  }

  // Provide contextual reason for runner-up
  if (scoredList.length > 1) {
    const second = scoredList[1].worker;
    scoredList[1].recommendationReason = 
      second.jobsToday > 4 
        ? `High rating (${second.rating}★), but currently has ${second.jobsToday} jobs today. Sahyog redistributes work to prevent worker burnout and ensure democratic wage sharing.`
        : `Strong candidate (${second.distanceKm} km away, ${second.rating}★ rating).`;
  }

  return scoredList;
}

/**
 * Calculates fair transparent payment split
 */
export function calculatePaymentBreakdown(totalAmount: number) {
  const workerEarnings = Math.round(totalAmount * 0.80); // 80% to worker
  const welfareInsurance = Math.round(totalAmount * 0.05); // 5% to worker welfare & insurance
  const cooperativeFund = Math.round(totalAmount * 0.10); // 10% to cooperative society
  const platformOperations = totalAmount - workerEarnings - welfareInsurance - cooperativeFund; // 5% operations

  return {
    totalAmount,
    workerEarnings,
    welfareInsurance,
    cooperativeFund,
    platformOperations,
  };
}
