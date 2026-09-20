/**
 * Fair-Gig Allocation Engine (Backend Port)
 * Weighted multi-factor scoring for ethical worker-job matching.
 * Replaces deterministic mock logic with explainable, auditable allocation.
 */

export interface WorkerCandidate {
  workerId: string;
  name: string;
  ratingAverage: number;       // 0–5
  distanceKm: number;
  todayJobCount: number;       // workload this day
  weeklyWorkloadHours: number;
  reliabilityScore: number;    // 0–100 (composite of cancellations, punctuality)
  primarySkillCategory: string;
  skills: string[];
  isAvailable: boolean;
  kycVerified: boolean;
  emergencyDuty?: boolean;
}

export interface AllocationScore {
  workerId: string;
  totalScore: number;
  breakdown: {
    ratingScore: number;
    proximityScore: number;
    workloadScore: number;
    reliabilityScore: number;
    skillMatchScore: number;
  };
  explanation: string;
}

const WEIGHTS = {
  rating: 0.25,
  proximity: 0.30,
  workload: 0.20,
  reliability: 0.15,
  skillMatch: 0.10,
};

export const computeAllocationScores = (
  candidates: WorkerCandidate[],
  requiredCategory: string,
  isEmergency: boolean = false,
): AllocationScore[] => {
  const scoredCandidates: AllocationScore[] = candidates
    .filter(w => w.isAvailable && w.kycVerified)
    .filter(w => !isEmergency || w.emergencyDuty !== false)
    .map(w => {
      // 1. Rating score (0–100)
      const ratingScore = (w.ratingAverage / 5) * 100;

      // 2. Proximity score (inverse distance, max 20 km radius)
      const maxDist = 20;
      const proximityScore = Math.max(0, ((maxDist - Math.min(w.distanceKm, maxDist)) / maxDist) * 100);

      // 3. Workload score (penalise overloaded workers to distribute fairly)
      const workloadPenalty = Math.min(w.todayJobCount / 6, 1); // max 6 jobs / day
      const workloadScore = (1 - workloadPenalty) * 100;

      // 4. Reliability score (direct, already 0–100)
      const reliabilityScore = w.reliabilityScore;

      // 5. Skill match score
      const skillMatchScore = w.primarySkillCategory.toLowerCase() === requiredCategory.toLowerCase() ? 100 : 60;

      const totalScore =
        ratingScore * WEIGHTS.rating +
        proximityScore * WEIGHTS.proximity +
        workloadScore * WEIGHTS.workload +
        reliabilityScore * WEIGHTS.reliability +
        skillMatchScore * WEIGHTS.skillMatch;

      const explanation = `Rating ${w.ratingAverage.toFixed(1)}★, ${w.distanceKm.toFixed(1)} km away, ${w.todayJobCount} jobs today, reliability ${w.reliabilityScore}%`;

      return {
        workerId: w.workerId,
        totalScore: Math.round(totalScore * 100) / 100,
        breakdown: { ratingScore, proximityScore, workloadScore, reliabilityScore, skillMatchScore },
        explanation,
      };
    });

  return scoredCandidates.sort((a, b) => b.totalScore - a.totalScore);
};

export const selectTopCandidate = (
  candidates: WorkerCandidate[],
  requiredCategory: string,
  isEmergency: boolean = false,
): AllocationScore | null => {
  const ranked = computeAllocationScores(candidates, requiredCategory, isEmergency);
  return ranked[0] ?? null;
};
