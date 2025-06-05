
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Edit, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface Contract {
  id: string;
  contractNumber: string;
  stallionName: string;
  mareName: string;
  mareOwner: string;
  contractDate: Date;
  breedingDate?: Date;
  status: string;
  studFee: number;
  livefoalGuarantee: boolean;
  contractExpiry: Date;
}

interface ContractsListProps {
  contracts: Contract[];
  onContractSelect: (contractId: string) => void;
  getStatusBadge: (status: string) => JSX.Element;
}

const ContractsList = ({ contracts, onContractSelect, getStatusBadge }: ContractsListProps) => {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Contracts Found</h3>
        <p className="text-muted-foreground">No breeding contracts match the current filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {contracts.map((contract) => (
        <Card key={contract.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{contract.contractNumber}</h3>
                <p className="text-sm text-muted-foreground">
                  {contract.stallionName} × {contract.mareName}
                </p>
              </div>
              {getStatusBadge(contract.status)}
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Mare Owner:</span>
                  <p className="font-medium">{contract.mareOwner}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Stud Fee:</span>
                  <p className="font-medium">${contract.studFee.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Contract: {format(contract.contractDate, "MMM dd, yyyy")}</span>
                </div>
                {contract.breedingDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Breeding: {format(contract.breedingDate, "MMM dd, yyyy")}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {contract.livefoalGuarantee && (
                  <Badge variant="outline" className="text-xs">
                    Live Foal Guarantee
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onContractSelect(contract.id)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContractsList;
