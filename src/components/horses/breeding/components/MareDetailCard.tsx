
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Heart, 
  Baby, 
  Activity, 
  Stethoscope,
  Eye,
  Edit,
  FileText
} from "lucide-react";
import { Mare } from "@/types/breeding/mare";

/**
 * Component: MareDetailCard
 * 
 * PURPOSE:
 * Displays comprehensive mare information in an enhanced card format for mare
 * management interfaces. This component provides detailed mare metrics, breeding
 * status, and quick access to common mare management actions.
 * 
 * ARCHITECTURAL PATTERN:
 * - Enhanced information card with comprehensive mare details
 * - Action-oriented component with multiple interaction points
 * - Status-aware display adapting to mare's current condition
 * 
 * DESIGN PRINCIPLES:
 * - Clear visual hierarchy emphasizing mare identification
 * - Status-driven color coding for immediate understanding
 * - Comprehensive information display without overwhelming
 * - Action buttons grouped by function and frequency of use
 * 
 * MARE MANAGEMENT CONTEXT:
 * This component supports comprehensive mare management by displaying:
 * - Basic mare identification and physical characteristics
 * - Breeding status and reproductive history
 * - Current pregnancy or nursing status information
 * - Health and veterinary status indicators
 * 
 * STATUS CATEGORIES:
 * The component handles various mare statuses:
 * - pregnant: Currently expecting foal with due date
 * - nursing: Currently nursing foal
 * - open: Available for breeding
 * - bred: Recently bred, awaiting pregnancy confirmation
 * - retired: No longer in breeding program
 * 
 * INTEGRATION CONTEXT:
 * Used within mare grid views, selection interfaces, and management
 * dashboards. Provides navigation to detailed mare pages and quick
 * access to common mare care and breeding actions.
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic card structure with proper heading hierarchy
 * - Color coding supplemented with descriptive text
 * - Clear button labeling with both icons and text
 * - High contrast design for important status information
 */

interface MareDetailCardProps {
  /** 
   * Complete mare information object containing all display data.
   * This should include current breeding status, health information,
   * and performance metrics.
   * 
   * USAGE PATTERN:
   * Data typically comes from mare management APIs and represents
   * current mare status including breeding cycle and health information.
   */
  mare: Mare;
  
  /** 
   * Handler for viewing detailed mare information.
   * Typically navigates to comprehensive mare detail page.
   * 
   * IMPLEMENTATION NOTE:
   * Should handle navigation with proper state management
   * for returning to the current view context.
   */
  onViewDetails: (mareId: string) => void;
  
  /** 
   * Handler for editing mare information.
   * Opens mare editing interface or navigation.
   * 
   * IMPLEMENTATION NOTE:
   * May open modal, sidebar, or navigate to edit page
   * depending on application's editing pattern.
   */
  onEditMare: (mareId: string) => void;
  
  /** 
   * Handler for scheduling mare health checkups.
   * Integrates with veterinary scheduling system.
   * 
   * IMPLEMENTATION NOTE:
   * Should integrate with calendar/scheduling systems
   * and veterinary management workflows.
   */
  onScheduleCheckup: (mareId: string) => void;
  
  /** 
   * Handler for viewing mare medical records.
   * Provides access to comprehensive health history.
   * 
   * IMPLEMENTATION NOTE:
   * Should integrate with medical record systems
   * and maintain proper access controls.
   */
  onViewMedicalRecords: (mareId: string) => void;
}

/**
 * Enhanced Mare Information Display Card Component
 * 
 * COMPONENT STRUCTURE:
 * MareDetailCard (this component)
 *   └── Card (main container with enhanced styling)
 *       ├── CardHeader (mare identification and status)
 *       ├── CardContent (detailed information grid)
 *       │   ├── Basic Information Section
 *       │   ├── Breeding Status Section
 *       │   ├── Performance Metrics Section
 *       │   └── Current Condition Section
 *       └── Action Buttons Grid (management operations)
 * 
 * LAYOUT ARCHITECTURE:
 * - Card container with enhanced hover effects and shadows
 * - Header with mare name prominence and status badge
 * - Content organized in logical information sections
 * - Grid-based metric display for quick scanning
 * - Footer action buttons organized by function
 * 
 * VISUAL DESIGN PATTERNS:
 * - Status-driven color theming throughout card
 * - Icon + information pattern for quick comprehension
 * - Conditional information display based on mare status
 * - Responsive grid layouts for different screen sizes
 * 
 * STATUS-AWARE DISPLAY:
 * The component adapts its display based on mare status:
 * - Pregnant mares show due date and pregnancy progress
 * - Nursing mares show nursing status and foal information
 * - Open mares show availability and cycle information
 * - Bred mares show breeding date and status
 * 
 * INFORMATION HIERARCHY:
 * 1. Mare identification (name, breed, age)
 * 2. Current status and condition
 * 3. Key performance metrics
 * 4. Relevant dates and scheduling information
 * 5. Quick action buttons for common operations
 */
