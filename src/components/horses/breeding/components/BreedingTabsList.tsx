
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { breedingTabsConfig } from "../config/breedingTabsConfig";

const BreedingTabsList = () => {
  return (
    <div className="bg-blue-50 border-b border-blue-200 px-1">
      <TabsList className="w-full h-auto bg-transparent p-1 grid grid-cols-4 lg:grid-cols-12 gap-1">
        {breedingTabsConfig.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-900 bg-white data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
            >
              <IconComponent className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline truncate">{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
};

export default BreedingTabsList;
