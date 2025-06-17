
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  TrendingUp, 
  Heart, 
  Baby, 
  DollarSign, 
  Eye,
  Edit,
  BookOpen
} from "lucide-react";

/**
 * Component: StallionCard
 * 
 * PURPOSE:
 * Displays comprehensive stallion information in a card format for stallion
 * management and selection interfaces. This component provides a quick overview
 * of key stallion metrics, breeding performance, and availability status.
 * 
 * ARCHITECTURAL PATTERN:
 * - Information card component with action buttons
 * - Performance metrics display with visual indicators
 * - Interactive card with hover states and click handlers
 * 
 * DESIGN PRINCIPLES:
 * - Clear visual hierarchy with stallion name prominence
 * - Performance metrics displayed with meaningful icons
 * - Status indicators using color-coded badges
 * - Action buttons for common stallion management tasks
 * 
 * BREEDING CONTEXT:
 * This component serves stallion selection and management by displaying:
 * - Basic stallion identification and physical details
 * - Breeding performance statistics and success rates
 * - Current availability and booking information
 * - Financial information including stud fees
 * 
 * PERFORMANCE METRICS:
 * The card displays key performance indicators:
 * - Total mares served (breeding volume)
 * - Successful breedings (conception rate)
 * - Live foals (foaling success rate)
 * - Overall success rate percentage
 * 
 * INTEGRATION CONTEXT:
 * Used within stallion grids, lists, and selection interfaces.
 * Supports navigation to detailed stallion pages and quick actions
 * for breeding management workflows.
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic card structure with proper headings
 * - Clear labeling for all metrics and buttons
 * - High contrast design for important information
 * - Keyboard navigation support for interactive elements
 */

interface Stallion {
  /** Unique identifier for database operations and navigation */
  id: string;
  
  /** Horse ID linking to main horse registry */
  horseId: string;
  
  /** Display name of the stallion */
  horseName: string;
  
  /** Current breeding status (active, retired, unavailable, etc.) */
  status: string;
  
  /** Age in years for breeding viability assessment */
  age: number;
  
  /** Breed classification for genetic matching */
  breed: string;
  
  /** Total number of mares served in breeding program */
  totalMares: number;
  
  /** Number of successful breeding attempts (confirmed pregnancies) */
  successfulBreedings: number;
  
  /** Number of live foals produced (successful births) */
  livefoals: number;
  
  /** Calculated success rate as percentage */
  successRate: number;
  
  /** Stud fee amount for breeding services */
  studFee: number;
  
  /** Next available date for breeding services */
  nextAvailable: string;
  
  /** Current number of bookings scheduled */
  bookings: number;
}

interface StallionCardProps {
  /** 
   * Complete stallion information object containing all display data.
   * This data should include current performance metrics and availability status.
   * 
   * USAGE PATTERN:
   * Data typically comes from stallion management APIs and represents
   * real-time stallion information including booking status and performance.
   */
  stallion: Stallion;
  
  /** 
   * Optional click handler for card selection or navigation.
   * Typically used to navigate to detailed stallion view or selection.
   * 
   * IMPLEMENTATION NOTE:
   * Should handle navigation to stallion detail pages or trigger
   * selection actions in breeding workflows.
   */
  onClick?: () => void;
}

/**
 * Stallion Information Display Card Component
 * 
 * COMPONENT STRUCTURE:
 * StallionCard (this component)
 *   └── Card (main container with hover effects)
 *       ├── CardHeader (stallion name and status)
 *       ├── CardContent (metrics and information grid)
 *       └── Action Buttons (view, edit, book breeding)
 * 
 * LAYOUT ARCHITECTURE:
 * - Card container with hover shadow effects
 * - Header section with name and status badge
 * - Content grid displaying key metrics with icons
 * - Footer with action buttons for common operations
 * - Responsive design adapting to different screen sizes
 * 
 * VISUAL DESIGN PATTERNS:
 * - Status badge color coding for immediate status recognition
 * - Icon + metric pattern for quick information scanning
 * - Hover effects to indicate interactivity
 * - Consistent spacing and typography hierarchy
 * 
 * METRIC DISPLAY SYSTEM:
 * Each metric follows a consistent pattern:
 * - Descriptive icon for visual identification
 * - Numerical value prominently displayed
 * - Descriptive label for context
 * - Color coding based on performance levels
 * 
 * INTERACTIVE BEHAVIOR:
 * - Hover effects on entire card for selection feedback
 * - Individual action buttons for specific operations
 * - Status-based styling changes (active vs inactive stallions)
 * - Responsive layout for different viewport sizes
 */