const MareDetailCard = ({ 
  mare, 
  onViewDetails, 
  onEditMare, 
  onScheduleCheckup, 
  onViewMedicalRecords 
}: MareDetailCardProps) => {
  
  /**
   * Determines the appropriate color scheme for mare status badges.
   * 
   * STATUS COLOR MAPPING:
   * - pregnant: Blue for pregnancy status
   * - nursing: Green for nursing/motherhood status
   * - open: Yellow for available breeding status
   * - bred: Purple for recently bred status
   * - retired: Gray for retired mares
   */
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pregnant':
        return 'bg-blue-500';
      case 'nursing':
        return 'bg-green-500';
      case 'open':
        return 'bg-yellow-500';
      case 'bred':
        return 'bg-purple-500';
      case 'retired':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  /**
   * Formats dates for display in mare information.
   * Handles various date formats and provides fallback for invalid dates.
   */
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Not set';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  /**
   * Prevents event bubbling for action buttons to avoid card click conflicts.
   * This ensures button actions don't trigger card-level click handlers.
   */
  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* 
        MARE IDENTIFICATION HEADER
        - Mare name as primary identifier with emphasis
        - Status badge for immediate condition recognition
        - Breed and age for basic classification
      */}
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{mare.horseName}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {mare.breed} • {mare.age} years old
            </p>
          </div>
          <Badge className={`${getStatusColor(mare.status)} text-white`}>
            {mare.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* 
          COMPREHENSIVE MARE INFORMATION GRID
          Organized display of key mare metrics and status information.
          Grid layout adapts to screen size while maintaining readability.
        */}
        <div className="space-y-4">
          
          {/* 
            BREEDING PERFORMANCE METRICS
            Key performance indicators for breeding program assessment.
          */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Total foals produced - lifetime breeding success */}
            <div className="flex items-center gap-2">
              <Baby className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">{mare.totalFoals}</p>
                <p className="text-xs text-muted-foreground">Total Foals</p>
              </div>
            </div>
            
            {/* Current age - important for breeding viability */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">{mare.age} years</p>
                <p className="text-xs text-muted-foreground">Age</p>
              </div>
            </div>
          </div>

          {/* 
            STATUS-SPECIFIC INFORMATION
            Conditional display based on mare's current breeding status.
            Shows relevant information for each status category.
          */}
          <div className="space-y-2">
            
            {/* Expected due date for pregnant mares */}
            {mare.expectedDueDate && (
              <div className="flex items-center gap-2 text-sm p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">Expected Due Date:</span>
                <span className="font-medium">{formatDate(mare.expectedDueDate)}</span>
              </div>
            )}
            
            {/* Current stallion for bred/pregnant mares */}
            {mare.stallionName && (
              <div className="flex items-center gap-2 text-sm p-2 bg-purple-50 rounded-lg">
                <Activity className="h-4 w-4 text-purple-500" />
                <span className="text-muted-foreground">Sire:</span>
                <span className="font-medium">{mare.stallionName}</span>
              </div>
            )}
            
            {/* Last breeding date for tracking breeding cycles */}
            {mare.lastBreedingDate && (
              <div className="flex items-center gap-2 text-sm p-2 bg-green-50 rounded-lg">
                <Heart className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Last Breeding:</span>
                <span className="font-medium">{formatDate(mare.lastBreedingDate)}</span>
              </div>
            )}
          </div>

          {/* 
            MARE MANAGEMENT ACTION BUTTONS
            Organized by function and frequency of use.
            Grid layout ensures consistent spacing and accessibility.
          */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t">
            
            {/* Primary actions - viewing and editing mare information */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => handleButtonClick(e, () => onViewDetails(mare.id))}
              className="flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              View Details
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => handleButtonClick(e, () => onEditMare(mare.id))}
              className="flex items-center gap-1"
            >
              <Edit className="h-3 w-3" />
              Edit Mare
            </Button>
            
            {/* Health and veterinary actions */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => handleButtonClick(e, () => onScheduleCheckup(mare.id))}
              className="flex items-center gap-1"
            >
              <Stethoscope className="h-3 w-3" />
              Schedule Checkup
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => handleButtonClick(e, () => onViewMedicalRecords(mare.id))}
              className="flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              Medical Records
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MareDetailCard;
