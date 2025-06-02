
import InventoryActions from "./InventoryActions";

interface InventoryHeaderProps {
  showForms: boolean;
  onAddItem: () => void;
  onAddService: () => void;
  onBrowseMarketplace: () => void;
}

const InventoryHeader = ({ 
  showForms, 
  onAddItem, 
  onAddService, 
  onBrowseMarketplace 
}: InventoryHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">Manage items, supplies, and services</p>
      </div>
      
      {!showForms && (
        <InventoryActions 
          onAddItem={onAddItem}
          onAddService={onAddService}
          onBrowseMarketplace={onBrowseMarketplace}
        />
      )}
    </div>
  );
};

export default InventoryHeader;
