
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import FormFieldWrapper from "./FormFieldWrapper";

interface PedigreeSectionProps {
  formData: {
    sire: string;
    dam: string;
    bloodlineOrigin: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PedigreeSection = ({ formData, onInputChange }: PedigreeSectionProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Pedigree Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFieldWrapper id="sire" label="Sire">
            <Input
              id="sire"
              value={formData.sire}
              onChange={(e) => onInputChange('sire', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="dam" label="Dam">
            <Input
              id="dam"
              value={formData.dam}
              onChange={(e) => onInputChange('dam', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="bloodlineOrigin" label="Bloodline Origin" className="md:col-span-2">
            <Input
              id="bloodlineOrigin"
              value={formData.bloodlineOrigin}
              onChange={(e) => onInputChange('bloodlineOrigin', e.target.value)}
            />
          </FormFieldWrapper>
        </div>
      </CardContent>
    </Card>
  );
};

export default PedigreeSection;
