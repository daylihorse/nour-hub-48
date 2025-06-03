
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HorseFormData } from "@/types/horse";

const PedigreeStage = () => {
  const form = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="sire"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sire (Father)</FormLabel>
              <FormControl>
                <Input placeholder="Enter sire name" {...field} />
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
                <Input placeholder="Enter dam name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bloodlineOrigin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bloodline Origin</FormLabel>
              <FormControl>
                <Input placeholder="Enter bloodline origin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PedigreeStage;
