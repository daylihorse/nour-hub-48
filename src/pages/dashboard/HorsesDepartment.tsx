
import { useState, useEffect } from "react";
import { useLocation, useSearchParams, Routes, Route } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HorsesDashboard from "@/components/horses/HorsesDashboard";
import HorseManagement from "@/components/horses/HorseManagement";
import BreedingManagement from "@/components/horses/breeding/BreedingManagement";
import PedigreeManagement from "@/components/horses/pedigree/PedigreeManagement";

const HorsesDepartment = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [breedingSubTab, setBreedingSubTab] = useState("dashboard");

  // Extract clientId from URL parameters
  const clientId = searchParams.get('clientId');

  // Check if we're in horse details view
  const isHorseDetailsView = location.pathname.includes('/horses/') && 
                            location.pathname.split('/').length > 2 &&
                            !location.pathname.includes('/breeding') &&
                            !location.pathname.includes('/pedigree');

  // Handle navigation state from other components
  useEffect(() => {
    if (location.state) {
      const { activeTab: stateActiveTab, breedingSubTab: stateBreedingSubTab } = location.state;
      if (stateActiveTab) {
        setActiveTab(stateActiveTab);
      }
      if (stateBreedingSubTab) {
        setBreedingSubTab(stateBreedingSubTab);
      }
    }
    
    // If clientId is provided, automatically switch to horses tab to show filtered horses
    if (clientId && !isHorseDetailsView) {
      setActiveTab("horses");
    }

    // Set active tab based on current route
    if (location.pathname.startsWith('/horses') && !isHorseDetailsView) {
      setActiveTab("horses");
    }
  }, [location.state, clientId, isHorseDetailsView, location.pathname]);

  const handleNavigateToBreeding = (tab: string) => {
    setActiveTab("breeding");
    // Map quick access IDs to breeding management tabs
    const tabMapping: { [key: string]: string } = {
      records: "breeding",
      certificates: "breeding", // Note: Certificates are part of the documents tab
      pedigree: "dashboard", // Using dashboard as it has pedigree overview
      analytics: "analytics",
      documents: "documents",
      planning: "planning"
    };
    setBreedingSubTab(tabMapping[tab] || "dashboard");
  };

  // If we're in horse details view, render the horse management with routing
  if (isHorseDetailsView) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Horses Department</h1>
          <p className="text-muted-foreground">Comprehensive horse management and monitoring system</p>
        </div>
        <Routes>
          <Route path="horses/*" element={<HorseManagement clientId={clientId} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horses Department</h1>
        <p className="text-muted-foreground">Comprehensive horse management and monitoring system</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-900 border border-slate-700 p-1.5 h-12">
          <TabsTrigger 
            value="dashboard" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="horses" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Horse Registry
          </TabsTrigger>
          <TabsTrigger 
            value="breeding" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Breeding
          </TabsTrigger>
          <TabsTrigger 
            value="pedigree" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Pedigree
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <HorsesDashboard onNavigateToBreeding={handleNavigateToBreeding} />
        </TabsContent>
        
        <TabsContent value="horses" className="mt-6">
          <HorseManagement clientId={clientId} />
        </TabsContent>
        
        <TabsContent value="breeding" className="mt-6">
          <BreedingManagement initialTab={breedingSubTab} />
        </TabsContent>
        
        <TabsContent value="pedigree" className="mt-6">
          <PedigreeManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HorsesDepartment;
