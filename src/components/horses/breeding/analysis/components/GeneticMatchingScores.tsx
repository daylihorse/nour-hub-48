
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dna, TrendingUp, AlertTriangle } from "lucide-react";

/**
 * Component: GeneticMatchingScores
 * 
 * PURPOSE:
 * Displays genetic compatibility analysis results for breeding pairs.
 * This component provides visual representation of genetic matching scores,
 * compatibility ratings, and inbreeding risk assessments to help make
 * informed breeding decisions.
 * 
 * ARCHITECTURAL PATTERN:
 * - Data visualization component using progress bars and score displays
 * - Statistical presentation pattern with multiple metrics
 * - Color-coded system for quick risk assessment
 * 
 * DESIGN PRINCIPLES:
 * - Visual hierarchy with clear score categorization
 * - Color coding for immediate risk assessment (green=good, red=risk)
 * - Progress bars for intuitive percentage understanding
 * - Icon usage for quick visual recognition of metrics
 * 
 * BREEDING ANALYSIS CONTEXT:
 * This component is part of the genetic analysis system that helps:
 * - Evaluate breeding pair compatibility
 * - Assess genetic diversity preservation
 * - Identify potential inbreeding risks
 * - Support breeding program optimization
 * 
 * SCORE INTERPRETATION:
 * - Compatibility Score: Higher is better (70-100% excellent, 50-70% good)
 * - Genetic Diversity: Higher preserves genetic health (80%+ ideal)
 * - Inbreeding Coefficient: Lower is better (under 6.25% recommended)
 * 
 * INTEGRATION CONTEXT:
 * Used within breeding analysis workflows where users evaluate
 * potential breeding pairs. Typically displayed alongside other
 * genetic analysis components for comprehensive assessment.
 * 
 * ACCESSIBILITY FEATURES:
 * - Color coding supplemented with numerical values
 * - Clear labeling for screen readers
 * - Descriptive text for score interpretation
 * - High contrast design for visibility
 */

interface GeneticMatchingScoresProps {
  /** 
   * Overall genetic compatibility score between breeding pair (0-100).
   * Higher scores indicate better genetic compatibility for breeding.
   * 
   * INTERPRETATION:
   * - 85-100: Excellent compatibility, highly recommended
   * - 70-84: Good compatibility, recommended
   * - 50-69: Fair compatibility, proceed with caution
   * - Below 50: Poor compatibility, not recommended
   */
  compatibilityScore: number;
  
  /** 
   * Genetic diversity preservation score (0-100).
   * Indicates how well the breeding preserves genetic variation
   * and contributes to breed health and vitality.
   * 
   * INTERPRETATION:
   * - 80-100: Excellent diversity preservation
   * - 60-79: Good diversity preservation
   * - 40-59: Moderate diversity preservation
   * - Below 40: Poor diversity preservation, genetic bottleneck risk
   */
  geneticDiversity: number;
  
  /** 
   * Inbreeding coefficient as percentage (0-100).
   * Lower values indicate less genetic relatedness between parents.
   * Critical for avoiding genetic disorders and maintaining vigor.
   * 
   * INTERPRETATION:
   * - 0-3.125%: Minimal inbreeding, excellent
   * - 3.125-6.25%: Low inbreeding, acceptable
   * - 6.25-12.5%: Moderate inbreeding, caution advised
   * - Above 12.5%: High inbreeding, not recommended
   */
  inbreedingCoefficient: number;
}

