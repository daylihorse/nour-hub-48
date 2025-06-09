
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/store";
import { PharmacyClient, InsuranceInfo } from "@/types/pharmacyPOS";
import { 
  Shield, 
  CreditCard, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Calculator
} from "lucide-react";

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
  const [insuranceForm, setInsuranceForm] = useState<Partial<InsuranceInfo>>({
    provider: client?.insuranceInfo?.provider || "",
    policyNumber: client?.insuranceInfo?.policyNumber || "",
    groupNumber: client?.insuranceInfo?.groupNumber || "",
    copayAmount: client?.insuranceInfo?.copayAmount || 0,
    coveragePercentage: client?.insuranceInfo?.coveragePercentage || 80,
    deductibleMet: client?.insuranceInfo?.deductibleMet || false,
    preAuthRequired: client?.insuranceInfo?.preAuthRequired || false,
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const insuranceCoverage = cartTotal * (insuranceForm.coveragePercentage || 0) / 100;
  const patientResponsibility = cartTotal - insuranceCoverage + (insuranceForm.copayAmount || 0);

  const handleFormChange = (field: keyof InsuranceInfo, value: any) => {
    const updated = { ...insuranceForm, [field]: value };
    setInsuranceForm(updated);
    onInsuranceUpdate(updated as InsuranceInfo);
  };

  const handleProcessClaim = () => {
    if (!client || cart.length === 0) return;

    const claimData = {
      clientId: client.id,
      insuranceInfo: insuranceForm,
      items: cart,
      totalAmount: cartTotal,
      coveredAmount: insuranceCoverage,
      patientAmount: patientResponsibility,
    };

    onProcessClaim(claimData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Insurance Billing
        </h3>
        <p className="text-muted-foreground">
          Process insurance claims and manage billing
        </p>
      </div>

      {!client && (
        <Card>
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Please select a client to process insurance billing
            </p>
          </CardContent>
        </Card>
      )}

      {client && (
        <>
          {/* Client Insurance Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Insurance Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Insurance Provider</Label>
                  <Input
                    id="provider"
                    value={insuranceForm.provider}
                    onChange={(e) => handleFormChange('provider', e.target.value)}
                    placeholder="Enter insurance provider"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policy">Policy Number</Label>
                  <Input
                    id="policy"
                    value={insuranceForm.policyNumber}
                    onChange={(e) => handleFormChange('policyNumber', e.target.value)}
                    placeholder="Enter policy number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group">Group Number</Label>
                  <Input
                    id="group"
                    value={insuranceForm.groupNumber}
                    onChange={(e) => handleFormChange('groupNumber', e.target.value)}
                    placeholder="Enter group number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="copay">Copay Amount ($)</Label>
                  <Input
                    id="copay"
                    type="number"
                    value={insuranceForm.copayAmount}
                    onChange={(e) => handleFormChange('copayAmount', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverage">Coverage Percentage (%)</Label>
                  <Input
                    id="coverage"
                    type="number"
                    value={insuranceForm.coveragePercentage}
                    onChange={(e) => handleFormChange('coveragePercentage', parseFloat(e.target.value) || 0)}
                    placeholder="80"
                    max="100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={insuranceForm.deductibleMet}
                    onChange={(e) => handleFormChange('deductibleMet', e.target.checked)}
                  />
                  <span className="text-sm">Deductible Met</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={insuranceForm.preAuthRequired}
                    onChange={(e) => handleFormChange('preAuthRequired', e.target.checked)}
                  />
                  <span className="text-sm">Pre-authorization Required</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Calculation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Coverage Calculation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Add items to cart to calculate coverage
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Amount:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Insurance Coverage ({insuranceForm.coveragePercentage}%):</span>
                    <span className="text-green-600">-${insuranceCoverage.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Copay:</span>
                    <span>${(insuranceForm.copayAmount || 0).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Patient Responsibility:</span>
                    <span>${patientResponsibility.toFixed(2)}</span>
                  </div>

                  {insuranceForm.preAuthRequired && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
                      <div className="flex items-center gap-2 text-orange-700">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Pre-authorization Required</span>
                      </div>
                      <p className="text-sm text-orange-600">
                        This claim requires pre-authorization before processing
                      </p>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    onClick={handleProcessClaim}
                    disabled={!insuranceForm.provider || !insuranceForm.policyNumber}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Insurance Claim
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Insurance Status */}
          {client.insuranceInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Current Insurance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Provider:</span>
                    <Badge variant="outline">{client.insuranceInfo.provider}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Policy:</span>
                    <span className="text-sm font-mono">{client.insuranceInfo.policyNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Coverage:</span>
                    <span className="text-sm">{client.insuranceInfo.coveragePercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Deductible:</span>
                    <Badge variant={client.insuranceInfo.deductibleMet ? "default" : "secondary"}>
                      {client.insuranceInfo.deductibleMet ? "Met" : "Not Met"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default InsuranceBillingPanel;
