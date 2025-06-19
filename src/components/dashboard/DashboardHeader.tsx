
import React from "react";
import AlertsButton from "@/components/common/AlertsButton";
import ModuleStatusButton from "@/components/common/ModuleStatusButton";

interface DashboardHeaderProps {
  totalAlerts: number;
  activeModuleCount: number;
  totalModuleCount: number;
  onAlertsClick?: () => void;
  onModulesClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  totalAlerts,
  activeModuleCount,
  totalModuleCount,
  onAlertsClick,
  onModulesClick
}) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-2xl font-bold text-brown-900">Module Access Center</h2>
        <p className="text-brown-600">Manage your organization with powerful integrated modules</p>
      </div>
      <div className="flex gap-3">
        <ModuleStatusButton 
          activeCount={activeModuleCount}
          totalCount={totalModuleCount}
          onClick={onModulesClick}
        />
        <AlertsButton 
          totalAlerts={totalAlerts}
          onClick={onAlertsClick}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
