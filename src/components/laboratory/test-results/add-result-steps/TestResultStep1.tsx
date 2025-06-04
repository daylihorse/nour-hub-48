
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestResultFormData } from "../AddTestResultDialog";
import { useTemplateIntegration } from "../hooks/useTemplateIntegration";
import { templateSyncManager } from "@/utils/templateSync";
import PreSelectedTemplatesDisplay from "./components/PreSelectedTemplatesDisplay";
import SampleSelectionSection from "./components/SampleSelectionSection";
import SampleDetailsCard from "./components/SampleDetailsCard";
import TestCompletionSection from "./components/TestCompletionSection";
import { useState, useEffect } from "react";
import { Template } from "@/types/template";

interface TestResultStep1Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep1 = ({ formData, updateFormData }: TestResultStep1Props) => {
  const { getTemplateById } = useTemplateIntegration();
  const [preSelectedTemplates, setPreSelectedTemplates] = useState<Template[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  // Mock samples data - in real app this would come from an API
  const availableSamples = [
    { id: "S004", horseName: "Lightning", horsePhoto: "/placeholder.svg", clientName: "Mike Johnson", clientPhone: "+1-555-0126", clientEmail: "mike.j@email.com" },
    { id: "S005", horseName: "Spirit", horsePhoto: "/placeholder.svg", clientName: "Sarah Wilson", clientPhone: "+1-555-0127", clientEmail: "sarah.w@email.com" },
    { id: "S006", horseName: "Midnight", horsePhoto: "/placeholder.svg", clientName: "Tom Davis", clientPhone: "+1-555-0128", clientEmail: "tom.d@email.com" }
  ];

  const handleSampleSelect = async (sampleId: string) => {
    const sample = availableSamples.find(s => s.id === sampleId);
    if (sample) {
      updateFormData({
        sampleId: sample.id,
        horseName: sample.horseName,
        horsePhoto: sample.horsePhoto,
        clientName: sample.clientName,
        clientPhone: sample.clientPhone,
        clientEmail: sample.clientEmail
      });

      // Load templates associated with this sample
      setTemplatesLoading(true);
      try {
        const templateData = await templateSyncManager.loadTemplatesForTestResult(sampleId);
        if (templateData.success && templateData.templateIds.length > 0) {
          const templates = templateData.templateIds
            .map(id => getTemplateById(id))
            .filter((template): template is Template => template !== undefined);
          
          setPreSelectedTemplates(templates);
          
          // Update form data with template IDs and combined test type
          const testType = templates.map(t => t.nameEn).join(", ");
          updateFormData({
            templateIds: templateData.templateIds,
            testType: testType
          });
          
          console.log(`Loaded ${templates.length} pre-selected templates for sample ${sampleId}`);
        } else {
          setPreSelectedTemplates([]);
          updateFormData({
            templateIds: [],
            testType: ""
          });
          console.log(`No templates found for sample ${sampleId}`);
        }
      } catch (error) {
        console.error("Failed to load templates for sample:", error);
        setPreSelectedTemplates([]);
        updateFormData({
          templateIds: [],
          testType: ""
        });
      } finally {
        setTemplatesLoading(false);
      }
    }
  };

  // Clear templates when sample is deselected
  useEffect(() => {
    if (!formData.sampleId) {
      setPreSelectedTemplates([]);
      updateFormData({
        templateIds: [],
        testType: ""
      });
    }
  }, [formData.sampleId]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sample Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SampleSelectionSection
            selectedSampleId={formData.sampleId}
            onSampleSelect={handleSampleSelect}
          />

          {formData.sampleId && (
            <SampleDetailsCard
              horseName={formData.horseName}
              horsePhoto={formData.horsePhoto}
              sampleId={formData.sampleId}
              clientName={formData.clientName}
              clientPhone={formData.clientPhone}
            />
          )}
        </CardContent>
      </Card>

      {formData.sampleId && (
        <PreSelectedTemplatesDisplay 
          templates={preSelectedTemplates} 
          loading={templatesLoading}
        />
      )}

      <TestCompletionSection
        completedDate={formData.completedDate}
        onDateChange={(date) => updateFormData({ completedDate: date })}
      />
    </div>
  );
};

export default TestResultStep1;
