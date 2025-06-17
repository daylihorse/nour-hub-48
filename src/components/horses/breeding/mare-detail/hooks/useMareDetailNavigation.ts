
import { useNavigate } from "react-router-dom";

/**
 * Custom Hook: useMareDetailNavigation
 * 
 * PURPOSE:
 * Provides navigation functionality specifically for mare detail pages.
 * This hook encapsulates the navigation logic to return to the mares list
 * while preserving the proper tab state in the breeding section.
 * 
 * ARCHITECTURAL PATTERN:
 * - Custom hook pattern for reusable navigation logic
 * - State preservation through navigation state
 * - Separation of concerns (navigation logic isolated from UI components)
 * 
 * USAGE CONTEXT:
 * Used in mare detail pages when users need to navigate back to the main
 * mares listing while maintaining their context within the breeding section.
 * 
 * STATE MANAGEMENT:
 * Uses React Router's state mechanism to pass tab information, ensuring
 * the user returns to the correct view (breeding tab > mares sub-tab).
 * 
 * @returns {Object} Navigation handlers for mare detail pages
 */
export const useMareDetailNavigation = () => {
  const navigate = useNavigate();

  /**
   * Navigate back to mares listing with proper tab state
   * 
   * IMPLEMENTATION DETAILS:
   * - Uses React Router's state to preserve tab context
   * - Sets activeTab to "breeding" to ensure breeding section is active
   * - Sets breedingSubTab to "mares" to show mares listing specifically
   * - This prevents users from losing their place in the application
   * 
   * STATE STRUCTURE:
   * {
   *   activeTab: "breeding" - Main tab in horses section
   *   breedingSubTab: "mares" - Sub-tab within breeding section
   * }
   */
  const handleBackToMares = () => {
    navigate("/dashboard/horses", { 
      state: { 
        activeTab: "breeding",
        breedingSubTab: "mares"
      } 
    });
  };

  return { handleBackToMares };
};
