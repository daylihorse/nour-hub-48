
import { Card, CardContent } from "@/components/ui/card";
import { Client } from "@/types/client";
import ClientContactInfo from "./ClientContactInfo";
import ClientTimeline from "./ClientTimeline";

/**
 * Props interface for ClientBasicInfo component
 */
interface ClientBasicInfoProps {
  /** Client object containing all client information */
  client: Client;
}

/**
 * ClientBasicInfo Component
 * 
 * Container component that organizes and displays essential client information
 * in a structured layout. This component acts as a section header that groups
 * related basic information components together.
 * 
 * Features:
 * - Contact information display (phone, email, address)
 * - Timeline information (client since date, last contact)
 * - Responsive layout with consistent spacing
 * - Clean separation of concerns between contact and timeline data
 * 
 * This component follows a composition pattern, delegating specific
 * responsibilities to specialized child components while maintaining
 * the overall layout structure.
 */
const ClientBasicInfo = ({ client }: ClientBasicInfoProps) => {
  return (
    <div className="space-y-4">
      {/* Contact Information Card - displays phone, email, and address */}
      <ClientContactInfo client={client} />
      
      {/* Timeline Information Card - shows client relationship duration and last interaction */}
      <ClientTimeline client={client} />
    </div>
  );
};

export default ClientBasicInfo;
