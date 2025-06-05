
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreedingPairSelection from "./components/BreedingPairSelection";
import CompatibilityAnalysis from "./components/CompatibilityAnalysis";
import HealthAnalysis from "./components/HealthAnalysis";
import BreedingRecommendations from "./components/BreedingRecommendations";
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

  const handleAnalyze = () => {
    // Analysis logic would go here
    console.log("Running genetic analysis for:", selectedMare, selectedStallion);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Genetic Analysis & Breeding Recommendations</h2>
        <p className="text-muted-foreground">
          Advanced genetic compatibility analysis for optimal breeding decisions
        </p>
      </div>

      <BreedingPairSelection
        mares={mares}
        stallions={stallions}
        selectedMare={selectedMare}
        selectedStallion={selectedStallion}
        onMareSelect={setSelectedMare}
        onStallionSelect={setSelectedStallion}
        onAnalyze={handleAnalyze}
      />

      {canAnalyze && (
        <Tabs defaultValue="compatibility" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
            <TabsTrigger value="traits">Trait Predictions</TabsTrigger>
            <TabsTrigger value="health">Health Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="compatibility" className="mt-6">
            <CompatibilityAnalysis analysisResults={analysisResults} />
          </TabsContent>

          <TabsContent value="traits" className="mt-6">
            <TraitPredictions traits={analysisResults.expectedTraits} />
          </TabsContent>

          <TabsContent value="health" className="mt-6">
            <HealthAnalysis analysisResults={analysisResults} />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <BreedingRecommendations />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default GeneticAnalysis;
