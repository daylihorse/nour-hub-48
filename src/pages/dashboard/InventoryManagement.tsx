
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InventoryManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">Manage items, supplies, and services</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Inventory Control</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing inventory, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Stock management</li>
            <li>Supplies tracking</li>
            <li>Services catalog</li>
            <li>Order management</li>
            <li>Supplier information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
