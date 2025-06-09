
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartItem } from "@/types/store";
import { ShoppingCart, Minus, Plus, X, AlertTriangle } from "lucide-react";

interface PharmacyCartSectionProps {
  cart: CartItem[];
  saleType: 'prescription' | 'otc' | 'consultation';
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveFromCart: (itemId: string) => void;
}

const PharmacyCartSection = ({ 
  cart, 
  saleType, 
  onUpdateQuantity, 
  onRemoveFromCart 
}: PharmacyCartSectionProps) => {
  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </div>
          {getTotalItems() > 0 && (
            <Badge className="bg-blue-500">
              {getTotalItems()} items
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cart.map((item) => {
              const isProduct = item.type === 'product';
              const requiresPrescription = isProduct && (item.item as any).requiresPrescription;
              const isControlledSubstance = isProduct && (item.item as any).controlledSubstance;
              
              return (
                <div key={item.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.item.name}</h4>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        {requiresPrescription && (
                          <Badge variant="outline" className="text-xs">
                            Rx
                          </Badge>
                        )}
                        {isControlledSubstance && (
                          <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            CS
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${item.totalPrice.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        ${item.item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PharmacyCartSection;
