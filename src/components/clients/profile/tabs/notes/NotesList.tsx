
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ClientNote } from "@/types/client";

interface NotesListProps {
  notes: ClientNote[];
}

const NotesList = ({ notes }: NotesListProps) => {
  if (notes.length === 0) {
    return <p className="text-muted-foreground">No notes available for this client.</p>;
  }

  return (
    <div className="space-y-3">
      {[...notes].reverse().map((note) => (
        <Card key={note.id}>
          <CardContent className="pt-4">
            <p>{note.content}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotesList;
