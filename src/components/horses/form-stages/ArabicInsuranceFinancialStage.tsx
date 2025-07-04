
import ArabicFormInput from "../form-components/ArabicFormInput";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { arabicLabels } from "../form-components/constants/arabicLabels";

const ArabicInsuranceFinancialStage = () => {
  const form = useFormContext();

  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="insured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5 text-right">
                <FormLabel className="text-base">
                  {arabicLabels["Insured"]}
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

        <ArabicFormInput
          name="insuranceProvider"
          label="Insurance Provider"
          placeholder="Enter insurance provider"
        />

        <ArabicFormInput
          name="insuranceValue"
          label="Insurance Value"
          placeholder="Enter insurance value"
          type="number"
        />

        <ArabicFormInput
          name="purchasePrice"
          label="Purchase Price"
          placeholder="Enter purchase price"
          type="number"
        />

        <ArabicFormInput
          name="marketValue"
          label="Market Value"
          placeholder="Enter market value"
          type="number"
        />
      </div>
    </div>
  );
};

export default ArabicInsuranceFinancialStage;
