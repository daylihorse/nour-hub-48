
export const requiredAnalysisOptions = [
  { id: "blood_count", label: "Blood Count", needsTube: true },
  { id: "biochemistry", label: "Biochemistry", needsTube: true },
  { id: "serology", label: "Serology", needsTube: true },
  { id: "microbiology", label: "Microbiology", needsTube: false },
  { id: "parasitology", label: "Parasitology", needsTube: false },
  { id: "toxicology", label: "Toxicology", needsTube: true },
  { id: "genetics", label: "Genetics", needsTube: true },
  { id: "hormones", label: "Hormones", needsTube: true }
];

export const rejectionReasonOptions = [
  "Insufficient sample volume",
  "Hemolyzed sample",
  "Clotted sample",
  "Contaminated sample",
  "Incorrect tube type",
  "Sample deteriorated",
  "Labeling error"
];
