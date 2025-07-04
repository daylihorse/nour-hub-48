
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
    <SmartTabs value={activeTab} onValueChange={onActiveTabChange} className="w-full" maxTabsForRegular={5}>
      <SmartTabsList className="mb-6 bg-blue-50 border border-blue-200 p-1 h-12">
        <SmartTabsTrigger 
          value="collected-semen" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Collected Semen
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="frozen-semen" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Frozen Semen
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="frozen-embryo" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Frozen Embryo
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="breeding-record" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Breeding Record
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="training" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Training
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="health" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Health Records
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="performance" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Performance
        </SmartTabsTrigger>
      </SmartTabsList>
      
      <SmartTabsContent value="collected-semen" className="mt-6">
        <CollectedSemenTab stallionId={stallionId} onActionClick={onActionClick} />
      </SmartTabsContent>
      
      <SmartTabsContent value="frozen-semen" className="mt-6">
        <FrozenSemenInventoryTab stallionId={stallionId} />
      </SmartTabsContent>
      
      <SmartTabsContent value="frozen-embryo" className="mt-6">
        <FrozenEmbryoInventoryTab stallionId={stallionId} />
      </SmartTabsContent>
      
      <SmartTabsContent value="breeding-record" className="mt-6">
        <EnhancedBreedingRecordTab stallionId={stallionId} onActionClick={onActionClick} />
      </SmartTabsContent>
      
      <SmartTabsContent value="training" className="mt-6">
        <TrainingRecords horseId={stallionId} />
      </SmartTabsContent>
      
      <SmartTabsContent value="health" className="mt-6">
        <HealthRecords horseId={stallionId} />
      </SmartTabsContent>
      
      <SmartTabsContent value="performance" className="mt-6">
        <PerformanceRecords horseId={stallionId} />
      </SmartTabsContent>
    </SmartTabs>
  );
};

export default StallionDetailTabs;
