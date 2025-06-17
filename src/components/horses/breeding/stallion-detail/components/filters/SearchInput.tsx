
import { Input } from '@/components/ui/input';

/**
 * Component: SearchInput
 * 
 * PURPOSE:
 * Provides a reusable search input component for filtering various types of records
 * within stallion detail pages. This component handles text-based search functionality
 * with customizable placeholder text and styling.
 * 
 * ARCHITECTURAL PATTERN:
 * - Controlled component pattern (value controlled by parent)
 * - Reusable UI component with configurable props
 * - Part of the filtering system architecture
 * 
 * DESIGN PRINCIPLES:
 * - Consistent input styling across the application
 * - Flexible placeholder text for different contexts
 * - Configurable width for different layout needs
 * - Immediate feedback as user types (controlled input)
 * 
 * REUSABILITY FEATURES:
 * - Customizable placeholder for different search contexts
 * - Configurable className for layout flexibility
 * - Generic string handling for various data types
 * - Standard input behavior with shadcn/ui styling
 * 
 * INTEGRATION CONTEXTS:
 * Used in various stallion detail sections:
 * - Breeding records search
 * - Medical records search  
 * - Performance records search
 * - Document search
 * - Any other filterable data lists
 * 
 * SEARCH PATTERN:
 * This component implements immediate search (search-as-you-type):
 * - No search button required
 * - Results update as user types
 * - Provides responsive user experience
 * - Typically debounced in parent component for performance
 */

interface SearchInputProps {
  /** 
   * Current search term value.
   * This makes the component controlled - the parent manages the state.
   * 
   * CONTROLLED COMPONENT PATTERN:
   * The parent component maintains the search term state and passes it down,
   * ensuring single source of truth for search functionality.
   */
  searchTerm: string;
  
  /** 
   * Callback function called when the search term changes.
   * Receives the new search value from the input onChange event.
   * 
   * IMPLEMENTATION PATTERN:
   * Parent should update their state with this value, typically:
   * onSearchChange={(value) => setSearchTerm(value)}
   */
  onSearchChange: (value: string) => void;
  
  /** 
   * Placeholder text displayed when input is empty.
   * Should be descriptive of what can be searched.
   * 
   * EXAMPLES:
   * - "Search records..."
   * - "Search breeding records..."
   * - "Search by horse name or ID..."
   * - "Filter documents..."
   */
  placeholder?: string;
  
  /** 
   * Additional CSS classes for styling the input container.
   * Allows for layout-specific adjustments while maintaining core styling.
   * 
   * COMMON USAGE:
   * - "max-w-xs" for narrow search inputs
   * - "w-full" for full-width search
   * - Custom responsive classes for different layouts
   */
  className?: string;
}

/**
 * Reusable Search Input with Flexible Configuration
 * 
 * COMPONENT STRUCTURE:
 * SearchInput (this component)
 *   └── div (container with configurable className)
 *       └── Input (shadcn/ui input component)
 * 
 * DEFAULT CONFIGURATION:
 * - Placeholder: "Search records..." (generic default)
 * - ClassName: "max-w-xs" (reasonable default width)
 * - Flex-1 container: Allows input to grow within flex layouts
 * 
 * EVENT HANDLING:
 * - Uses onChange event from input element
 * - Extracts value from event.target.value
 * - Immediately calls parent's onSearchChange callback
 * - No debouncing at this level (handled by parent if needed)
 * 
 * STYLING INTEGRATION:
 * - Uses shadcn/ui Input component for consistent styling
 * - Inherits theme-aware styling (light/dark mode support)
 * - Maintains accessibility features from base Input component
 * - Container div allows for additional layout control
 * 
 * ACCESSIBILITY FEATURES:
 * - Standard input accessibility from shadcn/ui Input
 * - Clear placeholder text for user guidance
 * - Proper value/onChange pattern for screen readers
 * - Keyboard navigation support built-in
 */
const SearchInput = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search records...",
  className = "max-w-xs"
}: SearchInputProps) => {
  return (
    <div className="flex-1">
      {/* 
        SEARCH INPUT IMPLEMENTATION
        
        KEY FEATURES:
        - Controlled input with value prop tied to searchTerm
        - onChange handler extracts value and calls parent callback
        - Placeholder provides context-appropriate guidance
        - className prop allows layout customization
        
        CONTROLLED COMPONENT BEHAVIOR:
        The input value is always synchronized with the searchTerm prop,
        ensuring the parent component has complete control over the search state.
        This enables features like programmatic clearing, validation, or
        synchronized search across multiple components.
      */}
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={className}
      />
    </div>
  );
};

export default SearchInput;
