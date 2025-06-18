import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Client, ClientType, ClientStatus } from "@/types/client";
import { formatDistanceToNow } from "date-fns";
import { User, Mail, Phone, Edit, MessageSquare, Clock } from "lucide-react";

interface ClientGridViewProps {
  clients: Client[];
  gridSize?: 2 | 3 | 4;
  onClientClick: (clientId: string) => void;
  onEditClient: (clientId: string, e: React.MouseEvent) => void;
  onMessageClient: (clientId: string, e: React.MouseEvent) => void;
}

const ClientGridView = ({ 
  clients, 
  gridSize = 3, 
  onClientClick, 
  onEditClient, 
  onMessageClient 
}: ClientGridViewProps) => {
  const getGridClasses = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const getClientTypeStyles = (type: ClientType) => {
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

  const getStatusStyles = (status: ClientStatus) => {
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
    <div className={`grid ${getGridClasses()} gap-6`}>
      {clients.map((client) => (
        <Card 
          key={client.id} 
          className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-md"
          onClick={() => onClientClick(client.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {client.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold truncate">
                    {client.name}
                  </CardTitle>
                  <div className="flex gap-2 mt-1">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getClientTypeStyles(client.type)}`}
                    >
                      {client.type}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getStatusStyles(client.status)}`}
                    >
                      {client.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{client.phone}</span>
                </div>
              </div>

              {/* Last Interaction */}
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Last interaction: {formatLastInteraction(client.lastInteraction)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => onEditClient(client.id, e)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
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

export default ClientGridView; 