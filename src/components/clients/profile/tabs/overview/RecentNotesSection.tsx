
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ClientNote } from "@/types/client";

interface RecentNotesSectionProps {
  notes: ClientNote[];
}

const RecentNotesSection = ({ notes }: RecentNotesSectionProps) => {
  return (
    <div>
      <h3 className="font-semibold text-base mb-3 flex items-center">
        <FileText className="h-4 w-4 mr-2 text-blue-500" />
        Recent Notes
      </h3>
      {notes.length ? (
        <div className="space-y-2">
          {notes.slice(-3).map((note) => (
            <Card key={note.id} className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <CardContent className="p-3">
                <p className="text-sm text-gray-700">{note.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50/50">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No notes available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecentNotesSection;
