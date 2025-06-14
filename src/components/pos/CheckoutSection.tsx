
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard } from "lucide-react";
import { POSState } from "@/types/store";

interface CheckoutSectionProps {
  posState: POSState;
  subtotal: number;
  tax: number;
  total: number;
  onStateChange: (updates: Partial<POSState>) => void;
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
  return (
    <div className="space-y-4">
      {/* Customer Info */}
      <div className="space-y-2">
        <Input
          placeholder="Customer Name (Optional)"
          value={posState.customer?.name || ''}
          onChange={(e) => onStateChange({
            customer: { 
              ...posState.customer, 
              name: e.target.value, 
              contact: posState.customer?.contact || '' 
            }
          })}
        />
        <Input
          placeholder="Customer Contact (Optional)"
          value={posState.customer?.contact || ''}
          onChange={(e) => onStateChange({
            customer: { 
              ...posState.customer, 
              contact: e.target.value, 
              name: posState.customer?.name || '' 
            }
          })}
        />
      </div>

      {/* Payment Method */}
      <Select 
        value={posState.paymentMethod} 
        onValueChange={(value: any) => onStateChange({ paymentMethod: value })}
      >
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
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button 
        className="w-full" 
        onClick={onCompleteSale}
        disabled={posState.cart.length === 0}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Complete Sale
      </Button>
    </div>
  );
};

export default CheckoutSection;
