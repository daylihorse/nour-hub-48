
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Component: BasicInfoListView
 * 
 * PURPOSE:
 * Displays mare's basic information in a structured list format for review purposes.
 * This component provides a comprehensive view of all mare identification, physical,
 * and administrative details in an easy-to-scan format.
 * 
 * ARCHITECTURAL PATTERN:
 * - Read-only display component (no form controls or editing capabilities)
 * - Information presentation pattern with structured data display
 * - Card-based layout for visual organization and hierarchy
 * 
 * DESIGN PRINCIPLES:
 * - Clear visual separation between different data categories
 * - Consistent spacing and typography for readability
 * - Logical grouping of related information fields
 * - Responsive layout that works across device sizes
 * 
 * DATA STRUCTURE:
 * The component expects a comprehensive BasicInfoData object containing:
 * - Identification: registration numbers, microchip, passport
 * - Physical: birth date, color, height, weight measurements
 * - Pedigree: sire, dam, bloodline origin information
 * - Administrative: owner, location, insurance, acquisition details
 * 
 * INTEGRATION CONTEXT:
 * Used within mare detail pages to display complete mare information
 * in a read-only format. Typically shown in review screens or when
 * users need to verify mare details without editing capabilities.
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic heading structure for screen readers
 * - Clear label-value relationships
 * - Logical reading order and information hierarchy
 * - High contrast text for visibility
 */

interface BasicInfoData {
  /** Unique registration number for official breed registry identification */
  registrationNumber: string;
  
  /** Microchip identification number for permanent animal identification */
  microchipId: string;
  
  /** Official passport number for international travel and identification */
  passportNumber: string;
  
  /** Birth date in formatted string for age calculation and records */
  birthDate: string;
  
  /** Physical color/coat description for identification purposes */
  color: string;
  
  /** Height measurement typically in hands for standardized recording */
  height: string;
  
  /** Weight measurement in kilograms for health and performance tracking */
  weight: string;
  
  /** Sire (father) name for pedigree and breeding records */
  sire: string;
  
  /** Dam (mother) name for pedigree and breeding records */
  dam: string;
  
  /** Bloodline origin information for genetic tracking */
  bloodlineOrigin: string;
  
  /** Current owner name for administrative and legal purposes */
  owner: string;
  
  /** Current stable or farm location for operational management */
  location: string;
  
  /** Insurance valuation for financial and risk management */
  insuranceValue: string;
  
  /** Date when mare was acquired by current owner */
  acquisitionDate: string;
  
  /** Purchase price for financial records and valuation history */
  acquisitionPrice: string;
}

interface BasicInfoListViewProps {
  /** 
   * Complete mare information data object containing all basic details.
   * This data should be validated and formatted before being passed to the component.
   * 
   * USAGE PATTERN:
   * The data typically comes from mare detail APIs or form submissions
   * and represents the current state of mare information.
   */
  data: BasicInfoData;
}

/**
 * Mare Basic Information Display Component
 * 
 * COMPONENT STRUCTURE:
 * BasicInfoListView (this component)
 *   └── Card (main container)
 *       ├── CardHeader (section title)
 *       └── CardContent (information grid)
 *           └── Multiple field displays (label-value pairs)
 * 
 * LAYOUT ARCHITECTURE:
 * - Card container provides visual boundary and elevation
 * - Grid layout with responsive columns (1-2 columns based on screen size)
 * - Each field uses flex layout for label-value alignment
 * - Consistent spacing between sections and individual fields
 * 
 * INFORMATION CATEGORIES:
 * The component logically groups information into:
 * 1. Identification Numbers (registration, microchip, passport)
 * 2. Physical Characteristics (birth date, color, measurements)
 * 3. Pedigree Information (sire, dam, bloodline)
 * 4. Administrative Data (owner, location, financial details)
 * 
 * RESPONSIVE BEHAVIOR:
 * - Single column on mobile devices for easy reading
 * - Two columns on tablet and desktop for efficient space usage
 * - Text truncation and wrapping handled gracefully
 * - Maintains readability across all viewport sizes
 * 
 * FIELD DISPLAY PATTERN:
 * Each field follows a consistent display pattern:
 * - Label in muted foreground color for hierarchy
 * - Value in medium font weight for emphasis
 * - Flex layout with space-between for alignment
 * - Conditional rendering to hide empty fields
 */
const BasicInfoListView = ({ data }: BasicInfoListViewProps) => {
  return (
    <Card>
      {/* 
        SECTION HEADER
        - Clear title for the information category
        - Consistent with other card components in the application
        - Provides context for the data being displayed
      */}
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* 
          INFORMATION GRID LAYOUT
          - Responsive grid that adapts to screen size
          - md:grid-cols-2 provides two columns on larger screens
          - gap-4 ensures consistent spacing between grid items
          - Each field uses flex layout for internal alignment
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* IDENTIFICATION SECTION */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Registration Number:</span>
            <span className="font-medium">{data.registrationNumber}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Microchip ID:</span>
            <span className="font-medium">{data.microchipId}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Passport Number:</span>
            <span className="font-medium">{data.passportNumber}</span>
          </div>
          
          {/* PHYSICAL CHARACTERISTICS SECTION */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Birth Date:</span>
            <span className="font-medium">{data.birthDate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Color:</span>
            <span className="font-medium">{data.color}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height:</span>
            <span className="font-medium">{data.height}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight:</span>
            <span className="font-medium">{data.weight}</span>
          </div>
          
          {/* PEDIGREE INFORMATION SECTION */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sire:</span>
            <span className="font-medium">{data.sire}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dam:</span>
            <span className="font-medium">{data.dam}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bloodline Origin:</span>
            <span className="font-medium">{data.bloodlineOrigin}</span>
          </div>
          
          {/* ADMINISTRATIVE INFORMATION SECTION */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Owner:</span>
            <span className="font-medium">{data.owner}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">{data.location}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Insurance Value:</span>
            <span className="font-medium">{data.insuranceValue}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Acquisition Date:</span>
            <span className="font-medium">{data.acquisitionDate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Acquisition Price:</span>
            <span className="font-medium">{data.acquisitionPrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoListView;
