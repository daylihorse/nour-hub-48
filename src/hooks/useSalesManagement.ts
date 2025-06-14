
import { useState } from 'react';
import { POSState, CartItem } from '@/types/store';
import { storeService } from '@/services/storeService';
import { useToast } from '@/hooks/use-toast';

export const useSalesManagement = (department: string) => {
  const { toast } = useToast();
  const [posState, setPosState] = useState<Omit<POSState, 'cart'>>({
    paymentMethod: 'cash',
    discount: 0,
  });

  const updatePosState = (updates: Partial<Omit<POSState, 'cart'>>) => {
    setPosState(prev => ({ ...prev, ...updates }));
  };

  const completeSale = (
    cart: CartItem[],
    subtotal: number,
    tax: number,
    total: number
  ) => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to the cart before completing the sale.",
        variant: "destructive",
      });
      return false;
    }

    const sale = storeService.recordSale({
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod: posState.paymentMethod,
      customerName: posState.customer?.name,
      customerContact: posState.customer?.contact,
      department,
    });

    toast({
      title: "Sale Completed",
      description: `Sale ${sale.id} completed successfully. Total: $${sale.total.toFixed(2)}`,
    });

    // Reset POS state
    setPosState({
      paymentMethod: 'cash',
      discount: 0,
    });

    return true;
  };

  return {
    posState,
    updatePosState,
    completeSale,
  };
};
