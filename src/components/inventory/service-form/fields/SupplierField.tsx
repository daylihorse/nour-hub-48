
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues, supplierOptions } from "../FormSchema";
import AddSupplierDialog from "../dialogs/AddSupplierDialog";

interface SupplierFieldProps {
  form: UseFormReturn<FormValues>;
}

const SupplierField = ({ form }: SupplierFieldProps) => {
  return (
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
                  <AddSupplierDialog />
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SupplierField;
