
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

/**
 * Component: FilterTriggerButton
 * 
 * PURPOSE:
 * Provides a button that triggers the display of filtering options for stallion records.
 * This component includes visual indication when filters are currently active,
 * helping users understand the current state of data filtering.
 * 
 * ARCHITECTURAL PATTERN:
 * - Controlled component (receives state, doesn't manage it)
 * - Visual state indicator component
 * - Part of the filter management system
 * 
 * DESIGN PATTERNS:
 * - Status indicator pattern (red dot for active filters)
 * - Consistent button styling with shadcn/ui
 * - Icon + text combination for clarity
 * - Relative positioning for status badge
 * 
 * VISUAL FEEDBACK SYSTEM:
 * The component provides immediate visual feedback about filter state:
 * - Normal state: Just shows filter icon and text
 * - Active filters: Adds a red indicator dot to show filters are applied
 * 
 * INTEGRATION CONTEXT:
 * Used within stallion detail pages where users need to filter through
 * breeding records, medical records, or other stallion-related data.
 * Typically paired with FilterPopover or similar filter containers.
 * 
 * ACCESSIBILITY CONSIDERATIONS:
 * - Uses semantic button element
 * - Clear text label ("Filter")
 * - Visual icon reinforces button purpose
 * - Color-based indication supplemented by positioning
 */

interface FilterTriggerButtonProps {
  /** 
   * Indicates whether any filters are currently active/applied.
   * When true, displays a red indicator dot to show active filter state.
   * 
   * USAGE PATTERN:
   * This should be derived from the current filter state, typically by
   * checking if any filter values are set (non-empty, non-default).
   */
  hasActiveFilters: boolean;
}

/**
 * Filter Trigger Button with Active State Indicator
 * 
 * COMPONENT BEHAVIOR:
 * - Displays as standard outline button with filter icon
 * - When hasActiveFilters is true, shows red indicator dot
 * - Maintains consistent sizing and styling with design system
 * 
 * STATUS INDICATOR IMPLEMENTATION:
 * The red dot uses absolute positioning to appear as a badge:
 * - Positioned at top-right corner (-top-1 -right-1)
 * - Small size (h-3 w-3) to not overwhelm the button
 * - Bright red (bg-primary) for clear visibility
 * - Rounded to appear as a dot (rounded-full)
 * 
 * STYLING ARCHITECTURE:
 * - Uses shadcn/ui Button component for consistency
 * - Outline variant for secondary action appearance
 * - Small size (sm) for appropriate proportions
 * - Relative positioning container for absolute badge
 */
const FilterTriggerButton = ({ hasActiveFilters }: FilterTriggerButtonProps) => {
  return (
    <Button variant="outline" size="sm" className="relative">
      {/* Filter icon provides visual context for button purpose */}
      <Filter className="h-4 w-4 mr-2" />
      Filter
      
      {/* 
        ACTIVE FILTER INDICATOR
        Conditionally rendered red dot that appears when filters are active.
        
        POSITIONING EXPLANATION:
        - absolute: Removes from document flow for overlay positioning
        - -top-1 -right-1: Positions slightly outside button bounds
        - This creates a "badge" effect similar to notification indicators
        
        VISIBILITY LOGIC:
        Only renders when hasActiveFilters is true, providing clear
        visual feedback about the current filtering state.
      */}
      {hasActiveFilters && (
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full" />
      )}
    </Button>
  );
};

export default FilterTriggerButton;
