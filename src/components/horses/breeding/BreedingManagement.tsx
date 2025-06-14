
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BreedingTabsList from "./components/BreedingTabsList";
import BreedingDashboard from "./BreedingDashboard";
import StallionManagement from "./StallionManagement";
import MareManagement from "./MareManagement";
import BreedingRecords from "./BreedingRecords";
import PregnancyManagement from "./PregnancyManagement";
import FoalingManagement from "./FoalingManagement";
import GeneticAnalysis from "./analysis/GeneticAnalysis";
import BreedingPlanner from "./planning/BreedingPlanner";
import BreedingContractManagement from "./contracts/BreedingContractManagement";
import MareHeatCycleTracking from "./cycles/MareHeatCycleTracking";
import BreedingPerformanceAnalytics from "./analytics/BreedingPerformanceAnalytics";
import BreedingDocumentManager from "./documents/BreedingDocumentManager";
import IntegrationStatusBar from "@/components/integration/IntegrationStatusBar";
import { RecordsProvider } from "./records/RecordsProvider";

interface BreedingManagementProps {
  initialTab?: string;
}

const BreedingManagement = ({ initialTab = "dashboard" }: BreedingManagementProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <RecordsProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Breeding & Reproduction</h1>
          <p className="text-muted-foreground">
            Comprehensive breeding management with genetic analysis, strategic planning, and advanced tracking
          </p>
        </div>

        {/* Integration Status Bar */}
        <IntegrationStatusBar />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <BreedingTabsList />
          
          <TabsContent value="dashboard" className="mt-6">
            <BreedingDashboard />
          </TabsContent>
          
          <TabsContent value="stallions" className="mt-6">
            <StallionManagement />
          </TabsContent>
          
          <TabsContent value="mares" className="mt-6">
            <MareManagement />
          </TabsContent>
          
          <TabsContent value="breeding" className="mt-6">
            <BreedingRecords />
          </TabsContent>
          
          <TabsContent value="pregnancies" className="mt-6">
            <PregnancyManagement />
          </TabsContent>
          
          <TabsContent value="foaling" className="mt-6">
            <FoalingManagement />
          </TabsContent>
          
          <TabsContent value="genetics" className="mt-6">
            <GeneticAnalysis />
          </TabsContent>
          
          <TabsContent value="planning" className="mt-6">
            <BreedingPlanner />
          </TabsContent>
          
          <TabsContent value="contracts" className="mt-6">
            <BreedingContractManagement />
          </TabsContent>
          
          <TabsContent value="cycles" className="mt-6">
            <MareHeatCycleTracking />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <BreedingPerformanceAnalytics />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <BreedingDocumentManager />
          </TabsContent>
        </Tabs>
      </div>
    </RecordsProvider>
  );
};

export default BreedingManagement;
