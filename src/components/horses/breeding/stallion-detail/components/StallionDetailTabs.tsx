
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollectedSemenTab from "./tabs/CollectedSemenTab";
import FrozenSemenInventoryTab from "./tabs/FrozenSemenInventoryTab";
import FrozenEmbryoInventoryTab from "./tabs/FrozenEmbryoInventoryTab";
import BreedingRecordTab from "./tabs/BreedingRecordTab";

interface StallionDetailTabsProps {
  stallionId: string;
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  onActionClick: (action: string, title: string) => void;
}

const StallionDetailTabs = ({ 
  stallionId, 
  activeTab, 
  onActiveTabChange, 
  onActionClick 
}: StallionDetailTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onActiveTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-blue-50 border border-blue-200 p-1 h-12">
        <TabsTrigger 
          value="collected-semen" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Collected Semen
        </TabsTrigger>
        <TabsTrigger 
          value="frozen-semen" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Frozen Semen Inventory
        </TabsTrigger>
        <TabsTrigger 
          value="frozen-embryo" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Frozen Embryo Inventory
        </TabsTrigger>
        <TabsTrigger 
          value="breeding-record" 
          className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
        >
          Breeding Record
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="collected-semen" className="mt-6">
        <CollectedSemenTab stallionId={stallionId} onActionClick={onActionClick} />
      </TabsContent>
      
      <TabsContent value="frozen-semen" className="mt-6">
        <FrozenSemenInventoryTab stallionId={stallionId} onActionClick={onActionClick} />
      </TabsContent>
      
      <TabsContent value="frozen-embryo" className="mt-6">
        <FrozenEmbryoInventoryTab stallionId={stallionId} onActionClick={onActionClick} />
      </TabsContent>
      
      <TabsContent value="breeding-record" className="mt-6">
        <BreedingRecordTab stallionId={stallionId} onActionClick={onActionClick} />
      </TabsContent>
    </Tabs>
  );
};

export default StallionDetailTabs;
