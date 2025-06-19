
import React from "react";
import { ScrollableTabs, ScrollableTabsList, ScrollableTabsTrigger, ScrollableTabsContent } from "@/components/ui/scrollable-tabs";
import { LucideIcon } from "lucide-react";

export interface ModuleTabConfig {
  value: string;
  label: string;
  icon: LucideIcon;
  content: React.ReactNode;
}

interface ModuleTabsProps {
  tabs: ModuleTabConfig[];
  defaultValue: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

const ModuleTabs: React.FC<ModuleTabsProps> = ({
  tabs,
  defaultValue,
  onTabChange,
  className
}) => {
  return (
    <ScrollableTabs value={defaultValue} onValueChange={onTabChange} className={className}>
      <ScrollableTabsList>
        {tabs.map((tab) => (
          <ScrollableTabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 whitespace-nowrap">
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </ScrollableTabsTrigger>
        ))}
      </ScrollableTabsList>
      
      {tabs.map((tab) => (
        <ScrollableTabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </ScrollableTabsContent>
      ))}
    </ScrollableTabs>
  );
};

export default ModuleTabs;
