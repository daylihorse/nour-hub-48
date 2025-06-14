
import { useState } from 'react';
import { POSState, CartItem } from '@/types/store';
import { Client } from '@/types/client';
import { storeService } from '@/services/storeService';
import { useToast } from '@/hooks/use-toast';

export const useSalesManagement = (department: string) => {
  const { toast } = useToast();
  const [posState, setPosState] = useState<Omit<POSState, 'cart'>>({
    paymentMethod: 'cash',
    discount: 0,
    useSplitPayment: false,
  });
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();

  const updatePosState = (updates: Partial<Omit<POSState, 'cart'>>) => {
    setPosState(prev => ({ ...prev, ...updates }));
  };

  const selectClient = (client: Client) => {
    setSelectedClient(client);
    setPosState(prev => ({ 
      ...prev, 
      clientId: client.id,
      customer: undefined // Clear walk-in customer data when client is selected
    }));
  };

  const selectWalkInCustomer = () => {
    setSelectedClient(undefined);
    setPosState(prev => ({ 
      ...prev, 
      clientId: undefined,
      customer: { name: '', contact: '' } // Initialize walk-in customer data
    }));
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

    // Validate split payment if enabled
    if (posState.useSplitPayment) {
      if (!posState.splitPayments || posState.splitPayments.length === 0) {
        toast({
          title: "Split Payment Not Configured",
          description: "Please configure split payment methods before completing the sale.",
          variant: "destructive",
        });
        return false;
      }

      const totalSplitAmount = posState.splitPayments.reduce((sum, payment) => sum + payment.amount, 0);
      if (Math.abs(totalSplitAmount - total) > 0.01) {
        toast({
          title: "Split Payment Mismatch",
          description: `Split payment total ($${totalSplitAmount.toFixed(2)}) must equal the order total ($${total.toFixed(2)}).`,
          variant: "destructive",
        });
        return false;
      }
    }

    const sale = storeService.recordSale({
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod: posState.useSplitPayment ? undefined : posState.paymentMethod,
      splitPayments: posState.useSplitPayment ? posState.splitPayments : undefined,
      clientId: selectedClient?.id,
      customerName: selectedClient?.name || posState.customer?.name,
      customerContact: selectedClient?.phone || posState.customer?.contact,
      department,
    });

    const customerInfo = selectedClient 
      ? `Client: ${selectedClient.name}` 
      : posState.customer?.name 
        ? `Customer: ${posState.customer.name}`
        : 'Walk-in customer';

    const paymentInfo = posState.useSplitPayment && posState.splitPayments
      ? `Split payment (${posState.splitPayments.length} methods)`
      : `${posState.paymentMethod.charAt(0).toUpperCase() + posState.paymentMethod.slice(1)}`;

    toast({
      title: "Sale Completed",
      description: `Sale ${sale.id} completed successfully. Total: $${sale.total.toFixed(2)} - ${paymentInfo} - ${customerInfo}`,
    });

    // Reset POS state
    setPosState({
      paymentMethod: 'cash',
      discount: 0,
      useSplitPayment: false,
    });
    setSelectedClient(undefined);

    return true;
  };

  return {
    posState,
    selectedClient,
    updatePosState,
    selectClient,
    selectWalkInCustomer,
    completeSale,
  };
};
