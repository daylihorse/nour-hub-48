
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Client, ClientTypeDisplay, ClientStatusDisplay } from "@/types/client";
import { formatDistanceToNow } from "date-fns";
import { User, Mail, Phone, Edit, MessageSquare, Clock, MapPin } from "lucide-react";

interface ClientListViewProps {
  clients: Client[];
  onClientClick: (clientId: string) => void;
  onEditClient: (clientId: string, e: React.MouseEvent) => void;
  onMessageClient: (clientId: string, e: React.MouseEvent) => void;
}

const ClientListView = ({ 
  clients, 
  onClientClick, 
  onEditClient, 
  onMessageClient 
}: ClientListViewProps) => {
  const getClientTypeStyles = (type?: ClientTypeDisplay) => {
    switch(type) {
      case "Horse Owner":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Veterinarian":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Supplier":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Trainer":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusStyles = (status?: ClientStatusDisplay) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  const formatLastInteraction = (dateString?: string) => {
    if (!dateString) return "Never";
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (clients.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">No clients found</h3>
        <p className="text-muted-foreground">No clients match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <Card 
          key={client.id} 
          className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-md"
          onClick={() => onClientClick(client.id)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                {/* Avatar and Basic Info */}
                <Avatar className="h-16 w-16 flex-shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {client.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Name and Badges */}
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold truncate">{client.name}</h3>
                    <div className="flex gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getClientTypeStyles(client.type)}`}
                      >
                        {client.type}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusStyles(client.statusDisplay)}`}
                      >
                        {client.statusDisplay}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                    {client.address && (
                      <div className="flex items-center text-sm text-muted-foreground md:col-span-2">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{client.address}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Last Interaction */}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Last interaction: {formatLastInteraction(client.lastInteraction)}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => onEditClient(client.id, e)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => onMessageClient(client.id, e)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClientListView;
