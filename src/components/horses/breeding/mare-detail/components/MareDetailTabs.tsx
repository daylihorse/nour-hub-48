
import { ScrollableTabs, ScrollableTabsList, ScrollableTabsTrigger, ScrollableTabsContent } from "@/components/ui/scrollable-tabs";
import MareBasicInfoTable from "../tables/MareBasicInfoTable";
import MareBreedingHistoryTable from "../tables/MareBreedingHistoryTable";
import MarePregnancyTable from "../tables/MarePregnancyTable";
import MareFoalingHistoryTable from "../tables/MareFoalingHistoryTable";
import MareHealthRecordsTable from "../tables/MareHealthRecordsTable";
import MareHeatCycleTable from "../tables/MareHeatCycleTable";
import MareFrozenEmbryoInventoryTab from "./tabs/MareFrozenEmbryoInventoryTab";
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
    <ScrollableTabs value={activeTab} onValueChange={onActiveTabChange} className="w-full">
      <ScrollableTabsList className="bg-brown-50 p-1 h-12 border border-brown-200">
        <ScrollableTabsTrigger 
          value="basic-info"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Basic Info
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="breeding-history"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Breeding History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="pregnancy"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Pregnancy
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="foaling"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Foaling History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="frozen-embryo"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Frozen Embryos
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="health"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Health Records
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="heat-cycle"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Heat Cycles
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="training"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Training
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="health-extended"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Medical History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="performance"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brown-200 font-medium transition-all"
        >
          Performance
        </ScrollableTabsTrigger>
      </ScrollableTabsList>

      <ScrollableTabsContent value="basic-info">
        <MareBasicInfoTable mareId={mareId} viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="breeding-history">
        <MareBreedingHistoryTable 
          mareId={mareId} 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="pregnancy">
        <MarePregnancyTable 
          mareId={mareId} 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="foaling">
        <MareFoalingHistoryTable 
          mareId={mareId} 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="frozen-embryo">
        <MareFrozenEmbryoInventoryTab mareId={mareId} />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="health">
        <MareHealthRecordsTable 
          mareId={mareId} 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="heat-cycle">
        <MareHeatCycleTable 
          mareId={mareId} 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          onActionClick={onActionClick}
        />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="training">
        <TrainingRecords horseId={mareId} />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="health-extended">
        <HealthRecords horseId={mareId} />
      </ScrollableTabsContent>

      <ScrollableTabsContent value="performance">
        <PerformanceRecords horseId={mareId} />
      </ScrollableTabsContent>
    </ScrollableTabs>
  );
};

export default MareDetailTabs;
