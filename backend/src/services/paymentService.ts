/** Payment split rules per cooperative mandate (80/10/5/5) */

export interface PaymentSplit {
  workerEarnings: number;      // 80%
  welfareContribution: number; // 10%
  cooperativeFund: number;     // 5%
  platformOperations: number;  // 5%
}

/** Rate card for service pricing */
export interface RateCard {
  baseServiceCharge: number;
  labourCharge: number;
  materialCharge: number;
  travelCharge: number;
  estimatedTotal: number;
}

/** Base rate card by category (in INR) */
const BASE_RATE_CARDS: Record<string, Partial<RateCard>> = {
  'Plumbing':         { baseServiceCharge: 200, labourCharge: 300, travelCharge: 50 },
  'Electrical':       { baseServiceCharge: 250, labourCharge: 350, travelCharge: 50 },
  'Carpentry':        { baseServiceCharge: 200, labourCharge: 250, travelCharge: 50 },
  'House Cleaning':   { baseServiceCharge: 300, labourCharge: 200, travelCharge: 0 },
  'Cooking':          { baseServiceCharge: 400, labourCharge: 0,   travelCharge: 0 },
  'Elderly Care':     { baseServiceCharge: 500, labourCharge: 0,   travelCharge: 50 },
  'Child Care':       { baseServiceCharge: 450, labourCharge: 0,   travelCharge: 50 },
  'Pest Control':     { baseServiceCharge: 600, labourCharge: 200, travelCharge: 100 },
  'Painting':         { baseServiceCharge: 500, labourCharge: 400, travelCharge: 50 },
  'AC Repair':        { baseServiceCharge: 400, labourCharge: 350, travelCharge: 50 },
};

export const getRateCard = (category: string, materialCharge: number = 0): RateCard => {
  const base = BASE_RATE_CARDS[category] ?? { baseServiceCharge: 250, labourCharge: 250, travelCharge: 50 };
  const estimatedTotal = (base.baseServiceCharge ?? 0) + (base.labourCharge ?? 0) + materialCharge + (base.travelCharge ?? 0);
  return {
    baseServiceCharge: base.baseServiceCharge ?? 250,
    labourCharge: base.labourCharge ?? 250,
    materialCharge,
    travelCharge: base.travelCharge ?? 50,
    estimatedTotal,
  };
};

export const computePaymentSplit = (totalAmount: number): PaymentSplit => ({
  workerEarnings:      Math.round(totalAmount * 0.80),
  welfareContribution: Math.round(totalAmount * 0.10),
  cooperativeFund:     Math.round(totalAmount * 0.05),
  platformOperations:  Math.round(totalAmount * 0.05),
});
