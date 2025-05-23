
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FormValues } from "./FormSchema";

interface ServiceDetailsSectionProps {
  form: UseFormReturn<FormValues>;
}

const ServiceDetailsSection = ({ form }: ServiceDetailsSectionProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Service Information & Details</h2>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="serviceOffers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many times would you like to offer this service</FormLabel>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    if (field.value > 1) {
                      form.setValue('serviceOffers', field.value - 1);
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
                    form.setValue('serviceOffers', field.value + 1);
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
          name="alertThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Alert Threshold</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter alert threshold"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                <FormLabel>Would you like to list this service for sale?</FormLabel>
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
                <FormLabel>Set the Selling Price for This Service</FormLabel>
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

export default ServiceDetailsSection;
