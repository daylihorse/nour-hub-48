
import { useState } from "react";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormValues, warehouseOptions, classificationOptions, supplierOptions } from "./FormSchema";

interface BasicInfoSectionProps {
  form: UseFormReturn<FormValues>;
}

const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
  const [warehouseDialogOpen, setWarehouseDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState("");
  const [newCategory, setNewCategory] = useState({
    type: "item",
    name: "",
    description: "",
  });
  const [newSupplier, setNewSupplier] = useState("");

  const handleAddWarehouse = () => {
    if (newWarehouse) {
      // In a real app, save to database
      setWarehouseDialogOpen(false);
      setNewWarehouse("");
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name) {
      // In a real app, save to database
      setCategoryDialogOpen(false);
      setNewCategory({ type: "item", name: "", description: "" });
    }
  };

  const handleAddSupplier = () => {
    if (newSupplier) {
      // In a real app, save to database
      setSupplierDialogOpen(false);
      setNewSupplier("");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Basic Info</h2>

      <div className="space-y-4">
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
          name="warehouse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Warehouse (Storage Location)</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      <Dialog open={warehouseDialogOpen} onOpenChange={setWarehouseDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start text-left font-normal text-primary"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Warehouse
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Warehouse</DialogTitle>
                            <DialogDescription>
                              Create a new warehouse location for your inventory.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <FormLabel>Warehouse Name</FormLabel>
                              <Input
                                id="warehouseName"
                                value={newWarehouse}
                                onChange={(e) => setNewWarehouse(e.target.value)}
                                placeholder="Enter warehouse name"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setWarehouseDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="button" onClick={handleAddWarehouse}>
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
          name="classification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Classification</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="categories">Categories</SelectItem>
                      {classificationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start text-left font-normal text-primary"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Category
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <FormLabel>Category Type</FormLabel>
                              <Select
                                defaultValue={newCategory.type}
                                onValueChange={(value) => setNewCategory({ ...newCategory, type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="item">Item</SelectItem>
                                  <SelectItem value="service">Service</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <FormLabel>Category Name</FormLabel>
                              <Input
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                placeholder="Enter category name"
                              />
                            </div>
                            <div className="grid gap-2">
                              <FormLabel>Category Description</FormLabel>
                              <Textarea
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                placeholder="Enter category description (optional)"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCategoryDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="button" onClick={handleAddCategory}>
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
          name="entryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Product Entry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="Will be auto-generated if left blank" {...field} />
              </FormControl>
              <FormDescription>
                The system will fill it if left blank
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="batchNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter batch number (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier / Merchant / Seller</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {supplierOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      <Dialog open={supplierDialogOpen} onOpenChange={setSupplierDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start text-left font-normal text-primary"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Supplier
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Supplier</DialogTitle>
                            <DialogDescription>
                              Create a new supplier for your inventory.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <FormLabel>Supplier Name</FormLabel>
                              <Input
                                value={newSupplier}
                                onChange={(e) => setNewSupplier(e.target.value)}
                                placeholder="Enter supplier name"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setSupplierDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="button" onClick={handleAddSupplier}>
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
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select which Group you want to include the Item Within</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stock">Regular Stock</SelectItem>
                    <SelectItem value="veterinary">Veterinary Supplies</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional notes (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
