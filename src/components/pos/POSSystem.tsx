
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { storeService } from "@/services/storeService";
import { CartItem, POSState, StoreProduct, StoreService } from "@/types/store";
import { useToast } from "@/hooks/use-toast";
import ProductServiceGrid from "./ProductServiceGrid";
import CartSection from "./CartSection";
import CheckoutSection from "./CheckoutSection";

interface POSSystemProps {
  department: string;
}

const POSSystem = ({ department }: POSSystemProps) => {
  const { toast } = useToast();
  const [posState, setPosState] = useState<POSState>({
    cart: [],
    paymentMethod: 'cash',
    discount: 0,
  });

  const products = storeService.getProducts(department);
  const services = storeService.getServices(department);

  const addToCart = (item: StoreProduct | StoreService, type: 'product' | 'service') => {
    const existingItem = posState.cart.find(cartItem => cartItem.id === item.id);
    
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
      setPosState(prev => ({
        ...prev,
        cart: [...prev.cart, cartItem],
      }));
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setPosState(prev => ({
      ...prev,
      cart: prev.cart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, totalPrice: item.item.price * newQuantity }
          : item
      ),
    }));
  };

  const removeFromCart = (itemId: string) => {
    setPosState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== itemId),
    }));
  };

  const getSubtotal = () => {
    return posState.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1; // 10% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax() - posState.discount;
  };

  const completeSale = () => {
    if (posState.cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to the cart before completing the sale.",
        variant: "destructive",
      });
      return;
    }

    const sale = storeService.recordSale({
      items: posState.cart,
      subtotal: getSubtotal(),
      tax: getTax(),
      total: getTotal(),
      paymentMethod: posState.paymentMethod,
      customerName: posState.customer?.name,
      customerContact: posState.customer?.contact,
      department,
    });

    toast({
      title: "Sale Completed",
      description: `Sale ${sale.id} completed successfully. Total: $${sale.total.toFixed(2)}`,
    });

    // Reset POS state
    setPosState({
      cart: [],
      paymentMethod: 'cash',
      discount: 0,
    });
  };

  const handleStateChange = (updates: Partial<POSState>) => {
    setPosState(prev => ({ ...prev, ...updates }));
  };

  return (
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
          cart={posState.cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
        />
        
        <Separator />
        
        <CheckoutSection
          posState={posState}
          subtotal={getSubtotal()}
          tax={getTax()}
          total={getTotal()}
          onStateChange={handleStateChange}
          onCompleteSale={completeSale}
        />
      </div>
    </div>
  );
};

export default POSSystem;
