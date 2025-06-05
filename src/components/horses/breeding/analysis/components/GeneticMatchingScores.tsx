import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Dna, Shield } from "lucide-react";

interface GeneticMatchingScoresProps {
  compatibilityScore: number;
  geneticDiversity: number;
  inbreedingCoefficient: number;
}

const GeneticMatchingScores = ({ 
  compatibilityScore, 
  geneticDiversity, 
  inbreedingCoefficient 
}: GeneticMatchingScoresProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getInbreedingRisk = (coefficient: number) => {
    if (coefficient < 3) return { level: "Low", color: "text-green-600" };
    if (coefficient < 6) return { level: "Moderate", color: "text-yellow-600" };
    return { level: "High", color: "text-red-600" };
  };

  const inbreedingRisk = getInbreedingRisk(inbreedingCoefficient);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          Genetic Compatibility Scores
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Compatibility */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold flex items-center justify-center gap-2">
            <span className={getScoreColor(compatibilityScore)}>{compatibilityScore}%</span>
            <Badge variant="outline" className="text-xs">
              Overall Match
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {compatibilityScore >= 80 ? "Excellent" : compatibilityScore >= 60 ? "Good" : "Poor"} genetic compatibility
          </p>
        </div>

        {/* Detailed Scores */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-2">
                <Dna className="h-4 w-4 text-purple-500" />
                Genetic Diversity
              </span>
              <span className={`text-sm font-bold ${getScoreColor(geneticDiversity)}`}>
                {geneticDiversity}%
              </span>
            </div>
            <Progress value={geneticDiversity} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Higher diversity reduces disease risk
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-500" />
                Inbreeding Coefficient
              </span>
              <span className={`text-sm font-bold ${inbreedingRisk.color}`}>
                {inbreedingCoefficient}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Risk Level:</span>
              <Badge variant="outline" className={inbreedingRisk.color}>
                {inbreedingRisk.level}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lower coefficients indicate less inbreeding
            </p>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Quick Insights</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Strong performance gene compatibility</li>
            <li>• Minimal shared ancestry concerns</li>
            <li>• Complementary trait profiles</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneticMatchingScores;
