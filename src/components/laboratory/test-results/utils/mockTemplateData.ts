
import { templateSyncManager } from "@/utils/templateSync";

// Mock template associations for existing samples
const mockSampleTemplateAssociations = {
  "S004": ["1", "2"], // Lightning - Blood Chemistry + CBC
  "S005": ["3"], // Spirit - Hormone Panel  
  "S006": ["4"] // Midnight - Parasite Screen
};

export const initializeMockTemplateData = async () => {
  console.log("Initializing mock template data for existing samples...");
  
  // Check if data is already initialized
  const existingData = localStorage.getItem('mock_templates_initialized');
  if (existingData) {
    console.log("Mock template data already initialized");
    return;
  }

  // Initialize template data for each mock sample
  for (const [sampleId, templateIds] of Object.entries(mockSampleTemplateAssociations)) {
    try {
      await templateSyncManager.saveSampleTemplates(sampleId, templateIds);
      console.log(`Initialized template data for sample ${sampleId} with templates:`, templateIds);
    } catch (error) {
      console.error(`Failed to initialize template data for sample ${sampleId}:`, error);
    }
  }

  // Mark as initialized
  localStorage.setItem('mock_templates_initialized', 'true');
  console.log("Mock template data initialization completed");
};

export const getMockSampleTemplates = (sampleId: string): string[] => {
  return mockSampleTemplateAssociations[sampleId as keyof typeof mockSampleTemplateAssociations] || [];
};
