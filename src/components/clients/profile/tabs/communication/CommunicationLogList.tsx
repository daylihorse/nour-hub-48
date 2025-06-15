
import { Phone, Mail, MessageSquare, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CommunicationLog } from "@/types/client";

interface CommunicationLogListProps {
  communications: CommunicationLog[];
}

const CommunicationLogList = ({ communications }: CommunicationLogListProps) => {
  if (!communications || communications.length === 0) {
    return <p className="text-muted-foreground">No communication logs available.</p>;
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4 mr-2" />;
      case "email":
        return <Mail className="h-4 w-4 mr-2" />;
      case "message":
        return <MessageSquare className="h-4 w-4 mr-2" />;
      case "meeting":
        return <Calendar className="h-4 w-4 mr-2" />;
      default:
        return <MessageSquare className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="space-y-3">
      {[...communications].reverse().map((comm) => (
        <Card key={comm.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getIconForType(comm.type)}
                <CardTitle className="text-base capitalize">{comm.type}</CardTitle>
              </div>
              <span className="text-xs text-muted-foreground">
                {format(new Date(comm.date), 'MMM dd, yyyy')}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p>{comm.description}</p>
            {comm.contactPerson && (
              <p className="text-sm text-muted-foreground mt-1">
                Contact: {comm.contactPerson}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunicationLogList;
