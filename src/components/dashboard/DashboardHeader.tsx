
import React from "react";
import AlertsButton from "@/components/common/AlertsButton";
import ModuleStatusButton from "@/components/common/ModuleStatusButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className={`flex justify-between items-start ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className={isRTL ? 'text-right' : 'text-left'}>
        <h2 className="text-2xl font-bold text-brown-900">{t('dashboard.title')}</h2>
        <p className="text-brown-600">{t('dashboard.subtitle')}</p>
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
