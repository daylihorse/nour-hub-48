
import GeneticMatchingScores from "./GeneticMatchingScores";
import InbreedingAnalysis from "./InbreedingAnalysis";

interface AnalysisResults {
  compatibilityScore: number;
  inbreedingCoefficient: number;
  geneticDiversity: number;
}

interface CompatibilityAnalysisProps {
  analysisResults: AnalysisResults;
}

const CompatibilityAnalysis = ({ analysisResults }: CompatibilityAnalysisProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GeneticMatchingScores 
        compatibilityScore={analysisResults.compatibilityScore}
        geneticDiversity={analysisResults.geneticDiversity}
        inbreedingCoefficient={analysisResults.inbreedingCoefficient}
      />
      <InbreedingAnalysis coefficient={analysisResults.inbreedingCoefficient} />
    </div>
  );
};

export default CompatibilityAnalysis;
