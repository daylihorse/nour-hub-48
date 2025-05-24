
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InventoryFilters from "./InventoryFilters";
import InventoryItemCard from "./InventoryItemCard";

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

interface InventoryTabsProps {
  items: InventoryItemType[];
  onToggleItemStatus: (id: string) => void;
  onAddToStock: (id: string) => void;
  onWithdrawFromStock: (id: string) => void;
}

const InventoryTabs = ({ 
  items, 
  onToggleItemStatus, 
  onAddToStock, 
  onWithdrawFromStock 
}: InventoryTabsProps) => {
  return (
    <Tabs defaultValue="items">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <InventoryFilters />
      </div>
      
      <TabsContent value="items">
        <Card>
          <CardHeader>
            <CardTitle>Current Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {items.map((item) => (
                <InventoryItemCard
                  key={item.id}
                  item={item}
                  onToggleStatus={onToggleItemStatus}
                  onAddToStock={onAddToStock}
                  onWithdrawFromStock={onWithdrawFromStock}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="services">
        <Card>
          <CardHeader>
            <CardTitle>Current Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No services available.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InventoryTabs;
