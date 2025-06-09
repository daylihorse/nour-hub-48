
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PharmacyClient, InsuranceInfo } from "@/types/pharmacyPOS";
import { CartItem } from "@/types/store";
import { Shield, DollarSign, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface InsuranceBillingPanelProps {
  client?: PharmacyClient;
  cart: CartItem[];
  onInsuranceUpdate: (insuranceInfo: InsuranceInfo) => void;
  onProcessClaim: (claimData: any) => void;
}

const InsuranceBillingPanel = ({ 
  client, 
  cart, 
  onInsuranceUpdate, 
  onProcessClaim 
}: InsuranceBillingPanelProps) => {
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo>(
    client?.insuranceInfo || {
      provider: "",
      policyNumber: "",
      groupNumber: "",
      copayAmount: 0,
      deductibleMet: false,
      coveragePercentage: 80,
      preAuthRequired: false
    }
  );

  const [isEditingInsurance, setIsEditingInsurance] = useState(false);
  const [claimStatus, setClaimStatus] = useState<'pending' | 'approved' | 'denied' | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const coveredAmount = subtotal * (insuranceInfo.coveragePercentage / 100);
  const patientAmount = subtotal - coveredAmount + (insuranceInfo.copayAmount || 0);

  const handleInsuranceInfoChange = (field: keyof InsuranceInfo, value: any) => {
    const updated = { ...insuranceInfo, [field]: value };
    setInsuranceInfo(updated);
    onInsuranceUpdate(updated);
  };

  const handleSubmitClaim = async () => {
    if (!client || cart.length === 0) return;

    const claimData = {
      clientId: client.id,
      clientName: client.name,
      insuranceInfo,
      items: cart,
      subtotal,
      coveredAmount,
      patientAmount,
      claimDate: new Date(),
      status: 'pending'
    };

    setClaimStatus('pending');
    
    // Simulate claim processing
    setTimeout(() => {
      setClaimStatus('approved');
      onProcessClaim(claimData);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Insurance Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!client ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Select a client to manage insurance billing</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Insurance Information - {client.name}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingInsurance(!isEditingInsurance)}
                >
                  {isEditingInsurance ? "Save" : "Edit"}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Insurance Provider</Label>
                  <Input
                    value={insuranceInfo.provider}
                    onChange={(e) => handleInsuranceInfoChange('provider', e.target.value)}
                    disabled={!isEditingInsurance}
                    placeholder="Enter provider name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Policy Number</Label>
                  <Input
                    value={insuranceInfo.policyNumber}
                    onChange={(e) => handleInsuranceInfoChange('policyNumber', e.target.value)}
                    disabled={!isEditingInsurance}
                    placeholder="Enter policy number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Group Number</Label>
                  <Input
                    value={insuranceInfo.groupNumber || ""}
                    onChange={(e) => handleInsuranceInfoChange('groupNumber', e.target.value)}
                    disabled={!isEditingInsurance}
                    placeholder="Enter group number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Coverage Percentage</Label>
                  <Input
                    type="number"
                    value={insuranceInfo.coveragePercentage}
                    onChange={(e) => handleInsuranceInfoChange('coveragePercentage', parseInt(e.target.value))}
                    disabled={!isEditingInsurance}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Copay Amount</Label>
                  <Input
                    type="number"
                    value={insuranceInfo.copayAmount || 0}
                    onChange={(e) => handleInsuranceInfoChange('copayAmount', parseFloat(e.target.value))}
                    disabled={!isEditingInsurance}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={insuranceInfo.deductibleMet}
                    onCheckedChange={(checked) => handleInsuranceInfoChange('deductibleMet', checked)}
                    disabled={!isEditingInsurance}
                  />
                  <Label>Deductible Met</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={insuranceInfo.preAuthRequired}
                    onCheckedChange={(checked) => handleInsuranceInfoChange('preAuthRequired', checked)}
                    disabled={!isEditingInsurance}
                  />
                  <Label>Pre-Authorization Required</Label>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Billing Breakdown
                </h4>
                
                {cart.length > 0 ? (
                  <>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Insurance Coverage ({insuranceInfo.coveragePercentage}%):</span>
                        <span>-${coveredAmount.toFixed(2)}</span>
                      </div>
                      {insuranceInfo.copayAmount && insuranceInfo.copayAmount > 0 && (
                        <div className="flex justify-between">
                          <span>Copay:</span>
                          <span>${insuranceInfo.copayAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Patient Responsibility:</span>
                        <span>${patientAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleSubmitClaim}
                        disabled={!insuranceInfo.provider || !insuranceInfo.policyNumber || claimStatus === 'pending'}
                        className="flex-1"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {claimStatus === 'pending' ? 'Processing...' : 'Submit Insurance Claim'}
                      </Button>
                    </div>

                    {claimStatus && (
                      <div className={`p-3 rounded-lg border ${
                        claimStatus === 'approved' 
                          ? 'border-green-200 bg-green-50' 
                          : claimStatus === 'denied'
                          ? 'border-red-200 bg-red-50'
                          : 'border-yellow-200 bg-yellow-50'
                      }`}>
                        <div className="flex items-center gap-2">
                          {claimStatus === 'approved' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {claimStatus === 'denied' && <AlertCircle className="h-4 w-4 text-red-600" />}
                          {claimStatus === 'pending' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                          <span className="font-medium capitalize">{claimStatus}</span>
                        </div>
                        <p className="text-sm mt-1">
                          {claimStatus === 'approved' && 'Insurance claim approved and submitted successfully.'}
                          {claimStatus === 'denied' && 'Insurance claim was denied. Please review and resubmit.'}
                          {claimStatus === 'pending' && 'Insurance claim is being processed...'}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground">Add items to cart to see billing breakdown</p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceBillingPanel;
