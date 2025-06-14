
import { 
  BarChart3, 
  Heart, 
  FileText, 
  Baby, 
  Activity, 
  Dna, 
  Calendar, 
  CircleDot, 
  BarChart3 as Analytics, 
  FolderOpen,
  Zap,
  FileCheck
} from "lucide-react";

export interface BreedingTab {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component?: React.ComponentType;
}

export const breedingTabsConfig: BreedingTab[] = [
  { value: "dashboard", label: "Dashboard", icon: BarChart3 },
  { value: "stallions", label: "Stallions", icon: Zap },
  { value: "mares", label: "Mares", icon: Heart },
  { value: "breeding", label: "Records", icon: FileText },
  { value: "pregnancies", label: "Pregnancies", icon: Baby },
  { value: "foaling", label: "Foaling", icon: Activity },
  { value: "genetics", label: "Genetics", icon: Dna },
  { value: "planning", label: "Planning", icon: Calendar },
  { value: "contracts", label: "Contracts", icon: FileCheck },
  { value: "cycles", label: "Heat Cycles", icon: CircleDot },
  { value: "analytics", label: "Analytics", icon: Analytics },
  { value: "documents", label: "Documents", icon: FolderOpen }
];
