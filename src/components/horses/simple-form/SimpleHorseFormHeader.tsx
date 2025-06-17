
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Component: SimpleHorseFormHeader
 * 
 * PURPOSE:
 * Provides the header section for the simple horse registration form.
 * This component establishes the form context, provides clear labeling,
 * and offers immediate access to cancel functionality.
 * 
 * ARCHITECTURAL PATTERN:
 * - Form header component pattern
 * - Action integration (cancel functionality)
 * - Visual hierarchy establishment
 * - Part of the form layout system
 * 
 * DESIGN PRINCIPLES:
 * - Clear form identification and purpose
 * - Immediate access to exit/cancel action
 * - Visual hierarchy through typography
 * - Consistent spacing and alignment
 * 
 * USER EXPERIENCE CONSIDERATIONS:
 * - Large, clear title establishes form context
 * - Descriptive subtitle explains form purpose
 * - Cancel button provides immediate exit option
 * - Right-aligned cancel maintains visual balance
 * 
 * LAYOUT ARCHITECTURE:
 * - Uses shadcn/ui CardHeader for consistent styling
 * - Flexbox layout for title/action separation
 * - Typography hierarchy for information structure
 * - Responsive layout that adapts to screen sizes
 * 
 * INTEGRATION CONTEXT:
 * Used at the top of SimpleHorseForm to provide context and navigation.
 * Integrated with form cancellation logic from parent components.
 */

interface SimpleHorseFormHeaderProps {
  /** 
   * Callback function executed when user clicks the Cancel button.
   * Should handle form dismissal, navigation, or state cleanup.
   * 
   * IMPLEMENTATION PATTERNS:
   * - Close modal or drawer containing the form
   * - Navigate back to previous page
   * - Reset form state and return to horse listing
   * - Show confirmation dialog for unsaved changes
   */
  onCancel: () => void;
}

/**
 * Simple Horse Form Header with Cancel Action
 * 
 * COMPONENT LAYOUT:
 * SimpleHorseFormHeader (this component)
 *   └── CardHeader (shadcn/ui header container)
 *       └── div (flex container)
 *           ├── div (title and description)
 *           │   ├── CardTitle (main form title)
 *           │   └── p (descriptive subtitle)
 *           └── Button (cancel action)
 * 
 * VISUAL HIERARCHY IMPLEMENTATION:
 * 1. Main Title (text-2xl): "Add New Horse"
 *    - Large size establishes primary context
 *    - Bold weight (from CardTitle) emphasizes importance
 * 
 * 2. Subtitle (text-muted-foreground): "Register a new horse in the stable"
 *    - Muted color creates secondary hierarchy
 *    - Explains the form's purpose and context
 * 
 * 3. Cancel Button (outline variant):
 *    - Secondary styling doesn't compete with form content
 *    - Right alignment creates visual balance
 * 
 * LAYOUT STRATEGY:
 * - Flexbox with items-center for vertical alignment
 * - justify-between spreads title left and button right
 * - Title section grouped for logical content relationship
 * - Responsive behavior handled by CardHeader container
 * 
 * INTERACTION DESIGN:
 * - Cancel button always visible for quick exit
 * - Outline variant indicates secondary action
 * - Clear labeling ("Cancel") for obvious functionality
 * - Positioned for easy access without interfering with content
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic heading structure through CardTitle
 * - Clear button labeling
 * - Logical reading order (title → description → action)
 * - Sufficient color contrast for text elements
 */
const SimpleHorseFormHeader = ({ onCancel }: SimpleHorseFormHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        {/* 
          FORM TITLE AND DESCRIPTION SECTION
          Groups related header content for logical organization
          and maintains proper semantic structure.
        */}
        <div>
          {/* 
            PRIMARY FORM TITLE
            Large text size establishes visual hierarchy and
            clearly identifies the form's primary purpose.
          */}
          <CardTitle className="text-2xl">Add New Horse</CardTitle>
          
          {/* 
            DESCRIPTIVE SUBTITLE
            Provides additional context about the form's purpose
            using muted styling to create visual hierarchy.
          */}
          <p className="text-muted-foreground">Register a new horse in the stable</p>
        </div>
        
        {/* 
          CANCEL ACTION
          Outline variant provides clear action without competing
          with form content. Right alignment creates visual balance.
        */}
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </CardHeader>
  );
};

export default SimpleHorseFormHeader;
