
import { CheckCircle } from "lucide-react";

/**
 * Component: ReviewHeader
 * 
 * PURPOSE:
 * Displays the header section for the horse registration review stage.
 * This component provides visual confirmation that the user has reached
 * the final review step and communicates what they need to do next.
 * 
 * ARCHITECTURAL PATTERN:
 * - Presentational component (no state or business logic)
 * - Visual feedback component using icons and typography hierarchy
 * - Part of the multi-stage form review system
 * 
 * DESIGN PRINCIPLES:
 * - Visual confirmation through green checkmark icon
 * - Clear hierarchical typography (title → description)
 * - Consistent spacing and alignment
 * - Accessibility through semantic markup
 * 
 * UI/UX CONSIDERATIONS:
 * - Green checkmark provides positive psychological feedback
 * - Large icon (h-16 w-16) draws attention and confirms progress
 * - Centered layout creates focus and importance
 * - Descriptive text explains the purpose of this stage
 * 
 * INTEGRATION CONTEXT:
 * Used within the ReviewConfirmationStage component as part of the
 * horse registration form's final review process. Appears after users
 * have completed all required form stages.
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic heading structure (h2)
 * - Color contrast with green icon and gray text
 * - Descriptive text for screen readers
 * - Logical reading order
 */
const ReviewHeader = () => {
  return (
    <div className="text-center mb-6">
      {/* 
        SUCCESS INDICATOR ICON
        - CheckCircle provides visual confirmation of form completion
        - Large size (h-16 w-16) makes it prominent and celebratory
        - Green color (text-green-500) reinforces positive completion
        - Centered with mx-auto for balanced layout
      */}
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      
      {/* 
        PRIMARY HEADING
        - Clear statement of current stage purpose
        - Large font (text-2xl) establishes visual hierarchy
        - Bold weight emphasizes importance
        - Margin bottom creates separation from description
      */}
      <h2 className="text-2xl font-bold mb-2">Review Horse Information</h2>
      
      {/* 
        DESCRIPTIVE TEXT
        - Explains what the user should do on this page
        - Muted foreground color creates visual hierarchy
        - Sets expectations for the review process
        - Guides user behavior with clear instructions
      */}
      <p className="text-muted-foreground">
        Please review all the information before registering the horse
      </p>
    </div>
  );
};

export default ReviewHeader;
