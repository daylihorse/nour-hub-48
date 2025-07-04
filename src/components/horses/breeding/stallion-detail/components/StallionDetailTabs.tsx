
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Tabs value={activeTab} onValueChange={onActiveTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-7 bg-blue-50 border border-blue-200 p-1 h-12">
        <TabsTrigger 
          value="collected-semen" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Collected Semen
        </TabsTrigger>
        <TabsTrigger 
          value="frozen-semen" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Frozen Semen
        </TabsTrigger>
        <TabsTrigger 
          value="frozen-embryo" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Frozen Embryo
        </TabsTrigger>
        <TabsTrigger 
          value="breeding-record" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Breeding Record
        </TabsTrigger>
        <TabsTrigger 
          value="training" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Training
        </TabsTrigger>
        <TabsTrigger 
          value="health" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Health Records
        </TabsTrigger>
        <TabsTrigger 
          value="performance" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Performance
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="collected-semen" className="mt-6">
        <CollectedSemenTab stallionId={stallionId} onActionClick={onActionClick} />
      </TabsContent>
      
      <TabsContent value="frozen-semen" className="mt-6">
        <FrozenSemenInventoryTab stallionId={stallionId} />
      </TabsContent>
      
      <TabsContent value="frozen-embryo" className="mt-6">
        <FrozenEmbryoInventoryTab stallionId={stallionId} />
      </TabsContent>
      
      <TabsContent value="breeding-record" className="mt-6">
        <EnhancedBreedingRecordTab stallionId={stallionId} onActionClick={onActionClick} />
      </TabsContent>
      
      <TabsContent value="training" className="mt-6">
        <TrainingRecords horseId={stallionId} />
      </TabsContent>
      
      <TabsContent value="health" className="mt-6">
        <HealthRecords horseId={stallionId} />
      </TabsContent>
      
      <TabsContent value="performance" className="mt-6">
        <PerformanceRecords horseId={stallionId} />
      </TabsContent>
    </Tabs>
  );
};

export default StallionDetailTabs;
