
import { SplitPayment, PaymentMethod } from "../types";
import { PAYMENT_METHODS } from "../constants";

export const useSplitPaymentValidation = (totalAmount: number) => {
  const getTotalPaid = (payments: SplitPayment[]) => 
    payments.reduce((sum, payment) => sum + payment.amount, 0);

  const getRemainingAmount = (payments: SplitPayment[]) => 
    totalAmount - getTotalPaid(payments);

  const isValidPayment = (payments: SplitPayment[]) => 
    Math.abs(getRemainingAmount(payments)) < 0.01; // Allow for floating point precision

  const isValidPaymentMethod = (value: string): value is PaymentMethod => {
    return PAYMENT_METHODS.includes(value as PaymentMethod);
  };

  const validatePayments = (payments: SplitPayment[]) => {
    if (!isValidPayment(payments)) {
      return {
        isValid: false,
        error: `Payment total must equal $${totalAmount.toFixed(2)}`
      };
    }

    const validPayments = payments.filter(p => p.amount > 0);
    if (validPayments.length === 0) {
      return {
        isValid: false,
        error: "Please add at least one payment method with an amount greater than 0"
      };
    }

    return { isValid: true, error: null };
  };

  return {
    getTotalPaid,
    getRemainingAmount,
    isValidPayment,
    isValidPaymentMethod,
    validatePayments
  };
};
