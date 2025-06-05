
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  User, 
  Heart, 
  Shield, 
  RefreshCw,
  Stethoscope,
  Edit,
  Download
} from "lucide-react";
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
  returnPrivilege: boolean;
  paymentTerms: string;
  specialConditions?: string;
  veterinarian?: string;
  insuranceRequired: boolean;
  contractExpiry: Date;
}

interface ContractDetailsProps {
  contractId: string;
  contracts: Contract[];
  onClose: () => void;
  getStatusBadge: (status: string) => JSX.Element;
}

const ContractDetails = ({ contractId, contracts, onClose, getStatusBadge }: ContractDetailsProps) => {
  const contract = contracts.find(c => c.id === contractId);

  if (!contract) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl">Contract Details</DialogTitle>
            <div className="flex items-center gap-2">
              {getStatusBadge(contract.status)}
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contract Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {contract.contractNumber}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Breeding Pair</h4>
                  <p className="text-lg">{contract.stallionName} × {contract.mareName}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mare Owner</h4>
                  <p className="text-lg">{contract.mareOwner}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Stud Fee</span>
                  <p className="text-xl font-bold">${contract.studFee.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className={contract.livefoalGuarantee ? "text-green-600" : "text-muted-foreground"}>
                    {contract.livefoalGuarantee ? "Live Foal Guarantee Included" : "No Live Foal Guarantee"}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Payment Terms</span>
                <p className="mt-1">{contract.paymentTerms}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contract Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Contract Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  <span className={contract.returnPrivilege ? "text-green-600" : "text-muted-foreground"}>
                    {contract.returnPrivilege ? "Return Privilege" : "No Return Privilege"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span className={contract.insuranceRequired ? "text-orange-600" : "text-muted-foreground"}>
                    {contract.insuranceRequired ? "Insurance Required" : "No Insurance Required"}
                  </span>
                </div>
                {contract.veterinarian && (
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-green-500" />
                    <span>Vet: {contract.veterinarian}</span>
                  </div>
                )}
              </div>

              {contract.specialConditions && (
                <div>
                  <span className="text-sm text-muted-foreground">Special Conditions</span>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{contract.specialConditions}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Contract Date</span>
                  <p className="font-medium">{format(contract.contractDate, "PPP")}</p>
                </div>
                {contract.breedingDate && (
                  <div>
                    <span className="text-sm text-muted-foreground">Breeding Date</span>
                    <p className="font-medium">{format(contract.breedingDate, "PPP")}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-muted-foreground">Contract Expiry</span>
                  <p className="font-medium">{format(contract.contractExpiry, "PPP")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDetails;
