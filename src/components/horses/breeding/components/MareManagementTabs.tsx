
import { 
  ScrollableTabs, 
  ScrollableTabsList, 
  ScrollableTabsTrigger, 
  ScrollableTabsContent 
} from "@/components/ui/scrollable-tabs";
import MareHeatCycleTracking from "../cycles/MareHeatCycleTracking";
import PregnancyManagement from "../PregnancyManagement";
import MareFrozenEmbryoInventoryTab from "../mare-detail/components/tabs/MareFrozenEmbryoInventoryTab";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";

interface MareManagementTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  maresContent: React.ReactNode;
}

const MareManagementTabs = ({ activeTab, onTabChange, maresContent }: MareManagementTabsProps) => {
  return (
    <ScrollableTabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <ScrollableTabsList className="mb-6">
        <ScrollableTabsTrigger value="mares">
          Mares
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="pregnancy">
          Pregnancy
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="heat-cycles">
          Heat Cycles
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="frozen-embryos">
          Frozen Embryos
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="training">
          Training
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="health">
          Health Records
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="performance">
          Performance Records
        </ScrollableTabsTrigger>
      </ScrollableTabsList>
      
      <ScrollableTabsContent value="mares">
        {maresContent}
      </ScrollableTabsContent>
      
      <ScrollableTabsContent value="pregnancy">
        <PregnancyManagement />
      </ScrollableTabsContent>
      
      <ScrollableTabsContent value="heat-cycles">
        <MareHeatCycleTracking />
      </ScrollableTabsContent>
      
      <ScrollableTabsContent value="frozen-embryos">
        <MareFrozenEmbryoInventoryTab />
      </ScrollableTabsContent>
      
      <ScrollableTabsContent value="training">
        <TrainingRecords />
      </ScrollableTabsContent>
      
      <ScrollableTabsContent value="health">
        <HealthRecords />
      </ScrollableTabsContent>
      
      <ScrollableTabsContent value="performance">
        <PerformanceRecords />
      </ScrollableTabsContent>
    </ScrollableTabs>
  );
};

export default MareManagementTabs;
