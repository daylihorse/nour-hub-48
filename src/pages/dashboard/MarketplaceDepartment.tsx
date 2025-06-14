
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Package, ShoppingCart, Users, BarChart3, Settings, TrendingUp } from "lucide-react";
import MarketplaceView from "@/components/marketplace/MarketplaceView";
import StoreManagement from "@/components/marketplace/StoreManagement";
import MarketplacePOS from "@/components/marketplace/MarketplacePOS";
import POSChoiceDialog from "@/components/pos/POSChoiceDialog";
import { usePOSChoice } from "@/hooks/usePOSChoice";

const MarketplaceDepartment = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [showPOS, setShowPOS] = useState(false);
  
  const {
    isDialogOpen,
    openPOSChoice,
    closePOSChoice,
    handleUseHere,
    handleOpenSeparate,
  } = usePOSChoice("Marketplace");

  const handlePOSTabClick = () => {
    openPOSChoice();
  };

  const handleUsePOSHere = () => {
    handleUseHere(() => {
      setActiveTab("pos");
      setShowPOS(true);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketplace & Store Management</h1>
        <p className="text-muted-foreground">
          Manage your marketplace listings, inventory, and customer orders
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Store Management
          </TabsTrigger>
          <TabsTrigger 
            value="pos" 
            className="flex items-center gap-2"
            onClick={handlePOSTabClick}
          >
            <ShoppingCart className="h-4 w-4" />
            Point of Sale
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="mt-6">
          <MarketplaceView onAddToCart={() => {}} showAddToCart={false} />
        </TabsContent>
        
        <TabsContent value="store" className="mt-6">
          <StoreManagement />
        </TabsContent>
        
        {showPOS && (
          <TabsContent value="pos" className="mt-6">
            <MarketplacePOS />
          </TabsContent>
        )}
        
        <TabsContent value="customers" className="mt-6">
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Customer management coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Analytics dashboard coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <div className="text-center py-8">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Marketplace settings coming soon</p>
          </div>
        </TabsContent>
      </Tabs>

      <POSChoiceDialog
        isOpen={isDialogOpen}
        onClose={closePOSChoice}
        departmentName="Marketplace"
        onUseHere={handleUsePOSHere}
        onOpenSeparate={handleOpenSeparate}
      />
    </div>
  );
};

export default MarketplaceDepartment;
