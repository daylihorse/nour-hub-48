
export interface EnhancedSample {
  id: string;
  horseId: string;
  horseName: string;
  sampleType: string;
  collectionDate: string;
  collectedBy: string;
  status: 'collected' | 'processing' | 'completed' | 'rejected';
  priority: 'routine' | 'urgent' | 'critical';
  notes: string;
  personWhoBrought: string;
  sampleReceiptDate: string;
  requiredAnalysis: string[];
  tubeStatus: {[key: string]: string};
  rejectionReasons: {[key: string]: string};
  processingTime?: string;
  completionDate?: string;
  labTechnician?: string;
  results?: {[key: string]: any};
  templateIds?: string[]; // Added template association
}

export const enhancedMockSamples: EnhancedSample[] = [
  {
    id: "S001",
    horseId: "H001",
    horseName: "Thunder",
    sampleType: "Blood",
    collectionDate: "2024-06-01",
    collectedBy: "Dr. Smith",
    status: "completed",
    priority: "routine",
    notes: "Regular health check",
    personWhoBrought: "John Doe",
    sampleReceiptDate: "2024-06-01",
    requiredAnalysis: ["Blood Chemistry", "CBC"],
    tubeStatus: { "blood_chemistry": "yes", "cbc": "yes" },
    rejectionReasons: {},
    processingTime: "2 days",
    completionDate: "2024-06-03",
    labTechnician: "Sarah Wilson",
    results: { "glucose": "95 mg/dL", "hemoglobin": "12.5 g/dL" },
    templateIds: ["1", "2"]
  },
  {
    id: "S002",
    horseId: "H002",
    horseName: "Bella",
    sampleType: "Urine",
    collectionDate: "2024-06-02",
    collectedBy: "Dr. Johnson",
    status: "processing",
    priority: "urgent",
    notes: "Follow-up test for kidney function",
    personWhoBrought: "Jane Smith",
    sampleReceiptDate: "2024-06-02",
    requiredAnalysis: ["Urinalysis", "Protein Levels"],
    tubeStatus: { "urinalysis": "yes", "protein_levels": "yes" },
    rejectionReasons: {},
    processingTime: "1 day",
    labTechnician: "Mike Johnson",
    templateIds: ["3"]
  },
  {
    id: "S003",
    horseId: "H003",
    horseName: "Shadow",
    sampleType: "Fecal",
    collectionDate: "2024-06-03",
    collectedBy: "Dr. Brown",
    status: "completed",
    priority: "routine",
    notes: "Parasite screening",
    personWhoBrought: "David Brown",
    sampleReceiptDate: "2024-06-03",
    requiredAnalysis: ["Parasite Screen"],
    tubeStatus: { "parasite_screen": "yes" },
    rejectionReasons: {},
    processingTime: "3 days",
    completionDate: "2024-06-06",
    labTechnician: "Sarah Wilson",
    results: { "parasites": "None detected" },
    templateIds: ["4"]
  },
  {
    id: "S004",
    horseId: "H004",
    horseName: "Storm",
    sampleType: "Blood",
    collectionDate: "2024-06-04",
    collectedBy: "Dr. Miller",
    status: "rejected",
    priority: "critical",
    notes: "Emergency blood work - sample compromised",
    personWhoBrought: "Emergency Team",
    sampleReceiptDate: "2024-06-04",
    requiredAnalysis: ["Blood Chemistry", "Liver Function"],
    tubeStatus: { "blood_chemistry": "no", "liver_function": "no" },
    rejectionReasons: { "blood_chemistry": "Hemolysis detected", "liver_function": "Insufficient volume" },
    labTechnician: "Mike Johnson",
    templateIds: ["1", "5"]
  },
  {
    id: "S005",
    horseId: "H005",
    horseName: "Flash",
    sampleType: "Blood",
    collectionDate: "2024-06-05",
    collectedBy: "Dr. Davis",
    status: "collected",
    priority: "routine",
    notes: "Pre-competition screening",
    personWhoBrought: "Trainer Mike",
    sampleReceiptDate: "2024-06-05",
    requiredAnalysis: ["Drug Screen", "Performance Panel"],
    tubeStatus: { "drug_screen": "yes", "performance_panel": "yes" },
    rejectionReasons: {},
    labTechnician: "Sarah Wilson",
    templateIds: ["6", "7"]
  }
];

export const getEnhancedSamples = () => enhancedMockSamples;

export const getStatusColor = (status: string) => {
  const statusColors = {
    collected: "blue",
    processing: "yellow", 
    completed: "green",
    rejected: "red"
  };
  return statusColors[status as keyof typeof statusColors] || "gray";
};

export const getPriorityColor = (priority: string) => {
  const priorityColors = {
    routine: "gray",
    urgent: "orange",
    critical: "red"
  };
  return priorityColors[priority as keyof typeof priorityColors] || "gray";
};

export const formatAnalysisList = (analysis: string[]) => {
  if (analysis.length <= 2) {
    return analysis.join(", ");
  }
  return `${analysis.slice(0, 2).join(", ")} +${analysis.length - 2} more`;
};
