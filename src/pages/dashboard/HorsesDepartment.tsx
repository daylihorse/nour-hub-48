
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HorseManagement from "@/components/horses/HorseManagement";
import BreedingManagement from "@/components/horses/breeding/BreedingManagement";
import PedigreeManagement from "@/components/horses/pedigree/PedigreeManagement";

const HorsesDepartment = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("horses");
  const [breedingSubTab, setBreedingSubTab] = useState("dashboard");

  // Extract clientId from URL parameters
  const clientId = searchParams.get('clientId');

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
    if (clientId) {
      setActiveTab("horses");
    }
  }, [location.state, clientId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horses Department</h1>
        <p className="text-muted-foreground">Comprehensive horse management and monitoring system</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900 border border-slate-700 p-1.5 h-12">
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
