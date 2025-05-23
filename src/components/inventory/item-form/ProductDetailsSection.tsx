
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { FormValues, unitOptions } from "./FormSchema";

interface ProductDetailsSectionProps {
  form: UseFormReturn<FormValues>;
}

const ProductDetailsSection = ({ form }: ProductDetailsSectionProps) => {
  const [unitDialogOpen, setUnitDialogOpen] = useState(false);
  const [newUnit, setNewUnit] = useState({
    name: "",
    description: "",
  });

  const handleAddUnit = () => {
    if (newUnit.name) {
      // In a real app, save to database
      setUnitDialogOpen(false);
      setNewUnit({ name: "", description: "" });
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Product Information & Details</h2>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="quantitiesPurchased"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantities Purchased</FormLabel>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    if (field.value > 1) {
                      form.setValue('quantitiesPurchased', field.value - 1);
                    }
                  }}
                >
                  -
                </Button>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    form.setValue('quantitiesPurchased', field.value + 1);
                  }}
                >
                  +
                </Button>
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
              <FormLabel>Unit Used to Describe This Product</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      <Dialog open={unitDialogOpen} onOpenChange={setUnitDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start text-left font-normal text-primary"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Measurement Unit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create a New Measurement Unit</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <FormLabel>Measurement Unit Name</FormLabel>
                              <Input
                                value={newUnit.name}
                                onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                                placeholder="Enter unit name"
                              />
                            </div>
                            <div className="grid gap-2">
                              <FormLabel>Suggested Description for This Unit</FormLabel>
                              <Textarea
                                value={newUnit.description}
                                onChange={(e) => setNewUnit({ ...newUnit, description: e.target.value })}
                                placeholder="Enter description (optional)"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setUnitDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="button" onClick={handleAddUnit}>
                              Save
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitContains"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Each Unit of Quantities Purchased Contains</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input placeholder="Enter quantity per unit" {...field} />
                </FormControl>
                <Select defaultValue="liter">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="liter">Liter (L)</SelectItem>
                    <SelectItem value="ml">Milliliter (mL)</SelectItem>
                    <SelectItem value="gram">Gram (g)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alertThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity Alert Threshold</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <Select defaultValue="liter">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="liter">Liter (L)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Purchase Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter purchase price"
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
          name="listForSale"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex flex-row items-center justify-between">
                <FormLabel>Would you like to list this product for sale?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={!field.value ? "secondary" : "outline"}
                  className={cn(
                    "flex-1",
                    !field.value && "bg-muted"
                  )}
                  onClick={() => form.setValue("listForSale", false)}
                >
                  No
                </Button>
                <Button
                  type="button"
                  variant={field.value ? "secondary" : "outline"}
                  className={cn(
                    "flex-1",
                    field.value && "bg-muted"
                  )}
                  onClick={() => form.setValue("listForSale", true)}
                >
                  Yes
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("listForSale") && (
          <FormField
            control={form.control}
            name="sellingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set the Selling Price for This Product</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
    </div>
  );
};

export default ProductDetailsSection;
