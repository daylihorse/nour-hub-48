
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { storeService } from "@/services/storeService";
import { StoreProduct } from "@/types/store";
import { useToast } from "@/hooks/use-toast";

interface AddStoreProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: string;
  onProductAdded: (product: StoreProduct) => void;
}

const AddStoreProductDialog = ({ open, onOpenChange, department, onProductAdded }: AddStoreProductDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const categories = {
    inventory: ["Feed Materials", "Medical Supplies", "Equipment", "Supplements"],
    laboratory: ["Test Kits", "Lab Equipment", "Chemicals", "Supplies"],
    clinic: ["Medical Supplies", "Medications", "Equipment", "Diagnostic Tools"],
    marketplace: ["General", "Equipment", "Supplies", "Services"],
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const product = storeService.addProduct({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      department: department as any,
      stock: parseInt(formData.stock),
      images: [],
      isActive: true,
    });

    onProductAdded(product);
    
    toast({
      title: "Product Added",
      description: `${product.name} has been added to your store.`,
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Stock Quantity</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {(categories[department as keyof typeof categories] || categories.marketplace).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStoreProductDialog;
