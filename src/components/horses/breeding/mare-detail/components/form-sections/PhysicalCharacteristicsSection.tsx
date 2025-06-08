
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import FormFieldWrapper from "./FormFieldWrapper";

interface PhysicalCharacteristicsSectionProps {
  formData: {
    birthDate: string;
    color: string;
    height: string;
    weight: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PhysicalCharacteristicsSection = ({ formData, onInputChange }: PhysicalCharacteristicsSectionProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Physical Characteristics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFieldWrapper id="birthDate" label="Birth Date">
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => onInputChange('birthDate', e.target.value)}
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="color" label="Color">
            <Select value={formData.color} onValueChange={(value) => onInputChange('color', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bay">Bay</SelectItem>
                <SelectItem value="Chestnut">Chestnut</SelectItem>
                <SelectItem value="Black">Black</SelectItem>
                <SelectItem value="Grey">Grey</SelectItem>
                <SelectItem value="Brown">Brown</SelectItem>
              </SelectContent>
            </Select>
          </FormFieldWrapper>
          
          <FormFieldWrapper id="height" label="Height (hands)">
            <Input
              id="height"
              value={formData.height}
              onChange={(e) => onInputChange('height', e.target.value)}
              placeholder="15.2"
            />
          </FormFieldWrapper>
          
          <FormFieldWrapper id="weight" label="Weight (kg)">
            <Input
              id="weight"
              value={formData.weight}
              onChange={(e) => onInputChange('weight', e.target.value)}
              placeholder="450"
            />
          </FormFieldWrapper>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhysicalCharacteristicsSection;
