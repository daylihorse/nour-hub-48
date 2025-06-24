
// This file now serves as fallback data and utility functions
// The actual data comes from the database via the laboratory service

export const getHorseName = (horseId: string): string => {
  const horseNames: { [key: string]: string } = {
    "H001": "Thunder",
    "H002": "Lightning",
    "H003": "Storm",
    "H004": "Blaze",
    "H005": "Shadow"
  };
  return horseNames[horseId] || "Unknown Horse";
};

export const getPreviousSamples = (horseId: string) => {
  // This would typically come from the database
  // For now, return empty array as samples will be fetched from DB
  return [];
};

// Legacy mock data - kept for reference but not used
export const mockAnalysisTypes = [
  {
    id: "blood_chemistry",
    name: "Blood Chemistry Panel",
    category: "Clinical Chemistry",
    description: "Complete metabolic panel including liver and kidney function",
    tubes: [
      { type: "Red Top (Serum)", required: true },
      { type: "Purple Top (EDTA)", required: false }
    ]
  },
  {
    id: "cbc",
    name: "Complete Blood Count",
    category: "Hematology", 
    description: "Full blood count with differential",
    tubes: [
      { type: "Purple Top (EDTA)", required: true }
    ]
  },
  {
    id: "hormone_panel",
    name: "Hormone Panel",
    category: "Endocrinology",
    description: "Thyroid and reproductive hormones",
    tubes: [
      { type: "Red Top (Serum)", required: true },
      { type: "Gray Top (Fluoride)", required: false }
    ]
  }
];
