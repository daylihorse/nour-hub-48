import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Client } from "@/types/client";
import { Skeleton } from "@/components/ui/skeleton";

interface ClientsTableProps {
  clients: Client[];
  loading: boolean;
  onUpdateClient: (id: string, updates: Partial<Client>) => Promise<Client>;
  onDeleteClient: (id: string) => Promise<void>;
}

const ClientsTable = ({ clients, loading, onUpdateClient, onDeleteClient }: ClientsTableProps) => {
  const navigate = useNavigate();

  const handleViewClient = (clientId: string) => {
    navigate(`/dashboard/clients/${clientId}`);
  };

  const handleEditClient = (clientId: string) => {
    navigate(`/dashboard/clients/${clientId}/edit`);
  };

  const handleDeleteClient = async (clientId: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await onDeleteClient(clientId);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "Active" ? "default" : "secondary"}>
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "Horse Owner": "bg-blue-100 text-blue-800",
      "Veterinarian": "bg-green-100 text-green-800",
      "Supplier": "bg-purple-100 text-purple-800",
      "Trainer": "bg-orange-100 text-orange-800",
      "Staff": "bg-gray-100 text-gray-800",
      "Other": "bg-yellow-100 text-yellow-800",
    };

    return (
      <Badge className={colors[type] || colors["Other"]}>
        {type}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No clients found. Click "Add Client" to create your first client.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold">{client.name}</div>
                  {client.client_number && (
                    <div className="text-sm text-muted-foreground">
                      #{client.client_number}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {getTypeBadge(client.type)}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {client.email && (
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      {client.email}
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(client.statusDisplay)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewClient(client.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditClient(client.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteClient(client.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientsTable;
