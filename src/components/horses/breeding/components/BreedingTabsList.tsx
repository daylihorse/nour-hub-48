
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { breedingTabsConfig } from "../config/breedingTabsConfig";

const BreedingTabsList = () => {
  return (
    <TabsList className="grid w-full grid-cols-12 bg-blue-50 border border-blue-200 p-1 h-10">
      {breedingTabsConfig.map((tab) => (
        <TabsTrigger 
          key={tab.value}
          value={tab.value} 
          className="text-blue-700 text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-150"
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default BreedingTabsList;
