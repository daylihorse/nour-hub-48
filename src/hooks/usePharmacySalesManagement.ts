
import { useState } from 'react';
import { PharmacyPOSState, PharmacySale, InsuranceClaim, MedicationPickupNotification } from '@/types/pharmacyPOS';
import { useToast } from '@/hooks/use-toast';

export const usePharmacySalesManagement = () => {
  const { toast } = useToast();

  const completeSale = async (
    posState: PharmacyPOSState,
    subtotal: number,
    tax: number,
    total: number
  ): Promise<boolean> => {
    if (posState.cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to the cart before completing the sale.",
        variant: "destructive",
      });
      return false;
    }

    // Simulate sale processing
    const sale: PharmacySale = {
      id: `pharm_sale_${Date.now()}`,
      items: posState.cart,
      subtotal,
      tax,
      total,
      paymentMethod: posState.paymentMethod as any,
      saleDate: new Date(),
      department: 'pharmacy',
      saleType: posState.saleType,
      prescriptionId: posState.prescriptionId,
      clientId: posState.client?.id,
      requiresFollowUp: posState.requiresConsultation,
    };

    toast({
      title: "Sale Completed",
      description: `Pharmacy sale ${sale.id} completed successfully. Total: $${sale.total.toFixed(2)}`,
    });

    return true;
  };

  const processInsuranceClaim = (claimData: any) => {
    toast({
      title: "Insurance Claim Processed",
      description: "Insurance claim has been submitted for processing.",
    });
  };

  const sendPickupNotification = (clientId: string, prescriptionId: string) => {
    toast({
      title: "Pickup Notification Sent",
      description: "Client has been notified that their prescription is ready for pickup.",
    });
  };

  return {
    completeSale,
    processInsuranceClaim,
    sendPickupNotification,
  };
};
