
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const storeSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  description: z.string().min(1, "Description is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(1, "Phone number is required"),
  defaultWarehouse: z.string().min(1, "Default warehouse is required"),
  defaultGroup: z.string().optional(),
});

type StoreFormValues = z.infer<typeof storeSchema>;

interface StoreSetupProps {
  onStoreCreated: () => void;
}

const StoreSetup = ({ onStoreCreated }: StoreSetupProps) => {
  const [logo, setLogo] = useState<string | null>(null);

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
      defaultWarehouse: "",
      defaultGroup: "",
    },
  });

  const onSubmit = (data: StoreFormValues) => {
    console.log("Store setup data:", { ...data, logo });
    toast({
      title: "Store Created",
      description: "Your store has been set up successfully!",
    });
    onStoreCreated();
  };

  const handleLogoUpload = () => {
    // Mock file upload
    setLogo("logo-uploaded");
    toast({
      title: "Logo Uploaded",
      description: "Store logo has been uploaded successfully",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your store and what you offer"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="store@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Logo</label>
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary"
                onClick={handleLogoUpload}
              >
                {logo ? (
                  <div className="text-primary">Logo Uploaded ✓</div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload logo</p>
                  </>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="defaultWarehouse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Warehouse</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default warehouse" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="medicine">Medicine Warehouses</SelectItem>
                      <SelectItem value="saddle">Horse Saddle Warehouse</SelectItem>
                      <SelectItem value="food">Food Storage Warehouse</SelectItem>
                      <SelectItem value="cleaning">Cleaning Supplies Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Product Group (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="medical">Medical Supplies</SelectItem>
                      <SelectItem value="feed">Feed Materials</SelectItem>
                      <SelectItem value="training">Training Equipment</SelectItem>
                      <SelectItem value="cleaning">Cleaning Tools</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="px-8">
            Create Store
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StoreSetup;
