import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Truck } from "lucide-react";
import { toast } from "sonner";
import { usePharmacyInventory } from "./inventory/usePharmacyInventory";
import InventoryFilters from "./inventory/InventoryFilters";
import PharmacyViewSelector, { ViewMode, GridSize } from "./inventory/PharmacyViewSelector";
import PharmacyGridView from "./inventory/PharmacyGridView";
import PharmacyListView from "./inventory/PharmacyListView";
import PharmacyTableView from "./inventory/PharmacyTableView";
import AddItemDialog from "./inventory/AddItemDialog";
import ViewItemDialog from "./inventory/ViewItemDialog";
import ReceiveStockDialog from "./inventory/ReceiveStockDialog";
import { InventoryItem } from "./inventory/types";

const PharmacyInventory = () => {
  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    stockFilter,
    setStockFilter,
    inventoryItems,
    filteredItems,
    addItem,
    updateItem,
    receiveStock,
  } = usePharmacyInventory();

  // View state
  const [currentView, setCurrentView] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  // Dialog state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Actions
  const handleView = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowViewDialog(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowEditDialog(true);
  };

  const handleReorder = (item: InventoryItem) => {
    toast.info(`Reorder process initiated for ${item.name}`);
    // Here you would typically open a reorder dialog or redirect to supplier ordering
  };

  const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
    addItem(newItem);
  };

  const handleUpdateItem = (updatedItem: Omit<InventoryItem, 'id'>) => {
    if (selectedItem) {
      updateItem(selectedItem.id, updatedItem);
      setShowEditDialog(false);
      setSelectedItem(null);
    }
  };

  const handleReceiveStock = (receivedItems: any[]) => {
    receiveStock(receivedItems);
  };

  const renderCurrentView = () => {
    const commonProps = {
      items: filteredItems,
      onView: handleView,
      onEdit: handleEdit,
      onReorder: handleReorder,
    };

    switch (currentView) {
      case "grid":
        return <PharmacyGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <PharmacyListView {...commonProps} />;
      case "table":
      default:
        return <PharmacyTableView {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Pharmacy Inventory</CardTitle>
              <p className="text-muted-foreground">Manage pharmaceutical stock and supplies</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowReceiveDialog(true)}>
                <Truck className="h-4 w-4 mr-2" />
                Receive Stock
              </Button>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters and View Selector */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Filters */}
            <InventoryFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
            />

            {/* View Selector Row */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {filteredItems.length} medication{filteredItems.length !== 1 ? 's' : ''}
              </div>
              <PharmacyViewSelector
                currentView={currentView}
                onViewChange={setCurrentView}
                gridSize={gridSize}
                onGridSizeChange={setGridSize}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {renderCurrentView()}

      {/* Dialogs */}
      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSave={handleAddItem}
        mode="add"
      />

      <ViewItemDialog
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        item={selectedItem}
        onEdit={handleEdit}
        onReorder={handleReorder}
      />

      <AddItemDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={handleUpdateItem}
        initialData={selectedItem}
        mode="edit"
      />

      <ReceiveStockDialog
        open={showReceiveDialog}
        onOpenChange={setShowReceiveDialog}
        items={inventoryItems}
        onReceiveStock={handleReceiveStock}
      />
    </div>
  );
};

export default PharmacyInventory;
