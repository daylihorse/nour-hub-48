
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import POSSystem from "@/components/pos/POSSystem";

const LaboratoryPOSPage = () => {
  const handleBack = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Laboratory Point of Sale</h1>
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Close
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-orange-500" />
              Laboratory POS System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Process sales for laboratory services and testing equipment.
            </p>
            <POSSystem department="laboratory" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaboratoryPOSPage;
