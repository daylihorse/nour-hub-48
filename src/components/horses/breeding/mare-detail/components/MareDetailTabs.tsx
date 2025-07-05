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
      <ScrollableTabsList className="bg-brown-50 p-2 h-16 border-2 border-brown-300 shadow-brown-lg">
        <ScrollableTabsTrigger 
          value="basic-info"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Basic Info
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="breeding-history"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Breeding History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="pregnancy"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Pregnancy
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="foaling"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Foaling History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="frozen-embryo"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Frozen Embryos
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="health"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Health Records
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="heat-cycle"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Heat Cycles
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="training"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Training
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="health-extended"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
        >
          Medical History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger 
          value="performance"
          className="text-brown-700 data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-brown data-[state=active]:border-2 data-[state=active]:border-brown-300 font-bold text-base px-6 py-3 transition-all hover:bg-brown-100"
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
