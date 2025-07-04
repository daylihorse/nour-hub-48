
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MareHeatCycleTracking from "../cycles/MareHeatCycleTracking";
import PregnancyManagement from "../PregnancyManagement";
import FrozenEmbryoManagement from "./FrozenEmbryoManagement";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

interface MareManagementTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  maresContent: React.ReactNode;
}

const MareManagementTabs = ({ activeTab, onTabChange, maresContent }: MareManagementTabsProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-purple-50 border border-purple-200 p-1 h-12">
          <TabsTrigger 
            value="mares" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.mares')}
          </TabsTrigger>
          <TabsTrigger 
            value="pregnancy" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.pregnancy')}
          </TabsTrigger>
          <TabsTrigger 
            value="frozen-embryo" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.frozenEmbryo')}
          </TabsTrigger>
          <TabsTrigger 
            value="heat-cycles" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.heatCycles')}
          </TabsTrigger>
          <TabsTrigger 
            value="training" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('navigation.training')}
          </TabsTrigger>
          <TabsTrigger 
            value="health" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('navigation.health')}
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('navigation.performance')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mares" className="mt-6">
          {maresContent}
        </TabsContent>
        
        <TabsContent value="pregnancy" className="mt-6">
          <PregnancyManagement />
        </TabsContent>
        
        <TabsContent value="frozen-embryo" className="mt-6">
          <FrozenEmbryoManagement />
        </TabsContent>
        
        <TabsContent value="heat-cycles" className="mt-6">
          <MareHeatCycleTracking />
        </TabsContent>
        
        <TabsContent value="training" className="mt-6">
          <TrainingRecords />
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <HealthRecords />
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <PerformanceRecords />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MareManagementTabs;
