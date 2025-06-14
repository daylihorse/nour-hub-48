
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Users,
  Plus,
  Search,
  Filter,
  User,
  Bell,
  Phone,
  Mail,
  FileText
} from "lucide-react";
import { mockClients } from "@/data/clients";
import { Client, ClientType, ClientStatus } from "@/types/client";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ClientsDepartment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientTypeFilter, setClientTypeFilter] = useState<ClientType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "All">("All");
  const navigate = useNavigate();

  const clientTypes: (ClientType | "All")[] = [
    "All", 
    "Horse Owner", 
    "Veterinarian", 
    "Supplier", 
    "Trainer", 
    "Staff", 
    "Other"
  ];
  
  const statuses: (ClientStatus | "All")[] = ["All", "Active", "Inactive"];

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    const matchesType = clientTypeFilter === "All" || client.type === clientTypeFilter;
    const matchesStatus = statusFilter === "All" || client.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatLastInteraction = (dateString?: string) => {
    if (!dateString) return "Never";
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
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

  const handleEditClient = (clientId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigate(`/dashboard/clients/${clientId}/edit`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate to edit page");
    }
  };

  const handleMessageClient = (clientId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigate(`/dashboard/messages/${clientId}`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate to messages");
    }
  };

  const handleClientClick = (clientId: string) => {
    try {
      navigate(`/dashboard/clients/${clientId}`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to view client profile");
    }
  };

  const handleAddNewClient = () => {
    try {
      navigate("/dashboard/clients/new");
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate to new client form");
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">
              Manage your clients and their information
            </p>
          </div>
        </div>
        <Button onClick={handleAddNewClient} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Add New Client
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Client Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="w-40">
                <Select 
                  value={clientTypeFilter} 
                  onValueChange={(value) => setClientTypeFilter(value as ClientType | "All")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Client Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-32">
                <Select 
                  value={statusFilter} 
                  onValueChange={(value) => setStatusFilter(value as ClientStatus | "All")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

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
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No clients found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow 
                      key={client.id}
                      className="group hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleClientClick(client.id)}
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
                            onClick={(e) => handleEditClient(client.id, e)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => handleMessageClient(client.id, e)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsDepartment;
