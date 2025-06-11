
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInventoryState } from "@/hooks/useInventoryState";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryFormSections from "@/components/inventory/InventoryFormSections";
import InventoryMainTabs from "@/components/inventory/InventoryMainTabs";
import WarehouseManagement from "@/components/warehouse/WarehouseManagement";
import StoreManagement from "@/components/store/StoreManagement";
import { Package, Store, Warehouse } from "lucide-react";

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
        <h1 className="text-3xl font-bold">Inventory & Warehouse Management</h1>
        <p className="text-muted-foreground">Comprehensive inventory, warehouse, and store operations management</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventory Management
          </TabsTrigger>
          <TabsTrigger value="warehouse" className="flex items-center gap-2">
            <Warehouse className="h-4 w-4" />
            Warehouse Operations
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

        <TabsContent value="warehouse" className="space-y-6">
          <WarehouseManagement />
        </TabsContent>

        <TabsContent value="store">
          <StoreManagement department="inventory" departmentName="Inventory" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
