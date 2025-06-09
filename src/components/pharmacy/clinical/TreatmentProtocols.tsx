
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText,
  Search,
  Clock,
  AlertTriangle,
  CheckCircle,
  Pill,
  Calendar,
  Eye
} from "lucide-react";

const TreatmentProtocols = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("all");

  const protocols = [
    {
      id: "PROT001",
      title: "Respiratory Infection - Standard Protocol",
      condition: "respiratory",
      severity: "moderate",
      duration: "7-10 days",
      medications: [
        {
          name: "Penicillin Injectable",
          dosage: "20,000 IU/kg",
          frequency: "q12h",
          duration: "7 days",
          route: "IM"
        },
        {
          name: "Banamine Paste",
          dosage: "1.1 mg/kg",
          frequency: "q12h PRN",
          duration: "3 days max",
          route: "PO"
        }
      ],
      monitoring: [
        "Temperature daily",
        "Appetite and attitude",
        "Respiratory rate and effort",
        "Injection site reaction"
      ],
      contraindications: ["Penicillin allergy", "Severe renal disease"],
      notes: "Discontinue if no improvement after 48-72 hours. Consider culture and sensitivity testing."
    },
    {
      id: "PROT002",
      title: "Colic - Medical Management",
      condition: "gastrointestinal",
      severity: "mild_moderate",
      duration: "24-48 hours",
      medications: [
        {
          name: "Banamine Paste",
          dosage: "1.1 mg/kg",
          frequency: "q8-12h",
          duration: "24-48 hours",
          route: "PO"
        },
        {
          name: "Mineral Oil",
          dosage: "2-4 liters",
          frequency: "once",
          duration: "single dose",
          route: "Nasogastric tube"
        }
      ],
      monitoring: [
        "Pain level assessment",
        "Heart rate and respiratory rate",
        "Gut sounds",
        "Manure production",
        "Hydration status"
      ],
      contraindications: ["Severe dehydration", "Suspected gastric reflux"],
      notes: "Refer to surgery if no improvement in 2-4 hours or if pain worsens."
    },
    {
      id: "PROT003",
      title: "Joint Inflammation - Conservative Treatment",
      condition: "musculoskeletal",
      severity: "mild",
      duration: "5-7 days",
      medications: [
        {
          name: "Dexamethasone",
          dosage: "0.05-0.1 mg/kg",
          frequency: "q24h",
          duration: "3-5 days",
          route: "IV/IM"
        },
        {
          name: "Hyaluronic Acid",
          dosage: "20-40 mg",
          frequency: "weekly",
          duration: "3-4 treatments",
          route: "Intra-articular"
        }
      ],
      monitoring: [
        "Lameness grade",
        "Joint swelling and heat",
        "Range of motion",
        "Response to treatment"
      ],
      contraindications: ["Active joint infection", "Pregnancy"],
      notes: "Consider imaging if no improvement. Gradually return to exercise."
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild": return "bg-green-500";
      case "moderate": 
      case "mild_moderate": return "bg-orange-500";
      case "severe": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case "respiratory": return <Clock className="h-4 w-4" />;
      case "gastrointestinal": return <AlertTriangle className="h-4 w-4" />;
      case "musculoskeletal": return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredProtocols = protocols.filter(protocol => {
    const matchesSearch = protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = conditionFilter === 'all' || protocol.condition === conditionFilter;
    
    return matchesSearch && matchesCondition;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-green-500" />
            Treatment Protocols
          </h2>
          <p className="text-muted-foreground">Evidence-based treatment protocols and guidelines</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Create Protocol
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search protocols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="respiratory">Respiratory</SelectItem>
                <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
                <SelectItem value="musculoskeletal">Musculoskeletal</SelectItem>
                <SelectItem value="dermatological">Dermatological</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Protocols List */}
      <div className="space-y-4">
        {filteredProtocols.map((protocol) => (
          <Card key={protocol.id} className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getConditionIcon(protocol.condition)}
                    {protocol.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="capitalize">Condition: {protocol.condition}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Duration: {protocol.duration}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getSeverityColor(protocol.severity)} text-white mb-2`}>
                    {protocol.severity.replace('_', '-')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Medications */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    Medications
                  </p>
                  <div className="space-y-2">
                    {protocol.medications.map((med, index) => (
                      <div key={index} className="p-3 bg-muted rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{med.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {med.dosage} - {med.frequency} - {med.duration} ({med.route})
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monitoring */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Monitoring Parameters
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {protocol.monitoring.map((param, index) => (
                      <Badge key={index} variant="outline" className="justify-start">
                        {param}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contraindications */}
                {protocol.contraindications.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Contraindications
                    </p>
                    <div className="space-y-1">
                      {protocol.contraindications.map((contra, index) => (
                        <Badge key={index} variant="outline" className="mr-2 text-red-700 border-red-300">
                          {contra}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {protocol.notes && (
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700">
                      <strong>Clinical Notes:</strong> {protocol.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View Full Protocol
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Apply Protocol
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProtocols.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No treatment protocols found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TreatmentProtocols;
