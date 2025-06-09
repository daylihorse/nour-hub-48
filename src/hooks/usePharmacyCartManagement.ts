
import { useState } from 'react';
import { CartItem } from '@/types/store';
import { PharmacyItem } from '@/types/pharmacy';
import { useToast } from '@/hooks/use-toast';

export const usePharmacyCartManagement = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: any, type: 'product' | 'service') => {
    // Check if it's a prescription medication and requires validation
    const isPrescriptionMed = type === 'product' && item.requiresPrescription;
    
    if (isPrescriptionMed) {
      toast({
        title: "Prescription Required",
        description: "This medication requires a valid prescription. Please add through prescription workflow.",
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      const newCartItem: CartItem = {
        id: item.id,
        type,
        item,
        quantity: 1,
        totalPrice: item.price,
      };
      setCart(prev => [...prev, newCartItem]);
      
      toast({
        title: "Item Added",
        description: `${item.name} added to cart`,
      });
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity, totalPrice: item.item.price * newQuantity }
        : item
    ));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item Removed",
      description: "Item removed from cart",
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax rate
  };

  const getTotal = (discount: number = 0) => {
    const subtotal = getSubtotal();
    const tax = getTax();
    return subtotal + tax - discount;
  };

  const validatePrescriptionItems = () => {
    const prescriptionItems = cart.filter(item => 
      item.type === 'product' && (item.item as PharmacyItem).requiresPrescription
    );
    
    return prescriptionItems.length === 0 || prescriptionItems.every(item => {
      // Validation logic would go here
      return true;
    });
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getSubtotal,
    getTax,
    getTotal,
    validatePrescriptionItems,
  };
};
