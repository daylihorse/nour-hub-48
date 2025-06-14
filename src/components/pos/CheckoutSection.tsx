
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, User, UserPlus } from "lucide-react";
import { POSState } from "@/types/store";
import { Client } from "@/types/client";

interface CheckoutSectionProps {
  posState: POSState;
  subtotal: number;
  tax: number;
  total: number;
  onStateChange: (updates: Partial<POSState>) => void;
  onCompleteSale: () => void;
  selectedClient?: Client;
  onSelectClient: () => void;
}

const CheckoutSection = ({ 
  posState, 
  subtotal, 
  tax, 
  total, 
  onStateChange, 
  onCompleteSale,
  selectedClient,
  onSelectClient
}: CheckoutSectionProps) => {
  return (
    <div className="space-y-4">
      {/* Customer Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Customer</label>
        {selectedClient ? (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{selectedClient.name}</p>
                <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onSelectClient}>
                <User className="h-4 w-4 mr-1" />
                Change
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={onSelectClient} className="w-full justify-start">
            <UserPlus className="h-4 w-4 mr-2" />
            Select Customer
          </Button>
        )}
      </div>

      {/* Walk-in Customer Info (only shown if no client selected) */}
      {!selectedClient && (
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
      )}

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
