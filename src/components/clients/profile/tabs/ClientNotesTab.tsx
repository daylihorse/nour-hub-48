
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { ClientNote } from "@/types/client";

interface ClientNotesTabProps {
  notes: ClientNote[];
  setNotes: (notes: ClientNote[]) => void;
}

const ClientNotesTab = ({ notes, setNotes }: ClientNotesTabProps) => {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const newNoteItem: ClientNote = {
      id: uuidv4(),
      content: newNote,
      createdAt: new Date().toISOString(),
      createdBy: "current-user"
    };
    
    setNotes([...notes, newNoteItem]);
    setNewNote("");
    toast.success("Note added successfully");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Client Notes</h3>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Note
        </Button>
      </div>
      
      <div className="space-y-3">
        <Textarea 
          placeholder="Add a new note..." 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleAddNote} disabled={!newNote.trim()}>
          Save Note
        </Button>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        {notes.length ? (
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
        ) : (
          <p className="text-muted-foreground">No notes available for this client.</p>
        )}
      </ScrollArea>
    </>
  );
};

export default ClientNotesTab;
