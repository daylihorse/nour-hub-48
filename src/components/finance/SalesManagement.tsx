
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, CreditCard, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesInvoiceForm from "./sales/SalesInvoiceForm";
import SalesInvoiceList from "./sales/SalesInvoiceList";
import PaymentTracking from "./sales/PaymentTracking";

const SalesManagement = () => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [activeTab, setActiveTab] = useState("invoices");

  // Sample data for sales summary
  const salesSummary = [
    {
      title: "Total Sales (This Month)",
      value: "$67,000",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Outstanding Payments",
      value: "$12,500",
      icon: CreditCard,
      color: "text-orange-600"
    },
    {
      title: "Active Customers",
      value: "45",
      icon: Users,
      color: "text-blue-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sales Management</h2>
          <p className="text-muted-foreground">Create invoices, track payments, and manage customer accounts</p>
        </div>
        <Button onClick={() => setShowInvoiceForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Sales Invoice
        </Button>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {salesSummary.map((item) => (
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
            <CardTitle>Create Sales Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesInvoiceForm 
              onSave={() => setShowInvoiceForm(false)}
              onCancel={() => setShowInvoiceForm(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="invoices">Sales Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payment Tracking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoices" className="mt-6">
            <SalesInvoiceList />
          </TabsContent>
          
          <TabsContent value="payments" className="mt-6">
            <PaymentTracking />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SalesManagement;
