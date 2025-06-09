
import { useState } from 'react';
import { PharmacyPOSState, PharmacySale, MedicationPickupNotification } from '@/types/pharmacyPOS';
import { useToast } from '@/hooks/use-toast';

export const usePharmacySalesManagement = () => {
  const { toast } = useToast();
  const [sales, setSales] = useState<PharmacySale[]>([]);
  const [notifications, setNotifications] = useState<MedicationPickupNotification[]>([]);

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

    // Validate prescription items if sale type is prescription
    if (posState.saleType === 'prescription' && !posState.prescriptionId) {
      toast({
        title: "Missing Prescription",
        description: "Please select a prescription for prescription sales.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const newSale: PharmacySale = {
        id: `PSALE_${Date.now()}`,
        items: posState.cart,
        subtotal,
        tax,
        total,
        paymentMethod: posState.paymentMethod,
        customerName: posState.client?.name,
        customerContact: posState.client?.email,
        saleDate: new Date(),
        department: 'pharmacy',
        saleType: posState.saleType,
        prescriptionId: posState.prescriptionId,
        clientId: posState.client?.id,
        requiresFollowUp: posState.requiresConsultation,
      };

      setSales(prev => [...prev, newSale]);

      // Process insurance claim if applicable
      if (posState.paymentMethod === 'insurance' && posState.insuranceInfo) {
        await processInsuranceClaim(newSale, posState.insuranceInfo);
      }

      // Send pickup notification if it's a prescription
      if (posState.saleType === 'prescription' && posState.client) {
        await sendPickupNotification(posState.client.id, posState.prescriptionId!);
      }

      toast({
        title: "Sale Completed",
        description: `Sale ${newSale.id} completed successfully. Total: $${total.toFixed(2)}`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Sale Failed",
        description: "There was an error processing the sale. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const processInsuranceClaim = async (sale: PharmacySale, insuranceInfo: any) => {
    // Mock insurance claim processing
    console.log('Processing insurance claim for sale:', sale.id);
    console.log('Insurance info:', insuranceInfo);
    
    toast({
      title: "Insurance Claim Submitted",
      description: "Insurance claim has been submitted for processing.",
    });
  };

  const sendPickupNotification = async (clientId: string, prescriptionId: string) => {
    const notification: MedicationPickupNotification = {
      id: `NOTIF_${Date.now()}`,
      clientId,
      prescriptionId,
      medication: "Prescription medication", // Would be dynamic
      readyForPickup: new Date(),
      notificationSent: true,
      pickedUp: false,
    };

    setNotifications(prev => [...prev, notification]);

    toast({
      title: "Pickup Notification Sent",
      description: "Client has been notified that their prescription is ready for pickup.",
    });
  };

  return {
    sales,
    notifications,
    completeSale,
    processInsuranceClaim,
    sendPickupNotification,
  };
};
