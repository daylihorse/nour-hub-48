
import { Mail, Calendar, FileText, Upload, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Client } from "@/types/client";

/**
 * Props interface for ClientQuickActions component
 */
interface ClientQuickActionsProps {
  /** Client object for context */
  client: Client;
  /** Handler for sending messages to the client */
  onSendMessage: () => void;
  /** Handler for scheduling meetings with the client */
  onScheduleMeeting: () => void;
  /** Handler for adding new notes about the client */
  onAddNote: () => void;
  /** Handler for uploading documents related to the client */
  onUploadDocument: () => void;
  /** Optional handler for viewing linked horses (only for horse owners) */
  onViewHorses?: () => void;
}

/**
 * ClientQuickActions Component
 * 
 * Provides a set of frequently used actions for client management in an
 * easily accessible button layout. This component serves as a workflow
 * accelerator, allowing users to quickly perform common operations
 * without navigating through multiple pages.
 * 
 * Features:
 * - Message client functionality
 * - Meeting scheduling
 * - Note creation
 * - Document upload
 * - Horse viewing (conditional for horse owners)
 * - Responsive grid layout that adapts to screen size
 * - Consistent button styling and iconography
 * - Smart rendering based on client type
 * 
 * The component uses conditional rendering to show horse-related actions
 * only for clients who are horse owners, maintaining a clean interface
 * for other client types.
 */
const ClientQuickActions = ({ 
  client, 
  onSendMessage, 
  onScheduleMeeting, 
  onAddNote, 
  onUploadDocument,
  onViewHorses 
}: ClientQuickActionsProps) => {
  // Determine if client is a horse owner for conditional rendering
  const isHorseOwner = client.type === "Horse Owner";

  return (
    <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Responsive grid layout - adjusts from 2 columns on mobile to 5 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {/* Send message action - opens messaging interface */}
          <Button variant="outline" size="sm" className="h-8" onClick={onSendMessage}>
            <Mail className="h-3 w-3 mr-1" /> Message
          </Button>
          
          {/* Schedule meeting action - opens calendar/scheduling interface */}
          <Button variant="outline" size="sm" className="h-8" onClick={onScheduleMeeting}>
            <Calendar className="h-3 w-3 mr-1" /> Schedule
          </Button>
          
          {/* Add note action - switches to notes tab for immediate note creation */}
          <Button variant="outline" size="sm" className="h-8" onClick={onAddNote}>
            <FileText className="h-3 w-3 mr-1" /> Add Note
          </Button>
          
          {/* Upload document action - opens file upload dialog */}
          <Button variant="outline" size="sm" className="h-8" onClick={onUploadDocument}>
            <Upload className="h-3 w-3 mr-1" /> Upload
          </Button>
          
          {/* View horses action - only shown for horse owners */}
          {/* Conditional rendering ensures this button only appears when relevant */}
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
