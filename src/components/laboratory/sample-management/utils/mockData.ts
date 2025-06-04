
export const mockPreviousSamples = {
  "thunder": [
    {
      id: "S001",
      collectionDate: "2024-05-15",
      analysis: ["Blood Chemistry", "CBC"],
      status: "completed",
      priority: "routine",
      notes: "Regular health check"
    },
    {
      id: "S005",
      collectionDate: "2024-05-28",
      analysis: ["Hormone Panel"],
      status: "processing",
      priority: "urgent",
      notes: "Follow-up test for hormonal imbalance"
    }
  ],
  "bella": [
    {
      id: "S003",
      collectionDate: "2024-05-20",
      analysis: ["Parasite Screen"],
      status: "completed",
      priority: "routine",
      notes: "Routine parasite check"
    }
  ],
  "shadow": [],
  "storm": [
    {
      id: "S007",
      collectionDate: "2024-05-30",
      analysis: ["Blood Chemistry", "Liver Function"],
      status: "rejected",
      priority: "critical",
      notes: "Sample rejected due to hemolysis"
    }
  ],
  "flash": []
};

export const getHorseName = (selectedHorse: string): string => {
  const horseNames: { [key: string]: string } = {
    "thunder": "Thunder",
    "bella": "Bella",
    "shadow": "Shadow",
    "storm": "Storm",
    "flash": "Flash"
  };
  return horseNames[selectedHorse] || "";
};

export const getPreviousSamples = (selectedHorse: string) => {
  return selectedHorse ? (mockPreviousSamples[selectedHorse as keyof typeof mockPreviousSamples] || []) : [];
};
