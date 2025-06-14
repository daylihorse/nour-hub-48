
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Client, HorseOwner } from "@/types/client";
import ClientOverviewTab from "./tabs/ClientOverviewTab";
import ClientNotesTab from "./tabs/ClientNotesTab";
import ClientCommunicationTab from "./tabs/ClientCommunicationTab";
import ClientFilesTab from "./tabs/ClientFilesTab";
import ClientTasksTab from "./tabs/ClientTasksTab";

interface ClientTabsContentProps {
  client: Client;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notes: any[];
  setNotes: (notes: any[]) => void;
  communications: any[];
  tasks: any[];
  files: any[];
  onViewHorses: () => void;
}

const ClientTabsContent = ({ 
  client, 
  activeTab, 
  setActiveTab,
  notes,
  setNotes,
  communications,
  tasks,
  files,
  onViewHorses
}: ClientTabsContentProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="p-4 pb-0">
          <TabsList className="grid grid-cols-5 w-full bg-gray-100/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-white">Notes</TabsTrigger>
            <TabsTrigger value="communication" className="data-[state=active]:bg-white">Communication</TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-white">Files</TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-white">Tasks</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="p-4">
          <TabsContent value="overview" className="space-y-4 mt-0">
            <ClientOverviewTab 
              client={client}
              notes={notes}
              communications={communications}
              onViewHorses={onViewHorses}
            />
          </TabsContent>

          <TabsContent value="notes" className="space-y-4 mt-0">
            <ClientNotesTab notes={notes} setNotes={setNotes} />
          </TabsContent>

          <TabsContent value="communication" className="space-y-4 mt-0">
            <ClientCommunicationTab communications={communications} />
          </TabsContent>

          <TabsContent value="files" className="space-y-4 mt-0">
            <ClientFilesTab files={files} />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4 mt-0">
            <ClientTasksTab tasks={tasks} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default ClientTabsContent;
