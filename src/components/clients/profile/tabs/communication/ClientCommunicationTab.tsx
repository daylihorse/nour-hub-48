import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunicationLog } from "@/types/client";
import CommunicationLogList from "./CommunicationLogList";

interface ClientCommunicationTabProps {
  communications: CommunicationLog[];
  onLogCommunication?: () => void;
}

const ClientCommunicationTab = ({ communications, onLogCommunication }: ClientCommunicationTabProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Communication Log</h3>
        <Button variant="outline" size="sm" onClick={onLogCommunication}>
          <Plus className="h-4 w-4 mr-1" /> Log Communication
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <CommunicationLogList communications={communications} />
      </ScrollArea>
    </>
  );
};

export default ClientCommunicationTab;
