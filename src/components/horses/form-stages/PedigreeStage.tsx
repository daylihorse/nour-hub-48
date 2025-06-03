
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HorseFormValues } from "../form-schema/HorseFormSchema";

const PedigreeStage = () => {
  const form = useFormContext<HorseFormValues>();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold">Bloodline Information</h4>
        <p className="text-muted-foreground">
          Record the horse's ancestry and bloodline details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="sire"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sire (Father)</FormLabel>
              <FormControl>
                <Input placeholder="Name of the sire" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dam (Mother)</FormLabel>
              <FormControl>
                <Input placeholder="Name of the dam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bloodlineOrigin"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Bloodline Origin</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Egyptian Arabian, English Thoroughbred" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">Pedigree Notes</h5>
        <p className="text-sm text-blue-700">
          Pedigree information helps maintain breeding records and bloodline tracking. 
          This information is optional but valuable for breeding programs and horse valuation.
        </p>
      </div>
    </div>
  );
};

export default PedigreeStage;
