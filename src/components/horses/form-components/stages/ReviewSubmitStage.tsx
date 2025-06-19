
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReviewSubmitStageProps {
  onSubmit: () => void;
}

const ReviewSubmitStage = ({ onSubmit }: ReviewSubmitStageProps) => {
  const { setValue, watch, formState: { errors } } = useFormContext<HorseFormData>();
  const formData = watch();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="status">Horse Status *</Label>
        <Select onValueChange={(value) => setValue("status", value as "active" | "inactive" | "transferred" | "deceased")}>
          <SelectTrigger>
            <SelectValue placeholder="Select horse status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="transferred">Transferred</SelectItem>
            <SelectItem value="deceased">Deceased</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registration Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Basic Information</h4>
              <p className="text-sm text-gray-600">
                {formData.name || "N/A"} • {formData.breed || "N/A"} • {formData.gender || "N/A"}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Owner</h4>
              <p className="text-sm text-gray-600">
                {formData.ownerName || "N/A"} ({formData.ownerType || "N/A"})
              </p>
            </div>
            <div>
              <h4 className="font-medium">Health Status</h4>
              <Badge variant={formData.healthStatus === "healthy" ? "default" : "destructive"}>
                {formData.healthStatus || "N/A"}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium">Registration</h4>
              <p className="text-sm text-gray-600">
                {formData.registrationNumber || "Not provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSubmitStage;
