
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useCartManagement } from "@/hooks/useCartManagement";
import { useSalesManagement } from "@/hooks/useSalesManagement";
import RidingProductGrid from "./pos/RidingProductGrid";
import CartSection from "../pos/CartSection";
import CheckoutSection from "../pos/CheckoutSection";

const RidingPOS = () => {
  console.log('RidingPOS component rendered');

  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getSubtotal,
    getTax,
    getTotal,
  } = useCartManagement();

  const {
    posState,
    updatePosState,
    completeSale,
  } = useSalesManagement('academy');

  useEffect(() => {
    console.log('RidingPOS mounted');
    console.log('Cart management initialized');
    console.log('Sales management initialized for academy department');
  }, []);

  useEffect(() => {
    console.log('Cart state changed, items:', cart.length);
  }, [cart]);

  const handleCompleteSale = () => {
    console.log('handleCompleteSale called');
    const subtotal = getSubtotal();
    const tax = getTax();
    const total = getTotal(posState.discount);
    
    console.log('Sale totals - Subtotal:', subtotal, 'Tax:', tax, 'Total:', total);
    
    const success = completeSale(cart, subtotal, tax, total);
    if (success) {
      console.log('Sale completed successfully, clearing cart');
      clearCart();
    } else {
      console.log('Sale completion failed');
    }
  };

  const handleStateChange = (updates: Partial<typeof posState>) => {
    console.log('POS state change:', updates);
    updatePosState(updates);
  };

  console.log('Rendering RidingPOS with cart items:', cart.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Riding Experiences & Marketplace Items */}
      <div className="lg:col-span-2">
        <RidingProductGrid
          onAddToCart={addToCart}
          showAddToCart={true}
        />
      </div>

      {/* Cart & Checkout */}
      <div className="space-y-4">
        <CartSection
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
        />
        
        <Separator />
        
        <CheckoutSection
          posState={{ ...posState, cart }}
          subtotal={getSubtotal()}
          tax={getTax()}
          total={getTotal(posState.discount)}
          onStateChange={handleStateChange}
          onCompleteSale={handleCompleteSale}
        />
      </div>
    </div>
  );
};

export default RidingPOS;
