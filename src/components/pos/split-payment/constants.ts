
import { CreditCard, DollarSign, Building2, Clock } from "lucide-react";
import { PaymentMethod, PaymentMethodConfig } from "./types";

export const PAYMENT_METHODS: PaymentMethod[] = ['cash', 'card', 'bank_transfer', 'futures_debt'];

export const PAYMENT_METHOD_CONFIG: Record<PaymentMethod, PaymentMethodConfig> = {
  cash: { icon: DollarSign, label: 'Cash', color: 'bg-green-500' },
  card: { icon: CreditCard, label: 'Credit Card', color: 'bg-blue-500' },
  bank_transfer: { icon: Building2, label: 'Bank Transfer', color: 'bg-purple-500' },
  futures_debt: { icon: Clock, label: 'Futures Debt', color: 'bg-orange-500' }
};
