
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { storeService } from "@/services/storeService";
import { useCartManagement } from "@/hooks/useCartManagement";
import { useSalesManagement } from "@/hooks/useSalesManagement";
import ProductServiceGrid from "./ProductServiceGrid";
import CartSection from "./CartSection";
import CheckoutSection from "./CheckoutSection";
import ClientSelectionDialog from "./ClientSelectionDialog";

interface POSSystemProps {
  department: string;
}

const POSSystem = ({ department }: POSSystemProps) => {
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
    selectedClient,
    updatePosState,
    selectClient,
    selectWalkInCustomer,
    completeSale,
  } = useSalesManagement(department);

  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);

  const products = storeService.getProducts(department);
  const services = storeService.getServices(department);

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

  const handleSelectClient = () => {
    setIsClientDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products & Services */}
        <div className="lg:col-span-2">
          <ProductServiceGrid
            products={products}
            services={services}
            onAddToCart={addToCart}
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
            selectedClient={selectedClient}
            onSelectClient={handleSelectClient}
          />
        </div>
      </div>

      {/* Client Selection Dialog */}
      <ClientSelectionDialog
        isOpen={isClientDialogOpen}
        onClose={() => setIsClientDialogOpen(false)}
        onSelectClient={selectClient}
        onSelectWalkIn={selectWalkInCustomer}
      />
    </>
  );
};

export default POSSystem;
