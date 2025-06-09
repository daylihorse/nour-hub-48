
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { InventoryItem } from "@/types/operations";
import { getInventoryStatusColor } from "@/utils/operationsUtils";
import StatusBadge from "../../shared/ui/StatusBadge";

interface InventoryOverviewProps {
  items: InventoryItem[];
  onCreateOrder: (itemId: string) => void;
}

const InventoryOverview = ({ items, onCreateOrder }: InventoryOverviewProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Current Stock</TableHead>
          <TableHead>Min. Stock</TableHead>
          <TableHead>Unit Cost</TableHead>
          <TableHead>Total Value</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.currentStock}</TableCell>
            <TableCell>{item.minimumStock}</TableCell>
            <TableCell>${item.unitCost.toFixed(2)}</TableCell>
            <TableCell>${item.totalValue.toFixed(2)}</TableCell>
            <TableCell>
              <StatusBadge 
                status={item.status}
                className={getInventoryStatusColor(item.status)}
              />
            </TableCell>
            <TableCell>
              {(item.status === 'low_stock' || item.status === 'out_of_stock') && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onCreateOrder(item.id)}
                >
                  Order Now
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InventoryOverview;
