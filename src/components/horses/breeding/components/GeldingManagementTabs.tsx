
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";
import GeldingCompetitionHistory from "./GeldingCompetitionHistory";

interface GeldingManagementTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  geldingsContent: React.ReactNode;
}

const GeldingManagementTabs = ({ activeTab, onTabChange, geldingsContent }: GeldingManagementTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-blue-50 border border-blue-200 p-1 h-12">
        <TabsTrigger 
          value="geldings" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Geldings
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
        <TabsTrigger 
          value="competitions" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Competitions
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="geldings" className="mt-6">
        {geldingsContent}
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
      
      <TabsContent value="competitions" className="mt-6">
        <GeldingCompetitionHistory />
      </TabsContent>
    </Tabs>
  );
};

export default GeldingManagementTabs;
