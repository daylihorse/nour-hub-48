
import { Button } from "@/components/ui/button";

/**
 * Component: SimpleHorseFormActions
 * 
 * PURPOSE:
 * Provides the action buttons for the simple horse registration form.
 * This component handles form submission and cancellation actions,
 * with proper loading states and user feedback.
 * 
 * ARCHITECTURAL PATTERN:
 * - Action component pattern (groups related actions)
 * - Controlled component (receives state, delegates actions)
 * - Part of the form submission workflow
 * 
 * DESIGN PRINCIPLES:
 * - Clear action hierarchy (Cancel vs Submit)
 * - Loading state management for better UX
 * - Consistent spacing and alignment
 * - Right-aligned for natural reading flow
 * 
 * USER EXPERIENCE CONSIDERATIONS:
 * - Cancel button is secondary (outline style) to de-emphasize destructive action
 * - Submit button is primary to encourage form completion
 * - Loading state prevents double-submission and provides feedback
 * - Border separator creates visual section boundary
 * 
 * INTEGRATION CONTEXT:
 * Used at the bottom of SimpleHorseForm to provide final form actions.
 * Integrated with form validation and submission logic from parent components.
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic button elements
 * - Clear action labels
 * - Disabled state properly indicated
 * - Logical tab order (Cancel → Submit)
 */

interface SimpleHorseFormActionsProps {
  /** 
   * Callback function executed when user clicks Cancel button.
   * Should handle cleanup, navigation, or modal dismissal.
   * 
   * IMPLEMENTATION NOTE:
   * This should typically close the form, reset state, or navigate
   * back to the previous page depending on the integration context.
   */
  onCancel: () => void;
  
  /** 
   * Indicates whether the form is currently being submitted.
   * Used to disable the submit button and show loading text.
   * 
   * UX PATTERN:
   * Prevents double-submission and provides clear feedback that
   * the system is processing the user's request.
   */
  isSubmitting: boolean;
}

/**
 * Form Action Buttons with Loading States
 * 
 * LAYOUT ARCHITECTURE:
 * - Flexbox layout with right alignment (justify-end)
 * - Gap spacing for consistent button separation
 * - Top padding and border for visual section separation
 * - Full width container for proper alignment
 * 
 * BUTTON HIERARCHY:
 * 1. Cancel Button (outline variant):
 *    - Secondary action, less emphasized
 *    - Available even during submission
 *    - Allows users to abort if needed
 * 
 * 2. Submit Button (primary variant):
 *    - Primary action, most emphasized
 *    - Disabled during submission to prevent issues
 *    - Dynamic text based on submission state
 * 
 * LOADING STATE IMPLEMENTATION:
 * When isSubmitting is true:
 * - Submit button becomes disabled
 * - Text changes from "Register Horse" to "Registering..."
 * - This provides clear feedback about system state
 * 
 * FORM INTEGRATION:
 * This component should be placed within a form element
 * where the submit button has type="submit" to trigger
 * form validation and submission handlers.
 */
const SimpleHorseFormActions = ({ onCancel, isSubmitting }: SimpleHorseFormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-6 border-t">
      {/* 
        CANCEL ACTION
        - Always available (not disabled during submission)
        - Outline variant for secondary action styling
        - Explicitly type="button" to prevent form submission
      */}
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      
      {/* 
        SUBMIT ACTION
        - Primary variant for emphasis as main action
        - Disabled during submission to prevent double-submission
        - Dynamic text provides feedback about current state
        - type="submit" triggers form validation and submission
      */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register Horse"}
      </Button>
    </div>
  );
};

export default SimpleHorseFormActions;
