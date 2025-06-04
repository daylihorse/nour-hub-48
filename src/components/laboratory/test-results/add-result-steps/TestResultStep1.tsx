
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
import { initializeMockTemplateData } from "../utils/mockTemplateData";

interface TestResultStep1Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep1 = ({ formData, updateFormData }: TestResultStep1Props) => {
  const { getTemplateById } = useTemplateIntegration();
  const [preSelectedTemplates, setPreSelectedTemplates] = useState<Template[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [mockDataInitialized, setMockDataInitialized] = useState(false);

  // Initialize mock template data on component mount
  useEffect(() => {
    const initializeMockData = async () => {
      try {
        console.log("Starting mock template data initialization...");
        await initializeMockTemplateData();
        setMockDataInitialized(true);
        console.log("Mock template data initialization completed successfully");
      } catch (error) {
        console.error("Failed to initialize mock template data:", error);
        setMockDataInitialized(true); // Continue even if initialization fails
      }
    };

    if (!mockDataInitialized) {
      initializeMockData();
    }
  }, [mockDataInitialized]);

  // Mock samples data - in real app this would come from an API
  const availableSamples = [
    { id: "S004", horseName: "Lightning", horsePhoto: "/placeholder.svg", clientName: "Mike Johnson", clientPhone: "+1-555-0126", clientEmail: "mike.j@email.com" },
    { id: "S005", horseName: "Spirit", horsePhoto: "/placeholder.svg", clientName: "Sarah Wilson", clientPhone: "+1-555-0127", clientEmail: "sarah.w@email.com" },
    { id: "S006", horseName: "Midnight", horsePhoto: "/placeholder.svg", clientName: "Tom Davis", clientPhone: "+1-555-0128", clientEmail: "tom.d@email.com" }
  ];

  const handleSampleSelect = async (sampleId: string) => {
    console.log(`Sample selected: ${sampleId}`);
    
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
        console.log(`Loading templates for sample ${sampleId}...`);
        const templateData = await templateSyncManager.loadTemplatesForTestResult(sampleId);
        
        console.log(`Template loading result:`, templateData);
        
        if (templateData.success && templateData.templateIds.length > 0) {
          console.log(`Found ${templateData.templateIds.length} templates for sample ${sampleId}:`, templateData.templateIds);
          
          const templates = templateData.templateIds
            .map(id => {
              const template = getTemplateById(id);
              console.log(`Template lookup for ID ${id}:`, template ? `Found: ${template.nameEn}` : 'Not found');
              return template;
            })
            .filter((template): template is Template => template !== undefined);
          
          console.log(`Successfully resolved ${templates.length} template objects`);
          setPreSelectedTemplates(templates);
          
          // Update form data with template IDs and combined test type
          const testType = templates.map(t => t.nameEn).join(", ");
          updateFormData({
            templateIds: templateData.templateIds,
            testType: testType
          });
          
          console.log(`Updated form data with ${templates.length} templates:`, {
            templateIds: templateData.templateIds,
            testType
          });
        } else {
          console.log(`No templates found for sample ${sampleId}:`, templateData.error || 'Unknown reason');
          setPreSelectedTemplates([]);
          updateFormData({
            templateIds: [],
            testType: ""
          });
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
      console.log("Sample deselected, clearing templates");
      setPreSelectedTemplates([]);
      updateFormData({
        templateIds: [],
        testType: ""
      });
    }
  }, [formData.sampleId]);

  // Don't render until mock data is initialized
  if (!mockDataInitialized) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-4 text-muted-foreground">
              Initializing sample data...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
