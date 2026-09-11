import type { PaymentStatus, RateCardPricing, ChangeRequest, PaymentBreakdown } from '../types';

/**
 * Calculates a transparent Rate Card breakdown:
 * - Base service charge (diagnostic / initial safety inspection)
 * - Labour charge (skill-certified professional labour)
 * - Material charge (consumables / genuine parts estimate, ₹0 if customer provided)
 * - Travel / visit charge (zone travel allowance, waived within local cooperative cluster)
 * - Estimated Total Price shown clearly before booking
 */
export const calculateRateCardPricing = (
  basePrice: number,
  isEmergency = false,
  travelDistanceKm = 2.4
): RateCardPricing => {
  // Base Diagnostic / Safety Setup Fee
  const baseServiceCharge = isEmergency ? 149 : Math.max(99, Math.round(basePrice * 0.3));
  
  // Certified Labour Work
  const labourCharge = Math.max(150, Math.round(basePrice * 0.5));
  
  // Standard Consumables / Parts Estimate
  const materialCharge = Math.round(basePrice * 0.2);
  
  // Travel/Visit charge: ₹49 if beyond 3km, otherwise ₹0 (free cooperative cluster dispatch)
  const travelCharge = travelDistanceKm > 3 ? 49 : 0;
  
  const estimatedTotal = baseServiceCharge + labourCharge + materialCharge + travelCharge;

  return {
    baseServiceCharge,
    labourCharge,
    materialCharge,
    travelCharge,
    estimatedTotal,
  };
};

/**
 * Helper to display standardized Payment Status badges & metadata across all views.
 * Required statuses:
 * - Payment Pending
 * - Payment Protected/Held
 * - Additional Amount Requested
 * - Payment Released
 * - Refund Initiated/Completed
 */
export interface PaymentStatusInfo {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  badgeDot: string;
  description: string;
  escrowStatus: 'pending' | 'held' | 'change_requested' | 'released' | 'refunded';
}

export const getPaymentStatusDetails = (status: PaymentStatus): PaymentStatusInfo => {
  switch (status) {
    case 'payment_pending':
    case 'pending':
      return {
        label: 'Payment Pending',
        badgeBg: 'bg-amber-50',
        badgeText: 'text-amber-800',
        badgeBorder: 'border-amber-300',
        badgeDot: 'bg-amber-500',
        description: 'Awaiting customer escrow authorization before worker dispatch.',
        escrowStatus: 'pending',
      };

    case 'payment_protected_held':
    case 'held_in_coop_escrow':
      return {
        label: 'Payment Protected/Held',
        badgeBg: 'bg-blue-50',
        badgeText: 'text-blue-800',
        badgeBorder: 'border-blue-300',
        badgeDot: 'bg-blue-500',
        description: 'Funds securely held in Sahyog Cooperative Escrow. Released only after customer satisfaction.',
        escrowStatus: 'held',
      };

    case 'additional_amount_requested':
      return {
        label: 'Additional Amount Requested',
        badgeBg: 'bg-purple-50',
        badgeText: 'text-purple-800',
        badgeBorder: 'border-purple-300',
        badgeDot: 'bg-purple-500 animate-ping',
        description: 'Worker has submitted an on-site change request. Waiting for customer approval/rejection.',
        escrowStatus: 'change_requested',
      };

    case 'payment_released':
    case 'paid_to_worker':
      return {
        label: 'Payment Released',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-800',
        badgeBorder: 'border-emerald-300',
        badgeDot: 'bg-emerald-500',
        description: '80% paid directly to worker, 5% to welfare fund, 10% to society operations.',
        escrowStatus: 'released',
      };

    case 'refund_initiated':
      return {
        label: 'Refund Initiated',
        badgeBg: 'bg-orange-50',
        badgeText: 'text-orange-800',
        badgeBorder: 'border-orange-300',
        badgeDot: 'bg-orange-500 animate-pulse',
        description: 'Escrow reversal initiated by cooperative desk. Settling within 2 hours.',
        escrowStatus: 'refunded',
      };

    case 'refund_completed':
    case 'refunded':
      return {
        label: 'Refund Completed',
        badgeBg: 'bg-gray-100',
        badgeText: 'text-gray-800',
        badgeBorder: 'border-gray-300',
        badgeDot: 'bg-gray-500',
        description: 'Full escrow amount successfully refunded to the original payment source.',
        escrowStatus: 'refunded',
      };

    default:
      return {
        label: 'Payment Protected/Held',
        badgeBg: 'bg-blue-50',
        badgeText: 'text-blue-800',
        badgeBorder: 'border-blue-300',
        badgeDot: 'bg-blue-500',
        description: 'Funds safely held in cooperative escrow.',
        escrowStatus: 'held',
      };
  }
};
