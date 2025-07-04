
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
    <SmartTabs value={activeTab} onValueChange={onTabChange} className="w-full" maxTabsForRegular={4}>
      <SmartTabsList className="mb-8">
        <SmartTabsTrigger value="geldings">
          Geldings
        </SmartTabsTrigger>
        <SmartTabsTrigger value="training">
          Training
        </SmartTabsTrigger>
        <SmartTabsTrigger value="health">
          Health Records
        </SmartTabsTrigger>
        <SmartTabsTrigger value="performance">
          Performance
        </SmartTabsTrigger>
        <SmartTabsTrigger value="competitions">
          Competitions
        </SmartTabsTrigger>
      </SmartTabsList>
      
      <SmartTabsContent value="geldings" className="mt-8">
        {geldingsContent}
      </SmartTabsContent>
      
      <SmartTabsContent value="training" className="mt-8">
        <TrainingRecords />
      </SmartTabsContent>
      
      <SmartTabsContent value="health" className="mt-8">
        <HealthRecords />
      </SmartTabsContent>
      
      <SmartTabsContent value="performance" className="mt-8">
        <PerformanceRecords />
      </SmartTabsContent>
      
      <SmartTabsContent value="competitions" className="mt-8">
        <GeldingCompetitionHistory />
      </SmartTabsContent>
    </SmartTabs>
  );
};

export default GeldingManagementTabs;
