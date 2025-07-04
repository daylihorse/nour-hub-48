
import { useState, useEffect } from "react";
import { 
  SmartTabs, 
  SmartTabsContent, 
  SmartTabsList, 
  SmartTabsTrigger 
} from "@/components/ui/smart-tabs";
import BreedingDashboard from "./BreedingDashboard";
import MareManagement from "./MareManagement";
import StallionManagement from "./StallionManagement";
import FoalingManagement from "./FoalingManagement";
import BreedingDocumentManager from "./documents/BreedingDocumentManager";
import BreedingPlanner from "./planning/BreedingPlanner";
import BreedingCertificateGenerator from "./certificates/BreedingCertificateGenerator";
import GeldingManagement from "./GeldingManagement";

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
      <SmartTabs value={activeTab} onValueChange={setActiveTab} className="w-full" maxTabsForRegular={4}>
        <SmartTabsList className="mb-8">
          <SmartTabsTrigger value="dashboard">
            Dashboard
          </SmartTabsTrigger>
          <SmartTabsTrigger value="mares">
            Mares
          </SmartTabsTrigger>
          <SmartTabsTrigger value="stallions">
            Stallions
          </SmartTabsTrigger>
          <SmartTabsTrigger value="geldings">
            Geldings
          </SmartTabsTrigger>
          <SmartTabsTrigger value="foaling">
            Foaling
          </SmartTabsTrigger>
          <SmartTabsTrigger value="planning">
            Planning
          </SmartTabsTrigger>
          <SmartTabsTrigger value="documents">
            Documents
          </SmartTabsTrigger>
          <SmartTabsTrigger value="certificates">
            Certificates
          </SmartTabsTrigger>
        </SmartTabsList>

        <SmartTabsContent value="dashboard">
          <BreedingDashboard />
        </SmartTabsContent>

        <SmartTabsContent value="mares">
          <MareManagement />
        </SmartTabsContent>

        <SmartTabsContent value="stallions">
          <StallionManagement />
        </SmartTabsContent>

        <SmartTabsContent value="geldings">
          <GeldingManagement />
        </SmartTabsContent>

        <SmartTabsContent value="foaling">
          <FoalingManagement />
        </SmartTabsContent>

        <SmartTabsContent value="planning">
          <BreedingPlanner />
        </SmartTabsContent>

        <SmartTabsContent value="documents">
          <BreedingDocumentManager />
        </SmartTabsContent>

        <SmartTabsContent value="certificates">
          <BreedingCertificateGenerator />
        </SmartTabsContent>
      </SmartTabs>
    </div>
  );
};

export default BreedingManagement;
