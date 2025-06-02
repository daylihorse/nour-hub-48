
import { useState } from "react";
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

export type InventoryItemType = {
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

export const useInventoryState = () => {
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

  const handleBrowseMarketplace = () => {
    toast({
      title: "Marketplace Browser",
      description: "Opening marketplace to browse your store listings...",
    });
    console.log("Browse marketplace clicked");
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

  return {
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
  };
};
