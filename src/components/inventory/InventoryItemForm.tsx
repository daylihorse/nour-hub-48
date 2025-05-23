
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus, Upload } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Form schema
const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  warehouse: z.string().min(1, "Warehouse selection is required"),
  classification: z.string().min(1, "Classification is required"),
  entryDate: z.date(),
  expiryDate: z.date().optional(),
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
  images: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Demo data
const warehouseOptions = [
  { label: "Medicine Warehouses", value: "medicine" },
  { label: "Horse Saddle Warehouse", value: "saddle" },
  { label: "Food Storage Warehouse", value: "food" },
  { label: "Cleaning Supplies Warehouse", value: "cleaning" },
];

const classificationOptions = [
  { label: "Cleaning Tools", value: "cleaning" },
  { label: "Farrier Tools", value: "farrier" },
  { label: "Feed Materials", value: "feed" },
  { label: "Horse Training Tools", value: "training" },
  { label: "Laboratory Equipments", value: "lab" },
  { label: "Medical Supplies", value: "medical" },
  { label: "Products for Sale", value: "sale" },
  { label: "Veterinary Products", value: "vet" },
];

const supplierOptions = [
  { label: "Arabian Horse Pharmacy", value: "arabian" },
  { label: "Al-Sharq Pharmacy for Horse Supplies", value: "alsharq" },
  { label: "Al-Russaifi Stores for Herbal Products", value: "alrussaifi" },
];

const unitOptions = [
  { label: "Piece (Pcs)", value: "piece" },
  { label: "Gram (g)", value: "gram" },
  { label: "Milligram (mg)", value: "milligram" },
  { label: "Kilogram (Kg)", value: "kilogram" },
  { label: "Liter (L)", value: "liter" },
  { label: "Milliliter (mL)", value: "milliliter" },
  { label: "Bag / Tie", value: "bag" },
  { label: "Pack / Set", value: "pack" },
  { label: "Centimeters", value: "cm" },
  { label: "Cubic Centimeters", value: "cc" },
  { label: "Pound", value: "pound" },
  { label: "Gallons", value: "gallon" },
  { label: "Tablets", value: "tablet" },
];

interface InventoryItemFormProps {
  onSave: (data: FormValues & { images?: string[] }) => void;
  onCancel: () => void;
}

const InventoryItemForm = ({ onSave, onCancel }: InventoryItemFormProps) => {
  const [warehouseDialogOpen, setWarehouseDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [unitDialogOpen, setUnitDialogOpen] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState("");
  const [newCategory, setNewCategory] = useState({
    type: "item",
    name: "",
    description: "",
  });
  const [newSupplier, setNewSupplier] = useState("");
  const [newUnit, setNewUnit] = useState({
    name: "",
    description: "",
  });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      entryDate: new Date(),
      quantitiesPurchased: 1,
      listForSale: false,
    },
  });

  // Form submission handler
  const onSubmit = (values: FormValues) => {
    onSave({
      ...values,
      images: selectedImages,
    });
  };

  // Handlers for dialogs
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

  const handleAddUnit = () => {
    if (newUnit.name) {
      // In a real app, save to database
      setUnitDialogOpen(false);
      setNewUnit({ name: "", description: "" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Add Images</h2>

          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="border-2 border-dashed rounded-md flex flex-col items-center justify-center p-6 hover:border-primary cursor-pointer"
                onClick={() => {
                  // In a real app, this would open a file picker
                  const mockImage = `image-${index + 1}`;
                  if (!selectedImages.includes(mockImage)) {
                    setSelectedImages([...selectedImages, mockImage]);
                  }
                }}
              >
                {selectedImages[index] ? (
                  <div className="text-primary">Image Selected</div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Upload Image</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default InventoryItemForm;
