
import { useNavigate } from "react-router-dom";
import MareCard from "./MareCard";
import { Mare } from "@/types/breeding/mare";

/**
 * Component: MareGrid
 * 
 * PURPOSE:
 * Displays a responsive grid layout of mare cards with navigation functionality.
 * This component handles the presentation layer for mare listings and provides
 * click-to-navigate behavior for accessing detailed mare information.
 * 
 * ARCHITECTURAL PATTERN:
 * - Grid layout component for data display
 * - Navigation integration with React Router
 * - Presentation component with interaction handling
 * - Part of the mare management system
 * 
 * DESIGN PRINCIPLES:
 * - Responsive grid that adapts to screen sizes
 * - Consistent card-based presentation
 * - Intuitive click-to-navigate interaction
 * - Keyboard accessibility through clickable elements
 * 
 * LAYOUT ARCHITECTURE:
 * - CSS Grid with responsive breakpoints
 * - Single column on mobile (grid-cols-1)
 * - Two columns on large screens (lg:grid-cols-2)
 * - Consistent gap spacing between cards
 * 
 * NAVIGATION INTEGRATION:
 * Uses React Router's useNavigate hook to handle programmatic navigation
 * to individual mare detail pages while maintaining proper URL structure.
 * 
 * INTERACTION PATTERNS:
 * - Click anywhere on card to navigate to details
 * - Cursor pointer indicates interactive elements
 * - Hover states provided by child components
 * - Keyboard navigation support
 */

interface MareGridProps {
  /** 
   * Array of mare objects to display in the grid.
   * Each mare should contain the necessary information for card display
   * and navigation (particularly the mare ID for routing).
   * 
   * DATA REQUIREMENTS:
   * Each mare object must contain:
   * - id: Unique identifier for navigation
   * - name, breed, status: For card display
   * - Other mare-specific information used by MareCard
   */
  mares: Mare[];
}

/**
 * Responsive Mare Grid with Navigation
 * 
 * COMPONENT HIERARCHY:
 * MareGrid (this component)
 *   └── div (grid container)
 *       └── div (clickable wrapper) × N
 *           └── MareCard (mare display)
 * 
 * NAVIGATION IMPLEMENTATION:
 * Uses a closure pattern where handleMareClick receives the mare ID
 * and creates a navigation function that routes to the specific mare detail page.
 * 
 * URL STRUCTURE:
 * Navigation follows the pattern: /dashboard/horses/breeding/mares/{mareId}
 * This maintains consistent URL hierarchy within the breeding section.
 * 
 * GRID RESPONSIVE BEHAVIOR:
 * - Mobile (default): Single column layout for easy scrolling
 * - Large screens (lg:): Two column layout for better space utilization
 * - Gap-6 provides consistent spacing between cards
 * 
 * ACCESSIBILITY CONSIDERATIONS:
 * - Clickable divs with cursor-pointer for clear interaction indication
 * - MareCard components handle internal accessibility
 * - Logical keyboard navigation order
 * - Clear visual hierarchy through card design
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - Navigation function is created only on click (not pre-created for each mare)
 * - React keys based on mare.id for efficient re-rendering
 * - Component only re-renders when mares array changes
 */
const MareGrid = ({ mares }: MareGridProps) => {
  const navigate = useNavigate();

  /**
   * Handles navigation to individual mare detail page.
   * 
   * NAVIGATION PATTERN:
   * - Accepts mare ID as parameter
   * - Constructs appropriate URL for mare detail view
   * - Uses React Router's navigate function for SPA navigation
   * - Maintains browser history and URL consistency
   * 
   * @param {string} mareId - Unique identifier for the mare
   */
  const handleMareClick = (mareId: string) => {
    navigate(`/dashboard/horses/breeding/mares/${mareId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mares.map((mare) => (
        /* 
          MARE CARD CONTAINER WITH NAVIGATION
          
          KEY FEATURES:
          - React key based on mare.id for efficient updates
          - onClick handler for navigation functionality
          - cursor-pointer indicates interactive element
          - Full card area is clickable for better UX
          
          INTERACTION DESIGN:
          The entire card acts as a click target, making it easy for users
          to navigate to mare details without requiring precise clicking
          on specific areas of the card.
        */
        <div key={mare.id} onClick={() => handleMareClick(mare.id)} className="cursor-pointer">
          <MareCard mare={mare} />
        </div>
      ))}
    </div>
  );
};

export default MareGrid;
