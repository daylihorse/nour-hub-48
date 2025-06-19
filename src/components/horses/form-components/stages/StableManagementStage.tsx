
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const StableManagementStage = () => {
  const { register } = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="stallNumber">Stall Number</Label>
          <Input
            id="stallNumber"
            {...register("stallNumber")}
            placeholder="Enter stall number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedingSchedule">Feeding Schedule</Label>
          <Input
            id="feedingSchedule"
            {...register("feedingSchedule")}
            placeholder="e.g., 3 times daily"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="exerciseRoutine">Exercise Routine</Label>
          <Textarea
            id="exerciseRoutine"
            {...register("exerciseRoutine")}
            placeholder="Describe exercise routine"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="specialNeeds">Special Needs</Label>
          <Textarea
            id="specialNeeds"
            {...register("specialNeeds")}
            placeholder="List any special needs or requirements"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default StableManagementStage;
