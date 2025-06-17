
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

/**
 * Component: RecordSearch
 * 
 * PURPOSE:
 * Provides a standardized search interface for filtering records in mare detail views.
 * This component enables users to quickly find specific records within large datasets
 * using text-based filtering with intuitive search functionality.
 * 
 * ARCHITECTURAL PATTERN:
 * - Search input component with icon decoration
 * - Controlled component pattern for external state management
 * - Reusable search interface for consistent user experience
 * 
 * DESIGN PRINCIPLES:
 * - Clear visual indication of search functionality through icon
 * - Immediate feedback as user types (controlled input)
 * - Consistent placeholder text for user guidance
 * - Responsive design that adapts to container width
 * 
 * SEARCH FUNCTIONALITY:
 * This component provides the UI for search but relies on parent components
 * to implement the actual filtering logic. It supports:
 * - Real-time search as user types
 * - Placeholder text to guide user expectations
 * - Clear visual search affordance with magnifying glass icon
 * 
 * USAGE CONTEXTS:
 * Used throughout mare detail interfaces for searching:
 * - Breeding records and pregnancy history
 * - Medical records and veterinary visits
 * - Training records and performance data
 * - Financial records and breeding fees
 * 
 * INTEGRATION PATTERN:
 * Parent components control the search logic and state:
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const filteredRecords = records.filter(record => 
 *   record.name.toLowerCase().includes(searchTerm.toLowerCase())
 * );
 * ```
 * 
 * ACCESSIBILITY FEATURES:
 * - Proper input labeling through placeholder text
 * - Keyboard accessible search interface
 * - Clear visual focus indicators
 * - Screen reader compatible structure
 */

interface RecordSearchProps {
  /** 
   * Current search term value for controlled input behavior.
   * This allows parent components to manage search state and
   * implement complex filtering logic based on user input.
   * 
   * CONTROLLED COMPONENT PATTERN:
   * The search term is controlled by the parent component,
   * enabling sophisticated search behaviors like debouncing,
   * search history, or integration with URL parameters.
   */
  searchTerm: string;
  
  /** 
   * Callback function triggered when search term changes.
   * Parent components use this to update their search state
   * and trigger filtering of displayed records.
   * 
   * IMPLEMENTATION PATTERN:
   * ```tsx
   * const handleSearchChange = (term: string) => {
   *   setSearchTerm(term);
   *   // Optional: implement debouncing for performance
   *   // Optional: update URL parameters for bookmarkable searches
   * };
   * ```
   */
  onSearchChange: (term: string) => void;
  
  /** 
   * Descriptive placeholder text to guide user input.
   * Should clearly indicate what type of records can be searched
   * and provide examples of searchable content.
   * 
   * PLACEHOLDER BEST PRACTICES:
   * - Be specific about searchable fields (e.g., "Search by name, date, or status")
   * - Use action-oriented language (e.g., "Search medical records...")
   * - Keep concise but informative
   * - Match the terminology used in the records being searched
   */
  placeholder: string;
}

/**
 * Record Search Input Component
 * 
 * COMPONENT STRUCTURE:
 * RecordSearch (this component)
 *   └── Container div (relative positioning for icon)
 *       ├── Search Icon (positioned absolutely)
 *       └── Input (with left padding for icon space)
 * 
 * VISUAL DESIGN ARCHITECTURE:
 * - Relative container for precise icon positioning
 * - Search icon positioned absolutely in left padding
 * - Input with left padding to accommodate icon
 * - Consistent styling with other form components
 * 
 * ICON POSITIONING SYSTEM:
 * - Icon positioned absolutely within relative container
 * - Left and top positioning for perfect alignment
 * - Transform used for precise vertical centering
 * - Muted color to avoid overwhelming the input text
 * 
 * RESPONSIVE BEHAVIOR:
 * - Full width (w-full equivalent through flex-grow)
 * - Icon scales appropriately with text size
 * - Padding adjusts to maintain icon visibility
 * - Works within various container layouts
 * 
 * INPUT STYLING:
 * - Left padding (pl-10) to accommodate search icon
 * - Standard shadcn/ui Input component styling
 * - Focus states and validation styling inherited
 * - Consistent height and typography with other inputs
 */
const RecordSearch = ({ searchTerm, onSearchChange, placeholder }: RecordSearchProps) => {
  return (
    <div className="relative">
      {/* 
        SEARCH ICON DECORATION
        - Positioned absolutely for precise placement
        - Uses transform for perfect vertical centering
        - Muted color provides visual hierarchy
        - Standard icon size (h-4 w-4) for consistency
      */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      
      {/* 
        SEARCH INPUT FIELD
        - Controlled input pattern with value and onChange
        - Left padding accommodates the search icon
        - Placeholder provides user guidance
        - Standard Input component ensures consistent styling
      */}
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default RecordSearch;
