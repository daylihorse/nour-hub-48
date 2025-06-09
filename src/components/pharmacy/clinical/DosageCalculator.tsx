
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator,
  Weight,
  Pill,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

const DosageCalculator = () => {
  const [selectedMedication, setSelectedMedication] = useState("");
  const [horseWeight, setHorseWeight] = useState("");
  const [indication, setIndication] = useState("");
  const [calculatedDose, setCalculatedDose] = useState<any>(null);

  const medications = [
    {
      name: "Penicillin Injectable",
      dosages: {
        "respiratory_infection": { min: 10000, max: 20000, unit: "IU/kg", frequency: "q12h" },
        "soft_tissue_infection": { min: 15000, max: 25000, unit: "IU/kg", frequency: "q12h" }
      },
      warnings: ["Check for allergies", "IM injection only"],
      contraindications: ["Known penicillin allergy"]
    },
    {
      name: "Banamine Paste",
      dosages: {
        "colic": { min: 1.1, max: 1.1, unit: "mg/kg", frequency: "q12h", maxDuration: "3 days" },
        "inflammation": { min: 1.1, max: 2.2, unit: "mg/kg", frequency: "q12h", maxDuration: "5 days" }
      },
      warnings: ["Monitor for GI ulceration", "Avoid in dehydrated horses"],
      contraindications: ["Renal disease", "Severe dehydration"]
    },
    {
      name: "Dexamethasone",
      dosages: {
        "allergic_reaction": { min: 0.05, max: 0.2, unit: "mg/kg", frequency: "q24h" },
        "joint_inflammation": { min: 0.04, max: 0.08, unit: "mg/kg", frequency: "q24h" }
      },
      warnings: ["Immunosuppressive effects", "Monitor blood glucose"],
      contraindications: ["Active infection", "Pregnancy"]
    }
  ];

  const calculateDose = () => {
    const medication = medications.find(med => med.name === selectedMedication);
    const weight = parseFloat(horseWeight);
    
    if (!medication || !weight || !indication) return;

    const dosage = medication.dosages[indication as keyof typeof medication.dosages];
    if (!dosage) return;

    const minDose = dosage.min * weight;
    const maxDose = dosage.max * weight;

    setCalculatedDose({
      medication: medication.name,
      indication,
      weight,
      minDose,
      maxDose,
      unit: dosage.unit,
      frequency: dosage.frequency,
      maxDuration: dosage.maxDuration || "As directed",
      warnings: medication.warnings,
      contraindications: medication.contraindications
    });
  };

  const selectedMed = medications.find(med => med.name === selectedMedication);
  const availableIndications = selectedMed ? Object.keys(selectedMed.dosages) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-500" />
          Dosage Calculator
        </h2>
        <p className="text-muted-foreground">Calculate accurate dosages based on horse weight and indication</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Dosage Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medication">Select Medication</Label>
              <Select value={selectedMedication} onValueChange={setSelectedMedication}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose medication..." />
                </SelectTrigger>
                <SelectContent>
                  {medications.map((med) => (
                    <SelectItem key={med.name} value={med.name}>
                      {med.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2">
                <Weight className="h-4 w-4" />
                Horse Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight in kg"
                value={horseWeight}
                onChange={(e) => setHorseWeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="indication">Indication</Label>
              <Select value={indication} onValueChange={setIndication} disabled={!selectedMedication}>
                <SelectTrigger>
                  <SelectValue placeholder="Select indication..." />
                </SelectTrigger>
                <SelectContent>
                  {availableIndications.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind.replace('_', ' ').toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={calculateDose} 
              className="w-full"
              disabled={!selectedMedication || !horseWeight || !indication}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Dosage
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Dosage Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!calculatedDose ? (
              <div className="text-center py-8">
                <Calculator className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Enter medication details to calculate dosage</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Dosage Information */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-900 mb-2">{calculatedDose.medication}</p>
                  <p className="text-sm text-blue-700 mb-2">
                    Indication: {calculatedDose.indication.replace('_', ' ').toUpperCase()}
                  </p>
                  <p className="text-sm text-blue-700 mb-2">
                    Horse Weight: {calculatedDose.weight} kg
                  </p>
                  
                  <div className="bg-blue-100 p-3 rounded-md">
                    <p className="font-bold text-lg text-blue-900">
                      {calculatedDose.minDose === calculatedDose.maxDose 
                        ? `${calculatedDose.minDose.toFixed(2)} ${calculatedDose.unit.split('/')[0]}`
                        : `${calculatedDose.minDose.toFixed(2)} - ${calculatedDose.maxDose.toFixed(2)} ${calculatedDose.unit.split('/')[0]}`
                      }
                    </p>
                    <p className="text-sm text-blue-700">
                      Frequency: {calculatedDose.frequency}
                    </p>
                    <p className="text-sm text-blue-700">
                      Max Duration: {calculatedDose.maxDuration}
                    </p>
                  </div>
                </div>

                {/* Warnings */}
                {calculatedDose.warnings.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Warnings
                    </p>
                    {calculatedDose.warnings.map((warning: string, index: number) => (
                      <Badge key={index} variant="outline" className="mr-2 text-orange-700 border-orange-300">
                        {warning}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Contraindications */}
                {calculatedDose.contraindications.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Contraindications
                    </p>
                    {calculatedDose.contraindications.map((contra: string, index: number) => (
                      <Badge key={index} variant="outline" className="mr-2 text-red-700 border-red-300">
                        {contra}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-medium">Important Notes:</p>
                      <p>Always verify dosages with current veterinary guidelines. Consider individual patient factors and concurrent medications.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DosageCalculator;
