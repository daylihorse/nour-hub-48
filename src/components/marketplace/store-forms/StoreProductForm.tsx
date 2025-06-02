
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import AddNewDropdownButton from "../shared/AddNewDropdownButton";
import ImageUploadGrid from "../shared/ImageUploadGrid";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  classification: z.string().min(1, "Classification is required"),
  entryDate: z.string().min(1, "Entry date is required"),
  expiryDate: z.string().optional(),
  serialNumber: z.string().optional(),
  batchNumber: z.string().optional(),
  supplier: z.string().min(1, "Supplier is required"),
  group: z.string().optional(),
  additionalNotes: z.string().optional(),
  quantitiesPurchased: z.number().min(1, "Quantity is required"),
  unitOfMeasure: z.string().min(1, "Unit of measure is required"),
  unitContains: z.string().optional(),
  alertThreshold: z.number().min(1, "Alert threshold is required"),
  purchasePrice: z.number().min(0, "Purchase price is required"),
  listForSale: z.boolean().default(false),
  sellingPrice: z.number().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface StoreProductFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const StoreProductForm = ({ onSave, onCancel }: StoreProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      classification: "",
      entryDate: new Date().toISOString().split('T')[0],
      supplier: "",
      quantitiesPurchased: 1,
      unitOfMeasure: "",
      alertThreshold: 1,
      purchasePrice: 0,
      listForSale: false,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Product data:", data);
    toast({
      title: "Product Added",
      description: "Your product has been added to your store successfully!",
    });
    onSave();
  };

  const isListedForSale = form.watch("listForSale");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="classification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classification</FormLabel>
                  <div className="flex gap-2">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select classification" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="feed">Feed Materials</SelectItem>
                        <SelectItem value="medical">Medical Supplies</SelectItem>
                        <SelectItem value="training">Training Equipment</SelectItem>
                        <SelectItem value="cleaning">Cleaning Tools</SelectItem>
                        <SelectItem value="farrier">Farrier Tools</SelectItem>
                      </SelectContent>
                    </Select>
                    <AddNewDropdownButton type="classification" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <div className="flex gap-2">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="arabian">Arabian Horse Pharmacy</SelectItem>
                        <SelectItem value="alsharq">Al-Sharq Pharmacy for Horse Supplies</SelectItem>
                        <SelectItem value="alrussaifi">Al-Russaifi Stores for Herbal Products</SelectItem>
                      </SelectContent>
                    </Select>
                    <AddNewDropdownButton type="supplier" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitOfMeasure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit of Measure</FormLabel>
                  <div className="flex gap-2">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="liter">Liter (L)</SelectItem>
                        <SelectItem value="milliliter">Milliliter (mL)</SelectItem>
                        <SelectItem value="gram">Gram (g)</SelectItem>
                        <SelectItem value="kilogram">Kilogram (Kg)</SelectItem>
                        <SelectItem value="piece">Piece (Pcs)</SelectItem>
                        <SelectItem value="bag">Bag / Tie</SelectItem>
                        <SelectItem value="pack">Pack / Set</SelectItem>
                        <SelectItem value="tablet">Tablets</SelectItem>
                      </SelectContent>
                    </Select>
                    <AddNewDropdownButton type="unit" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <h3 className="text-lg font-semibold">Pricing & Sale Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="quantitiesPurchased"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purchasePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alertThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alert Threshold</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="listForSale"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Would you like to list this product for sale?
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isListedForSale && (
            <FormField
              control={form.control}
              name="sellingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set the Selling Price for This Product</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="Enter selling price"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <ImageUploadGrid />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </Form>
  );
};

export default StoreProductForm;
