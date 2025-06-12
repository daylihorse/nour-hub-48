
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import InvoiceHeader from "./form-sections/InvoiceHeader";
import InvoiceItems from "./form-sections/InvoiceItems";

const invoiceSchema = z.object({
  supplierId: z.string().min(1, "Supplier is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.date(),
  dueDate: z.date(),
  notes: z.string().optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface PurchaseInvoiceFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const PurchaseInvoiceForm = ({ onSave, onCancel }: PurchaseInvoiceFormProps) => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", productId: "", productName: "", quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceDate: new Date(),
      dueDate: new Date(),
    },
  });

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        if (field === 'productId') {
          const inventoryItems = [
            { id: "1", name: "Chia Seeds", category: "Feed Materials" },
            { id: "2", name: "Orniboral", category: "Medical Supplies" },
            { id: "3", name: "Horse Vitamins", category: "Medical Supplies" },
          ];
          const product = inventoryItems.find(p => p.id === value);
          updatedItem.productName = product?.name || "";
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  const onSubmit = (data: InvoiceFormData) => {
    console.log("Purchase Invoice Data:", {
      ...data,
      items,
      totalAmount
    });
    
    toast({
      title: "Purchase Invoice Created",
      description: `Invoice saved successfully. Inventory will be updated automatically.`,
    });
    
    onSave();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Invoice Header */}
        <InvoiceHeader control={form.control} />

        {/* Invoice Items */}
        <InvoiceItems
          items={items}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onUpdateItem={updateItem}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Purchase Invoice
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PurchaseInvoiceForm;
