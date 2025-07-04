
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollectedSemenTab from "./CollectedSemenTab";
import FrozenSemenInventoryTab from "./FrozenSemenInventoryTab";
import EnhancedBreedingRecordTab from "./EnhancedBreedingRecordTab";

interface BreedingTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string, data?: any) => void;
}

const BreedingTab = ({ stallionId, onActionClick }: BreedingTabProps) => {
  const [activeSubTab, setActiveSubTab] = useState("collected-semen");

  return (
    <div className="space-y-6">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-50 border border-gray-200 p-1 h-10">
          <TabsTrigger 
            value="collected-semen" 
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-600 font-medium"
          >
            Collected Semen
          </TabsTrigger>
          <TabsTrigger 
            value="frozen-semen" 
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-600 font-medium"
          >
            Frozen Semen
          </TabsTrigger>
          <TabsTrigger 
            value="breeding-records" 
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-600 font-medium"
          >
            Breeding Records
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="collected-semen" className="mt-6">
          <CollectedSemenTab stallionId={stallionId} onActionClick={onActionClick} />
        </TabsContent>
        
        <TabsContent value="frozen-semen" className="mt-6">
          <FrozenSemenInventoryTab stallionId={stallionId} onActionClick={onActionClick} />
        </TabsContent>
        
        <TabsContent value="breeding-records" className="mt-6">
          <EnhancedBreedingRecordTab stallionId={stallionId} onActionClick={onActionClick} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingTab;
