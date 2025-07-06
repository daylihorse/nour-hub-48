import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AddressSectionProps {
  control: Control<any>;
}

export const AddressSection = ({ control }: AddressSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="address.street"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <Input placeholder="Enter street address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address.city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="Enter city" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address.state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State/Province</FormLabel>
            <FormControl>
              <Input placeholder="Enter state or province" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address.zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ZIP/Postal Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter ZIP or postal code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address.country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input placeholder="Enter country" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};