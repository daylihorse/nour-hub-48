
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

/**
 * Component: FilterHeader
 * 
 * PURPOSE:
 * Provides the header section for filter panels, including a title and optional
 * clear filters functionality. This component helps users understand filter context
 * and provides easy access to reset filtering state.
 * 
 * ARCHITECTURAL PATTERN:
 * - Header component pattern (provides context and actions for a section)
 * - Conditional rendering based on filter state
 * - Part of the filter management UI system
 * 
 * DESIGN PRINCIPLES:
 * - Clear visual hierarchy with title and action button
 * - Conditional visibility based on functional state
 * - Consistent spacing and alignment
 * - Icon + text pattern for clear action indication
 * 
 * USER EXPERIENCE FEATURES:
 * - Clear filters option only appears when filters are active
 * - Easy access to reset functionality
 * - Visual consistency with other filter components
 * - Obvious action labeling with X icon
 * 
 * INTEGRATION CONTEXT:
 * Used within filter popover panels or filter sidebar components
 * where users need to understand the context and have quick access
 * to clearing their applied filters.
 * 
 * ACCESSIBILITY CONSIDERATIONS:
 * - Semantic heading structure with h4
 * - Clear button labeling with text and icon
 * - Logical visual hierarchy
 * - Obvious interactive elements
 */

interface FilterHeaderProps {
  /** 
   * Indicates whether any filters are currently applied.
   * Controls the visibility of the clear filters button.
   * 
   * USAGE PATTERN:
   * Should be derived from the current filter state by checking
   * if any filter values are set to non-default values.
   * 
   * EXAMPLE LOGIC:
   * const hasActiveFilters = searchTerm || selectedCategory || dateRange;
   */
  hasActiveFilters: boolean;
  
  /** 
   * Callback function executed when user clicks the clear filters button.
   * Should reset all filter values to their default state.
   * 
   * IMPLEMENTATION PATTERN:
   * This callback should clear all filter-related state:
   * - Reset search terms
   * - Clear category selections
   * - Reset date ranges
   * - Return any other filters to default values
   */
  onClearFilters: () => void;
}

/**
 * Filter Panel Header with Conditional Clear Action
 * 
 * COMPONENT LAYOUT:
 * FilterHeader (this component)
 *   └── div (flex container)
 *       ├── h4 (filter title)
 *       └── Button (conditional clear action)
 * 
 * LAYOUT ARCHITECTURE:
 * - Flexbox with space-between for title/action separation
 * - items-center for vertical alignment
 * - justify-between pushes title left and button right
 * 
 * CONDITIONAL RENDERING LOGIC:
 * The clear filters button only renders when hasActiveFilters is true.
 * This prevents UI clutter when no filters are applied and provides
 * contextual functionality only when relevant.
 * 
 * BUTTON STYLING APPROACH:
 * - Ghost variant for subtle appearance (doesn't compete with content)
 * - Small size (sm) for appropriate proportions in header
 * - X icon provides universal "clear/close" indication
 * - Text label provides explicit action description
 * 
 * VISUAL HIERARCHY:
 * - h4 heading provides appropriate semantic weight
 * - Medium font weight (font-medium) for clear title emphasis
 * - Button styling is subtle but discoverable
 * - Icon + text pattern enhances understanding
 */
const FilterHeader = ({ hasActiveFilters, onClearFilters }: FilterHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* 
        FILTER SECTION TITLE
        - h4 provides appropriate semantic heading level
        - font-medium creates clear visual hierarchy
        - Simple "Filters" title is clear and universal
      */}
      <h4 className="font-medium">Filters</h4>
      
      {/* 
        CONDITIONAL CLEAR FILTERS ACTION
        Only renders when filters are active, providing contextual functionality.
        
        INTERACTION DESIGN:
        - Ghost variant keeps the button subtle but accessible
        - Small size maintains appropriate proportions
        - X icon provides universal "clear" metaphor
        - "Clear" text makes the action explicit
        - onClick handler delegates to parent for state management
      */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default FilterHeader;
