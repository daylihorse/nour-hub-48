
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

/**
 * Component: InbreedingAnalysis
 * 
 * PURPOSE:
 * Provides detailed analysis and interpretation of inbreeding coefficients
 * for breeding decisions. This component helps users understand the genetic
 * risks associated with breeding related horses and provides actionable
 * recommendations based on coefficient levels.
 * 
 * ARCHITECTURAL PATTERN:
 * - Analysis and recommendation component pattern
 * - Risk assessment visualization with color-coded indicators
 * - Educational component that explains genetic concepts
 * 
 * DESIGN PRINCIPLES:
 * - Clear risk categorization with visual indicators
 * - Educational approach explaining genetic concepts
 * - Actionable recommendations for breeding decisions
 * - Progressive disclosure of information complexity
 * 
 * GENETIC SCIENCE BACKGROUND:
 * Inbreeding coefficient measures the probability that two alleles
 * at any given locus are identical by descent. In horse breeding:
 * - 0-3.125%: Equivalent to breeding half-siblings once removed
 * - 3.125-6.25%: Equivalent to breeding half-siblings  
 * - 6.25%: Equivalent to breeding first cousins
 * - 12.5%: Equivalent to breeding half-siblings
 * - 25%: Equivalent to breeding full siblings or parent-offspring
 * 
 * BREEDING IMPLICATIONS:
 * Higher inbreeding coefficients can lead to:
 * - Reduced genetic diversity
 * - Increased risk of genetic disorders
 * - Decreased vigor and performance
 * - Reduced fertility and immune function
 * 
 * INTEGRATION CONTEXT:
 * Used alongside GeneticMatchingScores to provide comprehensive
 * genetic analysis for breeding decisions. Helps breeders understand
 * the specific risks and benefits of particular pairings.
 * 
 * ACCESSIBILITY FEATURES:
 * - Color coding supplemented with icons and text
 * - Clear risk level categorization
 * - Descriptive recommendations for each risk level
 * - Progressive information disclosure
 */

interface InbreedingAnalysisProps {
  /** 
   * Inbreeding coefficient as percentage (0-100).
   * This represents the probability that two alleles at any locus
   * are identical by descent from common ancestors.
   * 
   * CALCULATION CONTEXT:
   * Typically calculated using pedigree analysis going back
   * 4-6 generations. Higher values indicate closer genetic
   * relationship between the proposed breeding pair.
   * 
   * INDUSTRY STANDARDS:
   * - Most breed registries recommend keeping below 6.25%
   * - Some competitive disciplines prefer below 3.125%
   * - Values above 12.5% are generally considered high risk
   */
  coefficient: number;
}

/**
 * Detailed Inbreeding Risk Analysis Component
 * 
 * COMPONENT STRUCTURE:
 * InbreedingAnalysis (this component)
 *   └── Card (main container)
 *       ├── CardHeader (title and coefficient display)
 *       └── CardContent (risk analysis and recommendations)
 *           ├── Risk Level Indicator
 *           ├── Progress Bar Visualization
 *           ├── Risk Category Description
 *           └── Breeding Recommendations
 * 
 * RISK CATEGORIZATION SYSTEM:
 * The component categorizes inbreeding levels into four risk categories:
 * 1. Minimal Risk (0-3.125%): Safe for breeding, minimal concerns
 * 2. Low Risk (3.125-6.25%): Acceptable with monitoring
 * 3. Moderate Risk (6.25-12.5%): Proceed with caution
 * 4. High Risk (12.5%+): Generally not recommended
 * 
 * VISUAL DESIGN ARCHITECTURE:
 * - Card layout for organized information presentation
 * - Alert triangle icon emphasizes the analytical nature
 * - Color-coded risk indicators for immediate assessment
 * - Progress bar shows coefficient relative to maximum acceptable levels
 * - Structured text provides detailed explanations
 * 
 * EDUCATIONAL APPROACH:
 * The component serves both analytical and educational purposes:
 * - Explains what inbreeding coefficients mean
 * - Provides context for the calculated values
 * - Offers specific recommendations for breeding decisions
 * - Helps users understand genetic breeding principles
 */
