
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";

interface RecordCardProps {
  record: any;
  onEdit: () => void;
  onView: () => void;
}

const RecordCard = ({ record, onEdit, onView }: RecordCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{record.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {record.date && (
            <p className="text-sm text-muted-foreground">
              Date: {new Date(record.date).toLocaleDateString()}
            </p>
          )}
          {record.status && (
            <Badge variant="outline">{record.status}</Badge>
          )}
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
      </CardContent>
    </Card>
  );
};

export default RecordCard;
