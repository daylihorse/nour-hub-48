
import { useState } from "react";
import { SplitPayment, PaymentMethod } from "../types";
import { PAYMENT_METHODS } from "../constants";

export const useSplitPaymentState = () => {
  const [payments, setPayments] = useState<SplitPayment[]>([
    { method: 'cash', amount: 0 }
  ]);

  const addPaymentMethod = () => {
    const usedMethods = payments.map(p => p.method);
    const availableMethods = PAYMENT_METHODS.filter(
      method => !usedMethods.includes(method)
    );

    if (availableMethods.length > 0) {
      setPayments([...payments, { method: availableMethods[0], amount: 0 }]);
    }
  };

  const removePayment = (index: number) => {
    if (payments.length > 1) {
      setPayments(payments.filter((_, i) => i !== index));
    }
  };

  const updatePaymentAmount = (index: number, amount: number) => {
    const updatedPayments = [...payments];
    updatedPayments[index].amount = amount;
    setPayments(updatedPayments);
  };

  const updatePaymentMethod = (index: number, method: PaymentMethod) => {
    const updatedPayments = [...payments];
    updatedPayments[index].method = method;
    setPayments(updatedPayments);
  };

  const getAvailableMethods = (currentIndex: number): PaymentMethod[] => {
    const usedMethods = payments
      .map((p, i) => i !== currentIndex ? p.method : null)
      .filter((method): method is PaymentMethod => method !== null);
    return PAYMENT_METHODS.filter(
      method => !usedMethods.includes(method)
    );
  };

  const resetPayments = () => {
    setPayments([{ method: 'cash', amount: 0 }]);
  };

  return {
    payments,
    addPaymentMethod,
    removePayment,
    updatePaymentAmount,
    updatePaymentMethod,
    getAvailableMethods,
    resetPayments
  };
};
