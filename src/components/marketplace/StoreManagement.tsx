
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StoreProductForm from "./store-forms/StoreProductForm";
import StoreServiceForm from "./store-forms/StoreServiceForm";
import StoreProductList from "./StoreProductList";
import StoreServiceList from "./StoreServiceList";

const StoreManagement = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);

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
        <h2 className="text-2xl font-bold">Store Management</h2>
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

      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>My Products</CardTitle>
            </CardHeader>
            <CardContent>
              <StoreProductList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>My Services</CardTitle>
            </CardHeader>
            <CardContent>
              <StoreServiceList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreManagement;
