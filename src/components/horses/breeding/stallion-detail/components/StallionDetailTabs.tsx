
import { 
  SmartTabs, 
  SmartTabsContent, 
  SmartTabsList, 
  SmartTabsTrigger 
} from "@/components/ui/smart-tabs";
import CollectedSemenTab from "./tabs/CollectedSemenTab";
import FrozenSemenInventoryTab from "./tabs/FrozenSemenInventoryTab";
import FrozenEmbryoInventoryTab from "./tabs/FrozenEmbryoInventoryTab";
import EnhancedBreedingRecordTab from "./tabs/EnhancedBreedingRecordTab";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";

interface StallionDetailTabsProps {
  stallionId: string;
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  onActionClick: (action: string, title: string, data?: any) => void;
}

const StallionDetailTabs = ({ 
  stallionId, 
  activeTab, 
  onActiveTabChange, 
  onActionClick 
}: StallionDetailTabsProps) => {
  return (
    <SmartTabs value={activeTab} onValueChange={onActiveTabChange} className="w-full" maxTabsForRegular={4}>
      <SmartTabsList className="mb-8">
        <SmartTabsTrigger value="collected-semen">
          Collected Semen
        </SmartTabsTrigger>
        <SmartTabsTrigger value="frozen-semen">
          Frozen Semen
        </SmartTabsTrigger>
        <SmartTabsTrigger value="frozen-embryo">
          Frozen Embryo
        </SmartTabsTrigger>
        <SmartTabsTrigger value="breeding-record">
          Breeding Record
        </SmartTabsTrigger>
        <SmartTabsTrigger value="training">
          Training
        </SmartTabsTrigger>
        <SmartTabsTrigger value="health">
          Health Records
        </SmartTabsTrigger>
        <SmartTabsTrigger value="performance">
          Performance
        </SmartTabsTrigger>
      </SmartTabsList>
      
      <SmartTabsContent value="collected-semen" className="mt-8">
        <CollectedSemenTab stallionId={stallionId} onActionClick={onActionClick} />
      </SmartTabsContent>
      
      <SmartTabsContent value="frozen-semen" className="mt-8">
        <FrozenSemenInventoryTab stallionId={stallionId} />
      </SmartTabsContent>
      
      <SmartTabsContent value="frozen-embryo" className="mt-8">
        <FrozenEmbryoInventoryTab stallionId={stallionId} />
      </SmartTabsContent>
      
      <SmartTabsContent value="breeding-record" className="mt-8">
        <EnhancedBreedingRecordTab stallionId={stallionId} onActionClick={onActionClick} />
      </SmartTabsContent>
      
      <SmartTabsContent value="training" className="mt-8">
        <TrainingRecords horseId={stallionId} />
      </SmartTabsContent>
      
      <SmartTabsContent value="health" className="mt-8">
        <HealthRecords horseId={stallionId} />
      </SmartTabsContent>
      
      <SmartTabsContent value="performance" className="mt-8">
        <PerformanceRecords horseId={stallionId} />
      </SmartTabsContent>
    </SmartTabs>
  );
};

export default StallionDetailTabs;
