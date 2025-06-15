
import { Mail, Calendar, FileText, Upload, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Client } from "@/types/client";

interface ClientQuickActionsProps {
  client: Client;
  onSendMessage: () => void;
  onScheduleMeeting: () => void;
  onAddNote: () => void;
  onUploadDocument: () => void;
  onViewHorses?: () => void;
}

const ClientQuickActions = ({ 
  client, 
  onSendMessage, 
  onScheduleMeeting, 
  onAddNote, 
  onUploadDocument,
  onViewHorses 
}: ClientQuickActionsProps) => {
  const isHorseOwner = client.type === "Horse Owner";

  return (
    <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Button variant="outline" size="sm" className="h-8" onClick={onSendMessage}>
            <Mail className="h-3 w-3 mr-1" /> Message
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={onScheduleMeeting}>
            <Calendar className="h-3 w-3 mr-1" /> Schedule
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={onAddNote}>
            <FileText className="h-3 w-3 mr-1" /> Add Note
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={onUploadDocument}>
            <Upload className="h-3 w-3 mr-1" /> Upload
          </Button>
          {isHorseOwner && onViewHorses && (
            <Button variant="outline" size="sm" className="h-8" onClick={onViewHorses}>
              <LinkIcon className="h-3 w-3 mr-1" /> View Horses
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientQuickActions;
