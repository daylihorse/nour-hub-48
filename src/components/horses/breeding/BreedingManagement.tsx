
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
import GeldingManagement from "./GeldingManagement";
import { MareProvider } from "@/contexts/MareContext";
import { StallionProvider } from "@/contexts/StallionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

interface BreedingManagementProps {
  initialTab?: string;
}

const BreedingManagement = ({ initialTab = "dashboard" }: BreedingManagementProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-9 bg-purple-50 border border-purple-200 p-1 h-12">
          <TabsTrigger 
            value="dashboard" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.dashboard')}
          </TabsTrigger>
          <TabsTrigger 
            value="mares" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.mares')}
          </TabsTrigger>
          <TabsTrigger 
            value="stallions" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.stallions')}
          </TabsTrigger>
          <TabsTrigger 
            value="geldings" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.geldings')}
          </TabsTrigger>
          <TabsTrigger 
            value="foaling" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.foaling')}
          </TabsTrigger>
          <TabsTrigger 
            value="planning" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.planning')}
          </TabsTrigger>
          <TabsTrigger 
            value="analysis" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.analysis')}
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.documents')}
          </TabsTrigger>
          <TabsTrigger 
            value="certificates" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            {t('breeding.certificates')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <BreedingDashboard />
        </TabsContent>

        <TabsContent value="mares" className="mt-6">
          <MareProvider>
            <MareManagement />
          </MareProvider>
        </TabsContent>

        <TabsContent value="stallions" className="mt-6">
          <StallionProvider>
            <StallionManagement />
          </StallionProvider>
        </TabsContent>

        <TabsContent value="geldings" className="mt-6">
          <GeldingManagement />
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
