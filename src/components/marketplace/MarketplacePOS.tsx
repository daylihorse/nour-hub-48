
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import POSSystem from "@/components/pos/POSSystem";

const MarketplacePOS = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-blue-500" />
            Marketplace Point of Sale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Process sales for marketplace products and services.
          </p>
          <POSSystem department="marketplace" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketplacePOS;
