
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { storeService } from "@/services/storeService";
import { CartItem, POSState, StoreProduct, StoreService } from "@/types/store";
import { useToast } from "@/hooks/use-toast";

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
  const allItems = [...products, ...services];

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products & Services */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Products & Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allItems.map((item) => {
                const isProduct = 'stock' in item;
                const isService = 'duration' in item;
                
                return (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                    onClick={() => addToCart(item, isProduct ? 'product' : 'service')}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <Badge variant={isProduct ? "default" : "secondary"}>
                        {isProduct ? "Product" : "Service"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                      {isProduct && (
                        <span className="text-sm text-muted-foreground">
                          Stock: {(item as StoreProduct).stock}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart & Checkout */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart ({posState.cart.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {posState.cart.map((cartItem) => (
                <div key={cartItem.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{cartItem.item.name}</p>
                    <p className="text-xs text-muted-foreground">${cartItem.item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-8 text-center">{cartItem.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(cartItem.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {posState.cart.length === 0 && (
                <p className="text-center text-muted-foreground py-4">Cart is empty</p>
              )}
            </div>

            <Separator />

            {/* Customer Info */}
            <div className="space-y-2">
              <Input
                placeholder="Customer Name (Optional)"
                value={posState.customer?.name || ''}
                onChange={(e) => setPosState(prev => ({
                  ...prev,
                  customer: { ...prev.customer, name: e.target.value, contact: prev.customer?.contact || '' }
                }))}
              />
              <Input
                placeholder="Customer Contact (Optional)"
                value={posState.customer?.contact || ''}
                onChange={(e) => setPosState(prev => ({
                  ...prev,
                  customer: { ...prev.customer, contact: e.target.value, name: prev.customer?.name || '' }
                }))}
              />
            </div>

            {/* Payment Method */}
            <Select value={posState.paymentMethod} onValueChange={(value: any) => setPosState(prev => ({ ...prev, paymentMethod: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>

            <Separator />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={completeSale}
              disabled={posState.cart.length === 0}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Complete Sale
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default POSSystem;
