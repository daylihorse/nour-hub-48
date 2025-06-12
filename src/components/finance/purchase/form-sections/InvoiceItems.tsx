
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof InvoiceItem, value: any) => void;
}

const InvoiceItems = ({ items, onAddItem, onRemoveItem, onUpdateItem }: InvoiceItemsProps) => {
  const inventoryItems = [
    { id: "1", name: "Chia Seeds", category: "Feed Materials" },
    { id: "2", name: "Orniboral", category: "Medical Supplies" },
    { id: "3", name: "Horse Vitamins", category: "Medical Supplies" },
  ];

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Invoice Items</CardTitle>
          <Button type="button" onClick={onAddItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-4">
                <label className="text-sm font-medium">Product</label>
                <Select
                  value={item.productId}
                  onValueChange={(value) => onUpdateItem(item.id, 'productId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventoryItems.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} ({product.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  min="1"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Unit Price</label>
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => onUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                  step="0.01"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Total</label>
                <Input
                  value={`$${item.total.toFixed(2)}`}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="col-span-2">
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-end">
            <div className="text-lg font-semibold">
              Total Amount: ${totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceItems;
