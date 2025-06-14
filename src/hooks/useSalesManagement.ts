
import { useState } from "react";
import { CartItem } from "./useCartManagement";

interface POSState {
  paymentMethod: string;
  discount: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export const useSalesManagement = (department: string) => {
  const [posState, setPosState] = useState<POSState>({
    paymentMethod: 'cash',
    discount: 0,
    customerInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const updatePosState = (updates: Partial<POSState>) => {
    console.log('Updating POS state:', updates);
    setPosState(prevState => ({ ...prevState, ...updates }));
  };

  const completeSale = (cart: CartItem[], subtotal: number, tax: number, total: number) => {
    console.log('Completing sale for department:', department);
    console.log('Cart items:', cart.length);
    console.log('Total amount:', total);
    console.log('Payment method:', posState.paymentMethod);
    
    // Simulate sale completion
    const saleData = {
      id: `sale_${Date.now()}`,
      department,
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod: posState.paymentMethod,
      discount: posState.discount,
      customerInfo: posState.customerInfo,
      timestamp: new Date().toISOString(),
    };

    console.log('Sale completed:', saleData);
    
    // Here you would typically send this to a backend or local storage
    // For now, we'll just simulate success
    return true;
  };

  return {
    posState,
    updatePosState,
    completeSale,
  };
};
