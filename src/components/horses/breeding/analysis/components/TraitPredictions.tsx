
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Heart, Trophy, Brain } from "lucide-react";

interface TraitPredictionsProps {
  traits: {
    performance: number;
    conformation: number;
    temperament: number;
    health: number;
  };
}

const TraitPredictions = ({ traits }: TraitPredictionsProps) => {
  const getTraitIcon = (trait: string) => {
    switch (trait) {
      case "performance": return <Zap className="h-4 w-4 text-yellow-500" />;
      case "conformation": return <Trophy className="h-4 w-4 text-blue-500" />;
      case "temperament": return <Brain className="h-4 w-4 text-purple-500" />;
      case "health": return <Heart className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getTraitLevel = (score: number) => {
    if (score >= 85) return { level: "Excellent", color: "text-green-600" };
    if (score >= 70) return { level: "Good", color: "text-blue-600" };
    if (score >= 55) return { level: "Average", color: "text-yellow-600" };
    return { level: "Below Average", color: "text-red-600" };
  };

  const traitDetails = {
    performance: {
      description: "Athletic ability and competitive potential",
      factors: ["Speed genetics", "Endurance markers", "Muscle fiber composition"]
    },
    conformation: {
      description: "Physical structure and breed standards",
      factors: ["Bone structure genes", "Height prediction", "Proportional balance"]
    },
    temperament: {
      description: "Behavioral traits and trainability",
      factors: ["Calm disposition", "Learning ability", "Human bonding"]
    },
    health: {
      description: "Overall health and disease resistance",
      factors: ["Immune system strength", "Metabolic health", "Longevity markers"]
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Predicted Offspring Traits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(traits).map(([trait, score]) => {
              const traitInfo = getTraitLevel(score);
              return (
                <div key={trait} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTraitIcon(trait)}
                      <span className="font-medium capitalize">{trait}</span>
                    </div>
                    <Badge variant="outline" className={traitInfo.color}>
                      {traitInfo.level}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Predicted Score</span>
                      <span className={`font-bold ${traitInfo.color}`}>{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {traitDetails[trait as keyof typeof traitDetails].description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Trait Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(traitDetails).map(([trait, details]) => (
          <Card key={trait}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {getTraitIcon(trait)}
                <span className="capitalize">{trait} Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{details.description}</p>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Key Genetic Factors:</h4>
                <ul className="space-y-1">
                  {details.factors.map((factor, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm">
                  <span className="font-medium">Prediction Confidence: </span>
                  <span className="text-muted-foreground">
                    {traits[trait as keyof typeof traits] >= 80 ? "High" : "Moderate"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TraitPredictions;
