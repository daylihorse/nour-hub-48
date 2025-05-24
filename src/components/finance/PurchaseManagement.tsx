
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Truck, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseInvoiceForm from "./purchase/PurchaseInvoiceForm";
import PurchaseInvoiceList from "./purchase/PurchaseInvoiceList";
import SupplierManagement from "./purchase/SupplierManagement";

const PurchaseManagement = () => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [activeTab, setActiveTab] = useState("invoices");

  // Sample data for purchase summary
  const purchaseSummary = [
    {
      title: "Total Purchases (This Month)",
      value: "$35,000",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      title: "Pending Orders",
      value: "12",
      icon: Truck,
      color: "text-orange-600"
    },
    {
      title: "Invoices Processed",
      value: "48",
      icon: FileText,
      color: "text-green-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Purchase Management</h2>
          <p className="text-muted-foreground">Manage invoices, suppliers, and inventory purchases</p>
        </div>
        <Button onClick={() => setShowInvoiceForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Purchase Invoice
        </Button>
      </div>

      {/* Purchase Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {purchaseSummary.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showInvoiceForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Create Purchase Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <PurchaseInvoiceForm 
              onSave={() => setShowInvoiceForm(false)}
              onCancel={() => setShowInvoiceForm(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="invoices">Purchase Invoices</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoices" className="mt-6">
            <PurchaseInvoiceList />
          </TabsContent>
          
          <TabsContent value="suppliers" className="mt-6">
            <SupplierManagement />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PurchaseManagement;
