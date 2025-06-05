
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, Wrench, BarChart3, CreditCard } from "lucide-react";
import StoreProductManagement from "./StoreProductManagement";
import StoreServiceManagement from "./StoreServiceManagement";
import StoreSalesReport from "./StoreSalesReport";
import POSSystem from "../pos/POSSystem";

interface StoreManagementProps {
  department: string;
  departmentName: string;
}

const StoreManagement = ({ department, departmentName }: StoreManagementProps) => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{departmentName} Store</h2>
        <p className="text-muted-foreground">Manage products, services, and sales for {departmentName.toLowerCase()}</p>
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
          <StoreProductManagement department={department} />
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <StoreServiceManagement department={department} />
        </TabsContent>

        <TabsContent value="pos" className="mt-6">
          <POSSystem department={department} />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <StoreSalesReport department={department} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreManagement;
