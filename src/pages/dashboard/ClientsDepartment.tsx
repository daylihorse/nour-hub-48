
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Users,
  Plus,
  Search,
} from "lucide-react";
import { Client, ClientTypeDisplay, ClientStatusDisplay } from "@/types/client";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import ClientViewSelector, { ViewMode, GridSize } from "@/components/clients/ClientViewSelector";
import ClientGridView from "@/components/clients/ClientGridView";
import ClientListView from "@/components/clients/ClientListView";
import ClientTableView from "@/components/clients/ClientTableView";
import { useClients } from "@/hooks/useClients";

const ClientsDepartment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientTypeFilter, setClientTypeFilter] = useState<ClientTypeDisplay | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ClientStatusDisplay | "All">("All");
  const [currentView, setCurrentView] = useState<ViewMode>("table");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const navigate = useNavigate();

  // Use the database hook instead of mock data
  const { clients, loading } = useClients();

  const clientTypes: (ClientTypeDisplay | "All")[] = [
    "All", 
    "Horse Owner", 
    "Veterinarian", 
    "Supplier", 
    "Trainer", 
    "Staff", 
    "Other"
  ];
  
  const statuses: (ClientStatusDisplay | "All")[] = ["All", "Active", "Inactive"];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (client.phone && client.phone.includes(searchTerm));
    
    const matchesType = clientTypeFilter === "All" || client.type === clientTypeFilter;
    const matchesStatus = statusFilter === "All" || client.statusDisplay === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

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

  const renderCurrentView = () => {
    const commonProps = {
      clients: filteredClients,
      onClientClick: handleClientClick,
      onEditClient: handleEditClient,
      onMessageClient: handleMessageClient,
    };

    switch (currentView) {
      case "grid":
        return <ClientGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <ClientListView {...commonProps} />;
      case "table":
      default:
        return <ClientTableView {...commonProps} />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-muted-foreground">Loading clients...</div>
        </div>
      </div>
    );
  }

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
          <div className="flex flex-col gap-4 mb-6">
            {/* Search and Filters Row */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
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
                    onValueChange={(value) => setClientTypeFilter(value as ClientTypeDisplay | "All")}
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
                    onValueChange={(value) => setStatusFilter(value as ClientStatusDisplay | "All")}
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

            {/* View Selector Row */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}
              </div>
              <ClientViewSelector
                currentView={currentView}
                onViewChange={setCurrentView}
                gridSize={gridSize}
                onGridSizeChange={setGridSize}
              />
            </div>
          </div>

          {/* Render Current View */}
          {renderCurrentView()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsDepartment;
