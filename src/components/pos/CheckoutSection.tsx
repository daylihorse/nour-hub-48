
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Smartphone } from "lucide-react";

interface CheckoutSectionProps {
  posState: any;
  subtotal: number;
  tax: number;
  total: number;
  onStateChange: (updates: any) => void;
  onCompleteSale: () => void;
}

const CheckoutSection = ({ 
  posState, 
  subtotal, 
  tax, 
  total, 
  onStateChange, 
  onCompleteSale 
}: CheckoutSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCompleteSale = async () => {
    setIsProcessing(true);
    try {
      onCompleteSale();
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: DollarSign },
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { value: 'mobile', label: 'Mobile Payment', icon: Smartphone },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer Information */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Customer Information (Optional)</Label>
          <Input
            placeholder="Customer name"
            value={posState.customerInfo?.name || ''}
            onChange={(e) => onStateChange({ 
              customerInfo: { ...posState.customerInfo, name: e.target.value }
            })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={posState.customerInfo?.email || ''}
            onChange={(e) => onStateChange({ 
              customerInfo: { ...posState.customerInfo, email: e.target.value }
            })}
          />
          <Input
            placeholder="Phone"
            value={posState.customerInfo?.phone || ''}
            onChange={(e) => onStateChange({ 
              customerInfo: { ...posState.customerInfo, phone: e.target.value }
            })}
          />
        </div>

        <Separator />

        {/* Discount */}
        <div className="space-y-2">
          <Label htmlFor="discount">Discount ($)</Label>
          <Input
            id="discount"
            type="number"
            min="0"
            step="0.01"
            value={posState.discount || 0}
            onChange={(e) => onStateChange({ discount: parseFloat(e.target.value) || 0 })}
          />
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select 
            value={posState.paymentMethod || 'cash'} 
            onValueChange={(value) => onStateChange({ paymentMethod: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <SelectItem key={method.value} value={method.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {method.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {posState.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount:</span>
              <span>-${posState.discount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button 
          onClick={handleCompleteSale} 
          className="w-full" 
          size="lg"
          disabled={isProcessing || posState.cart?.length === 0}
        >
          {isProcessing ? 'Processing...' : `Complete Sale - $${total.toFixed(2)}`}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CheckoutSection;
