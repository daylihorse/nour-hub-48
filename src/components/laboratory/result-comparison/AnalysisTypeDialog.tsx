
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestTube, Heart, Droplets, Bug, Liver, Kidney, Zap, Shield } from "lucide-react";

interface AnalysisTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (analysisType: string) => void;
  horseName: string | null;
}

const AnalysisTypeDialog = ({ isOpen, onClose, onSelect, horseName }: AnalysisTypeDialogProps) => {
  const analysisTypes = [
    {
      name: "Complete Blood Count",
      icon: TestTube,
      description: "Comprehensive blood cell analysis",
      parameters: ["White Blood Cells", "Red Blood Cells", "Hemoglobin", "Hematocrit"],
      testsAvailable: 8,
      color: "bg-red-100 text-red-600"
    },
    {
      name: "Blood Chemistry Panel", 
      icon: Heart,
      description: "Metabolic and organ function markers",
      parameters: ["Glucose", "BUN", "Creatinine", "ALT", "AST"],
      testsAvailable: 6,
      color: "bg-blue-100 text-blue-600"
    },
    {
      name: "Urinalysis",
      icon: Droplets,
      description: "Kidney function and urinary health",
      parameters: ["Protein", "Glucose", "Specific Gravity", "pH"],
      testsAvailable: 5,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      name: "Parasite Screening",
      icon: Bug,
      description: "Detection of internal parasites",
      parameters: ["Strongyles", "Roundworms", "Tapeworms"],
      testsAvailable: 4,
      color: "bg-green-100 text-green-600"
    },
    {
      name: "Liver Function Test",
      icon: Liver,
      description: "Liver enzyme and function assessment",
      parameters: ["ALT", "AST", "GGT", "Bilirubin"],
      testsAvailable: 3,
      color: "bg-purple-100 text-purple-600"
    },
    {
      name: "Kidney Function Test",
      icon: Kidney,
      description: "Renal function evaluation",
      parameters: ["BUN", "Creatinine", "Phosphorus"],
      testsAvailable: 3,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      name: "Thyroid Panel",
      icon: Zap,
      description: "Thyroid hormone levels",
      parameters: ["T3", "T4", "TSH"],
      testsAvailable: 2,
      color: "bg-orange-100 text-orange-600"
    },
    {
      name: "Drug Screen",
      icon: Shield,
      description: "Detection of prohibited substances",
      parameters: ["Stimulants", "Depressants", "Analgesics"],
      testsAvailable: 1,
      color: "bg-gray-100 text-gray-600"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Analysis Type for {horseName}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysisTypes.map((analysis) => {
            const Icon = analysis.icon;
            return (
              <div
                key={analysis.name}
                className="border rounded-lg p-4 hover:shadow-lg cursor-pointer transition-all hover:border-blue-300"
                onClick={() => onSelect(analysis.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${analysis.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{analysis.name}</h3>
                        <p className="text-sm text-muted-foreground">{analysis.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {analysis.testsAvailable} tests
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Parameters:</p>
                    <div className="flex flex-wrap gap-1">
                      {analysis.parameters.map((param, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Compare Results
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisTypeDialog;
