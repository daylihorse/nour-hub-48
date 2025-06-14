
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, User, UserPlus, DollarSign, Building2 } from "lucide-react";
import { POSState, SplitPayment } from "@/types/store";
import { Client } from "@/types/client";
import { useState } from "react";
import SplitPaymentDialog from "./SplitPaymentDialog";

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
  const [isSplitPaymentOpen, setIsSplitPaymentOpen] = useState(false);

  const handleSplitPaymentToggle = (checked: boolean) => {
    onStateChange({ 
      useSplitPayment: checked,
      splitPayments: checked ? [] : undefined
    });
  };

  const handleSplitPaymentConfirm = (payments: SplitPayment[]) => {
    onStateChange({ splitPayments: payments });
  };

  const getSplitPaymentSummary = () => {
    if (!posState.splitPayments || posState.splitPayments.length === 0) {
      return null;
    }

    const paymentMethodLabels = {
      cash: 'Cash',
      card: 'Card',
      bank_transfer: 'Bank Transfer'
    };

    return posState.splitPayments.map((payment, index) => (
      <div key={index} className="flex justify-between text-xs">
        <span>{paymentMethodLabels[payment.method]}:</span>
        <span>${payment.amount.toFixed(2)}</span>
      </div>
    ));
  };

  const paymentMethodIcons = {
    cash: DollarSign,
    card: CreditCard,
    bank_transfer: Building2
  };

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

      {/* Split Payment Toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="split-payment" className="text-sm font-medium">
          Split Payment
        </Label>
        <Switch
          id="split-payment"
          checked={posState.useSplitPayment || false}
          onCheckedChange={handleSplitPaymentToggle}
        />
      </div>

      {/* Payment Method Selection (single payment) */}
      {!posState.useSplitPayment && (
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
      )}

      {/* Split Payment Configuration */}
      {posState.useSplitPayment && (
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={() => setIsSplitPaymentOpen(true)}
            className="w-full"
          >
            {posState.splitPayments && posState.splitPayments.length > 0
              ? `Configure Split Payment (${posState.splitPayments.length} methods)`
              : 'Configure Split Payment'
            }
          </Button>
          
          {/* Split Payment Summary */}
          {posState.splitPayments && posState.splitPayments.length > 0 && (
            <div className="p-2 bg-muted rounded text-xs space-y-1">
              <div className="font-medium">Payment Breakdown:</div>
              {getSplitPaymentSummary()}
            </div>
          )}
        </div>
      )}

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
        disabled={
          posState.cart.length === 0 || 
          (posState.useSplitPayment && (!posState.splitPayments || posState.splitPayments.length === 0))
        }
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Complete Sale
      </Button>

      {/* Split Payment Dialog */}
      <SplitPaymentDialog
        isOpen={isSplitPaymentOpen}
        onClose={() => setIsSplitPaymentOpen(false)}
        totalAmount={total}
        onConfirmPayment={handleSplitPaymentConfirm}
      />
    </div>
  );
};

export default CheckoutSection;
