
export const stallions = [
  { id: "S001", name: "Thunder" },
  { id: "S002", name: "Lightning" },
  { id: "S003", name: "Storm" },
];

export const mares = [
  { id: "M001", name: "Bella" },
  { id: "M002", name: "Luna" },
  { id: "M003", name: "Aurora" },
  { id: "M004", name: "Storm" },
];

export const veterinarians = [
  "Dr. Smith",
  "Dr. Johnson",
  "Dr. Brown",
  "Dr. Davis",
];

export const breedingMethods = [
  { value: "natural", label: "Natural" },
  { value: "artificial_insemination", label: "Artificial Insemination" },
  { value: "embryo_transfer", label: "Embryo Transfer" },
] as const;