/**
 * Genetic Analysis Score Display Component
 * 
 * COMPONENT STRUCTURE:
 * GeneticMatchingScores (this component)
 *   └── Card (main container)
 *       ├── CardHeader (title with DNA icon)
 *       └── CardContent (score metrics grid)
 *           ├── Compatibility Score Section
 *           ├── Genetic Diversity Section
 *           └── Inbreeding Risk Section
 * 
 * VISUAL DESIGN ARCHITECTURE:
 * - Card-based layout for organized presentation
 * - DNA icon in header emphasizes genetic focus
 * - Grid layout for organized metric display
 * - Progress bars provide visual score representation
 * - Color-coded indicators for risk assessment
 * 
 * SCORING SYSTEM IMPLEMENTATION:
 * Each metric uses a consistent display pattern:
 * - Icon for visual identification
 * - Descriptive label for clarity
 * - Numerical score with percentage
 * - Progress bar for visual representation
 * - Color coding based on score ranges
 * 
 * COLOR CODING LOGIC:
 * - Green: Positive outcomes (high compatibility, high diversity, low inbreeding)
 * - Yellow/Orange: Moderate outcomes requiring attention
 * - Red: Negative outcomes requiring caution or avoidance
 * 
 * RESPONSIVE BEHAVIOR:
 * - Grid adapts to available space
 * - Progress bars scale appropriately
 * - Text remains legible at all sizes
 * - Icons maintain proper proportions
 */
const GeneticMatchingScores = ({ 
  compatibilityScore, 
  geneticDiversity, 
  inbreedingCoefficient 
}: GeneticMatchingScoresProps) => {
  
  /**
   * Determines the appropriate color scheme based on compatibility score.
   * 
   * SCORING LOGIC:
   * - Excellent (85+): Green theme for highly recommended breeding
   * - Good (70-84): Blue theme for recommended breeding
   * - Fair (50-69): Yellow theme for cautious recommendation
   * - Poor (<50): Red theme for not recommended
   */
  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  /**
   * Determines color scheme for genetic diversity score.
   * Higher diversity scores get green colors, lower scores get warning colors.
   */
  const getDiversityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  /**
   * Determines color scheme for inbreeding coefficient.
   * Lower inbreeding values get green colors, higher values get warning colors.
   */
  const getInbreedingColor = (coefficient: number) => {
    if (coefficient <= 3.125) return "text-green-600";
    if (coefficient <= 6.25) return "text-blue-600";
    if (coefficient <= 12.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      {/* 
        GENETIC ANALYSIS HEADER
        - DNA icon provides immediate visual context
        - Clear title explains the component's purpose
        - Consistent styling with other analysis components
      */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dna className="h-5 w-5 text-blue-500" />
          Genetic Matching Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* 
          METRICS DISPLAY GRID
          - Space-y-6 provides clear separation between different metrics
          - Each metric follows consistent layout pattern
          - Visual hierarchy established through typography and spacing
        */}
        <div className="space-y-6">
          
          {/* 
            COMPATIBILITY SCORE SECTION
            This is the primary metric for breeding recommendation.
            Higher scores indicate better genetic compatibility.
          */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Compatibility Score</span>
              </div>
              <span className={`text-lg font-bold ${getCompatibilityColor(compatibilityScore)}`}>
                {compatibilityScore.toFixed(1)}%
              </span>
            </div>
            {/* Progress bar provides visual representation of the score */}
            <Progress value={compatibilityScore} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Genetic compatibility between breeding pair
            </p>
          </div>

          {/* 
            GENETIC DIVERSITY SECTION
            Measures how well the breeding preserves genetic variation.
            Critical for long-term breed health and avoiding genetic bottlenecks.
          */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Dna className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Genetic Diversity</span>
              </div>
              <span className={`text-lg font-bold ${getDiversityColor(geneticDiversity)}`}>
                {geneticDiversity.toFixed(1)}%
              </span>
            </div>
            <Progress value={geneticDiversity} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Preservation of genetic variation in offspring
            </p>
          </div>

          {/* 
            INBREEDING COEFFICIENT SECTION
            Shows the level of genetic relatedness between parents.
            Lower values are better - higher values indicate breeding risks.
            
            NOTE: For inbreeding, we invert the progress bar calculation
            since lower coefficients are better (100 - coefficient).
          */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Inbreeding Risk</span>
              </div>
              <span className={`text-lg font-bold ${getInbreedingColor(inbreedingCoefficient)}`}>
                {inbreedingCoefficient.toFixed(2)}%
              </span>
            </div>
            {/* 
              Invert the progress bar since lower inbreeding is better.
              Display (100 - coefficient) so full bar represents low risk.
            */}
            <Progress value={Math.max(0, 100 - (inbreedingCoefficient * 4))} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Level of genetic relatedness (lower is better)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneticMatchingScores;
