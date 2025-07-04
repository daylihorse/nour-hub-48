
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MareHeatCycleTracking from "../cycles/MareHeatCycleTracking";
import PregnancyManagement from "../PregnancyManagement";
import FrozenEmbryoManagement from "./FrozenEmbryoManagement";
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
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-7 bg-purple-50 border border-purple-200 p-1 h-12">
        <TabsTrigger 
          value="mares" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Mares
        </TabsTrigger>
        <TabsTrigger 
          value="pregnancy" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Pregnancy
        </TabsTrigger>
        <TabsTrigger 
          value="frozen-embryo" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Frozen Embryo
        </TabsTrigger>
        <TabsTrigger 
          value="heat-cycles" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Heat Cycles
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
        <TabsTrigger 
          value="performance" 
          className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
        >
          Performance Records
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="mares" className="mt-6">
        {maresContent}
      </TabsContent>
      
      <TabsContent value="pregnancy" className="mt-6">
        <PregnancyManagement />
      </TabsContent>
      
      <TabsContent value="frozen-embryo" className="mt-6">
        <FrozenEmbryoManagement />
      </TabsContent>
      
      <TabsContent value="heat-cycles" className="mt-6">
        <MareHeatCycleTracking />
      </TabsContent>
      
      <TabsContent value="training" className="mt-6">
        <TrainingRecords />
      </TabsContent>
      
      <TabsContent value="health" className="mt-6">
        <HealthRecords />
      </TabsContent>
      
      <TabsContent value="performance" className="mt-6">
        <PerformanceRecords />
      </TabsContent>
    </Tabs>
  );
};

export default MareManagementTabs;
