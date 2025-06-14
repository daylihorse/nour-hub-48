

export const frozenSemenQualityOptions = [
  { value: "Grade A", label: "Grade A" },
  { value: "Grade B", label: "Grade B" },
  { value: "Grade C", label: "Grade C" }
];

export const collectedSemenStatusOptions = [
  { value: "Fresh", label: "Fresh" },
  { value: "Used", label: "Used" },
  { value: "Expired", label: "Expired" },
  { value: "Reserved", label: "Reserved" }
];

export const frozenEmbryoGradeOptions = [
  { value: "Grade 1", label: "Grade 1" },
  { value: "Grade 2", label: "Grade 2" },
  { value: "Grade 3", label: "Grade 3" },
  { value: "Grade 4", label: "Grade 4" }
];

export const frozenEmbryoStageOptions = [
  { value: "Blastocyst", label: "Blastocyst" },
  { value: "Expanded Blastocyst", label: "Expanded Blastocyst" },
  { value: "Hatching Blastocyst", label: "Hatching Blastocyst" },
  { value: "Hatched Blastocyst", label: "Hatched Blastocyst" }
];

// Aliases for embryo form compatibility
export const embryoGradeOptions = frozenEmbryoGradeOptions;
export const embryoStageOptions = frozenEmbryoStageOptions;

// Additional options for breeding record forms
export const breedingMethodOptions = [
  { value: "natural", label: "Natural Cover" },
  { value: "artificial_insemination", label: "Artificial Insemination" },
  { value: "embryo_transfer", label: "Embryo Transfer" }
];

export const breedingResultOptions = [
  { value: "successful", label: "Successful" },
  { value: "unsuccessful", label: "Unsuccessful" },
  { value: "pending", label: "Pending" }
];

export const breedingStatusOptions = [
  { value: "planned", label: "Planned" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" }
];

// Additional options for collected semen forms
export const qualityOptions = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" }
];

export const statusOptions = [
  { value: "fresh", label: "Fresh" },
  { value: "frozen", label: "Frozen" },
  { value: "used", label: "Used" },
  { value: "expired", label: "Expired" }
];

