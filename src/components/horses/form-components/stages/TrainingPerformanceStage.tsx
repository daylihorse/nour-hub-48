
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TrainingPerformanceStage = () => {
  const { register } = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tra

iningLevel">Training Level</Label>
          <Input
            id="trainingLevel"
            {...register("trainingLevel")}
            placeholder="e.g., Beginner, Intermediate, Advanced"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="disciplines">Disciplines</Label>
          <Input
            id="disciplines"
            {...register("disciplines")}
            placeholder="e.g., Dressage, Jumping, Racing"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="competitionHistory">Competition History</Label>
          <Textarea
            id="competitionHistory"
            {...register("competitionHistory")}
            placeholder="List competition history"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="achievements">Achievements</Label>
          <Textarea
            id="achievements"
            {...register("achievements")}
            placeholder="List achievements and awards"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingPerformanceStage;
