
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Store, ShoppingCart, Settings, Eye } from "lucide-react";
import StoreSetup from "@/components/marketplace/StoreSetup";
import MarketplaceView from "@/components/marketplace/MarketplaceView";
import StoreManagement from "@/components/marketplace/StoreManagement";
import MarketplacePOS from "@/components/marketplace/MarketplacePOS";

const MarketplaceDepartment = () => {
  const [hasStore, setHasStore] = useState(false);
  const [activeTab, setActiveTab] = useState("marketplace");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Store className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Marketplace Department</h1>
              <p className="text-lg text-slate-600 mt-1">
                Browse marketplace items and manage your store operations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              <Store className="h-4 w-4 mr-2" />
              {hasStore ? "Store Active" : "No Store"}
            </Badge>
            <Badge className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200">
              System Online
            </Badge>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Browse Marketplace
          </TabsTrigger>
          <TabsTrigger value="pos" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Marketplace POS
          </TabsTrigger>
          <TabsTrigger value="my-store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            My Store
          </TabsTrigger>
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Store Setup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Browse Marketplace</CardTitle>
              <p className="text-muted-foreground">
                Discover products and services from all departments
              </p>
            </CardHeader>
            <CardContent>
              <MarketplaceView />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Point of Sale</CardTitle>
              <p className="text-muted-foreground">
                Purchase items from the marketplace with integrated cart and checkout
              </p>
            </CardHeader>
            <CardContent>
              <MarketplacePOS />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-store" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Store Management</CardTitle>
              <p className="text-muted-foreground">
                Manage your store products and services
              </p>
            </CardHeader>
            <CardContent>
              {hasStore ? (
                <StoreManagement />
              ) : (
                <div className="text-center py-8">
                  <Store className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">You haven't set up your store yet.</p>
                  <p className="text-sm">Go to the Store Setup tab to create your store.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Setup</CardTitle>
              <p className="text-muted-foreground">
                Configure your store settings and get started
              </p>
            </CardHeader>
            <CardContent>
              <StoreSetup onStoreCreated={() => setHasStore(true)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceDepartment;
