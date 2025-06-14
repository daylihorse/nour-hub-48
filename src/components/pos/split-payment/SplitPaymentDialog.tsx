
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { SplitPaymentDialogProps } from "./types";
import { useSplitPaymentState } from "./hooks/useSplitPaymentState";
import { useSplitPaymentValidation } from "./hooks/useSplitPaymentValidation";
import PaymentMethodRow from "./components/PaymentMethodRow";
import PaymentSummary from "./components/PaymentSummary";

const SplitPaymentDialog = ({
  isOpen,
  onClose,
  totalAmount,
  onConfirmPayment
}: SplitPaymentDialogProps) => {
  const { toast } = useToast();
  const {
    payments,
    addPaymentMethod,
    removePayment,
    updatePaymentAmount,
    updatePaymentMethod,
    getAvailableMethods,
    resetPayments
  } = useSplitPaymentState();

  const {
    getTotalPaid,
    getRemainingAmount,
    isValidPayment,
    isValidPaymentMethod,
    validatePayments
  } = useSplitPaymentValidation(totalAmount);

  const handlePaymentMethodChange = (index: number, value: string) => {
    if (isValidPaymentMethod(value)) {
      updatePaymentMethod(index, value);
    }
  };

  const handleConfirm = () => {
    const validation = validatePayments(payments);
    
    if (!validation.isValid) {
      toast({
        title: "Invalid Payment",
        description: validation.error!,
        variant: "destructive",
      });
      return;
    }

    const validPayments = payments.filter(p => p.amount > 0);
    onConfirmPayment(validPayments);
    onClose();
  };

  const handleClose = () => {
    resetPayments();
    onClose();
  };

  const totalPaid = getTotalPaid(payments);
  const remainingAmount = getRemainingAmount(payments);
  const isPaymentValid = isValidPayment(payments);

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
              {payments.map((payment, index) => (
                <PaymentMethodRow
                  key={index}
                  payment={payment}
                  index={index}
                  canRemove={payments.length > 1}
                  totalAmount={totalAmount}
                  availableMethods={getAvailableMethods(index)}
                  onUpdateAmount={updatePaymentAmount}
                  onUpdateMethod={updatePaymentMethod}
                  onRemove={removePayment}
                  onMethodChange={handlePaymentMethodChange}
                />
              ))}
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

            <PaymentSummary
              totalAmount={totalAmount}
              totalPaid={totalPaid}
              remainingAmount={remainingAmount}
            />
          </div>
        </ScrollArea>

        <div className="flex gap-2 flex-shrink-0 pt-4">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            className="flex-1"
            disabled={!isPaymentValid}
          >
            Confirm Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SplitPaymentDialog;
