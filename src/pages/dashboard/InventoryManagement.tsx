
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InventoryItemForm from "@/components/inventory/InventoryItemForm";
import InventoryServiceForm from "@/components/inventory/service-form/InventoryServiceForm";
import InventoryActions from "@/components/inventory/InventoryActions";
import InventoryTabs from "@/components/inventory/InventoryTabs";
import ExportButtons from "@/components/inventory/ExportButtons";
import { toast } from "@/hooks/use-toast";

// Sample data for demonstration
const inventoryItems = [
  {
    id: "1",
    name: "Chia Seeds",
    enabled: true,
    expiryDate: "2024-01-14",
    currentStock: 12,
    purchaseDate: "2023-08-28",
    type: "Feed Materials",
    supplier: "Al-Russaifi Stores for Herbal Products",
    image: "🌱"
  },
  {
    id: "2",
    name: "Orniboral",
    enabled: true,
    expiryDate: "2024-05-26",
    currentStock: 4,
    purchaseDate: "2023-10-15",
    type: "Medical Supplies",
    supplier: "Arabian Horse Pharmacy",
    image: "💊"
  }
];

type InventoryItemType = {
  id: string;
  name: string;
  enabled: boolean;
  expiryDate: string;
  currentStock: number;
  purchaseDate: string;
  type: string;
  supplier: string;
  image?: string;
};

const InventoryManagement = () => {
  const [showItemForm, setShowItemForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [items, setItems] = useState<InventoryItemType[]>(inventoryItems);
  
  const handleAddItem = () => {
    setShowItemForm(true);
    setShowServiceForm(false);
  };

  const handleAddService = () => {
    setShowServiceForm(true);
    setShowItemForm(false);
  };

  const handleToggleItemStatus = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
    toast({
      title: "Status Updated",
      description: "Item status has been updated successfully",
    });
  };

  const handleAddToStock = (id: string) => {
    toast({
      title: "Add to Stock",
      description: "Opening add to stock form",
    });
  };

  const handleWithdrawFromStock = (id: string) => {
    toast({
      title: "Withdraw from Stock",
      description: "Opening withdraw from stock form",
    });
  };

  const handleCancelForm = () => {
    setShowItemForm(false);
    setShowServiceForm(false);
  };

  const handleSaveItem = (data: any) => {
    console.log("Saving item:", data);
    toast({
      title: "Item Added",
      description: "New inventory item has been added successfully",
    });
    setShowItemForm(false);
  };

  const handleSaveService = (data: any) => {
    console.log("Saving service:", data);
    toast({
      title: "Service Added",
      description: "New service has been added successfully",
    });
    setShowServiceForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Manage items, supplies, and services</p>
        </div>
        
        {!showItemForm && !showServiceForm && (
          <InventoryActions 
            onAddItem={handleAddItem}
            onAddService={handleAddService}
          />
        )}
      </div>
      
      {showItemForm && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Add Item</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <InventoryItemForm onSave={handleSaveItem} onCancel={handleCancelForm} />
          </CardContent>
        </Card>
      )}

      {showServiceForm && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Add Service</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <InventoryServiceForm onSave={handleSaveService} onCancel={handleCancelForm} />
          </CardContent>
        </Card>
      )}
      
      {!showItemForm && !showServiceForm && (
        <>
          <InventoryTabs
            items={items}
            onToggleItemStatus={handleToggleItemStatus}
            onAddToStock={handleAddToStock}
            onWithdrawFromStock={handleWithdrawFromStock}
          />
          <ExportButtons />
        </>
      )}
    </div>
  );
};

export default InventoryManagement;
