
import { centralTemplateService } from "@/services/centralTemplateService";
import { Template } from "@/services/templateService";

export interface SampleTemplateData {
  sampleId: string;
  selectedTemplateIds: string[];
  templateDetails: Template[];
  timestamp: string;
}

class TemplateSyncManager {
  private sampleTemplateCache: Map<string, SampleTemplateData> = new Map();

  // Save template selection for a sample
  async saveSampleTemplates(sampleId: string, templateIds: string[]): Promise<void> {
    try {
      const templateDetails = await centralTemplateService.getSelectedTemplateDetails();
      
      const sampleTemplateData: SampleTemplateData = {
        sampleId,
        selectedTemplateIds: templateIds,
        templateDetails,
        timestamp: new Date().toISOString()
      };

      this.sampleTemplateCache.set(sampleId, sampleTemplateData);
      console.log(`Template data saved for sample ${sampleId}:`, sampleTemplateData);
      
      // In a real app, this would persist to a database
      localStorage.setItem(`sample_templates_${sampleId}`, JSON.stringify(sampleTemplateData));
    } catch (error) {
      console.error("Failed to save sample templates:", error);
    }
  }

  // Retrieve template data for a sample
  getSampleTemplates(sampleId: string): SampleTemplateData | null {
    // First check in-memory cache
    let sampleData = this.sampleTemplateCache.get(sampleId);
    
    if (!sampleData) {
      // Try to load from localStorage
      const stored = localStorage.getItem(`sample_templates_${sampleId}`);
      if (stored) {
        try {
          sampleData = JSON.parse(stored);
          if (sampleData) {
            this.sampleTemplateCache.set(sampleId, sampleData);
          }
        } catch (error) {
          console.error("Failed to parse stored sample template data:", error);
        }
      }
    }

    return sampleData || null;
  }

  // Load template data into test result form
  async loadTemplatesForTestResult(sampleId: string): Promise<{
    success: boolean;
    templateIds: string[];
    formValues: any[];
    error?: string;
  }> {
    try {
      const sampleTemplateData = this.getSampleTemplates(sampleId);
      
      if (!sampleTemplateData) {
        return {
          success: false,
          templateIds: [],
          formValues: [],
          error: "No template data found for this sample"
        };
      }

      // Convert template parameters to form values
      const formValues = sampleTemplateData.templateDetails.flatMap(template => 
        centralTemplateService.convertTemplateToFormValues(template)
      );

      console.log(`Loaded templates for test result creation:`, {
        sampleId,
        templateIds: sampleTemplateData.selectedTemplateIds,
        formValues
      });

      return {
        success: true,
        templateIds: sampleTemplateData.selectedTemplateIds,
        formValues
      };
    } catch (error) {
      console.error("Failed to load templates for test result:", error);
      return {
        success: false,
        templateIds: [],
        formValues: [],
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }

  // Clear template data for a sample
  clearSampleTemplates(sampleId: string): void {
    this.sampleTemplateCache.delete(sampleId);
    localStorage.removeItem(`sample_templates_${sampleId}`);
  }

  // Get all cached samples
  getAllCachedSamples(): string[] {
    return Array.from(this.sampleTemplateCache.keys());
  }

  // Sync template changes across components
  async syncTemplateChanges(templateIds: string[]): Promise<void> {
    await centralTemplateService.syncWithService();
    console.log("Template changes synced across system");
  }
}

export const templateSyncManager = new TemplateSyncManager();
