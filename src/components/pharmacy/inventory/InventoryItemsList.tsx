
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { InventoryItem } from './types';
import InventoryItemCard from './InventoryItemCard';

interface InventoryItemsListProps {
  items: InventoryItem[];
}

const InventoryItemsList = ({ items }: InventoryItemsListProps) => {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No inventory items found matching your filters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <InventoryItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InventoryItemsList;
