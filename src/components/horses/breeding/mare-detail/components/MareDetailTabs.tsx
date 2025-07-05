
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MareHeatCycleTracking from "../../cycles/MareHeatCycleTracking";
import PregnancyManagement from "../../PregnancyManagement";
import MareFrozenEmbryoInventoryTab from "./tabs/MareFrozenEmbryoInventoryTab";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";
import MareBasicInfoTable from "../tables/MareBasicInfoTable";
import MareBreedingHistoryTable from "../tables/MareBreedingHistoryTable";
import MarePregnancyTable from "../tables/MarePregnancyTable";
import MareFoalingHistoryTable from "../tables/MareFoalingHistoryTable";

interface MareDetailTabsProps {
  mareId: string;
  activeTab: string;
  viewMode: 'grid' | 'list' | 'table';
  onActiveTabChange: (tab: string) => void;
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (action: string, title: string, data?: any) => void;
}

const MareDetailTabs = ({ 
  mareId, 
  activeTab, 
  viewMode,
  onActiveTabChange,
  onViewModeChange,
  onActionClick 
}: MareDetailTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onActiveTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-7 bg-purple-50 border border-purple-200 p-1 h-12">
        <TabsTrigger 
          value="basic-info" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Basic Info
        </TabsTrigger>
        <TabsTrigger 
          value="breeding-history" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Breeding History
        </TabsTrigger>
        <TabsTrigger 
          value="pregnancy" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Pregnancy
        </TabsTrigger>
        <TabsTrigger 
          value="foaling-history" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Foaling History
        </TabsTrigger>
        <TabsTrigger 
          value="frozen-embryos" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Frozen Embryos
        </TabsTrigger>
        <TabsTrigger 
          value="training" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Training
        </TabsTrigger>
        <TabsTrigger 
          value="health" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Health Records
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic-info" className="mt-6">
        <MareBasicInfoTable mareId={mareId} />
      </TabsContent>
      
      <TabsContent value="breeding-history" className="mt-6">
        <MareBreedingHistoryTable 
          mareId={mareId} 
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </TabsContent>
      
      <TabsContent value="pregnancy" className="mt-6">
        <MarePregnancyTable 
          mareId={mareId}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </TabsContent>
      
      <TabsContent value="foaling-history" className="mt-6">
        <MareFoalingHistoryTable 
          mareId={mareId}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </TabsContent>
      
      <TabsContent value="frozen-embryos" className="mt-6">
        <MareFrozenEmbryoInventoryTab mareId={mareId} />
      </TabsContent>
      
      <TabsContent value="training" className="mt-6">
        <TrainingRecords horseId={mareId} />
      </TabsContent>
      
      <TabsContent value="health" className="mt-6">
        <HealthRecords horseId={mareId} />
      </TabsContent>
    </Tabs>
  );
};

export default MareDetailTabs;
