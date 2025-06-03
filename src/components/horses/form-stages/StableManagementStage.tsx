
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HorseFormData } from "@/types/horse";

const StableManagementStage = () => {
  const form = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="stallNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stall Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter stall number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedingSchedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feeding Schedule</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter feeding schedule details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exerciseRoutine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Routine</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter exercise routine details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default StableManagementStage;
