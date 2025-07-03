
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MareBasicInfoTable from "../tables/MareBasicInfoTable";
import MareBreedingHistoryTable from "../tables/MareBreedingHistoryTable";
import MarePregnancyTable from "../tables/MarePregnancyTable";
import MareFoalingHistoryTable from "../tables/MareFoalingHistoryTable";
import MareHealthRecordsTable from "../tables/MareHealthRecordsTable";
import MareHeatCycleTable from "../tables/MareHeatCycleTable";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";

interface MareDetailTabsProps {
  mareId: string;
  activeTab: string;
  viewMode: 'grid' | 'list' | 'table';
  onActiveTabChange: (tab: string) => void;
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
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
      <TabsList className="grid w-full grid-cols-9 bg-slate-100 p-1 h-12">
        <TabsTrigger 
          value="basic-info"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Basic Info
        </TabsTrigger>
        <TabsTrigger 
          value="breeding-history"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Breeding History
        </TabsTrigger>
        <TabsTrigger 
          value="pregnancy"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Pregnancy
        </TabsTrigger>
        <TabsTrigger 
          value="foaling"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Foaling History
        </TabsTrigger>
        <TabsTrigger 
          value="health"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Health Records
        </TabsTrigger>
        <TabsTrigger 
          value="heat-cycle"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Heat Cycles
        </TabsTrigger>
        <TabsTrigger 
          value="training"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Training
        </TabsTrigger>
        <TabsTrigger 
          value="health-extended"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Medical History
        </TabsTrigger>
        <TabsTrigger 
          value="performance"
          className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
        >
          Performance
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic-info" className="mt-6">
        <MareBasicInfoTable mareId={mareId} viewMode={viewMode} onViewModeChange={onViewModeChange} />
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

      <TabsContent value="foaling" className="mt-6">
        <MareFoalingHistoryTable 
          mareId={mareId} 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </TabsContent>

      <TabsContent value="health" className="mt-6">
        <MareHealthRecordsTable 
          mareId={mareId} 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </TabsContent>

      <TabsContent value="heat-cycle" className="mt-6">
        <MareHeatCycleTable 
          mareId={mareId} 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </TabsContent>

      <TabsContent value="training" className="mt-6">
        <TrainingRecords horseId={mareId} />
      </TabsContent>

      <TabsContent value="health-extended" className="mt-6">
        <HealthRecords horseId={mareId} />
      </TabsContent>

      <TabsContent value="performance" className="mt-6">
        <PerformanceRecords horseId={mareId} />
      </TabsContent>
    </Tabs>
  );
};

export default MareDetailTabs;
