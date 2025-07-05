
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";
import { HorseGender } from "@/types/horse-unified";

// Import breeding-specific tabs
import CollectedSemenTab from "@/components/horses/breeding/stallion-detail/components/tabs/CollectedSemenTab";
import FrozenSemenInventoryTab from "@/components/horses/breeding/stallion-detail/components/tabs/FrozenSemenInventoryTab";
import FrozenEmbryoInventoryTab from "@/components/horses/breeding/stallion-detail/components/tabs/FrozenEmbryoInventoryTab";
import EnhancedBreedingRecordTab from "@/components/horses/breeding/stallion-detail/components/tabs/EnhancedBreedingRecordTab";
import MareHeatCycleTracking from "@/components/horses/breeding/cycles/MareHeatCycleTracking";
import PregnancyManagement from "@/components/horses/breeding/PregnancyManagement";
import MareFrozenEmbryoInventoryTab from "@/components/horses/breeding/mare-detail/components/tabs/MareFrozenEmbryoInventoryTab";
import GeldingCompetitionHistory from "@/components/horses/breeding/components/GeldingCompetitionHistory";

interface DynamicHorseDetailTabsProps {
  horseId: string;
  horseGender: HorseGender;
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  onActionClick?: (action: string, title: string, data?: any) => void;
}

const DynamicHorseDetailTabs = ({ 
  horseId, 
  horseGender, 
  activeTab, 
  onActiveTabChange,
  onActionClick 
}: DynamicHorseDetailTabsProps) => {
  const getTabsConfig = () => {
    switch (horseGender) {
      case 'stallion':
        return {
          colorScheme: 'blue',
          tabs: [
            { id: 'collected-semen', label: 'Collected Semen' },
            { id: 'frozen-semen', label: 'Frozen Semen' },
            { id: 'frozen-embryo', label: 'Frozen Embryo' },
            { id: 'breeding-record', label: 'Breeding Record' },
            { id: 'training', label: 'Training' },
            { id: 'health', label: 'Health Records' },
            { id: 'performance', label: 'Performance' }
          ]
        };
      case 'mare':
        return {
          colorScheme: 'purple',
          tabs: [
            { id: 'breeding-history', label: 'Breeding History' },
            { id: 'pregnancy', label: 'Pregnancy' },
            { id: 'foaling-history', label: 'Foaling History' },
            { id: 'frozen-embryos', label: 'Frozen Embryos' },
            { id: 'heat-cycles', label: 'Heat Cycles' },
            { id: 'training', label: 'Training' },
            { id: 'health', label: 'Health Records' }
          ]
        };
      case 'gelding':
        return {
          colorScheme: 'blue',
          tabs: [
            { id: 'training', label: 'Training' },
            { id: 'health', label: 'Health Records' },
            { id: 'performance', label: 'Performance' },
            { id: 'competitions', label: 'Competitions' }
          ]
        };
      default:
        return {
          colorScheme: 'gray',
          tabs: [
            { id: 'training', label: 'Training' },
            { id: 'health', label: 'Health Records' },
            { id: 'performance', label: 'Performance' }
          ]
        };
    }
  };

  const config = getTabsConfig();
  const colorClass = config.colorScheme === 'purple' ? 'purple' : config.colorScheme === 'blue' ? 'blue' : 'gray';

  return (
    <Tabs value={activeTab} onValueChange={onActiveTabChange} className="w-full">
      <TabsList className={`grid w-full grid-cols-${config.tabs.length} bg-${colorClass}-50 border border-${colorClass}-200 p-1 h-12`}>
        {config.tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id}
            className={`text-${colorClass}-700 data-[state=active]:bg-${colorClass}-500 data-[state=active]:text-white font-medium`}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {/* Stallion tabs */}
      {horseGender === 'stallion' && (
        <>
          <TabsContent value="collected-semen" className="mt-6">
            <CollectedSemenTab stallionId={horseId} onActionClick={onActionClick} />
          </TabsContent>
          <TabsContent value="frozen-semen" className="mt-6">
            <FrozenSemenInventoryTab stallionId={horseId} />
          </TabsContent>
          <TabsContent value="frozen-embryo" className="mt-6">
            <FrozenEmbryoInventoryTab stallionId={horseId} />
          </TabsContent>
          <TabsContent value="breeding-record" className="mt-6">
            <EnhancedBreedingRecordTab stallionId={horseId} onActionClick={onActionClick} />
          </TabsContent>
        </>
      )}

      {/* Mare tabs */}
      {horseGender === 'mare' && (
        <>
          <TabsContent value="breeding-history" className="mt-6">
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-muted-foreground">Breeding history records will be displayed here.</p>
            </div>
          </TabsContent>
          <TabsContent value="pregnancy" className="mt-6">
            <PregnancyManagement />
          </TabsContent>
          <TabsContent value="foaling-history" className="mt-6">
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-muted-foreground">Foaling history records will be displayed here.</p>
            </div>
          </TabsContent>
          <TabsContent value="frozen-embryos" className="mt-6">
            <MareFrozenEmbryoInventoryTab mareId={horseId} />
          </TabsContent>
          <TabsContent value="heat-cycles" className="mt-6">
            <MareHeatCycleTracking />
          </TabsContent>
        </>
      )}

      {/* Gelding tabs */}
      {horseGender === 'gelding' && (
        <TabsContent value="competitions" className="mt-6">
          <GeldingCompetitionHistory />
        </TabsContent>
      )}

      {/* Common tabs for all horse types */}
      <TabsContent value="training" className="mt-6">
        <TrainingRecords horseId={horseId} />
      </TabsContent>
      
      <TabsContent value="health" className="mt-6">
        <HealthRecords horseId={horseId} />
      </TabsContent>
      
      <TabsContent value="performance" className="mt-6">
        <PerformanceRecords horseId={horseId} />
      </TabsContent>
    </Tabs>
  );
};

export default DynamicHorseDetailTabs;
