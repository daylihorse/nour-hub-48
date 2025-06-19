
import React from "react";
import { ModuleTabConfig } from "@/components/common/ModuleTabs";
import EnhancedDepartmentGrid from "./EnhancedDepartmentGrid";
import HorseModuleAccessCenter from "@/components/horses/HorseModuleAccessCenter";
import PaddockModuleAccessCenter from "@/components/paddocks/PaddockModuleAccessCenter";
import LaboratoryModuleAccessCenter from "@/components/laboratory/LaboratoryModuleAccessCenter";
import ClinicModuleAccessCenter from "@/components/clinic/ClinicModuleAccessCenter";
import PharmacyModuleAccessCenter from "@/components/pharmacy/PharmacyModuleAccessCenter";
import FinanceModuleAccessCenter from "@/components/finance/FinanceModuleAccessCenter";
import InventoryModuleAccessCenter from "@/components/inventory/InventoryModuleAccessCenter";
import HRModuleAccessCenter from "@/components/hr/HRModuleAccessCenter";
import MovementModuleAccessCenter from "@/components/movements/MovementModuleAccessCenter";
import TrainingModuleAccessCenter from "@/components/training/TrainingModuleAccessCenter";
import RidingReservationsModuleAccessCenter from "@/components/riding-reservations/RidingReservationsModuleAccessCenter";
import StableRoomsModuleAccessCenter from "@/components/stable-rooms/StableRoomsModuleAccessCenter";
import { 
  Home, 
  Users, 
  Building2, 
  FlaskConical, 
  Stethoscope, 
  Pill, 
  DollarSign, 
  Package, 
  TruckIcon, 
  GraduationCap, 
  Rabbit, 
  Building 
} from "lucide-react";

export const createDashboardModuleTabs = (): ModuleTabConfig[] => [
  {
    value: "all",
    label: "All Modules",
    icon: Home,
    content: <EnhancedDepartmentGrid />
  },
  {
    value: "horse",
    label: "Horse Module",
    icon: Users,
    content: <HorseModuleAccessCenter />
  },
  {
    value: "paddock",
    label: "Paddock Module", 
    icon: Building2,
    content: <PaddockModuleAccessCenter />
  },
  {
    value: "lab",
    label: "Lab Module",
    icon: FlaskConical,
    content: <LaboratoryModuleAccessCenter />
  },
  {
    value: "clinic",
    label: "Clinic Module",
    icon: Stethoscope,
    content: <ClinicModuleAccessCenter />
  },
  {
    value: "pharmacy",
    label: "Pharmacy Module",
    icon: Pill,
    content: <PharmacyModuleAccessCenter />
  },
  {
    value: "finance",
    label: "Finance Module",
    icon: DollarSign,
    content: <FinanceModuleAccessCenter />
  },
  {
    value: "inventory",
    label: "Inventory Module",
    icon: Package,
    content: <InventoryModuleAccessCenter />
  },
  {
    value: "hr",
    label: "HR Module",
    icon: Users,
    content: <HRModuleAccessCenter />
  },
  {
    value: "movement",
    label: "Movement Module",
    icon: TruckIcon,
    content: <MovementModuleAccessCenter />
  },
  {
    value: "training",
    label: "Training Module",
    icon: GraduationCap,
    content: <TrainingModuleAccessCenter />
  },
  {
    value: "riding-reservations",
    label: "Riding Reservations",
    icon: Rabbit,
    content: <RidingReservationsModuleAccessCenter />
  },
  {
    value: "stable-rooms",
    label: "Stable Rooms",
    icon: Building,
    content: <StableRoomsModuleAccessCenter />
  }
];
