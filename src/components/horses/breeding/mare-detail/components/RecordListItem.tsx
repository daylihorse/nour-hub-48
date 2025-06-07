
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, View, Calendar } from "lucide-react";

interface RecordListItemProps {
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

const RecordListItem = ({ record, onEdit, onView }: RecordListItemProps) => {
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
    <div className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <Calendar className="h-5 w-5 text-slate-400" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-slate-800">{record.title}</h3>
            <Badge className={`${getStatusColor(record.status)} text-white text-xs`}>
              {record.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
          <div className="flex gap-4 mt-2">
            {Object.entries(record.details).slice(0, 3).map(([key, value]) => (
              <span key={key} className="text-xs text-slate-600">
                <strong>{key}:</strong> {value}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onView}>
          <View className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default RecordListItem;
