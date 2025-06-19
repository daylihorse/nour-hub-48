import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickStatsGrid from "@/components/dashboard/QuickStatsGrid";
import EnhancedSubscriptionTierInfo from "@/components/dashboard/EnhancedSubscriptionTierInfo";
import EnhancedFeatureMatrix from "@/components/dashboard/EnhancedFeatureMatrix";
import EnhancedDepartmentGrid from "@/components/dashboard/EnhancedDepartmentGrid";
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
import { Button } from "@/components/ui/button";
import { AlertTriangle, Settings, Home, Users, Building2, FlaskConical, Stethoscope, Pill, DollarSign, Package, TruckIcon, GraduationCap, Rabbit, Building } from "lucide-react";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { isFeatureEnabled, getEnabledFeatures, getAvailableFeatures } = useTenantFeatures();
  const [activeTab, setActiveTab] = useState<"all" | "horse" | "paddock" | "lab" | "clinic" | "pharmacy" | "finance" | "inventory" | "hr" | "movement" | "training" | "riding-reservations" | "stable-rooms">("all");

  // Calculate total alerts from available departments
  const departments = [
    { feature: "horses", alerts: 3 },
    { feature: null, alerts: 0 }, // clients
    { feature: "laboratory", alerts: 7 },
    { feature: "clinic", alerts: 2 },
    { feature: "pharmacy", alerts: 8 },
    { feature: "finance", alerts: 5 },
    { feature: "hr", alerts: 0 },
    { feature: "inventory", alerts: 8 },
    { feature: "marketplace", alerts: 0 },
    { feature: null, alerts: 4 }, // movements
    { feature: "training", alerts: 0 },
    { feature: "riding-reservations", alerts: 3 },
    { feature: "stable-rooms", alerts: 2 },
    { feature: "maintenance", alerts: 1 },
    { feature: "messages", alerts: 0 }
  ];

  const totalAlerts = departments
    .filter(dept => !dept.feature || isFeatureEnabled(dept.feature))
    .reduce((sum, dept) => sum + dept.alerts, 0);
    
  const enabledFeatures = getEnabledFeatures();
  const availableFeatures = getAvailableFeatures();
  const activeModuleCount = enabledFeatures.length;
  const totalModuleCount = availableFeatures.length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <DashboardHero />

      {/* Quick Stats */}
      <QuickStatsGrid />

      {/* Subscription and Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EnhancedSubscriptionTierInfo />
        <EnhancedFeatureMatrix />
      </div>

      {/* Modules Section */}
      <div className="space-y-6">
        {/* Header with Alerts */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-brown-900">Module Access Center</h2>
            <p className="text-brown-600">Manage your organization with powerful integrated modules</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 shadow-brown">
              <Settings className="h-4 w-4" />
              {activeModuleCount}/{totalModuleCount} Active Modules
            </Button>
            {totalAlerts > 0 && (
              <Button variant="destructive" className="flex items-center gap-2 shadow-brown">
                <AlertTriangle className="h-4 w-4" />
                {totalAlerts} Active Alerts
              </Button>
            )}
          </div>
        </div>

        {/* Scrollable Module Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "horse" | "paddock" | "lab" | "clinic" | "pharmacy" | "finance" | "inventory" | "hr" | "movement" | "training" | "riding-reservations" | "stable-rooms")}>
          <div className="overflow-x-auto">
            <TabsList className="grid w-max grid-cols-13 min-w-full">
              <TabsTrigger value="all" className="flex items-center gap-2 whitespace-nowrap">
                <Home className="h-4 w-4" />
                All Modules
              </TabsTrigger>
              <TabsTrigger value="horse" className="flex items-center gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                Horse Module
              </TabsTrigger>
              <TabsTrigger value="paddock" className="flex items-center gap-2 whitespace-nowrap">
                <Building2 className="h-4 w-4" />
                Paddock Module
              </TabsTrigger>
              <TabsTrigger value="lab" className="flex items-center gap-2 whitespace-nowrap">
                <FlaskConical className="h-4 w-4" />
                Lab Module
              </TabsTrigger>
              <TabsTrigger value="clinic" className="flex items-center gap-2 whitespace-nowrap">
                <Stethoscope className="h-4 w-4" />
                Clinic Module
              </TabsTrigger>
              <TabsTrigger value="pharmacy" className="flex items-center gap-2 whitespace-nowrap">
                <Pill className="h-4 w-4" />
                Pharmacy Module
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex items-center gap-2 whitespace-nowrap">
                <DollarSign className="h-4 w-4" />
                Finance Module
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-2 whitespace-nowrap">
                <Package className="h-4 w-4" />
                Inventory Module
              </TabsTrigger>
              <TabsTrigger value="hr" className="flex items-center gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                HR Module
              </TabsTrigger>
              <TabsTrigger value="movement" className="flex items-center gap-2 whitespace-nowrap">
                <TruckIcon className="h-4 w-4" />
                Movement Module
              </TabsTrigger>
              <TabsTrigger value="training" className="flex items-center gap-2 whitespace-nowrap">
                <GraduationCap className="h-4 w-4" />
                Training Module
              </TabsTrigger>
              <TabsTrigger value="riding-reservations" className="flex items-center gap-2 whitespace-nowrap">
                <Rabbit className="h-4 w-4" />
                Riding Reservations
              </TabsTrigger>
              <TabsTrigger value="stable-rooms" className="flex items-center gap-2 whitespace-nowrap">
                <Building className="h-4 w-4" />
                Stable Rooms
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            {/* Enhanced Department Grid */}
            <EnhancedDepartmentGrid />
          </TabsContent>
          
          <TabsContent value="horse">
            {/* Horse Module Management */}
            <HorseModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="paddock">
            {/* Paddock Module Management */}
            <PaddockModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="lab">
            {/* Laboratory Module Management */}
            <LaboratoryModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="clinic">
            {/* Clinic Module Management */}
            <ClinicModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="pharmacy">
            {/* Pharmacy Module Management */}
            <PharmacyModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="finance">
            {/* Finance Module Management */}
            <FinanceModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="inventory">
            {/* Inventory & Warehouse Module Management */}
            <InventoryModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="hr">
            {/* HR Module Management */}
            <HRModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="movement">
            {/* Horse Movement Module Management */}
            <MovementModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="training">
            {/* Training Center Module Management */}
            <TrainingModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="riding-reservations">
            {/* Riding Reservations Module Management */}
            <RidingReservationsModuleAccessCenter />
          </TabsContent>
          
          <TabsContent value="stable-rooms">
            {/* Stable Rooms Module Management */}
            <StableRoomsModuleAccessCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
