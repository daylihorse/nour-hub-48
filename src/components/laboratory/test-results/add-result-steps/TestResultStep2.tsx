
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TestResultFormData } from "../AddTestResultDialog";
import { useTestValues } from "./hooks/useTestValues";
import { TemplateLoadingSection } from "./components/TemplateLoadingSection";
import { TemplateParametersTable } from "./components/TemplateParametersTable";
import { AddCustomParameterForm } from "./components/AddCustomParameterForm";
import { ArrowLeft } from "lucide-react";

interface TestResultStep2Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep2 = ({ formData, updateFormData }: TestResultStep2Props) => {
  const {
    selectedTemplates,
    templateLoaded,
    selectedTemplateFilter,
    filteredValues,
    activeTemplate,
    loadTemplateParameters,
    addCustomValue,
    removeValue,
    updateValue,
    handleTemplateFilter,
    getTemplateParameterCount
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
  const displayTitle = activeTemplate 
    ? `${activeTemplate.nameEn} Parameters`
    : "Test Values for Selected Templates";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {selectedTemplateFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTemplateFilter(null)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to All
              </Button>
            )}
            <span className="flex-1">{displayTitle}</span>
            <div className="flex gap-2">
              {selectedTemplates.map((template) => {
                const isActive = selectedTemplateFilter === template.id;
                const paramCount = getTemplateParameterCount(template.id);
                
                return (
                  <Button
                    key={template.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTemplateFilter(isActive ? null : template.id)}
                    className="flex items-center gap-2"
                  >
                    <Badge variant={isActive ? "secondary" : "outline"}>
                      {template.category}
                    </Badge>
                    {templateLoaded && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {paramCount}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedTemplateFilter && (
            <div className="text-sm text-muted-foreground">
              Templates: {selectedTemplates.map(t => t.nameEn).join(", ")}
              <br />
              <span className="text-xs bg-blue-50 px-2 py-1 rounded mt-1 inline-block">
                💡 Click on a template badge above to filter parameters by that template
              </span>
            </div>
          )}

          {selectedTemplateFilter && activeTemplate && (
            <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded border-l-4 border-blue-400">
              <div className="font-medium">Viewing: {activeTemplate.nameEn}</div>
              <div className="text-xs mt-1" dir="rtl">{activeTemplate.nameAr}</div>
              <div className="text-xs mt-2">
                Sample Type: {activeTemplate.sampleType} • 
                Methodology: {activeTemplate.methodology} • 
                Turnaround: {activeTemplate.turnaroundTime}h
              </div>
            </div>
          )}

          <TemplateLoadingSection
            hasValues={formData.values.length > 0}
            parameterCount={selectedTemplateFilter ? filteredValues.length : totalParameters}
            onLoadTemplate={loadTemplateParameters}
          />

          <TemplateParametersTable
            values={filteredValues}
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
