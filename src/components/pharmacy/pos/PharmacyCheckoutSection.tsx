
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PharmacyPOSState } from "@/types/pharmacyPOS";
import { CreditCard, DollarSign, Shield, User } from "lucide-react";

interface PharmacyCheckoutSectionProps {
  posState: PharmacyPOSState;
  subtotal: number;
  tax: number;
  total: number;
  onStateChange: (updates: Partial<PharmacyPOSState>) => void;
  onCompleteSale: () => void;
}

const PharmacyCheckoutSection = ({
  posState,
  subtotal,
  tax,
  total,
  onStateChange,
  onCompleteSale
}: PharmacyCheckoutSectionProps) => {
  const handlePaymentMethodChange = (paymentMethod: any) => {
    onStateChange({ paymentMethod });
  };

  const handleSaleTypeChange = (saleType: any) => {
    onStateChange({ saleType });
  };

  const isReadyToCheckout = posState.cart.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Checkout
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sale Type Selection */}
        <div className="space-y-2">
          <Label>Sale Type</Label>
          <Select value={posState.saleType} onValueChange={handleSaleTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="otc">Over-the-Counter</SelectItem>
              <SelectItem value="prescription">Prescription</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Client Information */}
        {posState.client && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4" />
              <span className="font-medium">Client</span>
            </div>
            <p className="text-sm">{posState.client.name}</p>
            <p className="text-xs text-muted-foreground">{posState.client.email}</p>
          </div>
        )}

        {/* Prescription Information */}
        {posState.saleType === 'prescription' && posState.prescriptionId && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-blue-500">Prescription</Badge>
            </div>
            <p className="text-sm font-medium">#{posState.prescriptionId}</p>
          </div>
        )}

        {/* Payment Method */}
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select value={posState.paymentMethod} onValueChange={handlePaymentMethodChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Cash
                </div>
              </SelectItem>
              <SelectItem value="card">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Card
                </div>
              </SelectItem>
              <SelectItem value="insurance">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Insurance
                </div>
              </SelectItem>
              <SelectItem value="account">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Account
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Insurance Details */}
        {posState.paymentMethod === 'insurance' && posState.insuranceInfo && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium">{posState.insuranceInfo.provider}</p>
            <p className="text-xs text-muted-foreground">
              Policy: {posState.insuranceInfo.policyNumber}
            </p>
            <p className="text-xs text-muted-foreground">
              Coverage: {posState.insuranceInfo.coveragePercentage}%
            </p>
          </div>
        )}

        {/* Discount */}
        <div className="space-y-2">
          <Label>Discount ($)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={posState.discount}
            onChange={(e) => onStateChange({ discount: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <Separator />

        {/* Totals */}
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
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Complete Sale Button */}
        <Button 
          className="w-full" 
          size="lg"
          onClick={onCompleteSale}
          disabled={!isReadyToCheckout}
        >
          Complete Sale
        </Button>

        {!isReadyToCheckout && (
          <p className="text-xs text-center text-muted-foreground">
            Add items to cart to proceed with checkout
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PharmacyCheckoutSection;
