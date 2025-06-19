
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const InsuranceFinancialStage = () => {
  const { register, setValue, watch } = useFormContext<HorseFormData>();
  const isInsured = watch("insured");

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="insured"
            checked={isInsured}
            onCheckedChange={(checked) => setValue("insured", checked as boolean)}
          />
          <Label htmlFor="insured">Horse is insured</Label>
        </div>

        {isInsured && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input
                id="insuranceProvider"
                {...register("insuranceProvider")}
                placeholder="Enter insurance provider"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceValue">Insurance Value ($)</Label>
              <Input
                id="insuranceValue"
                type="number"
                {...register("insuranceValue", { valueAsNumber: true })}
                placeholder="Enter insurance value"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
            <Input
              id="purchasePrice"
              type="number"
              {...register("purchasePrice", { valueAsNumber: true })}
              placeholder="Enter purchase price"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketValue">Market Value ($)</Label>
            <Input
              id="marketValue"
              type="number"
              {...register("marketValue", { valueAsNumber: true })}
              placeholder="Enter current market value"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceFinancialStage;
