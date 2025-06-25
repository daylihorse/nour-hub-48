import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, Trash2 } from "lucide-react";
import { InventoryItem } from './types';
import { toast } from "sonner";

interface ReceiveStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: InventoryItem[];
  onReceiveStock: (receivedItems: ReceiveStockItem[]) => void;
}

interface ReceiveStockItem {
  itemId: string;
  quantityReceived: number;
  newBatchNumber: string;
  newExpiryDate: string;
  unitCost: number;
  supplier: string;
}

const ReceiveStockDialog = ({ open, onOpenChange, items, onReceiveStock }: ReceiveStockDialogProps) => {
  const [receivedItems, setReceivedItems] = useState<ReceiveStockItem[]>([]);

  const addReceiveItem = () => {
    setReceivedItems(prev => [...prev, {
      itemId: "",
      quantityReceived: 0,
      newBatchNumber: "",
      newExpiryDate: "",
      unitCost: 0,
      supplier: "",
    }]);
  };

  const removeReceiveItem = (index: number) => {
    setReceivedItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateReceiveItem = (index: number, field: keyof ReceiveStockItem, value: any) => {
    setReceivedItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = () => {
    // Validation
    const validItems = receivedItems.filter(item => 
      item.itemId && item.quantityReceived > 0 && item.newBatchNumber && item.newExpiryDate
    );

    if (validItems.length === 0) {
      toast.error("Please add at least one valid item to receive");
      return;
    }

    onReceiveStock(validItems);
    toast.success(`Stock received for ${validItems.length} item(s)`);
    onOpenChange(false);
    setReceivedItems([]);
  };

  const getSelectedItem = (itemId: string) => {
    return items.find(item => item.id === itemId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Receive Stock
          </DialogTitle>
          <DialogDescription>
            Record incoming stock for existing medications in your inventory.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {receivedItems.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No items added yet</p>
              <Button onClick={addReceiveItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item to Receive
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Items to Receive</h3>
                <Button onClick={addReceiveItem} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {receivedItems.map((receiveItem, index) => {
                  const selectedItem = getSelectedItem(receiveItem.itemId);
                  
                  return (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Item #{index + 1}</CardTitle>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeReceiveItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Item Selection */}
                          <div className="space-y-2">
                            <Label>Select Medication</Label>
                            <Select 
                              value={receiveItem.itemId} 
                              onValueChange={(value) => updateReceiveItem(index, 'itemId', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose medication" />
                              </SelectTrigger>
                              <SelectContent>
                                {items.map(item => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.name} - {item.genericName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {selectedItem && (
                              <div className="text-sm text-muted-foreground">
                                <p>Current Stock: {selectedItem.currentStock}</p>
                                <p>Location: {selectedItem.location}</p>
                              </div>
                            )}
                          </div>

                          {/* Quantity and Batch */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Quantity Received</Label>
                              <Input
                                type="number"
                                value={receiveItem.quantityReceived}
                                onChange={(e) => updateReceiveItem(index, 'quantityReceived', parseInt(e.target.value) || 0)}
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>New Batch Number</Label>
                              <Input
                                value={receiveItem.newBatchNumber}
                                onChange={(e) => updateReceiveItem(index, 'newBatchNumber', e.target.value)}
                                placeholder="e.g., PEN2024002"
                              />
                            </div>
                          </div>

                          {/* Expiry and Cost */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>New Expiry Date</Label>
                              <Input
                                type="date"
                                value={receiveItem.newExpiryDate}
                                onChange={(e) => updateReceiveItem(index, 'newExpiryDate', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Unit Cost ($)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={receiveItem.unitCost}
                                onChange={(e) => updateReceiveItem(index, 'unitCost', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Supplier</Label>
                              <Input
                                value={receiveItem.supplier}
                                onChange={(e) => updateReceiveItem(index, 'supplier', e.target.value)}
                                placeholder="Supplier name"
                              />
                            </div>
                          </div>
                        </div>

                        {selectedItem && receiveItem.quantityReceived > 0 && (
                          <div className="mt-4 p-3 bg-green-50 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-green-800">
                                  New Stock Level: {selectedItem.currentStock + receiveItem.quantityReceived}
                                </p>
                                <p className="text-xs text-green-600">
                                  Total Value: ${(receiveItem.quantityReceived * receiveItem.unitCost).toFixed(2)}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-green-700 border-green-300">
                                +{receiveItem.quantityReceived}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={receivedItems.length === 0}>
            <Package className="h-4 w-4 mr-2" />
            Receive Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveStockDialog; 