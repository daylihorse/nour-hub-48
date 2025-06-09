
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle,
  Search,
  Plus,
  X,
  Zap,
  Info,
  CheckCircle,
  Clock
} from "lucide-react";

const DrugInteractionChecker = () => {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [horseFilter, setHorseFilter] = useState("all");

  const availableMedications = [
    "Penicillin Injectable",
    "Banamine Paste",
    "Dexamethasone", 
    "Tramadol",
    "Ketamine",
    "Bute Tablets",
    "Vitamin E & Selenium",
    "Ivermectin",
    "Morphine Sulfate"
  ];

  const interactions = [
    {
      id: "INT001",
      medications: ["Banamine Paste", "Bute Tablets"],
      severity: "major",
      type: "additive_toxicity",
      description: "Concurrent use may increase risk of gastrointestinal ulceration and kidney damage",
      recommendation: "Avoid concurrent use. If necessary, monitor closely for signs of GI distress",
      clinicalImportance: "High",
      mechanism: "Both are NSAIDs with similar toxicity profiles"
    },
    {
      id: "INT002", 
      medications: ["Dexamethasone", "Penicillin Injectable"],
      severity: "moderate",
      type: "efficacy_reduction",
      description: "Corticosteroids may reduce immune response and antibiotic effectiveness",
      recommendation: "Monitor treatment response closely. Consider extending antibiotic course",
      clinicalImportance: "Medium",
      mechanism: "Immunosuppression may interfere with antibiotic action"
    },
    {
      id: "INT003",
      medications: ["Tramadol", "Ketamine"],
      severity: "minor",
      type: "pharmacokinetic",
      description: "May have additive CNS depressant effects",
      recommendation: "Monitor for excessive sedation. Adjust doses as needed",
      clinicalImportance: "Low",
      mechanism: "Both affect central nervous system"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "major": return "bg-red-500";
      case "moderate": return "bg-orange-500";
      case "minor": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "additive_toxicity": return <AlertTriangle className="h-4 w-4" />;
      case "efficacy_reduction": return <Zap className="h-4 w-4" />;
      case "pharmacokinetic": return <Clock className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const addMedication = (medication: string) => {
    if (!selectedMedications.includes(medication)) {
      setSelectedMedications([...selectedMedications, medication]);
    }
  };

  const removeMedication = (medication: string) => {
    setSelectedMedications(selectedMedications.filter(med => med !== medication));
  };

  const checkInteractions = () => {
    return interactions.filter(interaction => 
      interaction.medications.every(med => selectedMedications.includes(med))
    );
  };

  const detectedInteractions = checkInteractions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-orange-500" />
            Drug Interaction Checker
          </h2>
          <p className="text-muted-foreground">Analyze potential drug interactions and contraindications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medication Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Select Medications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Available Medications */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Available Medications:</p>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {availableMedications
                  .filter(med => med.toLowerCase().includes(searchTerm.toLowerCase()))
                  .filter(med => !selectedMedications.includes(med))
                  .map((medication) => (
                    <div key={medication} className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">{medication}</span>
                      <Button size="sm" onClick={() => addMedication(medication)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Selected Medications */}
            {selectedMedications.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Medications:</p>
                <div className="space-y-2">
                  {selectedMedications.map((medication) => (
                    <div key={medication} className="flex items-center justify-between p-2 bg-blue-50 border rounded-md">
                      <span className="text-sm font-medium">{medication}</span>
                      <Button size="sm" variant="outline" onClick={() => removeMedication(medication)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interaction Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Interaction Analysis
              {detectedInteractions.length > 0 && (
                <Badge className="bg-red-500 text-white">
                  {detectedInteractions.length} found
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMedications.length < 2 ? (
              <div className="text-center py-8">
                <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select at least 2 medications to check for interactions</p>
              </div>
            ) : detectedInteractions.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <p className="text-green-600 font-medium">No known interactions detected</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The selected medications appear safe to use together
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {detectedInteractions.map((interaction) => (
                  <div key={interaction.id} className="p-4 border rounded-lg bg-red-50 border-red-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        {getTypeIcon(interaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getSeverityColor(interaction.severity)} text-white`}>
                            {interaction.severity} risk
                          </Badge>
                          <Badge variant="outline">
                            {interaction.clinicalImportance} importance
                          </Badge>
                        </div>
                        <p className="font-medium text-sm mb-2">
                          {interaction.medications.join(" + ")}
                        </p>
                        <p className="text-sm text-red-700 mb-2">
                          {interaction.description}
                        </p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium text-gray-600">Mechanism:</p>
                            <p className="text-xs text-gray-700">{interaction.mechanism}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600">Recommendation:</p>
                            <p className="text-xs text-gray-700">{interaction.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrugInteractionChecker;
