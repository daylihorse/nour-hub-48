
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreedingTab from "./tabs/BreedingTab";
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
      <TabsList className="grid w-full grid-cols-4 bg-blue-50 border border-blue-200 p-1 h-12">
        <TabsTrigger 
          value="breeding" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Breeding
        </TabsTrigger>
        <TabsTrigger 
          value="training" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Training Records
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
          Performance Records
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="breeding" className="mt-6">
        <BreedingTab stallionId={stallionId} onActionClick={onActionClick} />
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
