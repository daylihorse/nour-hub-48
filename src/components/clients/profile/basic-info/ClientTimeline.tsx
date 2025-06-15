
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import { Client } from "@/types/client";

/**
 * Props interface for ClientTimeline component
 */
interface ClientTimelineProps {
  /** Client object containing timeline information */
  client: Client;
}

/**
 * ClientTimeline Component
 * 
 * Displays important timeline information about the client relationship,
 * providing context about the duration and recency of client interactions.
 * This information helps users understand the client relationship history
 * at a glance.
 * 
 * Features:
 * - Client relationship start date ("Client Since")
 * - Last interaction timestamp with relative time display
 * - Color-coded sections for visual distinction
 * - Responsive grid layout for side-by-side display
 * - Date formatting for consistent presentation
 * - Professional card styling with subtle visual hierarchy
 * 
 * The component uses date-fns for consistent date formatting and
 * relative time calculations, ensuring dates are displayed in a
 * user-friendly format.
 */
const ClientTimeline = ({ client }: ClientTimelineProps) => {
  return (
    <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Timeline</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2">
          {/* Client relationship start date */}
          {/* Shows when the client relationship began using month/year format */}
          <div className="text-center p-2 rounded-lg bg-blue-50">
            <div className="text-xs font-medium text-blue-600">Client Since</div>
            <div className="text-sm font-bold text-blue-800">
              {format(new Date(client.createdAt), 'MMM yyyy')}
            </div>
          </div>
          
          {/* Last interaction timestamp */}
          {/* Shows how long ago the last interaction occurred using relative time */}
          <div className="text-center p-2 rounded-lg bg-green-50">
            <div className="text-xs font-medium text-green-600">Last Contact</div>
            <div className="text-sm font-bold text-green-800">
              {formatDistanceToNow(new Date(client.lastInteraction), { addSuffix: true })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientTimeline;
