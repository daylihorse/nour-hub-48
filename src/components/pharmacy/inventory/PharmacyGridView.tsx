import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Eye, Package, Pill } from "lucide-react";
import { InventoryItem } from './types';
import { getStockStatus, isExpiringSoon } from './utils';
import { GridSize } from './PharmacyViewSelector';

interface PharmacyGridViewProps {
  items: InventoryItem[];
  gridSize?: GridSize;
  onView: (item: InventoryItem) => void;
  onEdit: (item: InventoryItem) => void;
  onReorder: (item: InventoryItem) => void;
}

const PharmacyGridView = ({ 
  items, 
  gridSize = 3, 
  onView, 
  onEdit, 
  onReorder 
}: PharmacyGridViewProps) => {
  const getGridClasses = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">No medications found</h3>
        <p className="text-muted-foreground">No medications match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClasses()} gap-6`}>
      {items.map((item) => {
        const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
        const expiringSoon = isExpiringSoon(item.expiryDate);

        return (
          <Card key={item.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{item.name}</CardTitle>
                  <div className="text-sm text-muted-foreground space-y-1 mt-2">
                    <p>Generic: {item.genericName}</p>
                    {item.brandName && <p>Brand: {item.brandName}</p>}
                    <p>Strength: {item.strength} {item.unit}</p>
                  </div>
                </div>
                <div className="text-right space-y-2 ml-2">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Stock</p>
                  <p className="text-xl font-bold">{item.currentStock}</p>
                  <p className="text-xs text-muted-foreground">Min: {item.minimumStock}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-lg font-bold">${item.sellingPrice}</p>
                  <p className="text-xs text-muted-foreground">Cost: ${item.unitCost}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Expiry</p>
                  <p className="text-sm">{item.expiryDate}</p>
                  <p className="text-xs text-muted-foreground">{item.batchNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">{item.location}</p>
                  <p className="text-xs text-muted-foreground">{item.supplier}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.requiresPrescription && (
                  <Badge variant="outline" className="text-xs">Prescription</Badge>
                )}
                {item.controlledSubstance && (
                  <Badge variant="outline" className="text-xs text-red-700 border-red-300">
                    Controlled
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs capitalize">
                  {item.category.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onView(item)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onEdit(item)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                {item.currentStock <= item.minimumStock && (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onReorder(item)}
                  >
                    <Package className="h-3 w-3 mr-1" />
                    Reorder
                  </Button>
                )}
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
      })}
    </div>
  );
};

export default PharmacyGridView; 