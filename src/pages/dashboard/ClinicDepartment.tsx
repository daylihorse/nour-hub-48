
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import POSChoiceDialog from "@/components/pos/POSChoiceDialog";
import { usePOSChoice } from "@/hooks/usePOSChoice";
import ClinicHeader from "@/components/clinic/header/ClinicHeader";
import ClinicStats from "@/components/clinic/stats/ClinicStats";
import ClinicNavigationTabs from "@/components/clinic/navigation/ClinicNavigationTabs";
import ClinicIntegrationSection from "@/components/clinic/integration/ClinicIntegrationSection";
import ClinicTabContent from "@/components/clinic/tabs/ClinicTabContent";

const ClinicDepartment = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPOSInTab, setShowPOSInTab] = useState(false);
  const { isDialogOpen, openPOSChoice, closePOSChoice, handleOpenSeparate } = usePOSChoice("Clinic");

  const handlePOSClick = () => {
    openPOSChoice();
  };

  const handleUsePOSHere = () => {
    setShowPOSInTab(true);
    setActiveTab("pos");
    closePOSChoice();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <ClinicHeader />

        {/* Navigation Tabs */}
        <ClinicNavigationTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          showPOSInTab={showPOSInTab} 
        />

        {/* Quick Stats */}
        <ClinicStats />

        {/* Integration Panel */}
        <ClinicIntegrationSection />

        <Separator className="my-8" />

        {/* Main Content Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-8">
              <ClinicTabContent 
                showPOSInTab={showPOSInTab} 
                onPOSClick={handlePOSClick} 
              />
            </div>
          </Tabs>
        </div>
      </div>

      {/* POS Choice Dialog */}
      <POSChoiceDialog
        isOpen={isDialogOpen}
        onClose={closePOSChoice}
        departmentName="Clinic"
        onUseHere={handleUsePOSHere}
        onOpenSeparate={() => handleOpenSeparate()}
      />
    </div>
  );
};

export default ClinicDepartment;
