
import { MessageSquare, Phone, Mail, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { CommunicationLog } from "@/types/client";

interface RecentCommunicationsSectionProps {
  communications: CommunicationLog[];
}

const RecentCommunicationsSection = ({ communications }: RecentCommunicationsSectionProps) => {
  const getIconForType = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-3 w-3 mr-2 text-green-600" />;
      case "email":
        return <Mail className="h-3 w-3 mr-2 text-green-600" />;
      case "message":
        return <MessageSquare className="h-3 w-3 mr-2 text-green-600" />;
      case "meeting":
        return <Calendar className="h-3 w-3 mr-2 text-green-600" />;
      default:
        return <MessageSquare className="h-3 w-3 mr-2 text-green-600" />;
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-base mb-3 flex items-center">
        <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
        Recent Communications
      </h3>
      {communications && communications.length ? (
        <div className="space-y-2">
          {communications.slice(-3).map((comm) => (
            <Card key={comm.id} className="bg-gradient-to-r from-green-50 to-green-100/50">
              <CardContent className="p-3">
                <div className="flex items-center mb-1">
                  {getIconForType(comm.type)}
                  <span className="text-sm font-medium capitalize text-green-700">{comm.type}</span>
                </div>
                <p className="text-sm text-gray-700">{comm.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(comm.date), { addSuffix: true })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50/50">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No communication logs available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecentCommunicationsSection;
