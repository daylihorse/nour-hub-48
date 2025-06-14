
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/store";

interface CartSectionProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveFromCart: (itemId: string) => void;
}

const CartSection = ({ cart, onUpdateQuantity, onRemoveFromCart }: CartSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Cart ({cart.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {cart.map((cartItem) => (
            <div key={cartItem.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex-1">
                <p className="font-medium text-sm">{cartItem.item.name}</p>
                <p className="text-xs text-muted-foreground">${cartItem.item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm w-8 text-center">{cartItem.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemoveFromCart(cartItem.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <p className="text-center text-muted-foreground py-4">Cart is empty</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSection;
