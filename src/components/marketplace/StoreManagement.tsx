
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, Wrench, BarChart3, CreditCard } from "lucide-react";
import StoreProductForm from "./store-forms/StoreProductForm";
import StoreServiceForm from "./store-forms/StoreServiceForm";
import StoreProductList from "./StoreProductList";
import StoreServiceList from "./StoreServiceList";
import POSSystem from "../pos/POSSystem";
import StoreSalesReport from "../store/StoreSalesReport";

const StoreManagement = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  if (showProductForm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <StoreProductForm 
            onSave={() => setShowProductForm(false)}
            onCancel={() => setShowProductForm(false)}
          />
        </CardContent>
      </Card>
    );
  }

  if (showServiceForm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <StoreServiceForm 
            onSave={() => setShowServiceForm(false)}
            onCancel={() => setShowServiceForm(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Marketplace Store Management</h2>
          <p className="text-muted-foreground">Manage your marketplace products, services, and sales</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowProductForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button variant="outline" onClick={() => setShowServiceForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="pos" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Point of Sale
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Sales Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Products</CardTitle>
              <p className="text-muted-foreground">Manage your marketplace product listings</p>
            </CardHeader>
            <CardContent>
              <StoreProductList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Services</CardTitle>
              <p className="text-muted-foreground">Manage your marketplace service listings</p>
            </CardHeader>
            <CardContent>
              <StoreServiceList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pos" className="mt-6">
          <POSSystem department="marketplace" />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <StoreSalesReport department="marketplace" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreManagement;
