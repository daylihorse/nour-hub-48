
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestResultFormData } from "../AddTestResultDialog";
import { useTestValues } from "./hooks/useTestValues";
import { TemplateLoadingSection } from "./components/TemplateLoadingSection";
import { TemplateParametersTable } from "./components/TemplateParametersTable";
import { AddCustomParameterForm } from "./components/AddCustomParameterForm";

interface TestResultStep2Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep2 = ({ formData, updateFormData }: TestResultStep2Props) => {
  const {
    selectedTemplates,
    templateLoaded,
    loadTemplateParameters,
    addCustomValue,
    removeValue,
    updateValue
  } = useTestValues({ formData, updateFormData });

  if (!formData.templateIds || formData.templateIds.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please select a sample with templates in the previous step to continue.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalParameters = selectedTemplates.reduce((sum, template) => sum + template.parameters.length, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Test Values for Selected Templates
            <div className="flex gap-2">
              {selectedTemplates.map((template) => (
                <Badge key={template.id} variant="outline">{template.category}</Badge>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Templates: {selectedTemplates.map(t => t.nameEn).join(", ")}
          </div>

          <TemplateLoadingSection
            hasValues={formData.values.length > 0}
            parameterCount={totalParameters}
            onLoadTemplate={loadTemplateParameters}
          />

          <TemplateParametersTable
            values={formData.values}
            onUpdateValue={updateValue}
            onRemoveValue={removeValue}
          />

          <AddCustomParameterForm onAddParameter={addCustomValue} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResultStep2;
