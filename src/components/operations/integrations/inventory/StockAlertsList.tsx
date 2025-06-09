
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { InventoryItem } from "@/types/operations";

interface StockAlertsListProps {
  lowStockItems: InventoryItem[];
  onCreateOrder: (itemId: string) => void;
}

const StockAlertsList = ({ lowStockItems, onCreateOrder }: StockAlertsListProps) => {
  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <Card key={item.id} className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="font-medium text-red-800">{item.name}</h4>
                  <p className="text-sm text-red-600">
                    Current stock: {item.currentStock} / Minimum: {item.minimumStock}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onCreateOrder(item.id)}>
                  Create Order
                </Button>
                <Button size="sm" variant="outline">
                  Find Supplier
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StockAlertsList;
