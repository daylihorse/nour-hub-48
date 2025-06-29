
import React, { useState } from "react";
import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickStatsGrid from "@/components/dashboard/QuickStatsGrid";
import EnhancedSubscriptionTierInfo from "@/components/dashboard/EnhancedSubscriptionTierInfo";
import EnhancedFeatureMatrix from "@/components/dashboard/EnhancedFeatureMatrix";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ModuleTabs from "@/components/common/ModuleTabs";
import { createDashboardModuleTabs } from "@/components/dashboard/DashboardModuleTabs";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import { useDashboardAlerts } from "@/hooks/useDashboardAlerts";

const Dashboard = () => {
  const { getEnabledFeatures, getAvailableFeatures } = useTenantFeatures();
  const { totalAlerts } = useDashboardAlerts();
  const [activeTab, setActiveTab] = useState("all");

  const enabledFeatures = getEnabledFeatures();
  const availableFeatures = getAvailableFeatures();
  const activeModuleCount = enabledFeatures.length;
  const totalModuleCount = availableFeatures.length;

  const moduleTabs = createDashboardModuleTabs();

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
        <DashboardHeader 
          totalAlerts={totalAlerts}
          activeModuleCount={activeModuleCount}
          totalModuleCount={totalModuleCount}
        />

        <ModuleTabs 
          tabs={moduleTabs}
          defaultValue={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default Dashboard;
