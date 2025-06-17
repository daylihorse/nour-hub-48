
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

/**
 * Component: MareHeader
 * 
 * PURPOSE:
 * Provides the main header section for mare management pages with title,
 * description, and primary actions. This component establishes the page
 * context and provides access to key mare management functionality.
 * 
 * ARCHITECTURAL PATTERN:
 * - Page header component with flexible action area
 * - Responsive layout that adapts to different screen sizes
 * - Composition pattern allowing custom view controls
 * 
 * DESIGN PRINCIPLES:
 * - Clear page hierarchy with prominent title and description
 * - Consistent spacing and typography following design system
 * - Flexible action area for various controls and buttons
 * - Mobile-first responsive design approach
 * 
 * HEADER STRUCTURE:
 * The component provides a standardized header layout used across
 * mare management interfaces, including listing pages, detail views,
 * and administrative sections. It combines informational elements
 * with actionable controls for efficient workflow management.
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile: Stacked layout with actions below title
 * - Desktop: Horizontal layout with actions aligned to the right
 * - Flexible gap spacing that adapts to content
 * - Button sizing appropriate for touch interfaces
 * 
 * CUSTOMIZATION OPTIONS:
 * - Optional view selector for different display modes
 * - Customizable add mare action handler
 * - Extensible design for additional action buttons
 * - Consistent styling that integrates with page themes
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic heading structure for screen readers
 * - Clear button labeling with icons and text
 * - Keyboard navigation support for all interactive elements
 * - High contrast design for visual accessibility
 */

interface MareHeaderProps {
  /** 
   * Optional view selector component for switching between display modes.
   * Typically includes options like grid, list, or table views.
   * 
   * USAGE PATTERN:
   * ```tsx
   * <MareHeader 
   *   viewSelector={
   *     <ViewSelector 
   *       currentView={view} 
   *       onViewChange={setView} 
   *     />
   *   }
   * />
   * ```
   * 
   * COMPONENT FLEXIBILITY:
   * This slot can accommodate various controls:
   * - View mode toggles (grid/list/table)
   * - Sorting and filtering controls
   * - Search functionality
   * - Display preference settings
   */
  viewSelector?: ReactNode;
  
  /** 
   * Optional callback function for handling mare addition.
   * When provided, displays the "Add Mare" button with plus icon.
   * 
   * IMPLEMENTATION PATTERN:
   * ```tsx
   * const handleAddMare = () => {
   *   // Navigate to mare registration form
   *   navigate('/dashboard/horses/breeding/mares/new');
   *   // Or open modal dialog for quick mare entry
   *   setShowAddMareDialog(true);
   * };
   * ```
   * 
   * CONDITIONAL RENDERING:
   * Button only appears when this handler is provided,
   * allowing headers without add functionality where appropriate.
   */
  onAddMare?: () => void;
}

/**
 * Mare Management Page Header Component
 * 
 * COMPONENT STRUCTURE:
 * MareHeader (this component)
 *   └── Responsive Flex Container
 *       ├── Title Section
 *       │   ├── Main Heading (Mare Management)
 *       │   └── Descriptive Subtitle
 *       └── Actions Section
 *           ├── View Selector (optional)
 *           └── Add Mare Button (conditional)
 * 
 * LAYOUT ARCHITECTURE:
 * - Outer container with responsive flex direction
 * - Title section with semantic heading structure
 * - Actions section with flexible item arrangement
 * - Consistent spacing using gap utilities
 * 
 * RESPONSIVE DESIGN SYSTEM:
 * - Mobile (default): flex-col with stacked elements
 * - Small screens and up (sm:): flex-row with horizontal layout
 * - Consistent gap spacing (gap-4) across breakpoints
 * - Items aligned to start on mobile, center on desktop
 * 
 * TYPOGRAPHY HIERARCHY:
 * - Main title: text-2xl font-bold for prominence
 * - Subtitle: text-muted-foreground for supporting information
 * - Consistent line height and spacing for readability
 * 
 * ACTION BUTTON DESIGN:
 * - Primary button styling with icon and text
 * - Plus icon indicates additive action
 * - Consistent sizing with other page actions
 * - Hover and focus states for interactivity
 */
const MareHeader = ({ viewSelector, onAddMare }: MareHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* 
        TITLE AND DESCRIPTION SECTION
        - Semantic heading structure for accessibility
        - Clear page identification and purpose
        - Muted subtitle provides additional context
      */}
      <div>
        <h2 className="text-2xl font-bold">Mare Management</h2>
        <p className="text-muted-foreground">Manage breeding mares and their breeding cycles</p>
      </div>
      
      {/* 
        ACTIONS AND CONTROLS SECTION
        - Flexible container for various controls
        - Optional view selector for display preferences
        - Conditional add mare button for workflow initiation
      */}
      <div className="flex items-center gap-4">
        {/* Optional view selector component */}
        {viewSelector}
        
        {/* Conditional add mare button */}
        {onAddMare && (
          <Button className="flex items-center gap-2" onClick={onAddMare}>
            <Plus className="h-4 w-4" />
            Add Mare
          </Button>
        )}
      </div>
    </div>
  );
};

export default MareHeader;
