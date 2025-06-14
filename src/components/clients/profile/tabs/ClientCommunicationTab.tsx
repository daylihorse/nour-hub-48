
import { Plus, Phone, Mail, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CommunicationLog } from "@/types/client";

interface ClientCommunicationTabProps {
  communications: CommunicationLog[];
}

const ClientCommunicationTab = ({ communications }: ClientCommunicationTabProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Communication Log</h3>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Log Communication
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        {communications && communications.length ? (
          <div className="space-y-3">
            {[...communications].reverse().map((comm) => (
              <Card key={comm.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {comm.type === "call" && <Phone className="h-4 w-4 mr-2" />}
                      {comm.type === "email" && <Mail className="h-4 w-4 mr-2" />}
                      {comm.type === "message" && <MessageSquare className="h-4 w-4 mr-2" />}
                      {comm.type === "meeting" && <Calendar className="h-4 w-4 mr-2" />}
                      <CardTitle className="text-base capitalize">{comm.type}</CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(comm.date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{comm.description}</p>
                  {comm.contactPerson && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Contact: {comm.contactPerson}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No communication logs available.</p>
        )}
      </ScrollArea>
    </>
  );
};

export default ClientCommunicationTab;
