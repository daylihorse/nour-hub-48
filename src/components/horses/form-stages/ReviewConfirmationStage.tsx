
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HorseFormData } from "@/types/horse";

interface ReviewConfirmationStageProps {
  onSubmit: () => void;
}

const ReviewConfirmationStage = ({ onSubmit }: ReviewConfirmationStageProps) => {
  const form = useFormContext<HorseFormData>();
  const formData = form.getValues();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Review & Confirmation</h2>
        <p className="text-muted-foreground">Please review all information and set the horse status before submitting</p>
      </div>

      {/* Status Field */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Horse Status</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="status-active" />
                      <Label htmlFor="status-active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="status-inactive" />
                      <Label htmlFor="status-inactive">Inactive</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{formData.name || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Breed:</span>
              <span>{formData.breed || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Gender:</span>
              <span className="capitalize">{formData.gender || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Color:</span>
              <span>{formData.color || "Not provided"}</span>
            </div>
            {formData.birthDate && (
              <div className="flex justify-between">
                <span className="font-medium">Birth Date:</span>
                <span>{new Date(formData.birthDate).toLocaleDateString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ownership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Owner Type:</span>
              <span className="capitalize">{formData.ownerType || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Owner Name:</span>
              <span>{formData.ownerName || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Contact:</span>
              <span>{formData.ownerContact || "Not provided"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health & Medical</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Health Status:</span>
              <span className="capitalize">{formData.healthStatus || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Vaccination:</span>
              <span className="capitalize">{formData.vaccinationStatus || "Not provided"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training & Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Training Level:</span>
              <span className="capitalize">{formData.trainingLevel || "Not provided"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={onSubmit}
          size="lg"
          className="px-8 py-3 text-lg"
        >
          Register Horse
        </Button>
      </div>
    </div>
  );
};

export default ReviewConfirmationStage;
