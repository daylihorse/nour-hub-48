
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddColorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddColor: (color: { value: string; label: string; arabicLabel: string; description: string }) => void;
}

const AddColorDialog = ({ open, onOpenChange, onAddColor }: AddColorDialogProps) => {
  const [englishName, setEnglishName] = useState("");
  const [arabicName, setArabicName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (englishName.trim()) {
      const colorValue = englishName.toLowerCase().replace(/\s+/g, '_');
      onAddColor({
        value: colorValue,
        label: englishName.trim(),
        arabicLabel: arabicName.trim() || englishName.trim(),
        description: description.trim()
      });
      setEnglishName("");
      setArabicName("");
      setDescription("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setEnglishName("");
    setArabicName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Color</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="english-name">English Name *</Label>
            <Input
              id="english-name"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
              placeholder="Enter color name in English"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="arabic-name">Arabic Name</Label>
            <Input
              id="arabic-name"
              value={arabicName}
              onChange={(e) => setArabicName(e.target.value)}
              placeholder="Enter color name in Arabic"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Detailed Description of this Color</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter detailed description of the color"
              className="min-h-[80px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!englishName.trim()} className="bg-orange-500 hover:bg-orange-600">
            Add Color
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddColorDialog;
