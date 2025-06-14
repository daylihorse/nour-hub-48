
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface InsuranceBillingPanelProps {
  client?: any;
  cart: any[];
  onInsuranceUpdate: (insuranceInfo: any) => void;
  onProcessClaim: (claimData: any) => void;
}

const InsuranceBillingPanel = ({ client, cart, onInsuranceUpdate, onProcessClaim }: InsuranceBillingPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Insurance & Billing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Insurance billing panel coming soon. This will include insurance verification,
            claim processing, and co-payment management.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceBillingPanel;
