
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

const PharmacyTransactions = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Pharmacy Transactions</h2>
          <p className="text-muted-foreground">Track sales, returns, and financial transactions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Transaction
        </Button>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Transaction Management</h3>
          <p className="text-muted-foreground mb-4">
            This feature will include comprehensive transaction tracking, sales processing, and financial reporting.
          </p>
          <Button variant="outline">
            Configure Transaction Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyTransactions;
