import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package, MapPin, DollarSign, AlertTriangle, Shield } from "lucide-react";
import { InventoryItem } from './types';
import { getStockStatus, isExpiringSoon } from './utils';

interface ViewItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
  onEdit?: (item: InventoryItem) => void;
  onReorder?: (item: InventoryItem) => void;
}

const ViewItemDialog = ({ open, onOpenChange, item, onEdit, onReorder }: ViewItemDialogProps) => {
  if (!item) return null;

  const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
  const expiringSoon = isExpiringSoon(item.expiryDate);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {item.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information for {item.genericName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Alerts */}
          <div className="flex gap-2">
            <Badge className={`${stockStatus.color} text-white`}>
              {stockStatus.text}
            </Badge>
            {expiringSoon && (
              <Badge variant="outline" className="text-orange-700 border-orange-300">
                <Calendar className="h-3 w-3 mr-1" />
                Expires Soon
              </Badge>
            )}
            {item.requiresPrescription && (
              <Badge variant="outline">
                <Shield className="h-3 w-3 mr-1" />
                Prescription Required
              </Badge>
            )}
            {item.controlledSubstance && (
              <Badge variant="outline" className="text-red-700 border-red-300">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Controlled Substance
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Medication Name</p>
                  <p className="text-lg font-semibold">{item.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Generic Name</p>
                  <p>{item.genericName}</p>
                </div>
                {item.brandName && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Brand Name</p>
                    <p>{item.brandName}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <Badge variant="outline" className="capitalize">
                    {item.category.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dosage Form</p>
                  <p className="capitalize">{item.dosageForm}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Strength</p>
                  <p>{item.strength} {item.unit}</p>
                </div>
              </CardContent>
            </Card>

            {/* Stock Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Stock Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Stock</p>
                  <p className="text-2xl font-bold">{item.currentStock}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Minimum Stock</p>
                    <p className="text-lg">{item.minimumStock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Maximum Stock</p>
                    <p className="text-lg">{item.maximumStock}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock Status</p>
                  <Badge className={`${stockStatus.color} text-white`}>
                    {stockStatus.text}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Pricing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Unit Cost</p>
                    <p className="text-xl font-bold text-red-600">${item.unitCost}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Selling Price</p>
                    <p className="text-xl font-bold text-green-600">${item.sellingPrice}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                  <p className="text-lg font-semibold">
                    ${(item.sellingPrice - item.unitCost).toFixed(2)} 
                    <span className="text-sm text-muted-foreground ml-1">
                      ({(((item.sellingPrice - item.unitCost) / item.unitCost) * 100).toFixed(1)}%)
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-lg font-semibold">
                    ${(item.currentStock * item.sellingPrice).toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location & Supplier */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location & Supplier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage Location</p>
                  <p className="text-lg">{item.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Supplier</p>
                  <p>{item.supplier}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Batch Number</p>
                  <p>{item.batchNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expiry Date</p>
                  <p className={expiringSoon ? "text-orange-600 font-semibold" : ""}>{item.expiryDate}</p>
                </div>
                {item.storageRequirements && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Storage Requirements</p>
                    <div className="p-3 bg-blue-50 rounded-md">
                      <p className="text-sm text-blue-700">{item.storageRequirements}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {item.currentStock <= item.minimumStock && onReorder && (
              <Button onClick={() => onReorder(item)}>
                <Package className="h-4 w-4 mr-2" />
                Reorder Stock
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" onClick={() => onEdit(item)}>
                Edit
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewItemDialog; 