
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoreSetup from "@/components/marketplace/StoreSetup";
import MarketplaceView from "@/components/marketplace/MarketplaceView";
import StoreManagement from "@/components/marketplace/StoreManagement";

const MarketplaceDepartment = () => {
  const [hasStore, setHasStore] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stable Store & Marketplace</h1>
        <p className="text-muted-foreground">Manage your store and browse the marketplace</p>
      </div>

      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Browse Marketplace</TabsTrigger>
          <TabsTrigger value="my-store">My Store</TabsTrigger>
          <TabsTrigger value="setup">Store Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketplaceView />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-store">
          <Card>
            <CardHeader>
              <CardTitle>My Store Management</CardTitle>
            </CardHeader>
            <CardContent>
              {hasStore ? (
                <StoreManagement />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't set up your store yet.</p>
                  <p className="text-sm">Go to the Store Setup tab to create your store.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle>Store Setup</CardTitle>
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
