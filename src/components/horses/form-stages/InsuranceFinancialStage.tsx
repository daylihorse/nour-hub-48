
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import DynamicInput from "../form-components/DynamicInput";
import { HorseFormValues } from "../form-schema/HorseFormSchema";

const InsuranceFinancialStage = () => {
  const form = useFormContext<HorseFormValues>();
  const isInsured = form.watch("insured");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="insured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Horse is insured</FormLabel>
              <p className="text-sm text-muted-foreground">
                Check if the horse has insurance coverage
              </p>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {isInsured && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-blue-50">
          <DynamicInput
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Insurance company name"
          />

          <DynamicInput
            name="insuranceValue"
            label="Insurance Value ($)"
            placeholder="e.g., 50000"
            type="number"
          />
        </div>
      )}

      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold mb-4">Financial Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicInput
            name="purchasePrice"
            label="Purchase Price ($)"
            placeholder="e.g., 25000"
            type="number"
          />

          <DynamicInput
            name="marketValue"
            label="Current Market Value ($)"
            placeholder="e.g., 30000"
            type="number"
          />
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h5 className="font-medium text-green-900 mb-2">Financial Notes</h5>
        <p className="text-sm text-green-700">
          Financial information helps with insurance claims, breeding valuations, and overall stable management. 
          This information is confidential and used for record-keeping purposes only.
        </p>
      </div>
    </div>
  );
};

export default InsuranceFinancialStage;
