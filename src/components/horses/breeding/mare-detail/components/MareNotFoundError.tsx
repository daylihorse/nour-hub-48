
/**
 * Component: MareNotFoundError
 * 
 * PURPOSE:
 * Displays a user-friendly error message when a requested mare cannot be found
 * in the system. This component provides helpful feedback and recovery options
 * when users navigate to invalid mare IDs or when data is temporarily unavailable.
 * 
 * ARCHITECTURAL PATTERN:
 * - Error boundary component for graceful error handling
 * - Informational feedback with actionable recovery options
 * - Developer-friendly debugging information in development
 * 
 * DESIGN PRINCIPLES:
 * - Clear, non-technical error messaging for end users
 * - Helpful context about available alternatives
 * - Easy recovery path back to working state
 * - Debugging information for development and support
 * 
 * ERROR HANDLING PHILOSOPHY:
 * This component embodies good UX practices for error states:
 * - Explain what went wrong in simple terms
 * - Provide context about what's available instead
 * - Offer clear path to recover from the error
 * - Maintain user confidence with helpful messaging
 * 
 * USAGE CONTEXTS:
 * - Invalid mare ID in URL parameters
 * - Mare deleted after user bookmarked the page
 * - Temporary data loading failures
 * - Permission-based access restrictions
 * 
 * DEBUGGING FEATURES:
 * - Shows the specific mare ID that wasn't found
 * - Lists available mares for quick identification
 * - Provides navigation back to main mare listing
 * - Helps developers identify routing or data issues
 * 
 * ACCESSIBILITY FEATURES:
 * - Clear error messaging for screen readers
 * - Semantic HTML structure for assistive technologies
 * - Keyboard accessible navigation elements
 * - High contrast design for visibility
 */

interface MareNotFoundErrorProps {
  /** 
   * The mare ID that could not be found in the system.
   * Used for error reporting and debugging purposes.
   * 
   * DEBUGGING VALUE:
   * This helps developers and support staff identify:
   * - Whether the ID format is correct
   * - If the mare was recently deleted
   * - If there are data synchronization issues
   * - If the URL was manually edited incorrectly
   */
  mareId: string;
  
  /** 
   * List of mares currently available in the system.
   * Provides users with alternatives and helps identify
   * correct mare IDs for debugging purposes.
   * 
   * STRUCTURE:
   * Each mare object contains:
   * - id: The correct mare identifier
   * - horseName: Human-readable name for identification
   * 
   * USER BENEFIT:
   * Helps users identify if they were looking for a similar
   * mare name or can navigate to the correct mare.
   */
  availableMares: Array<{ id: string; horseName: string }>;
  
  /** 
   * Callback function to navigate back to the main mares listing.
   * Provides a clear recovery path when users encounter this error.
   * 
   * IMPLEMENTATION:
   * Typically handles navigation using React Router or similar:
   * ```tsx
   * const handleBackToMares = () => {
   *   navigate('/dashboard/horses/breeding/mares');
   * };
   * ```
   */
  onBackToMares: () => void;
}

/**
 * Mare Not Found Error Display Component
 * 
 * COMPONENT STRUCTURE:
 * MareNotFoundError (this component)
 *   └── Container div (with padding for spacing)
 *       ├── Primary Error Message
 *       ├── Available Mares Information
 *       └── Recovery Navigation Button
 * 
 * ERROR MESSAGE HIERARCHY:
 * 1. Primary error in red for immediate attention
 * 2. Secondary information in muted text for context
 * 3. Action button for clear recovery path
 * 
 * INFORMATION ARCHITECTURE:
 * - Clear statement of what went wrong
 * - Specific mare ID that caused the error
 * - List of available alternatives
 * - Actionable recovery option
 * 
 * VISUAL DESIGN PRINCIPLES:
 * - Red text for error state indication
 * - Muted text for secondary information
 * - Blue link styling for navigation action
 * - Adequate spacing for readability
 * 
 * RESPONSIVE BEHAVIOR:
 * - Padding provides breathing room on all screen sizes
 * - Text wraps appropriately for long mare lists
 * - Button remains accessible on mobile devices
 * - Maintains readability across viewport sizes
 */
const MareNotFoundError = ({ mareId, availableMares, onBackToMares }: MareNotFoundErrorProps) => {
  return (
    <div className="p-6">
      {/* 
        PRIMARY ERROR MESSAGE
        - Clear statement of the problem
        - Red text indicates error state
        - Includes specific mare ID for debugging
      */}
      <p className="text-red-500 mb-2">Mare with ID "{mareId}" not found</p>
      
      {/* 
        DEBUGGING AND CONTEXT INFORMATION
        - Lists available mares for reference
        - Helps users identify if they want a different mare
        - Assists developers in debugging routing issues
        - Muted styling indicates secondary importance
      */}
      <p className="text-sm text-muted-foreground mb-4">
        Available mares: {availableMares.map(m => `${m.id} (${m.horseName})`).join(', ')}
      </p>
      
      {/* 
        RECOVERY ACTION BUTTON
        - Clear call-to-action for error recovery
        - Blue styling indicates interactive element
        - Hover state provides visual feedback
        - Returns user to known working state
      */}
      <button 
        onClick={onBackToMares}
        className="text-blue-500 hover:underline"
      >
        Back to Mares
      </button>
    </div>
  );
};

export default MareNotFoundError;
