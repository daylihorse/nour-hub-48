
import { useInventoryState } from "@/hooks/useInventoryState";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryFormSections from "@/components/inventory/InventoryFormSections";
import InventoryMainTabs from "@/components/inventory/InventoryMainTabs";

const InventoryManagement = () => {
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
    </div>
  );
};

export default InventoryManagement;
