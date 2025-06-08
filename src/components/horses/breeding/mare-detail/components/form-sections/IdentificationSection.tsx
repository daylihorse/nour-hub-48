
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import FormFieldWrapper from "./FormFieldWrapper";

interface IdentificationSectionProps {
  formData: {
    registrationNumber: string;
    microchipId: string;
    passportNumber: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const IdentificationSection = ({ formData, onInputChange }: IdentificationSectionProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Identification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFieldWrapper id="registrationNumber" label="Registration Number">
            <Input
              id="registrationNumber"
              value={formData.registrationNumber}
              onChange={(e) => onInputChange('registrationNumber', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="microchipId" label="Microchip ID">
            <Input
              id="microchipId"
              value={formData.microchipId}
              onChange={(e) => onInputChange('microchipId', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="passportNumber" label="Passport Number">
            <Input
              id="passportNumber"
              value={formData.passportNumber}
              onChange={(e) => onInputChange('passportNumber', e.target.value)}
            />
          </FormFieldWrapper>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentificationSection;
