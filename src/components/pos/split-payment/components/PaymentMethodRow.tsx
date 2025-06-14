
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { SplitPayment, PaymentMethod } from "../types";
import { PAYMENT_METHOD_CONFIG } from "../constants";

interface PaymentMethodRowProps {
  payment: SplitPayment;
  index: number;
  canRemove: boolean;
  totalAmount: number;
  availableMethods: PaymentMethod[];
  onUpdateAmount: (index: number, amount: number) => void;
  onUpdateMethod: (index: number, method: PaymentMethod) => void;
  onRemove: (index: number) => void;
  onMethodChange: (index: number, value: string) => void;
}

const PaymentMethodRow = ({
  payment,
  index,
  canRemove,
  totalAmount,
  availableMethods,
  onUpdateAmount,
  onRemove,
  onMethodChange
}: PaymentMethodRowProps) => {
  const config = PAYMENT_METHOD_CONFIG[payment.method];
  const Icon = config.icon;

  return (
    <div className="p-3 border rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded ${config.color} text-white`}>
            <Icon className="h-4 w-4" />
          </div>
          <select
            value={payment.method}
            onChange={(e) => onMethodChange(index, e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={payment.method}>{config.label}</option>
            {availableMethods.map(method => (
              <option key={method} value={method}>
                {PAYMENT_METHOD_CONFIG[method].label}
              </option>
            ))}
          </select>
        </div>
        {canRemove && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onRemove(index)}
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
          onChange={(e) => onUpdateAmount(index, parseFloat(e.target.value) || 0)}
          placeholder="0.00"
        />
      </div>
    </div>
  );
};

export default PaymentMethodRow;
