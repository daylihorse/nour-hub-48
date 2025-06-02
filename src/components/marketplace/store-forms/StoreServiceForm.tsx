
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

const serviceSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  classification: z.string().min(1, "Classification is required"),
  approvalDate: z.string().min(1, "Approval date is required"),
  addExpiryDate: z.boolean().default(false),
  expiryDate: z.string().optional(),
  supplier: z.string().min(1, "Supplier is required"),
  group: z.string().optional(),
  additionalNotes: z.string().optional(),
  serviceOffers: z.number().min(1, "Service offers is required"),
  alertThreshold: z.number().min(1, "Alert threshold is required"),
  purchasePrice: z.number().min(0, "Purchase price is required"),
  listForSale: z.boolean().default(false),
  sellingPrice: z.number().optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface StoreServiceFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const StoreServiceForm = ({ onSave, onCancel }: StoreServiceFormProps) => {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceName: "",
      classification: "",
      approvalDate: new Date().toISOString().split('T')[0],
      addExpiryDate: false,
      supplier: "",
      serviceOffers: 1,
      alertThreshold: 1,
      purchasePrice: 0,
      listForSale: false,
    },
  });

  const onSubmit = (data: ServiceFormValues) => {
    console.log("Service data:", data);
    toast({
      title: "Service Added",
      description: "Your service has been added to your store successfully!",
    });
    onSave();
  };

  const isListedForSale = form.watch("listForSale");
  const hasExpiryDate = form.watch("addExpiryDate");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter service name" {...field} />
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
                        <SelectItem value="ultrasound">Ultrasound Scanning of Mares</SelectItem>
                        <SelectItem value="scope">Scope</SelectItem>
                        <SelectItem value="stitching">Wound Stitching</SelectItem>
                        <SelectItem value="training">Horse Training</SelectItem>
                      </SelectContent>
                    </Select>
                    <AddNewDropdownButton type="category" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="approvalDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approval Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                        <SelectItem value="vet">Veterinary Clinic</SelectItem>
                      </SelectContent>
                    </Select>
                    <AddNewDropdownButton type="supplier" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="addExpiryDate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Add Expiry Date
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

          {hasExpiryDate && (
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <h3 className="text-lg font-semibold">Service Details & Pricing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="serviceOffers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many times would you like to offer this service</FormLabel>
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
              name="alertThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Alert Threshold</FormLabel>
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
                  <FormLabel>Purchase Price Cost for This Service</FormLabel>
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
          </div>

          <FormField
            control={form.control}
            name="listForSale"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Would you like to list this service for sale?
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
                  <FormLabel>Set the Selling Price for This Service</FormLabel>
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
          <Button type="submit">Save Service</Button>
        </div>
      </form>
    </Form>
  );
};

export default StoreServiceForm;