const StallionCard = ({ stallion, onClick }: StallionCardProps) => {
  
  /**
   * Determines the appropriate color scheme for stallion status badges.
   * 
   * STATUS COLOR MAPPING:
   * - active: Green for actively breeding stallions
   * - available: Blue for available but not currently breeding
   * - booked: Yellow for stallions with current bookings
   * - retired: Gray for retired stallions
   * - unavailable: Red for temporarily unavailable stallions
   */
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'available':
        return 'bg-blue-500';
      case 'booked':
        return 'bg-yellow-500';
      case 'retired':
        return 'bg-gray-500';
      case 'unavailable':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  /**
   * Determines success rate color coding for performance visualization.
   * 
   * PERFORMANCE COLOR MAPPING:
   * - Excellent (90%+): Green for outstanding performers
   * - Good (75-89%): Blue for solid performers  
   * - Average (60-74%): Yellow for average performers
   * - Below Average (<60%): Red for underperformers
   */
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 75) return 'text-blue-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* 
        STALLION HEADER SECTION
        - Stallion name as primary identifier
        - Status badge for immediate availability recognition
        - Breed and age information for basic identification
      */}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{stallion.horseName}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {stallion.breed} • {stallion.age} years
            </p>
          </div>
          <Badge className={getStatusColor(stallion.status)}>
            {stallion.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* 
          BREEDING PERFORMANCE METRICS GRID
          Displays key performance indicators in an organized grid layout.
          Each metric uses icons for quick visual identification.
        */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          
          {/* Total mares served - indicates breeding volume */}
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-500" />
            <div>
              <p className="text-sm font-medium">{stallion.totalMares}</p>
              <p className="text-xs text-muted-foreground">Total Mares</p>
            </div>
          </div>
          
          {/* Live foals - indicates successful breeding outcomes */}
          <div className="flex items-center gap-2">
            <Baby className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">{stallion.livefoals}</p>
              <p className="text-xs text-muted-foreground">Live Foals</p>
            </div>
          </div>
          
          {/* Success rate - key performance metric with color coding */}
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <div>
              <p className={`text-sm font-medium ${getSuccessRateColor(stallion.successRate)}`}>
                {stallion.successRate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
          </div>
          
          {/* Stud fee - financial information for breeding planning */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">${stallion.studFee.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Stud Fee</p>
            </div>
          </div>
        </div>

        {/* 
          AVAILABILITY AND BOOKING INFORMATION
          Shows current booking status and next availability for breeding scheduling.
        */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="text-muted-foreground">Next Available:</span>
            <span className="font-medium">{stallion.nextAvailable}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-purple-500" />
            <span className="text-muted-foreground">Current Bookings:</span>
            <span className="font-medium">{stallion.bookings}</span>
          </div>
        </div>

        {/* 
          ACTION BUTTONS SECTION
          Provides quick access to common stallion management operations.
          Buttons are organized by frequency of use and importance.
        */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              // Handle view details action
              console.log('View stallion details:', stallion.id);
            }}
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit stallion action
              console.log('Edit stallion:', stallion.id);
            }}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              // Handle book breeding action
              console.log('Book breeding for stallion:', stallion.id);
            }}
          >
            <Calendar className="h-3 w-3 mr-1" />
            Book
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StallionCard;
