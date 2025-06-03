
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HorseFormData } from "@/types/horse";

interface ReviewConfirmationStageProps {
  onSubmit: () => void;
}

const ReviewConfirmationStage = ({ onSubmit }: ReviewConfirmationStageProps) => {
  const form = useFormContext<HorseFormData>();
  const formData = form.getValues();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium">Review & Confirm</h3>
        <p className="text-sm text-muted-foreground">
          Please review all information before submitting
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span>{formData.name || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Breed:</span>
            <span>{formData.breed || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gender:</span>
            <span className="capitalize">{formData.gender || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Color:</span>
            <span>{formData.color || 'Not provided'}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ownership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Owner Type:</span>
            <span className="capitalize">{formData.ownerType || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Owner Name:</span>
            <span>{formData.ownerName || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Contact:</span>
            <span>{formData.ownerContact || 'Not provided'}</span>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-center">
        <Button onClick={onSubmit} size="lg" className="px-8">
          Register Horse
        </Button>
      </div>
    </div>
  );
};

export default ReviewConfirmationStage;
