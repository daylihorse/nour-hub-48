import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Edit, Eye, Package, Pill } from "lucide-react";
import { InventoryItem } from './types';
import { getStockStatus, isExpiringSoon } from './utils';

interface PharmacyListViewProps {
  items: InventoryItem[];
  onView: (item: InventoryItem) => void;
  onEdit: (item: InventoryItem) => void;
  onReorder: (item: InventoryItem) => void;
}

const PharmacyListView = ({ items, onView, onEdit, onReorder }: PharmacyListViewProps) => {
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
    <div className="space-y-4">
      {items.map((item) => {
        const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
        const expiringSoon = isExpiringSoon(item.expiryDate);

        return (
          <Card key={item.id} className="group hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Pill className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                      <Badge className={`${stockStatus.color} text-white`}>
                        {stockStatus.text}
                      </Badge>
                      {expiringSoon && (
                        <Badge variant="outline" className="text-orange-700 border-orange-300">
                          <Calendar className="h-3 w-3 mr-1" />
                          Expires Soon
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="font-medium">Generic: {item.genericName}</p>
                        {item.brandName && <p>Brand: {item.brandName}</p>}
                        <p>Strength: {item.strength} {item.unit}</p>
                      </div>
                      <div>
                        <p className="font-medium">Stock: {item.currentStock}</p>
                        <p>Min: {item.minimumStock} | Max: {item.maximumStock}</p>
                        <p>Location: {item.location}</p>
                      </div>
                      <div>
                        <p className="font-medium">Pricing</p>
                        <p>Cost: ${item.unitCost}</p>
                        <p>Price: ${item.sellingPrice}</p>
                      </div>
                      <div>
                        <p className="font-medium">Expiry: {item.expiryDate}</p>
                        <p>Batch: {item.batchNumber}</p>
                        <p>Supplier: {item.supplier}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.requiresPrescription && (
                        <Badge variant="outline" className="text-xs">Prescription Required</Badge>
                      )}
                      {item.controlledSubstance && (
                        <Badge variant="outline" className="text-xs text-red-700 border-red-300">
                          Controlled Substance
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs capitalize">
                        {item.category.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onView(item)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(item)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  {item.currentStock <= item.minimumStock && (
                    <Button 
                      size="sm"
                      onClick={() => onReorder(item)}
                    >
                      <Package className="h-3 w-3 mr-1" />
                      Reorder
                    </Button>
                  )}
                </div>
              </div>

              {item.storageRequirements && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Storage Requirements:</strong> {item.storageRequirements}
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

export default PharmacyListView; 