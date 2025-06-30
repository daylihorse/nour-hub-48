
import { User, Edit } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/types/client";
import ClientChatButton from "@/components/chat/ClientChatButton";

/**
 * Props interface for ClientProfileHeader component
 */
interface ClientProfileHeaderProps {
  /** Client object containing profile information */
  client: Client;
  /** Handler for editing client information */
  onEditClient: () => void;
}

/**
 * ClientProfileHeader Component
 * 
 * Displays the main header section of the client profile, containing
 * the client's primary identification information and key actions.
 * This component serves as the visual anchor for the client profile,
 * providing immediate recognition and access to primary functions.
 * 
 * Features:
 * - Client avatar with type-based color coding
 * - Client name prominently displayed
 * - Client type badge with visual distinction
 * - Client status indicator (Active/Inactive)
 * - Chat functionality integration
 * - Edit profile access
 * - Professional card layout with backdrop blur effect
 * - Responsive design for different screen sizes
 * 
 * Visual Design:
 * - Horse owners get purple theming
 * - Other client types get blue theming
 * - Status badges use semantic colors
 * - Clean, modern card design with shadows
 */
const ClientProfileHeader = ({ client, onEditClient }: ClientProfileHeaderProps) => {
  // Determine visual theming based on client type
  const isHorseOwner = client.type === "Horse Owner";

  return (
    <Card className="overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          {/* Left side: Avatar and client information */}
          <div className="flex items-center space-x-4">
            {/* Client avatar with type-based color coding */}
            {/* Purple for horse owners, blue for others */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${isHorseOwner ? 'bg-purple-500' : 'bg-blue-500'}`}>
              <User className="h-8 w-8" />
            </div>
            
            {/* Client name and status information */}
            <div>
              {/* Primary client name */}
              <CardTitle className="text-2xl font-bold text-gray-900">{client.name}</CardTitle>
              
              {/* Badge collection for client metadata */}
              <div className="flex gap-2 mt-1">
                {/* Client type badge with conditional styling */}
                <Badge className={`${
                  client.type === "Horse Owner" 
                    ? "bg-purple-100 text-purple-800 border-purple-200" 
                    : "bg-blue-100 text-blue-800 border-blue-200"
                }`}>
                  {client.type}
                </Badge>
                
                {/* Client status badge with semantic coloring */}
                <Badge variant={client.statusDisplay === "Active" ? "default" : "secondary"}>
                  {client.statusDisplay}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Right side: Action buttons */}
          <div className="flex gap-2">
            {/* Chat functionality - opens chat interface in dialog */}
            <ClientChatButton client={client} />
            
            {/* Edit client button - navigates to edit form */}
            <Button size="sm" variant="outline" onClick={onEditClient}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ClientProfileHeader;
