
import { useState } from 'react';
import { CartItem, StoreProduct, StoreService } from '@/types/store';

export const useCartManagement = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: StoreProduct | StoreService, type: 'product' | 'service') => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      const cartItem: CartItem = {
        id: item.id,
        type,
        item,
        quantity: 1,
        totalPrice: item.price,
      };
      setCart(prev => [...prev, cartItem]);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, totalPrice: item.item.price * newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1; // 10% tax
  };

  const getTotal = (discount: number = 0) => {
    return getSubtotal() + getTax() - discount;
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
  };
};
