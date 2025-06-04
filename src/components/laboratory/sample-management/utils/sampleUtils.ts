
import { EnhancedSample } from "./enhancedMockData";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateProcessingTime = (collectionDate: string, completionDate?: string): string => {
  if (!completionDate) return "In progress";
  
  const start = new Date(collectionDate);
  const end = new Date(completionDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return "1 day";
  return `${diffDays} days`;
};

export const getSampleProgress = (sample: EnhancedSample): number => {
  switch (sample.status) {
    case "collected": return 25;
    case "processing": return 50;
    case "completed": return 100;
    case "rejected": return 0;
    default: return 0;
  }
};

export const getNextAction = (sample: EnhancedSample): string => {
  switch (sample.status) {
    case "collected": return "Begin processing";
    case "processing": return "Complete analysis";
    case "completed": return "Review results";
    case "rejected": return "Request new sample";
    default: return "No action needed";
  }
};

export const validateSampleData = (sample: Partial<EnhancedSample>): string[] => {
  const errors: string[] = [];
  
  if (!sample.horseName) errors.push("Horse selection is required");
  if (!sample.sampleType) errors.push("Sample type is required");
  if (!sample.collectionDate) errors.push("Collection date is required");
  if (!sample.collectedBy) errors.push("Collector information is required");
  if (!sample.requiredAnalysis || sample.requiredAnalysis.length === 0) {
    errors.push("At least one analysis must be selected");
  }
  if (!sample.priority) errors.push("Priority level is required");
  
  return errors;
};

export const exportSampleData = (samples: EnhancedSample[]): string => {
  const headers = [
    "Sample ID",
    "Horse Name", 
    "Sample Type",
    "Collection Date",
    "Collected By",
    "Status",
    "Priority",
    "Person Who Brought",
    "Required Analysis",
    "Notes"
  ];
  
  const csvContent = [
    headers.join(","),
    ...samples.map(sample => [
      sample.id,
      sample.horseName,
      sample.sampleType,
      sample.collectionDate,
      sample.collectedBy,
      sample.status,
      sample.priority,
      sample.personWhoBrought,
      `"${sample.requiredAnalysis.join("; ")}"`,
      `"${sample.notes || ""}"`
    ].join(","))
  ].join("\n");
  
  return csvContent;
};

export const getSampleSummary = (samples: EnhancedSample[]) => {
  const total = samples.length;
  const byStatus = samples.reduce((acc, sample) => {
    acc[sample.status] = (acc[sample.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byPriority = samples.reduce((acc, sample) => {
    acc[sample.priority] = (acc[sample.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total,
    byStatus,
    byPriority,
    averageProcessingTime: samples
      .filter(s => s.completionDate)
      .reduce((acc, s) => acc + parseInt(calculateProcessingTime(s.collectionDate, s.completionDate)), 0) / 
      samples.filter(s => s.completionDate).length || 0
  };
};