const InbreedingAnalysis = ({ coefficient }: InbreedingAnalysisProps) => {
  
  /**
   * Determines the risk level category based on coefficient value.
   * Returns an object containing risk assessment details including
   * level, color scheme, icon, and descriptive information.
   * 
   * RISK LEVEL DEFINITIONS:
   * - minimal: 0-3.125% (equivalent to distant relatives)
   * - low: 3.125-6.25% (equivalent to second cousins)
   * - moderate: 6.25-12.5% (equivalent to first cousins)
   * - high: 12.5%+ (equivalent to close relatives)
   */
  const getRiskLevel = (coeff: number) => {
    if (coeff <= 3.125) {
      return {
        level: "Minimal Risk",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle,
        description: "This inbreeding level is considered safe for breeding with minimal genetic concerns.",
        recommendation: "Proceed with confidence. This level of inbreeding is within acceptable limits and poses minimal risk to offspring health and vigor."
      };
    } else if (coeff <= 6.25) {
      return {
        level: "Low Risk", 
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: CheckCircle,
        description: "This inbreeding level is generally acceptable but should be monitored in breeding programs.",
        recommendation: "Acceptable for breeding. Monitor offspring closely and consider outcrossing in future generations to maintain genetic diversity."
      };
    } else if (coeff <= 12.5) {
      return {
        level: "Moderate Risk",
        color: "text-yellow-600", 
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: AlertCircle,
        description: "This inbreeding level requires careful consideration and may pose some genetic risks.",
        recommendation: "Proceed with caution. Consider genetic testing for known disorders and plan future outcrossing to reduce inbreeding in subsequent generations."
      };
    } else {
      return {
        level: "High Risk",
        color: "text-red-600",
        bgColor: "bg-red-50", 
        borderColor: "border-red-200",
        icon: AlertTriangle,
        description: "This inbreeding level is considered high risk and is generally not recommended for breeding.",
        recommendation: "Not recommended for breeding. Consider alternative breeding options to maintain genetic health and avoid potential genetic disorders."
      };
    }
  };

  const riskInfo = getRiskLevel(coefficient);
  const IconComponent = riskInfo.icon;

  return (
    <Card>
      {/* 
        ANALYSIS HEADER
        - Alert triangle icon indicates analytical/warning nature
        - Clear title explains the specific type of analysis
        - Coefficient prominently displayed for immediate reference
      */}
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Inbreeding Analysis
          </div>
          <span className={`text-xl font-bold ${riskInfo.color}`}>
            {coefficient.toFixed(2)}%
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          
          {/* 
            RISK LEVEL INDICATOR
            Color-coded card that immediately communicates the risk level
            with appropriate visual styling and iconography.
          */}
          <div className={`p-4 rounded-lg border ${riskInfo.bgColor} ${riskInfo.borderColor}`}>
            <div className="flex items-center gap-2 mb-2">
              <IconComponent className={`h-5 w-5 ${riskInfo.color}`} />
              <span className={`font-semibold ${riskInfo.color}`}>
                {riskInfo.level}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              {riskInfo.description}
            </p>
            <p className="text-sm font-medium text-gray-800">
              <strong>Recommendation:</strong> {riskInfo.recommendation}
            </p>
          </div>

          {/* 
            VISUAL COEFFICIENT REPRESENTATION
            Progress bar showing the coefficient relative to maximum safe levels.
            Uses 25% as maximum since that represents very close inbreeding.
          */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Inbreeding Level</span>
              <span>0% - 25% scale</span>
            </div>
            <Progress 
              value={Math.min((coefficient / 25) * 100, 100)} 
              className="h-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>No inbreeding</span>
              <span>Close relatives</span>
            </div>
          </div>

          {/* 
            EDUCATIONAL INFORMATION
            Provides context about what inbreeding coefficients mean
            and their implications for breeding programs.
          */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Understanding Inbreeding Coefficients:</strong> This percentage represents 
              the probability that two alleles at any genetic locus are identical by descent 
              from common ancestors.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>• 0-3.125%: Minimal risk</div>
              <div>• 3.125-6.25%: Low risk</div>
              <div>• 6.25-12.5%: Moderate risk</div>
              <div>• 12.5%+: High risk</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InbreedingAnalysis;
