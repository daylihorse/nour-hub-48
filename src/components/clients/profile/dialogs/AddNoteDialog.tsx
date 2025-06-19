import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Client } from "@/types/client";

const noteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a priority" })
  }),
  category: z.string().min(1, "Category is required"),
  isPrivate: z.boolean().optional(),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface AddNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
  onNoteAdded?: (note: any) => void;
}

const AddNoteDialog = ({ open, onOpenChange, client, onNoteAdded }: AddNoteDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: "",
      priority: "medium",
      category: "",
      isPrivate: false
    }
  });

  const watchedPriority = watch("priority");

  const categories = [
    { value: "general", label: "General" },
    { value: "meeting", label: "Meeting Notes" },
    { value: "phone_call", label: "Phone Call" },
    { value: "email", label: "Email Communication" },
    { value: "contract", label: "Contract Related" },
    { value: "payment", label: "Payment/Billing" },
    { value: "complaint", label: "Complaint/Issue" },
    { value: "follow_up", label: "Follow-up Required" },
    { value: "horse_related", label: "Horse Related" },
    { value: "training", label: "Training/Lessons" },
    { value: "medical", label: "Medical/Veterinary" },
    { value: "maintenance", label: "Property/Maintenance" },
  ];

  const priorities = [
    { value: "low", label: "Low", icon: Info, color: "text-blue-600" },
    { value: "medium", label: "Medium", icon: FileText, color: "text-yellow-600" },
    { value: "high", label: "High", icon: AlertTriangle, color: "text-red-600" },
  ];

  const onSubmit = async (data: NoteFormData) => {
    setIsSubmitting(true);
    try {
      const newNote = {
        id: Date.now().toString(),
        content: data.content,
        priority: data.priority,
        category: data.category,
        isPrivate: data.isPrivate || false,
        createdAt: new Date(),
        createdBy: "Current User", // In real app, get from auth context
        clientId: client.id,
        clientName: client.name
      };

      // In a real application, this would save to a database
      console.log("Adding note:", newNote);

      if (onNoteAdded) {
        onNoteAdded(newNote);
      }

      toast.success(`Note added for ${client.name}`);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const PriorityIcon = priorities.find(p => p.value === watchedPriority)?.icon || FileText;
  const priorityColor = priorities.find(p => p.value === watchedPriority)?.color || "text-gray-600";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Add Note for {client.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority *</Label>
            <Select onValueChange={(value) => setValue("priority", value as "low" | "medium" | "high")} defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center gap-2">
                      <priority.icon className={`h-4 w-4 ${priority.color}`} />
                      {priority.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-red-600">{errors.priority.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Note Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Note Content *</Label>
            <div className="relative">
              <PriorityIcon className={`absolute left-3 top-3 h-4 w-4 ${priorityColor}`} />
              <Textarea
                id="content"
                placeholder="Enter your note here..."
                rows={6}
                className="pl-10 resize-none"
                {...register("content")}
              />
            </div>
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          {/* Private Note Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPrivate"
              {...register("isPrivate")}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <Label htmlFor="isPrivate" className="text-sm font-normal">
              Mark as private note (only visible to you)
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {isSubmitting ? "Adding..." : "Add Note"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog; 