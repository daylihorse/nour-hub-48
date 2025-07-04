
import { 
  ScrollableTabs, 
  ScrollableTabsList, 
  ScrollableTabsTrigger, 
  ScrollableTabsContent 
} from "@/components/ui/scrollable-tabs";
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

interface ScrollableHorseDetailTabsProps {
  mareId: string;
  activeTab: string;
  viewMode: 'grid' | 'list' | 'table';
  onActiveTabChange: (tab: string) => void;
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const ScrollableHorseDetailTabs = ({ 
  mareId, 
  activeTab, 
  viewMode, 
  onActiveTabChange, 
  onViewModeChange, 
  onActionClick 
}: ScrollableHorseDetailTabsProps) => {
  return (
    <ScrollableTabs value={activeTab} onValueChange={onActiveTabChange} className="w-full">
      <ScrollableTabsList className="mb-6">
        <ScrollableTabsTrigger value="basic-info">
          Basic Info
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="breeding-history">
          Breeding History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="pregnancy">
          Pregnancy
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="foaling">
          Foaling History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="frozen-embryo">
          Frozen Embryos
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="health">
          Health Records
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="heat-cycle">
          Heat Cycles
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="training">
          Training
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="health-extended">
          Medical History
        </ScrollableTabsTrigger>
        <ScrollableTabsTrigger value="performance">
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

export default ScrollableHorseDetailTabs;
