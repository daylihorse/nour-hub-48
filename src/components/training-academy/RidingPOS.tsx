
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import POSSystem from "@/components/pos/POSSystem";

const RidingPOS = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-green-500" />
            Riding Academy Point of Sale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Process sales for riding lessons, equipment rentals, and academy services.
          </p>
          <POSSystem department="academy" />
        </CardContent>
      </Card>
    </div>
  );
};

export default RidingPOS;
