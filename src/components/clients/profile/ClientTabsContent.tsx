import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Client, HorseOwner } from "@/types/client";
import ClientOverviewTab from "./tabs/overview/ClientOverviewTab";
import ClientNotesTab from "./tabs/notes/ClientNotesTab";
import ClientCommunicationTab from "./tabs/communication/ClientCommunicationTab";
import ClientFilesTab from "./tabs/files/ClientFilesTab";
import ClientTasksTab from "./tabs/tasks/ClientTasksTab";

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
  onLogCommunication?: () => void;
  onUploadFile?: () => void;
  onAddTask?: () => void;
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
  onViewHorses,
  onLogCommunication,
  onUploadFile,
  onAddTask
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
            <ClientCommunicationTab 
              communications={communications} 
              onLogCommunication={onLogCommunication}
            />
          </TabsContent>

          <TabsContent value="files" className="space-y-4 mt-0">
            <ClientFilesTab 
              files={files} 
              onUploadFile={onUploadFile}
            />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4 mt-0">
            <ClientTasksTab 
              tasks={tasks} 
              onAddTask={onAddTask}
            />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default ClientTabsContent;
