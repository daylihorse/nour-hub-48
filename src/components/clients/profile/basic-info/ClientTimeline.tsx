
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import { Client } from "@/types/client";

interface ClientTimelineProps {
  client: Client;
}

const ClientTimeline = ({ client }: ClientTimelineProps) => {
  return (
    <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Timeline</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 rounded-lg bg-blue-50">
            <div className="text-xs font-medium text-blue-600">Client Since</div>
            <div className="text-sm font-bold text-blue-800">
              {format(new Date(client.createdAt), 'MMM yyyy')}
            </div>
          </div>
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
