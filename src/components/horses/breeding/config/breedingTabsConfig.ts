
export interface BreedingTab {
  value: string;
  label: string;
  component: React.ComponentType;
}

export const breedingTabsConfig = [
  { value: "dashboard", label: "Overview" },
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
