import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock, RefreshCw, Undo2 } from 'lucide-react';
import type { PaymentStatus } from '../../types';
import { getPaymentStatusDetails } from '../../utils/pricingAndPayment';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
  status,
  showDescription = false,
  size = 'md',
}) => {
  const details = getPaymentStatusDetails(status);

  const getIcon = () => {
    switch (status) {
      case 'payment_pending':
      case 'pending':
        return <Clock className="w-3.5 h-3.5" />;
      case 'payment_protected_held':
      case 'held_in_coop_escrow':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'additional_amount_requested':
        return <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />;
      case 'payment_released':
      case 'paid_to_worker':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'refund_initiated':
        return <RefreshCw className="w-3.5 h-3.5 animate-spin" />;
      case 'refund_completed':
      case 'refunded':
        return <Undo2 className="w-3.5 h-3.5" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5" />;
    }
  };

  const sizeClass = 
    size === 'sm' ? 'px-2 py-0.5 text-[10px]' :
    size === 'lg' ? 'px-3.5 py-1.5 text-xs font-black' :
    'px-2.5 py-1 text-xs font-bold';

  return (
    <div className="inline-flex flex-col gap-1">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border ${details.badgeBg} ${details.badgeText} ${details.badgeBorder} ${sizeClass} shadow-2xs`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${details.badgeDot}`} />
        {getIcon()}
        <span>{details.label}</span>
      </div>
      {showDescription && (
        <span className="text-[10px] text-surface-500 block leading-tight">
          {details.description}
        </span>
      )}
    </div>
  );
};
