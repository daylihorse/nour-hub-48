
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";

interface RecordListItemProps {
  record: any;
  onEdit: () => void;
  onView: () => void;
}

const RecordListItem = ({ record, onEdit, onView }: RecordListItemProps) => {
  return (
    <div className="flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-slate-50">
      <div className="flex-1">
        <h4 className="font-medium">{record.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          {record.date && (
            <span className="text-sm text-muted-foreground">
              {new Date(record.date).toLocaleDateString()}
            </span>
          )}
          {record.status && (
            <Badge variant="outline" className="text-xs">{record.status}</Badge>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onView}>
          <Eye className="h-3 w-3 mr-1" />
          View
        </Button>
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default RecordListItem;
