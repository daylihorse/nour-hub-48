
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Settings, Upload } from "lucide-react";

const CompanySettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Company Settings</h2>
        <p className="text-muted-foreground">Manage company information and customize invoices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Equus Management Center" />
            </div>
            <div>
              <Label htmlFor="company-email">Email</Label>
              <Input id="company-email" type="email" defaultValue="info@equusmanagement.com" />
            </div>
            <div>
              <Label htmlFor="company-phone">Phone</Label>
              <Input id="company-phone" defaultValue="+971 4 123 4567" />
            </div>
            <div>
              <Label htmlFor="company-address">Address</Label>
              <Textarea id="company-address" defaultValue="Dubai, United Arab Emirates" />
            </div>
            <div>
              <Label htmlFor="tax-number">Tax Registration Number</Label>
              <Input id="tax-number" defaultValue="TRN123456789" />
            </div>
            <Button>Save Company Information</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Invoice Customization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
              <Input id="invoice-prefix" defaultValue="INV-" />
            </div>
            <div>
              <Label htmlFor="next-invoice">Next Invoice Number</Label>
              <Input id="next-invoice" type="number" defaultValue="1001" />
            </div>
            <div>
              <Label>Company Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload logo</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
              </div>
            </div>
            <div>
              <Label htmlFor="invoice-footer">Invoice Footer Text</Label>
              <Textarea 
                id="invoice-footer" 
                defaultValue="Thank you for your business. Payment terms: Net 30 days."
              />
            </div>
            <Button>Save Invoice Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanySettings;
