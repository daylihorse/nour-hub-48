
import { useState, useEffect } from "react";
import { 
  ScrollableTabs, 
  ScrollableTabsList, 
  ScrollableTabsTrigger, 
  ScrollableTabsContent 
} from "@/components/ui/scrollable-tabs";
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
      <ScrollableTabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollableTabsList className="mb-6">
          <ScrollableTabsTrigger value="dashboard">
            Dashboard
          </ScrollableTabsTrigger>
          <ScrollableTabsTrigger value="mares">
            Mares
          </ScrollableTabsTrigger>
          <ScrollableTabsTrigger value="stallions">
            Stallions
          </ScrollableTabsTrigger>
          <ScrollableTabsTrigger value="geldings">
            Geldings
          </ScrollableTabsTrigger>
          <ScrollableTabsTrigger value="foaling">
            Foaling
          </ScrollableTabsTrigger>
          <ScrollableTabsTrigger value="planning">
            Planning
          </ScrollableTabsTrigger>
          <ScrollableTabsTrigger value="documents">
            Documents
          </ScrollableTabsTrigger>
          <ScrollableTabsTrigger value="certificates">
            Certificates
          </ScrollableTabsTrigger>
        </ScrollableTabsList>

        <ScrollableTabsContent value="dashboard">
          <BreedingDashboard />
        </ScrollableTabsContent>

        <ScrollableTabsContent value="mares">
          <MareManagement />
        </ScrollableTabsContent>

        <ScrollableTabsContent value="stallions">
          <StallionManagement />
        </ScrollableTabsContent>

        <ScrollableTabsContent value="geldings">
          <GeldingManagement />
        </ScrollableTabsContent>

        <ScrollableTabsContent value="foaling">
          <FoalingManagement />
        </ScrollableTabsContent>

        <ScrollableTabsContent value="planning">
          <BreedingPlanner />
        </ScrollableTabsContent>

        <ScrollableTabsContent value="documents">
          <BreedingDocumentManager />
        </ScrollableTabsContent>

        <ScrollableTabsContent value="certificates">
          <BreedingCertificateGenerator />
        </ScrollableTabsContent>
      </ScrollableTabs>
    </div>
  );
};

export default BreedingManagement;
