
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { storeService } from "@/services/storeService";
import { useToast } from "@/hooks/use-toast";
import { useSalesManagement } from "@/hooks/useSalesManagement";
import { CartItem, StoreProduct, StoreService } from "@/types/store";
import CheckoutSection from "./CheckoutSection";
import ClientSelectionDialog from "./ClientSelectionDialog";

interface EnhancedPOSSystemProps {
  department: string;
}

const EnhancedPOSSystem = ({ department }: EnhancedPOSSystemProps) => {
  const { toast } = useToast();
  const {
    posState,
    selectedClient,
    updatePosState,
    selectClient,
    selectWalkInCustomer,
    completeSale,
  } = useSalesManagement(department);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);

  const products = storeService.getProducts(department);
  const services = storeService.getServices(department);

  const addToCart = (item: StoreProduct | StoreService, type: 'product' | 'service') => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.type === type);
    
    if (existingItem) {
      updateQuantity(item.id, type, existingItem.quantity + 1);
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
        title: "Added to Cart",
        description: `${item.name} has been added to the cart.`,
      });
    }
  };

  const updateQuantity = (id: string, type: 'product' | 'service', newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id, type);
      return;
    }

    setCart(prev => prev.map(item => 
      item.id === id && item.type === type
        ? { ...item, quantity: newQuantity, totalPrice: item.item.price * newQuantity }
        : item
    ));
  };

  const removeFromCart = (id: string, type: 'product' | 'service') => {
    setCart(prev => prev.filter(item => !(item.id === id && item.type === type)));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from the cart.",
    });
  };

  const handleCompleteSale = () => {
    const success = completeSale(cart, subtotal, tax, total);
    if (success) {
      setCart([]);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products & Services */}
      <div className="lg:col-span-2 space-y-6">
        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                        Stock: {product.stock}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(product, 'product')}
                        disabled={product.stock <= 0}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{service.name}</h3>
                      {service.duration && (
                        <Badge variant="outline">{service.duration} min</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${service.price.toFixed(2)}</span>
                      <Button size="sm" onClick={() => addToCart(service, 'service')}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart & Checkout */}
      <div className="space-y-6">
        {/* Cart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart ({cart.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">Cart is empty</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.id, item.type)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Checkout */}
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutSection
              posState={{ ...posState, cart }}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onStateChange={updatePosState}
              onCompleteSale={handleCompleteSale}
              selectedClient={selectedClient}
              onSelectClient={() => setIsClientDialogOpen(true)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Client Selection Dialog */}
      <ClientSelectionDialog
        isOpen={isClientDialogOpen}
        onClose={() => setIsClientDialogOpen(false)}
        onSelectClient={selectClient}
        onSelectWalkIn={selectWalkInCustomer}
      />
    </div>
  );
};

export default EnhancedPOSSystem;
