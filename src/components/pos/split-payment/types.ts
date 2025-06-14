
export interface SplitPayment {
  method: 'cash' | 'card' | 'bank_transfer' | 'futures_debt';
  amount: number;
}

export interface SplitPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onConfirmPayment: (payments: SplitPayment[]) => void;
}

export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'futures_debt';

export interface PaymentMethodConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}
