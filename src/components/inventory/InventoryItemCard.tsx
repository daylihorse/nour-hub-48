
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

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

interface InventoryItemCardProps {
  item: InventoryItemType;
  onToggleStatus: (id: string) => void;
  onAddToStock: (id: string) => void;
  onWithdrawFromStock: (id: string) => void;
}

const InventoryItemCard = ({ 
  item, 
  onToggleStatus, 
  onAddToStock, 
  onWithdrawFromStock 
}: InventoryItemCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{item.image}</div>
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.supplier}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch 
            checked={item.enabled} 
            onCheckedChange={() => onToggleStatus(item.id)}
          />
          <span className="text-sm">{item.enabled ? 'Enabled' : 'Disabled'}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-4">
        <div>
          <p className="text-muted-foreground">Expiry Date</p>
          <p>{item.expiryDate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Current Stock</p>
          <p>{item.currentStock}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Purchase Date</p>
          <p>{item.purchaseDate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Type</p>
          <p>{item.type}</p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          className="flex-1 border-amber-500 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          onClick={() => onWithdrawFromStock(item.id)}
        >
          Withdraw from Stock
        </Button>
        <Button 
          variant="outline"
          className="flex-1 border-green-500 text-green-600 hover:text-green-700 hover:bg-green-50"
          onClick={() => onAddToStock(item.id)}
        >
          Add to Stock
        </Button>
      </div>
    </div>
  );
};

export default InventoryItemCard;
