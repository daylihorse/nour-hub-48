
export interface BreedingTab {
  value: string;
  label: string;
  component: React.ComponentType;
}

export const breedingTabsConfig = [
  { value: "dashboard", label: "Dashboard" },
  { value: "stallions", label: "Stallions" },
  { value: "mares", label: "Mares" },
  { value: "breeding", label: "Records" },
  { value: "pregnancies", label: "Pregnancies" },
  { value: "foaling", label: "Foaling" },
  { value: "genetics", label: "Genetics" },
  { value: "planning", label: "Planning" },
  { value: "contracts", label: "Contracts" },
  { value: "cycles", label: "Heat Cycles" },
  { value: "analytics", label: "Analytics" },
  { value: "documents", label: "Documents" }
];
