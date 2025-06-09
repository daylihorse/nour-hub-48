
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FlaskRound,
  Search,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Pill,
  User,
  Calendar
} from "lucide-react";

const LaboratoryIntegration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const labBasedPrescriptions = [
    {
      id: "LP001",
      labResultId: "LAB2024-055",
      horseName: "Thunder",
      horseId: "H001",
      testType: "Complete Blood Count",
      testDate: "2024-01-14",
      resultDate: "2024-01-15",
      veterinarian: "Dr. Sarah Smith",
      keyFindings: [
        { parameter: "White Blood Cells", value: "12,500", normal: "6,000-12,000", status: "high" },
        { parameter: "Neutrophils", value: "8,200", normal: "2,700-6,500", status: "high" }
      ],
      recommendedMedications: [
        { 
          name: "Penicillin Injectable", 
          dosage: "5ml IM", 
          frequency: "Twice daily", 
          duration: "7 days",
          reason: "Elevated WBC suggests bacterial infection"
        }
      ],
      prescriptionStatus: "pending_approval",
      urgency: "high",
      notes: "Elevated white blood cell count indicates possible infection. Recommend immediate antibiotic therapy."
    },
    {
      id: "LP002",
      labResultId: "LAB2024-056",
      horseName: "Lightning",
      horseId: "H002",
      testType: "Liver Function Panel",
      testDate: "2024-01-13",
      resultDate: "2024-01-14",
      veterinarian: "Dr. Mike Johnson",
      keyFindings: [
        { parameter: "ALT", value: "45", normal: "10-25", status: "high" },
        { parameter: "AST", value: "320", normal: "150-300", status: "high" }
      ],
      recommendedMedications: [
        { 
          name: "Milk Thistle Extract", 
          dosage: "30ml oral", 
          frequency: "Twice daily", 
          duration: "30 days",
          reason: "Support liver function recovery"
        },
        { 
          name: "Vitamin E", 
          dosage: "5000 IU", 
          frequency: "Once daily", 
          duration: "30 days",
          reason: "Antioxidant support for liver"
        }
      ],
      prescriptionStatus: "approved",
      urgency: "normal",
      notes: "Liver enzymes slightly elevated. Supportive therapy recommended."
    },
    {
      id: "LP003",
      labResultId: "LAB2024-057",
      horseName: "Storm",
      horseId: "H003",
      testType: "Thyroid Function",
      testDate: "2024-01-12",
      resultDate: "2024-01-13",
      veterinarian: "Dr. Sarah Smith",
      keyFindings: [
        { parameter: "T4", value: "1.2", normal: "2.0-4.0", status: "low" },
        { parameter: "TSH", value: "8.5", normal: "1.0-4.0", status: "high" }
      ],
      recommendedMedications: [
        { 
          name: "Levothyroxine", 
          dosage: "0.1mg", 
          frequency: "Once daily", 
          duration: "Ongoing",
          reason: "Hypothyroidism treatment"
        }
      ],
      prescriptionStatus: "dispensed",
      urgency: "normal",
      dispensedDate: "2024-01-13",
      notes: "Hypothyroidism confirmed. Long-term hormone replacement therapy initiated."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_approval": return "secondary";
      case "approved": return "default";
      case "dispensed": return "outline";
      default: return "secondary";
    }
  };

  const getParameterStatusColor = (status: string) => {
    switch (status) {
      case "high": return "text-red-600";
      case "low": return "text-blue-600";
      case "normal": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getParameterIcon = (status: string) => {
    switch (status) {
      case "high": return <TrendingUp className="h-3 w-3" />;
      case "low": return <TrendingDown className="h-3 w-3" />;
      case "normal": return <CheckCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-500";
      case "normal": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const filteredPrescriptions = labBasedPrescriptions.filter(prescription => {
    const matchesSearch = prescription.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.labResultId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || prescription.prescriptionStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FlaskRound className="h-6 w-6 text-purple-500" />
            Laboratory Integration
          </h2>
          <p className="text-muted-foreground">Create prescriptions based on laboratory results</p>
        </div>
        <Button>
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve All Pending
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lab results..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending_approval">Pending Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="dispensed">Dispensed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lab-Based Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id} className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FlaskRound className="h-5 w-5" />
                    {prescription.labResultId}
                    <Badge className={getUrgencyColor(prescription.urgency)}>
                      {prescription.urgency} priority
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {prescription.horseName}
                    </span>
                    <span>Test: {prescription.testType}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Result: {prescription.resultDate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getStatusColor(prescription.prescriptionStatus)} className="mb-2">
                    {prescription.prescriptionStatus.replace('_', ' ')}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Dr: {prescription.veterinarian}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Key Lab Findings */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Key Lab Findings
                  </p>
                  <div className="space-y-2">
                    {prescription.keyFindings.map((finding, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex items-center gap-2">
                          <span className={getParameterStatusColor(finding.status)}>
                            {getParameterIcon(finding.status)}
                          </span>
                          <span className="text-sm font-medium">{finding.parameter}</span>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${getParameterStatusColor(finding.status)}`}>
                            {finding.value}
                          </p>
                          <p className="text-xs text-muted-foreground">Normal: {finding.normal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Medications */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-500" />
                    Recommended Medications
                  </p>
                  <div className="space-y-2">
                    {prescription.recommendedMedications.map((med, index) => (
                      <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{med.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {med.dosage} - {med.frequency} for {med.duration}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
                          <strong>Indication:</strong> {med.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Notes */}
                <div>
                  <p className="text-sm font-medium mb-1">Clinical Notes</p>
                  <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-md">{prescription.notes}</p>
                </div>

                {prescription.prescriptionStatus === "dispensed" && prescription.dispensedDate && (
                  <div>
                    <p className="text-sm font-medium mb-1">Dispensed Information</p>
                    <p className="text-sm text-muted-foreground">Dispensed on {prescription.dispensedDate}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    View Full Lab Report
                  </Button>
                  {prescription.prescriptionStatus === "pending_approval" && (
                    <Button size="sm">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve Prescription
                    </Button>
                  )}
                  {prescription.prescriptionStatus === "approved" && (
                    <Button size="sm">
                      <Pill className="h-3 w-3 mr-1" />
                      Dispense Medications
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FlaskRound className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No laboratory-based prescriptions found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LaboratoryIntegration;
