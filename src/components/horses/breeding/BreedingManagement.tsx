
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreedingDashboard from "./BreedingDashboard";
import MareManagement from "./MareManagement";
import StallionManagement from "./StallionManagement";
import FoalingManagement from "./FoalingManagement";
import BreedingDocumentManager from "./documents/BreedingDocumentManager";
import BreedingPlanner from "./planning/BreedingPlanner";
import GeneticAnalysis from "./analysis/GeneticAnalysis";
import BreedingCertificateGenerator from "./certificates/BreedingCertificateGenerator";

interface BreedingManagementProps {
  initialTab?: string;
}

const BreedingManagement = ({ initialTab = "dashboard" }: BreedingManagementProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8 bg-purple-50 border border-purple-200 p-1 h-12">
          <TabsTrigger 
            value="dashboard" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="mares" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Mares
          </TabsTrigger>
          <TabsTrigger 
            value="stallions" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Stallions
          </TabsTrigger>
          <TabsTrigger 
            value="foaling" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Foaling
          </TabsTrigger>
          <TabsTrigger 
            value="planning" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Planning
          </TabsTrigger>
          <TabsTrigger 
            value="analysis" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="certificates" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Certificates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <BreedingDashboard />
        </TabsContent>

        <TabsContent value="mares" className="mt-6">
          <MareManagement />
        </TabsContent>

        <TabsContent value="stallions" className="mt-6">
          <StallionManagement />
        </TabsContent>

        <TabsContent value="foaling" className="mt-6">
          <FoalingManagement />
        </TabsContent>

        <TabsContent value="planning" className="mt-6">
          <BreedingPlanner />
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <GeneticAnalysis />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <BreedingDocumentManager />
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <BreedingCertificateGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingManagement;
