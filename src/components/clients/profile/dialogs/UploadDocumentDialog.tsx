import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, FileText, Image, FileSpreadsheet, Archive } from "lucide-react";
import { toast } from "sonner";
import { Client } from "@/types/client";

const uploadSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  description: z.string().optional(),
  tags: z.string().optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
  onDocumentUploaded?: (document: any) => void;
}

const UploadDocumentDialog = ({ open, onOpenChange, client, onDocumentUploaded }: UploadDocumentDialogProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      documentType: "",
      description: "",
      tags: ""
    }
  });

  const documentTypes = [
    { value: "contract", label: "Contract/Agreement" },
    { value: "invoice", label: "Invoice/Bill" },
    { value: "receipt", label: "Receipt/Payment" },
    { value: "identification", label: "ID/License" },
    { value: "insurance", label: "Insurance Document" },
    { value: "medical", label: "Medical/Veterinary Record" },
    { value: "registration", label: "Horse Registration" },
    { value: "certificate", label: "Certificate" },
    { value: "correspondence", label: "Email/Letter" },
    { value: "photo", label: "Photo/Image" },
    { value: "report", label: "Report/Analysis" },
    { value: "other", label: "Other" },
  ];

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return Image;
      case 'pdf':
        return FileText;
      case 'doc':
      case 'docx':
      case 'txt':
        return FileText;
      case 'xls':
      case 'xlsx':
      case 'csv':
        return FileSpreadsheet;
      case 'zip':
      case 'rar':
      case '7z':
        return Archive;
      default:
        return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateUpload = () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          setUploadProgress(100);
          clearInterval(interval);
          setTimeout(resolve, 500);
        } else {
          setUploadProgress(progress);
        }
      }, 200);
    });
  };

  const onSubmit = async (data: UploadFormData) => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate file upload process
      await simulateUpload();

      const uploadedDocuments = selectedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        type: data.documentType,
        description: data.description,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        uploadedAt: new Date(),
        uploadedBy: "Current User", // In real app, get from auth context
        clientId: client.id,
        clientName: client.name,
        url: URL.createObjectURL(file) // In real app, this would be the server URL
      }));

      // In a real application, this would upload to a server
      console.log("Uploading documents:", uploadedDocuments);

      if (onDocumentUploaded) {
        uploadedDocuments.forEach(doc => onDocumentUploaded(doc));
      }

      toast.success(`${selectedFiles.length} document(s) uploaded successfully for ${client.name}`);
      handleClose();
    } catch (error) {
      console.error("Error uploading documents:", error);
      toast.error("Failed to upload documents");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setUploadProgress(0);
    setIsUploading(false);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Documents for {client.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>Files *</Label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, DOC, XLS, Images (Max 10MB each)</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt,.csv,.zip,.rar"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files ({selectedFiles.length})</Label>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {selectedFiles.map((file, index) => {
                  const FileIcon = getFileIcon(file.name);
                  return (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium truncate">{file.name}</span>
                        <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Document Type */}
          <div className="space-y-2">
            <Label htmlFor="documentType">Document Type *</Label>
            <Select onValueChange={(value) => setValue("documentType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.documentType && (
              <p className="text-sm text-red-600">{errors.documentType.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the document(s)..."
              rows={3}
              {...register("description")}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="e.g., urgent, contract, payment (comma separated)"
              {...register("tags")}
            />
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading || selectedFiles.length === 0}>
              {isUploading ? "Uploading..." : `Upload ${selectedFiles.length} File(s)`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog; 