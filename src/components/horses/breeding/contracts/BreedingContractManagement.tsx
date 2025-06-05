
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, DollarSign, Calendar, AlertTriangle } from "lucide-react";
import ContractsList from "./components/ContractsList";
import ContractForm from "./components/ContractForm";
import ContractDetails from "./components/ContractDetails";

interface BreedingContract {
  id: string;
  contractNumber: string;
  stallionId: string;
  stallionName: string;
  mareId: string;
  mareName: string;
  mareOwner: string;
  contractDate: Date;
  breedingDate?: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'breached';
  studFee: number;
  livefoalGuarantee: boolean;
  returnPrivilege: boolean;
  paymentTerms: string;
  specialConditions?: string;
  veterinarian?: string;
  insuranceRequired: boolean;
  contractExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BreedingContractManagement = () => {
  const [activeTab, setActiveTab] = useState("contracts");
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [showContractForm, setShowContractForm] = useState(false);

  const contracts: BreedingContract[] = [
    {
      id: "BC001",
      contractNumber: "SVC-2024-001",
      stallionId: "S001",
      stallionName: "Thunder",
      mareId: "M001",
      mareName: "Whisper",
      mareOwner: "Sarah Johnson",
      contractDate: new Date("2024-01-15"),
      breedingDate: new Date("2024-02-20"),
      status: "active",
      studFee: 5000,
      livefoalGuarantee: true,
      returnPrivilege: true,
      paymentTerms: "50% on signing, 50% on confirmation of pregnancy",
      specialConditions: "Mare must be vaccinated 30 days prior to breeding",
      veterinarian: "Dr. Smith",
      insuranceRequired: true,
      contractExpiry: new Date("2024-12-31"),
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15")
    },
    {
      id: "BC002",
      contractNumber: "SVC-2024-002",
      stallionId: "S002",
      stallionName: "Lightning",
      mareId: "M002",
      mareName: "Grace",
      mareOwner: "Michael Brown",
      contractDate: new Date("2024-01-20"),
      status: "pending",
      studFee: 3500,
      livefoalGuarantee: false,
      returnPrivilege: false,
      paymentTerms: "Payment due 30 days from contract signing",
      veterinarian: "Dr. Johnson",
      insuranceRequired: false,
      contractExpiry: new Date("2024-06-30"),
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-20")
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: "outline" as const, label: "Pending", color: "text-yellow-600" },
      active: { variant: "default" as const, label: "Active", color: "text-green-600" },
      completed: { variant: "secondary" as const, label: "Completed", color: "text-blue-600" },
      cancelled: { variant: "destructive" as const, label: "Cancelled", color: "text-red-600" },
      breached: { variant: "destructive" as const, label: "Breached", color: "text-red-600" }
    };
    
    return (
      <Badge variant={statusMap[status as keyof typeof statusMap]?.variant || "outline"}>
        {statusMap[status as keyof typeof statusMap]?.label || status}
      </Badge>
    );
  };

  const contractStats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'active').length,
    pending: contracts.filter(c => c.status === 'pending').length,
    completed: contracts.filter(c => c.status === 'completed').length,
    totalValue: contracts.reduce((sum, c) => sum + c.studFee, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Breeding Contract Management</h2>
          <p className="text-muted-foreground">
            Manage stallion service contracts and breeding agreements
          </p>
        </div>
        <Button 
          onClick={() => setShowContractForm(true)} 
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Contract
        </Button>
      </div>

      {/* Contract Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{contractStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold">{contractStats.active}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-6 w-6 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold">{contractStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{contractStats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">${contractStats.totalValue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contracts">All Contracts</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="expired">Expiring Soon</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6">
          <ContractsList 
            contracts={contracts}
            onContractSelect={setSelectedContract}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <ContractsList 
            contracts={contracts.filter(c => c.status === 'active')}
            onContractSelect={setSelectedContract}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <ContractsList 
            contracts={contracts.filter(c => c.status === 'pending')}
            onContractSelect={setSelectedContract}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="expired" className="mt-6">
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Contract Expiry Monitoring</h3>
            <p className="text-muted-foreground">Monitor contracts nearing expiration dates</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Contract Form Dialog */}
      {showContractForm && (
        <ContractForm 
          onClose={() => setShowContractForm(false)}
          onSave={(contract) => {
            console.log("New contract:", contract);
            setShowContractForm(false);
          }}
        />
      )}

      {/* Contract Details Dialog */}
      {selectedContract && (
        <ContractDetails 
          contractId={selectedContract}
          contracts={contracts}
          onClose={() => setSelectedContract(null)}
          getStatusBadge={getStatusBadge}
        />
      )}
    </div>
  );
};

export default BreedingContractManagement;
