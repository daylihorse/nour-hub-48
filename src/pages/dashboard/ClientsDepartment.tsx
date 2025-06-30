
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClientsTable from "@/components/clients/ClientsTable";
import ClientManagementGuard from "@/components/clients/ClientManagementGuard";
import { useEnhancedClients } from "@/hooks/useEnhancedClients";

const ClientsDepartment = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const { clients, loading, addClient, updateClient, deleteClient } = useEnhancedClients();

  const handleAddClient = () => {
    navigate("/dashboard/clients/new");
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    const matchesType = filterType === "all" || client.type === filterType;
    const matchesStatus = filterStatus === "all" || client.statusDisplay === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <ClientManagementGuard>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">
              Manage your clients and their information
            </p>
          </div>
          <Button onClick={handleAddClient}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Horse Owner">Horse Owner</SelectItem>
              <SelectItem value="Veterinarian">Veterinarian</SelectItem>
              <SelectItem value="Supplier">Supplier</SelectItem>
              <SelectItem value="Trainer">Trainer</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ClientsTable
          clients={filteredClients}
          loading={loading}
          onUpdateClient={updateClient}
          onDeleteClient={deleteClient}
        />
      </div>
    </ClientManagementGuard>
  );
};

export default ClientsDepartment;
