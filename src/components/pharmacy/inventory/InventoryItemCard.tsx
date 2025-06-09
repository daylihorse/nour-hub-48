
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Eye, Package } from "lucide-react";
import { InventoryItem } from './types';
import { getStockStatus, isExpiringSoon } from './utils';

interface InventoryItemCardProps {
  item: InventoryItem;
}

const InventoryItemCard = ({ item }: InventoryItemCardProps) => {
  const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
  const expiringSoon = isExpiringSoon(item.expiryDate);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Generic: {item.genericName}</p>
              {item.brandName && <p>Brand: {item.brandName}</p>}
              <p>Strength: {item.strength} {item.unit}</p>
            </div>
          </div>
          <div className="text-right space-y-2">
            <Badge className={`${stockStatus.color} text-white`}>
              {stockStatus.text}
            </Badge>
            {expiringSoon && (
              <Badge variant="outline" className="block text-orange-700 border-orange-300">
                <Calendar className="h-3 w-3 mr-1" />
                Expires Soon
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium">Current Stock</p>
            <p className="text-xl font-bold">{item.currentStock}</p>
            <p className="text-xs text-muted-foreground">Min: {item.minimumStock} | Max: {item.maximumStock}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Pricing</p>
            <p className="text-sm">Cost: ${item.unitCost}</p>
            <p className="text-sm">Price: ${item.sellingPrice}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Expiry Date</p>
            <p className="text-sm">{item.expiryDate}</p>
            <p className="text-xs text-muted-foreground">Batch: {item.batchNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Location</p>
            <p className="text-sm">{item.location}</p>
            <p className="text-xs text-muted-foreground">Supplier: {item.supplier}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex gap-2">
            {item.requiresPrescription && (
              <Badge variant="outline">Prescription Required</Badge>
            )}
            {item.controlledSubstance && (
              <Badge variant="outline" className="text-red-700 border-red-300">
                Controlled Substance
              </Badge>
            )}
            <Badge variant="outline" className="capitalize">
              {item.category.replace('_', ' ')}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            {item.currentStock <= item.minimumStock && (
              <Button size="sm">
                <Package className="h-3 w-3 mr-1" />
                Reorder
              </Button>
            )}
          </div>
        </div>

        {item.storageRequirements && (
          <div className="mt-3 p-2 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-700">
              <strong>Storage:</strong> {item.storageRequirements}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryItemCard;
