
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";

interface InbreedingAnalysisProps {
  coefficient: number;
}

const InbreedingAnalysis = ({ coefficient }: InbreedingAnalysisProps) => {
  const getAnalysis = (coeff: number) => {
    if (coeff < 3) {
      return {
        level: "Low Risk",
        color: "text-green-600",
        icon: <CheckCircle className="h-4 w-4" />,
        description: "Minimal inbreeding detected. This pairing maintains good genetic diversity.",
        recommendations: [
          "Proceed with confidence",
          "Monitor standard health parameters",
          "Maintain breeding records for future reference"
        ],
        alertType: "default" as const
      };
    } else if (coeff < 6) {
      return {
        level: "Moderate Risk",
        color: "text-yellow-600", 
        icon: <Info className="h-4 w-4" />,
        description: "Some shared ancestry detected. Additional monitoring recommended.",
        recommendations: [
          "Consider genetic testing for specific conditions",
          "Implement enhanced health monitoring",
          "Consult with veterinary geneticist"
        ],
        alertType: "default" as const
      };
    } else {
      return {
        level: "High Risk",
        color: "text-red-600",
        icon: <AlertTriangle className="h-4 w-4" />,
        description: "Significant inbreeding detected. High caution advised.",
        recommendations: [
          "Consider alternative breeding pairs",
          "Mandatory genetic screening",
          "Veterinary consultation required"
        ],
        alertType: "destructive" as const
      };
    }
  };

  const analysis = getAnalysis(coefficient);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Inbreeding Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Coefficient Display */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold flex items-center justify-center gap-2">
            <span className={analysis.color}>{coefficient}%</span>
          </div>
          <Badge variant="outline" className={`${analysis.color} border-current`}>
            {analysis.level}
          </Badge>
        </div>

        {/* Analysis Alert */}
        <Alert variant={analysis.alertType}>
          <div className="flex items-start gap-2">
            {analysis.icon}
            <AlertDescription className="flex-1">
              {analysis.description}
            </AlertDescription>
          </div>
        </Alert>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recommended Actions:</h4>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reference Information */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Reference Guidelines</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>0-3%:</span>
              <span className="text-green-600">Acceptable</span>
            </div>
            <div className="flex justify-between">
              <span>3-6%:</span>
              <span className="text-yellow-600">Caution</span>
            </div>
            <div className="flex justify-between">
              <span>6%+:</span>
              <span className="text-red-600">High Risk</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InbreedingAnalysis;
