
import { useState } from 'react';
import { CartItem, StoreProduct, StoreService } from '@/types/store';

export const useCartManagement = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  console.log('useCartManagement hook initialized, cart items:', cart.length);

  const addToCart = (item: StoreProduct | StoreService, type: 'product' | 'service') => {
    console.log('addToCart called:', item.name, 'type:', type);
    
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      console.log('Item already in cart, updating quantity');
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      console.log('Adding new item to cart');
      const cartItem: CartItem = {
        id: item.id,
        type,
        item,
        quantity: 1,
        totalPrice: item.price,
      };
      setCart(prev => {
        const newCart = [...prev, cartItem];
        console.log('Cart updated, new size:', newCart.length);
        return newCart;
      });
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    console.log('updateQuantity called for item:', itemId, 'new quantity:', newQuantity);
    
    if (newQuantity <= 0) {
      console.log('Quantity is 0 or less, removing item');
      removeFromCart(itemId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const updatedItem = { 
            ...item, 
            quantity: newQuantity, 
            totalPrice: item.item.price * newQuantity 
          };
          console.log('Item quantity updated:', updatedItem.item.name, 'qty:', updatedItem.quantity);
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    console.log('removeFromCart called for item:', itemId);
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== itemId);
      console.log('Item removed, cart size:', newCart.length);
      return newCart;
    });
  };

  const clearCart = () => {
    console.log('clearCart called');
    setCart([]);
    console.log('Cart cleared');
  };

  const getSubtotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    console.log('Subtotal calculated:', subtotal);
    return subtotal;
  };

  const getTax = () => {
    const tax = getSubtotal() * 0.1; // 10% tax
    console.log('Tax calculated:', tax);
    return tax;
  };

  const getTotal = (discount: number = 0) => {
    const total = getSubtotal() + getTax() - discount;
    console.log('Total calculated:', total, 'discount applied:', discount);
    return total;
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
