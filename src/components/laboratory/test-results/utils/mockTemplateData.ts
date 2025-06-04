
import { templateSyncManager } from "@/utils/templateSync";

// Mock template associations for existing samples - using correct template IDs
const mockSampleTemplateAssociations = {
  "S004": ["cbc-template", "chemistry-template"], // Lightning - Blood Chemistry + CBC
  "S005": ["hormone-template"], // Spirit - Hormone Panel  
  "S006": ["parasite-template"] // Midnight - Parasite Screen
};

export const initializeMockTemplateData = async () => {
  console.log("Initializing mock template data for existing samples...");
  
  // Check if data is already initialized with current version
  const currentVersion = "v2"; // Increment this to force re-initialization
  const existingData = localStorage.getItem('mock_templates_initialized');
  if (existingData === currentVersion) {
    console.log("Mock template data already initialized with current version");
    return;
  }

  // Clear any existing template data to ensure fresh initialization
  console.log("Clearing existing template data for fresh initialization...");
  Object.keys(mockSampleTemplateAssociations).forEach(sampleId => {
    templateSyncManager.clearSampleTemplates(sampleId);
  });

  // Initialize template data for each mock sample
  for (const [sampleId, templateIds] of Object.entries(mockSampleTemplateAssociations)) {
    try {
      console.log(`Initializing template data for sample ${sampleId} with template IDs:`, templateIds);
      await templateSyncManager.saveSampleTemplates(sampleId, templateIds);
      console.log(`Successfully initialized template data for sample ${sampleId}`);
    } catch (error) {
      console.error(`Failed to initialize template data for sample ${sampleId}:`, error);
    }
  }

  // Mark as initialized with current version
  localStorage.setItem('mock_templates_initialized', currentVersion);
  console.log("Mock template data initialization completed");
};

export const getMockSampleTemplates = (sampleId: string): string[] => {
  return mockSampleTemplateAssociations[sampleId as keyof typeof mockSampleTemplateAssociations] || [];
};
