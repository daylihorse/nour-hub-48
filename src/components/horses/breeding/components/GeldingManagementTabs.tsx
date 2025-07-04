
import { 
  SmartTabs, 
  SmartTabsContent, 
  SmartTabsList, 
  SmartTabsTrigger 
} from "@/components/ui/smart-tabs";
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
    <SmartTabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <SmartTabsList className="mb-6 bg-blue-50 border border-blue-200 p-1 h-12">
        <SmartTabsTrigger 
          value="geldings" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Geldings
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="training" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Training
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="health" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Health Records
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="performance" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Performance
        </SmartTabsTrigger>
        <SmartTabsTrigger 
          value="competitions" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Competitions
        </SmartTabsTrigger>
      </SmartTabsList>
      
      <SmartTabsContent value="geldings" className="mt-6">
        {geldingsContent}
      </SmartTabsContent>
      
      <SmartTabsContent value="training" className="mt-6">
        <TrainingRecords />
      </SmartTabsContent>
      
      <SmartTabsContent value="health" className="mt-6">
        <HealthRecords />
      </SmartTabsContent>
      
      <SmartTabsContent value="performance" className="mt-6">
        <PerformanceRecords />
      </SmartTabsContent>
      
      <SmartTabsContent value="competitions" className="mt-6">
        <GeldingCompetitionHistory />
      </SmartTabsContent>
    </SmartTabs>
  );
};

export default GeldingManagementTabs;
