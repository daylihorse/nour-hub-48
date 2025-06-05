
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInventoryState } from "@/hooks/useInventoryState";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryFormSections from "@/components/inventory/InventoryFormSections";
import InventoryMainTabs from "@/components/inventory/InventoryMainTabs";
import StoreManagement from "@/components/store/StoreManagement";
import { Package, Store } from "lucide-react";

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const {
    showItemForm,
    showServiceForm,
    items,
    handleAddItem,
    handleAddService,
    handleBrowseMarketplace,
    handleToggleItemStatus,
    handleAddToStock,
    handleWithdrawFromStock,
    handleCancelForm,
    handleSaveItem,
    handleSaveService,
  } = useInventoryState();

  const showForms = showItemForm || showServiceForm;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">Manage items, supplies, services, and store operations</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventory Management
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Store & POS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <InventoryHeader
            showForms={showForms}
            onAddItem={handleAddItem}
            onAddService={handleAddService}
            onBrowseMarketplace={handleBrowseMarketplace}
          />
          
          <InventoryFormSections
            showItemForm={showItemForm}
            showServiceForm={showServiceForm}
            onSaveItem={handleSaveItem}
            onSaveService={handleSaveService}
            onCancel={handleCancelForm}
          />
          
          {!showForms && (
            <InventoryMainTabs
              items={items}
              onToggleItemStatus={handleToggleItemStatus}
              onAddToStock={handleAddToStock}
              onWithdrawFromStock={handleWithdrawFromStock}
            />
          )}
        </TabsContent>

        <TabsContent value="store">
          <StoreManagement department="inventory" departmentName="Inventory" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
