import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar, Edit, Eye, Package } from "lucide-react";
import { InventoryItem } from './types';
import { getStockStatus, isExpiringSoon } from './utils';

interface PharmacyTableViewProps {
  items: InventoryItem[];
  onView: (item: InventoryItem) => void;
  onEdit: (item: InventoryItem) => void;
  onReorder: (item: InventoryItem) => void;
}

const PharmacyTableView = ({ items, onView, onEdit, onReorder }: PharmacyTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Medication</TableHead>
            <TableHead>Stock Info</TableHead>
            <TableHead>Pricing</TableHead>
            <TableHead>Expiry & Batch</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No medications found
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
              const expiringSoon = isExpiringSoon(item.expiryDate);

              return (
                <TableRow 
                  key={item.id}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.genericName}
                      </p>
                      {item.brandName && (
                        <p className="text-xs text-muted-foreground">
                          Brand: {item.brandName}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {item.strength} {item.unit}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-semibold">{item.currentStock}</p>
                      <p className="text-sm text-muted-foreground">
                        Min: {item.minimumStock}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Max: {item.maximumStock}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-semibold">${item.sellingPrice}</p>
                      <p className="text-sm text-muted-foreground">
                        Cost: ${item.unitCost}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-semibold">{item.expiryDate}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.batchNumber}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-semibold">{item.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.supplier}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={`${stockStatus.color} text-white text-xs`}>
                        {stockStatus.text}
                      </Badge>
                      {expiringSoon && (
                        <Badge variant="outline" className="block text-orange-700 border-orange-300 text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          Expires Soon
                        </Badge>
                      )}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.requiresPrescription && (
                          <Badge variant="outline" className="text-xs">Rx</Badge>
                        )}
                        {item.controlledSubstance && (
                          <Badge variant="outline" className="text-xs text-red-700 border-red-300">
                            Controlled
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onView(item)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onEdit(item)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      {item.currentStock <= item.minimumStock && (
                        <Button 
                          size="sm"
                          onClick={() => onReorder(item)}
                        >
                          <Package className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PharmacyTableView; 