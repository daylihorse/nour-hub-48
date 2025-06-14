
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreditCard, DollarSign, Building2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SplitPayment {
  method: 'cash' | 'card' | 'bank_transfer';
  amount: number;
}

interface SplitPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onConfirmPayment: (payments: SplitPayment[]) => void;
}

type PaymentMethod = 'cash' | 'card' | 'bank_transfer';

const PAYMENT_METHODS: PaymentMethod[] = ['cash', 'card', 'bank_transfer'];

const SplitPaymentDialog = ({
  isOpen,
  onClose,
  totalAmount,
  onConfirmPayment
}: SplitPaymentDialogProps) => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<SplitPayment[]>([
    { method: 'cash', amount: 0 }
  ]);

  const paymentMethodConfig = {
    cash: { icon: DollarSign, label: 'Cash', color: 'bg-green-500' },
    card: { icon: CreditCard, label: 'Credit Card', color: 'bg-blue-500' },
    bank_transfer: { icon: Building2, label: 'Bank Transfer', color: 'bg-purple-500' }
  };

  const addPaymentMethod = () => {
    const usedMethods = payments.map(p => p.method);
    const availableMethods = PAYMENT_METHODS.filter(
      method => !usedMethods.includes(method)
    );

    if (availableMethods.length > 0) {
      setPayments([...payments, { method: availableMethods[0], amount: 0 }]);
    }
  };

  const removePayment = (index: number) => {
    if (payments.length > 1) {
      setPayments(payments.filter((_, i) => i !== index));
    }
  };

  const updatePaymentAmount = (index: number, amount: number) => {
    const updatedPayments = [...payments];
    updatedPayments[index].amount = amount;
    setPayments(updatedPayments);
  };

  const updatePaymentMethod = (index: number, method: PaymentMethod) => {
    const updatedPayments = [...payments];
    updatedPayments[index].method = method;
    setPayments(updatedPayments);
  };

  const getTotalPaid = () => payments.reduce((sum, payment) => sum + payment.amount, 0);
  const getRemainingAmount = () => totalAmount - getTotalPaid();
  const isValidPayment = () => Math.abs(getRemainingAmount()) < 0.01; // Allow for floating point precision

  const handleConfirm = () => {
    if (!isValidPayment()) {
      toast({
        title: "Invalid Payment",
        description: `Payment total must equal $${totalAmount.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }

    const validPayments = payments.filter(p => p.amount > 0);
    if (validPayments.length === 0) {
      toast({
        title: "No Payment Methods",
        description: "Please add at least one payment method with an amount greater than 0",
        variant: "destructive",
      });
      return;
    }

    onConfirmPayment(validPayments);
    onClose();
  };

  const handleClose = () => {
    setPayments([{ method: 'cash', amount: 0 }]);
    onClose();
  };

  const getAvailableMethods = (currentIndex: number): PaymentMethod[] => {
    const usedMethods = payments
      .map((p, i) => i !== currentIndex ? p.method : null)
      .filter((method): method is PaymentMethod => method !== null);
    return PAYMENT_METHODS.filter(
      method => !usedMethods.includes(method)
    );
  };

  const isValidPaymentMethod = (value: string): value is PaymentMethod => {
    return PAYMENT_METHODS.includes(value as PaymentMethod);
  };

  const handlePaymentMethodChange = (index: number, value: string) => {
    if (isValidPaymentMethod(value)) {
      updatePaymentMethod(index, value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Split Payment</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
            </div>

            <div className="space-y-3">
              {payments.map((payment, index) => {
                const config = paymentMethodConfig[payment.method];
                const Icon = config.icon;
                const availableMethods = getAvailableMethods(index);

                return (
                  <div key={index} className="p-3 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${config.color} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <select
                          value={payment.method}
                          onChange={(e) => handlePaymentMethodChange(index, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value={payment.method}>{config.label}</option>
                          {availableMethods.map(method => (
                            <option key={method} value={method}>
                              {paymentMethodConfig[method].label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {payments.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removePayment(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor={`amount-${index}`} className="text-sm">Amount</Label>
                      <Input
                        id={`amount-${index}`}
                        type="number"
                        step="0.01"
                        min="0"
                        max={totalAmount}
                        value={payment.amount || ''}
                        onChange={(e) => updatePaymentAmount(index, parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {payments.length < 3 && (
              <Button
                variant="outline"
                onClick={addPaymentMethod}
                className="w-full"
                disabled={payments.length >= 3}
              >
                Add Payment Method
              </Button>
            )}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Paid:</span>
                <span>${getTotalPaid().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Remaining:</span>
                <Badge variant={getRemainingAmount() <= 0 ? "default" : "destructive"}>
                  ${getRemainingAmount().toFixed(2)}
                </Badge>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-2 flex-shrink-0 pt-4">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            className="flex-1"
            disabled={!isValidPayment()}
          >
            Confirm Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SplitPaymentDialog;
