
import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "@/types/client";

/**
 * Props interface for ClientContactInfo component
 */
interface ClientContactInfoProps {
  /** Client object containing contact information */
  client: Client;
}

/**
 * ClientContactInfo Component
 * 
 * Displays client contact information in a structured, visually appealing format.
 * This component presents essential contact details that users frequently need
 * to access when working with clients.
 * 
 * Features:
 * - Phone number display with phone icon
 * - Email address display with mail icon
 * - Address display with map pin icon (conditional rendering)
 * - Responsive grid layout for optimal viewing on different screen sizes
 * - Consistent visual styling with rounded backgrounds and proper spacing
 * - Icons provide visual context for each type of contact information
 * 
 * The component uses a card layout with a header to clearly identify the
 * section and organizes contact details in a grid for easy scanning.
 */
const ClientContactInfo = ({ client }: ClientContactInfoProps) => {
  return (
    <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Phone className="h-4 w-4 mr-2 text-blue-500" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {/* Contact details grid - responsive layout for phone and email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Phone number display with icon */}
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <Phone className="h-3 w-3 mr-2 text-gray-500" />
            <span className="text-sm">{client.phone}</span>
          </div>
          
          {/* Email address display with icon */}
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <Mail className="h-3 w-3 mr-2 text-gray-500" />
            <span className="text-sm">{client.email}</span>
          </div>
        </div>
        
        {/* Address display - only rendered if address exists */}
        {/* Uses conditional rendering to avoid empty sections */}
        {client.address && (
          <div className="flex items-start p-2 rounded-lg bg-gray-50">
            <MapPin className="h-3 w-3 mr-2 text-gray-500 mt-0.5" />
            <span className="text-sm">{client.address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientContactInfo;
