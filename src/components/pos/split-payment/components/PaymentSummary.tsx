
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SplitPayment } from "../types";

interface PaymentSummaryProps {
  totalAmount: number;
  totalPaid: number;
  remainingAmount: number;
}

const PaymentSummary = ({ totalAmount, totalPaid, remainingAmount }: PaymentSummaryProps) => {
  return (
    <>
      <Separator />
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Total Paid:</span>
          <span>${totalPaid.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Remaining:</span>
          <Badge variant={remainingAmount <= 0 ? "default" : "destructive"}>
            ${remainingAmount.toFixed(2)}
          </Badge>
        </div>
      </div>
    </>
  );
};

export default PaymentSummary;
