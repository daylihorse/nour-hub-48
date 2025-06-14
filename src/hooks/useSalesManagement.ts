
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

    const sale = storeService.recordSale({
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod: posState.paymentMethod,
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

    toast({
      title: "Sale Completed",
      description: `Sale ${sale.id} completed successfully. Total: $${sale.total.toFixed(2)} - ${customerInfo}`,
    });

    // Reset POS state
    setPosState({
      paymentMethod: 'cash',
      discount: 0,
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
