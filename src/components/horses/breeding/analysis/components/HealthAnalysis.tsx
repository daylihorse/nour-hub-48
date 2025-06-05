
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Heart, Zap } from "lucide-react";

interface AnalysisResults {
  healthRisk: string;
  riskFactors: string[];
  strengths: string[];
}

interface HealthAnalysisProps {
  analysisResults: AnalysisResults;
}

const HealthAnalysis = ({ analysisResults }: HealthAnalysisProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Health Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Badge variant="outline" className="text-green-600 border-green-600">
              {analysisResults.healthRisk} Risk
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Risk Factors
              </h4>
              <ul className="space-y-1">
                {analysisResults.riskFactors.map((risk, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {risk}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                Genetic Strengths
              </h4>
              <ul className="space-y-1">
                {analysisResults.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Genetic Health Scoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cardiovascular Health</span>
                <span className="font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Bone & Joint Health</span>
                <span className="font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Respiratory Health</span>
                <span className="font-medium">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Immune System</span>
                <span className="font-medium">91%</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAnalysis;
