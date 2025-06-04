
import { centralTemplateService } from "@/services/centralTemplateService";
import { Template } from "@/types/template";

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
      console.log(`Saving templates for sample ${sampleId}:`, templateIds);
      
      // Load all templates to ensure we have the latest data
      await centralTemplateService.loadTemplates();
      
      // Fetch template details by the provided template IDs
      const templateDetails: Template[] = [];
      for (const templateId of templateIds) {
        const template = centralTemplateService.getTemplateById(templateId);
        if (template) {
          templateDetails.push(template);
          console.log(`Found template: ${template.nameEn} (ID: ${templateId})`);
        } else {
          console.warn(`Template not found for ID: ${templateId}`);
        }
      }

      if (templateDetails.length === 0) {
        console.error(`No valid templates found for sample ${sampleId}`);
        return;
      }
      
      const sampleTemplateData: SampleTemplateData = {
        sampleId,
        selectedTemplateIds: templateIds,
        templateDetails,
        timestamp: new Date().toISOString()
      };

      this.sampleTemplateCache.set(sampleId, sampleTemplateData);
      console.log(`Template data saved for sample ${sampleId}:`, {
        templateCount: templateDetails.length,
        templateNames: templateDetails.map(t => t.nameEn)
      });
      
      // In a real app, this would persist to a database
      localStorage.setItem(`sample_templates_${sampleId}`, JSON.stringify(sampleTemplateData));
    } catch (error) {
      console.error("Failed to save sample templates:", error);
    }
  }

  // Retrieve template data for a sample
  getSampleTemplates(sampleId: string): SampleTemplateData | null {
    console.log(`Retrieving templates for sample ${sampleId}`);
    
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
            console.log(`Loaded template data from localStorage for sample ${sampleId}:`, {
              templateCount: sampleData.templateDetails.length,
              templateNames: sampleData.templateDetails.map(t => t.nameEn)
            });
          }
        } catch (error) {
          console.error("Failed to parse stored sample template data:", error);
        }
      }
    } else {
      console.log(`Found template data in cache for sample ${sampleId}:`, {
        templateCount: sampleData.templateDetails.length,
        templateNames: sampleData.templateDetails.map(t => t.nameEn)
      });
    }

    if (!sampleData) {
      console.log(`No template data found for sample ${sampleId}`);
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
      console.log(`Loading templates for test result creation for sample ${sampleId}`);
      
      const sampleTemplateData = this.getSampleTemplates(sampleId);
      
      if (!sampleTemplateData) {
        console.log(`No template data found for sample ${sampleId}`);
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

      console.log(`Successfully loaded templates for test result creation:`, {
        sampleId,
        templateIds: sampleTemplateData.selectedTemplateIds,
        templateCount: sampleTemplateData.templateDetails.length,
        formValueCount: formValues.length
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
    console.log(`Cleared template data for sample ${sampleId}`);
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
