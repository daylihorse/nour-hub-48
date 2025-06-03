
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Upload, X, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HorseFormValues } from "../form-schema/HorseFormSchema";

const DocumentsImagesStage = () => {
  const form = useFormContext<HorseFormValues>();
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    const currentImages = form.getValues("images") || [];
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    form.setValue("images", [...currentImages, ...newImages]);
  };

  const handleDocumentUpload = (files: FileList | null) => {
    if (!files) return;
    
    const currentDocs = form.getValues("documents") || [];
    const newDocs = Array.from(files).map(file => file.name);
    form.setValue("documents", [...currentDocs, ...newDocs]);
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    form.setValue("images", currentImages.filter((_, i) => i !== index));
  };

  const removeDocument = (index: number) => {
    const currentDocs = form.getValues("documents") || [];
    form.setValue("documents", currentDocs.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files?.length) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      const documentFiles = Array.from(files).filter(file => !file.type.startsWith('image/'));
      
      if (imageFiles.length) {
        const fileList = new DataTransfer();
        imageFiles.forEach(file => fileList.items.add(file));
        handleImageUpload(fileList.files);
      }
      
      if (documentFiles.length) {
        const fileList = new DataTransfer();
        documentFiles.forEach(file => fileList.items.add(file));
        handleDocumentUpload(fileList.files);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const images = form.watch("images") || [];
  const documents = form.watch("documents") || [];

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
          <p className="text-muted-foreground text-center mb-4">
            Drag and drop files here, or click to select files
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Image className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('document-upload')?.click()}
            >
              <FileText className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </div>
          
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
          <input
            id="document-upload"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => handleDocumentUpload(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Images Preview */}
      {images.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3">Horse Images ({images.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Horse image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents List */}
      {documents.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3">Documents ({documents.length})</h4>
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-2 w-fit">
                <FileText className="h-3 w-3" />
                {doc}
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">File Upload Guidelines</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Images: JPG, PNG, or WEBP format (max 5MB each)</li>
          <li>• Documents: PDF, DOC, DOCX, or TXT format (max 10MB each)</li>
          <li>• Recommended: Photos of the horse from different angles</li>
          <li>• Include: Registration papers, vaccination records, health certificates</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentsImagesStage;
