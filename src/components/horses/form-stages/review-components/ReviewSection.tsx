
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Component: ReviewSection
 * 
 * PURPOSE:
 * Provides a reusable card-based container for organizing different sections
 * of information during the horse registration review process. Each section
 * groups related data with consistent styling and layout.
 * 
 * ARCHITECTURAL PATTERN:
 * - Container component pattern (wraps and organizes content)
 * - Composition pattern (accepts children for flexible content)
 * - Consistent UI pattern for review sections
 * 
 * DESIGN SYSTEM INTEGRATION:
 * - Uses shadcn/ui Card components for consistent styling
 * - Follows established spacing and typography patterns
 * - Maintains visual hierarchy through component structure
 * 
 * LAYOUT STRUCTURE:
 * - Card container provides elevation and boundaries
 * - Header section with icon and title for clear identification
 * - Content area with vertical spacing for field organization
 * - Consistent padding and spacing throughout
 * 
 * USAGE PATTERNS:
 * This component is used to create sections like:
 * - Basic Information (name, breed, gender, etc.)
 * - Ownership Details (owner info, documentation)
 * - Health Records (vaccination, medical history)
 * - Documents & Files (uploaded attachments)
 * 
 * COMPOSITION BENEFITS:
 * - Flexible content through children prop
 * - Consistent visual structure across all sections
 * - Easy to add new review sections without duplicating layout code
 * - Icon support for visual categorization
 */

interface ReviewSectionProps {
  /** 
   * The title displayed in the section header.
   * Should be descriptive and help users quickly identify the content type.
   * 
   * EXAMPLES:
   * - "Basic Information"
   * - "Ownership & Documentation" 
   * - "Health & Medical Records"
   * - "Training & Performance"
   */
  title: string;
  
  /** 
   * Icon element displayed next to the title for visual identification.
   * Should be relevant to the section content and help with quick scanning.
   * 
   * IMPLEMENTATION PATTERN:
   * Pass a React element like: <User className="h-5 w-5" />
   * Icons should be sized consistently (typically h-5 w-5)
   */
  icon: React.ReactNode;
  
  /** 
   * The content to be displayed within the section.
   * Typically contains form field displays, data summaries, or other review content.
   * 
   * CONTENT ORGANIZATION:
   * Children should be organized with consistent spacing and structure.
   * Common patterns include field lists, data grids, or custom components.
   */
  children: React.ReactNode;
}

/**
 * Reusable Review Section Container
 * 
 * COMPONENT ARCHITECTURE:
 * ReviewSection (this component)
 *   ├── Card (shadcn/ui container)
 *   │   ├── CardHeader (title and icon area)
 *   │   │   └── CardTitle (with icon and text)
 *   │   └── CardContent (flexible content area)
 *   │       └── {children} (section-specific content)
 * 
 * STYLING APPROACH:
 * - Card provides consistent elevation and spacing
 * - CardHeader creates clear section boundaries
 * - CardTitle with icon creates visual hierarchy
 * - CardContent provides padded area for content
 * - space-y-2 creates consistent vertical rhythm
 * 
 * RESPONSIVE CONSIDERATIONS:
 * - Card components handle responsive padding automatically
 * - Icon and text layout remains consistent across screen sizes
 * - Content area adapts to available space
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic heading structure through CardTitle
 * - Clear visual hierarchy with icons and text
 * - Consistent spacing for scannable content
 * - Card structure provides logical content grouping
 */
const ReviewSection = ({ title, icon, children }: ReviewSectionProps) => {
  return (
    <Card>
      {/* 
        SECTION HEADER
        Provides clear identification of section content with icon and title.
        Reduced bottom padding (pb-3) for tighter spacing with content.
      */}
      <CardHeader className="pb-3">
        {/* 
          TITLE WITH ICON
          - Flexbox layout for icon and text alignment
          - gap-2 provides consistent spacing between icon and text
          - text-lg creates appropriate hierarchy without overwhelming
          - Icon placement before text for natural reading order
        */}
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      
      {/* 
        CONTENT AREA
        Flexible container for section-specific content.
        
        SPACING STRATEGY:
        - space-y-2 creates consistent vertical rhythm between child elements
        - This works well for field displays, lists, and other review content
        - Maintains readability without excessive white space
      */}
      <CardContent className="space-y-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
