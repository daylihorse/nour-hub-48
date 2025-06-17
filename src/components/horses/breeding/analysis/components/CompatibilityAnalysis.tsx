
import GeneticMatchingScores from "./GeneticMatchingScores";
import InbreedingAnalysis from "./InbreedingAnalysis";

/**
 * Component: CompatibilityAnalysis
 * 
 * PURPOSE:
 * Provides comprehensive genetic compatibility analysis for breeding decisions
 * by combining multiple analysis components into a unified interface. This
 * component presents both genetic matching scores and detailed inbreeding
 * analysis to support informed breeding choices.
 * 
 * ARCHITECTURAL PATTERN:
 * - Composition component combining multiple analysis modules
 * - Grid-based layout for organized information presentation
 * - Data flow component that distributes analysis results
 * 
 * DESIGN PRINCIPLES:
 * - Comprehensive analysis presentation in digestible sections
 * - Responsive grid layout for optimal information density
 * - Visual hierarchy that guides user attention to key metrics
 * - Consistent spacing and organization across analysis types
 * 
 * BREEDING SCIENCE INTEGRATION:
 * This component brings together complementary genetic analyses:
 * - Genetic matching scores assess overall compatibility
 * - Inbreeding analysis evaluates genetic relationship risks
 * - Combined presentation enables holistic breeding decisions
 * - Scientific accuracy with user-friendly interpretation
 * 
 * USAGE CONTEXTS:
 * Used in breeding planning workflows where users need to:
 * - Evaluate potential breeding pairs before commitment
 * - Compare multiple stallion options for a specific mare
 * - Assess genetic risks and benefits of proposed matings
 * - Document breeding decisions with scientific backing
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile: Single column layout for focused analysis
 * - Tablet: Maintains single column for readability
 * - Desktop: Two-column layout for efficient space usage
 * - Large screens: Optimal side-by-side comparison view
 * 
 * DATA FLOW ARCHITECTURE:
 * - Receives consolidated analysis results from parent
 * - Distributes relevant data to specialized components
 * - Maintains consistent data format across analysis types
 * - Enables easy addition of new analysis modules
 * 
 * ACCESSIBILITY FEATURES:
 * - Logical reading order for screen readers
 * - Clear section boundaries and headings
 * - High contrast design for visual accessibility
 * - Keyboard navigation support for interactive elements
 */

interface AnalysisResults {
  /** 
   * Overall genetic compatibility score between breeding pair (0-100).
   * Higher scores indicate better genetic compatibility for breeding.
   * Used by GeneticMatchingScores component for primary assessment.
   */
  compatibilityScore: number;
  
  /** 
   * Inbreeding coefficient as percentage (0-100).
   * Lower values indicate less genetic relatedness between parents.
   * Critical for both components - drives risk assessment and recommendations.
   */
  inbreedingCoefficient: number;
  
  /** 
   * Genetic diversity preservation score (0-100).
   * Indicates how well the breeding preserves genetic variation.
   * Used by GeneticMatchingScores for comprehensive evaluation.
   */
  geneticDiversity: number;
}

interface CompatibilityAnalysisProps {
  /** 
   * Complete analysis results containing all genetic metrics.
   * This consolidated data structure enables consistent analysis
   * across multiple specialized components.
   * 
   * DATA SOURCE:
   * Typically calculated by genetic analysis services using:
   * - Pedigree analysis algorithms
   * - Genetic diversity calculations
   * - Inbreeding coefficient computation
   * - Compatibility scoring models
   * 
   * USAGE PATTERN:
   * ```tsx
   * const analysisResults = await calculateGeneticCompatibility(
   *   mareId, stallionId, generationDepth
   * );
   * 
   * <CompatibilityAnalysis analysisResults={analysisResults} />
   * ```
   */
  analysisResults: AnalysisResults;
}

/**
 * Comprehensive Genetic Compatibility Analysis Component
 * 
 * COMPONENT STRUCTURE:
 * CompatibilityAnalysis (this component)
 *   └── Responsive Grid Container
 *       ├── GeneticMatchingScores (left/top)
 *       │   ├── Compatibility Score Display
 *       │   ├── Genetic Diversity Metrics
 *       │   └── Inbreeding Risk Indicator
 *       └── InbreedingAnalysis (right/bottom)
 *           ├── Detailed Inbreeding Assessment
 *           ├── Risk Level Categorization
 *           └── Breeding Recommendations
 * 
 * LAYOUT ARCHITECTURE:
 * - CSS Grid with responsive column configuration
 * - Single column on mobile for focus and readability
 * - Two columns on large screens for comparison view
 * - Consistent gap spacing between analysis sections
 * 
 * INFORMATION HIERARCHY:
 * 1. Genetic Matching Scores - Quick overview metrics
 * 2. Inbreeding Analysis - Detailed risk assessment
 * 3. Visual progress indicators for immediate understanding
 * 4. Detailed recommendations for decision support
 * 
 * RESPONSIVE GRID BEHAVIOR:
 * - grid-cols-1: Mobile-first single column layout
 * - lg:grid-cols-2: Large screen two-column layout
 * - gap-6: Consistent spacing between components
 * - Automatic content reflow based on viewport
 * 
 * DATA DISTRIBUTION PATTERN:
 * Each child component receives the specific data it needs:
 * - GeneticMatchingScores: All three metrics for comprehensive view
 * - InbreedingAnalysis: Focused on inbreeding coefficient only
 * - Consistent data format ensures reliable component operation
 */
const CompatibilityAnalysis = ({ analysisResults }: CompatibilityAnalysisProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 
        GENETIC MATCHING SCORES SECTION
        Displays comprehensive genetic compatibility metrics including
        compatibility score, genetic diversity, and inbreeding coefficient
        in a unified dashboard format for quick assessment.
      */}
      <GeneticMatchingScores 
        compatibilityScore={analysisResults.compatibilityScore}
        geneticDiversity={analysisResults.geneticDiversity}
        inbreedingCoefficient={analysisResults.inbreedingCoefficient}
      />
      
      {/* 
        DETAILED INBREEDING ANALYSIS SECTION
        Provides in-depth analysis of inbreeding risks with
        detailed explanations, risk categorization, and
        specific breeding recommendations based on coefficient levels.
      */}
      <InbreedingAnalysis coefficient={analysisResults.inbreedingCoefficient} />
    </div>
  );
};

export default CompatibilityAnalysis;
