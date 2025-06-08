
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import FormFieldWrapper from "./FormFieldWrapper";

interface OwnershipLocationSectionProps {
  formData: {
    owner: string;
    location: string;
    insuranceValue: string;
    acquisitionDate: string;
    acquisitionPrice: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const OwnershipLocationSection = ({ formData, onInputChange }: OwnershipLocationSectionProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Ownership & Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFieldWrapper id="owner" label="Owner">
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => onInputChange('owner', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="location" label="Current Location">
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => onInputChange('location', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="insuranceValue" label="Insurance Value ($)">
            <Input
              id="insuranceValue"
              value={formData.insuranceValue}
              onChange={(e) => onInputChange('insuranceValue', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="acquisitionDate" label="Acquisition Date">
            <Input
              id="acquisitionDate"
              type="date"
              value={formData.acquisitionDate}
              onChange={(e) => onInputChange('acquisitionDate', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="acquisitionPrice" label="Acquisition Price ($)">
            <Input
              id="acquisitionPrice"
              value={formData.acquisitionPrice}
              onChange={(e) => onInputChange('acquisitionPrice', e.target.value)}
            />
          </FormFieldWrapper>
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnershipLocationSection;
