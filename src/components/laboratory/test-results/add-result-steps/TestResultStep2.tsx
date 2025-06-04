
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
    selectedTemplate,
    templateLoaded,
    loadTemplateParameters,
    addCustomValue,
    removeValue,
    updateValue
  } = useTestValues({ formData, updateFormData });

  if (!selectedTemplate) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please select a template in the previous step to continue.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Test Values for {selectedTemplate.nameEn}
            <Badge variant="outline">{selectedTemplate.category}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TemplateLoadingSection
            hasValues={formData.values.length > 0}
            parameterCount={selectedTemplate.parameters.length}
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
