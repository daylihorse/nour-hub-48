
import { useState } from "react";

export interface CartItem {
  id: string;
  type: 'product' | 'service';
  item: any;
  quantity: number;
  totalPrice: number;
}

export const useCartManagement = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: any, type: 'product' | 'service') => {
    console.log('Adding to cart:', item.name, 'Type:', type);
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      updateQuantity(item.id, cart[existingItemIndex].quantity + 1);
    } else {
      const newCartItem: CartItem = {
        id: item.id,
        type,
        item,
        quantity: 1,
        totalPrice: item.price,
      };
      setCart(prevCart => [...prevCart, newCartItem]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    console.log('Updating quantity for item:', id, 'New quantity:', quantity);
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity, totalPrice: item.item.price * quantity }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    console.log('Removing from cart:', id);
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getTax = (taxRate = 0.08) => {
    return getSubtotal() * taxRate;
  };

  const getTotal = (discount = 0) => {
    const subtotal = getSubtotal();
    const tax = getTax();
    return subtotal + tax - discount;
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
