
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PedigreeStage = () => {
  const { register } = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sire">Sire (Father)</Label>
          <Input
            id="sire"
            {...register("sire")}
            placeholder="Enter sire name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dam">Dam (Mother)</Label>
          <Input
            id="dam"
            {...register("dam")}
            placeholder="Enter dam name"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bloodlineOrigin">Bloodline Origin</Label>
          <Input
            id="bloodlineOrigin"
            {...register("bloodlineOrigin")}
            placeholder="Enter bloodline origin"
          />
        </div>
      </div>
    </div>
  );
};

export default PedigreeStage;
