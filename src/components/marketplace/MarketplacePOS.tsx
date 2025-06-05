
import { Separator } from "@/components/ui/separator";
import { useCartManagement } from "@/hooks/useCartManagement";
import { useSalesManagement } from "@/hooks/useSalesManagement";
import MarketplaceView from "./MarketplaceView";
import CartSection from "../pos/CartSection";
import CheckoutSection from "../pos/CheckoutSection";

const MarketplacePOS = () => {
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
  } = useSalesManagement('marketplace');

  const handleCompleteSale = () => {
    const subtotal = getSubtotal();
    const tax = getTax();
    const total = getTotal(posState.discount);
    
    const success = completeSale(cart, subtotal, tax, total);
    if (success) {
      clearCart();
    }
  };

  const handleStateChange = (updates: Partial<typeof posState>) => {
    updatePosState(updates);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Marketplace Items */}
      <div className="lg:col-span-2">
        <MarketplaceView
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

export default MarketplacePOS;
