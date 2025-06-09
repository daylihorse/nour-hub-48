
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

const SupplierManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Supplier Management</h2>
          <p className="text-muted-foreground">Manage pharmaceutical suppliers and purchase orders</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Supplier Network</h3>
          <p className="text-muted-foreground mb-4">
            This feature will include supplier profiles, purchase order management, and vendor performance tracking.
          </p>
          <Button variant="outline">
            Setup Supplier Network
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierManagement;
