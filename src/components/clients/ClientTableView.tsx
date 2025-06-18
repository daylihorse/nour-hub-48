import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Client, ClientType, ClientStatus } from "@/types/client";
import { formatDistanceToNow } from "date-fns";
import { Mail, Phone } from "lucide-react";

interface ClientTableViewProps {
  clients: Client[];
  onClientClick: (clientId: string) => void;
  onEditClient: (clientId: string, e: React.MouseEvent) => void;
  onMessageClient: (clientId: string, e: React.MouseEvent) => void;
}

const ClientTableView = ({ 
  clients, 
  onClientClick, 
  onEditClient, 
  onMessageClient 
}: ClientTableViewProps) => {
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Client Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Interaction</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No clients found
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow 
                key={client.id}
                className="group hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onClientClick(client.id)}
              >
                <TableCell className="font-medium">
                  {client.name}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" /> 
                      {client.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-3 w-3 mr-1 text-muted-foreground" /> 
                      {client.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClientTypeStyles(client.type)}`}>
                    {client.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(client.status)}`}>
                    {client.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatLastInteraction(client.lastInteraction)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={(e) => onEditClient(client.id, e)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={(e) => onMessageClient(client.id, e)}
                    >
                      Message
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTableView; 