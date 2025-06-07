
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Activity, Edit, View } from "lucide-react";

interface RecordCardProps {
  record: {
    id: string;
    title: string;
    date: string;
    status: string;
    details: { [key: string]: string };
  };
  onEdit: () => void;
  onView: () => void;
}

const RecordCard = ({ record, onEdit, onView }: RecordCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "healthy":
      case "normal": return "bg-green-500";
      case "pregnant": return "bg-blue-500";
      case "failed": return "bg-red-500";
      case "pending": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-slate-800">{record.title}</CardTitle>
          <Badge className={`${getStatusColor(record.status)} text-white text-xs`}>
            {record.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {Object.entries(record.details).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-slate-600">{key}:</span>
              <span className="font-medium text-slate-800">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1">
            <View className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecordCard;
