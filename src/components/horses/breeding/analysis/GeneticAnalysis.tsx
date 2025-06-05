import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dna, TrendingUp, Award, AlertTriangle, Heart, Zap } from "lucide-react";
import GeneticMatchingScores from "./components/GeneticMatchingScores";
import InbreedingAnalysis from "./components/InbreedingAnalysis";
import TraitPredictions from "./components/TraitPredictions";

const GeneticAnalysis = () => {
  const [selectedMare, setSelectedMare] = useState("");
  const [selectedStallion, setSelectedStallion] = useState("");

  const mares = [
    { id: "M001", name: "Whisper", pedigree: "Known", geneticProfile: "Complete" },
    { id: "M002", name: "Grace", pedigree: "Known", geneticProfile: "Partial" },
    { id: "M003", name: "Bella", pedigree: "Known", geneticProfile: "Complete" },
  ];

  const stallions = [
    { id: "S001", name: "Thunder", pedigree: "Known", geneticProfile: "Complete" },
    { id: "S002", name: "Lightning", pedigree: "Known", geneticProfile: "Complete" },
    { id: "S003", name: "Storm", pedigree: "Known", geneticProfile: "Partial" },
  ];

  const analysisResults = {
    compatibilityScore: 87,
    inbreedingCoefficient: 2.3,
    geneticDiversity: 92,
    healthRisk: "Low",
    expectedTraits: {
      performance: 85,
      conformation: 78,
      temperament: 92,
      health: 88,
    },
    riskFactors: [
      "Minor respiratory sensitivity lineage",
      "Potential for joint stress at advanced age"
    ],
    strengths: [
      "Excellent cardiovascular genetics",
      "Strong bone density lineage",
      "Superior athletic performance genes"
    ]
  };

  const canAnalyze = selectedMare && selectedStallion;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Genetic Analysis & Breeding Recommendations</h2>
        <p className="text-muted-foreground">
          Advanced genetic compatibility analysis for optimal breeding decisions
        </p>
      </div>

      {/* Selection Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-purple-500" />
            Breeding Pair Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Mare</label>
              <Select value={selectedMare} onValueChange={setSelectedMare}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a mare" />
                </SelectTrigger>
                <SelectContent>
                  {mares.map((mare) => (
                    <SelectItem key={mare.id} value={mare.id}>
                      {mare.name} - {mare.geneticProfile} Profile
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Stallion</label>
              <Select value={selectedStallion} onValueChange={setSelectedStallion}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a stallion" />
                </SelectTrigger>
                <SelectContent>
                  {stallions.map((stallion) => (
                    <SelectItem key={stallion.id} value={stallion.id}>
                      {stallion.name} - {stallion.geneticProfile} Profile
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button disabled={!canAnalyze} className="flex items-center gap-2">
              <Dna className="h-4 w-4" />
              Run Genetic Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {canAnalyze && (
        <Tabs defaultValue="compatibility" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
            <TabsTrigger value="traits">Trait Predictions</TabsTrigger>
            <TabsTrigger value="health">Health Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="compatibility" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GeneticMatchingScores 
                compatibilityScore={analysisResults.compatibilityScore}
                geneticDiversity={analysisResults.geneticDiversity}
                inbreedingCoefficient={analysisResults.inbreedingCoefficient}
              />
              <InbreedingAnalysis coefficient={analysisResults.inbreedingCoefficient} />
            </div>
          </TabsContent>

          <TabsContent value="traits" className="mt-6">
            <TraitPredictions traits={analysisResults.expectedTraits} />
          </TabsContent>

          <TabsContent value="health" className="mt-6">
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
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Breeding Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Recommended Actions</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">PROCEED</span>
                        <span className="text-sm">Excellent genetic compatibility - proceed with breeding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">MONITOR</span>
                        <span className="text-sm">Monitor respiratory development in offspring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">CONSIDER</span>
                        <span className="text-sm">Consider additional nutritional support during pregnancy</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Optimal Breeding Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best breeding season:</span>
                        <span className="font-medium">Early Spring</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mare age consideration:</span>
                        <span className="font-medium">Optimal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stallion availability:</span>
                        <span className="font-medium">High demand period</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expected foaling:</span>
                        <span className="font-medium">Winter (ideal)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default GeneticAnalysis;
