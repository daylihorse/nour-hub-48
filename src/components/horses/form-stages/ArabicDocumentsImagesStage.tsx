
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Upload, X, FileText, Image, Camera, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HorseFormData } from "@/types/horse";

const ArabicDocumentsImagesStage = () => {
  const form = useFormContext<HorseFormData>();
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    const currentImages = form.getValues("images") || [];
    const newImages: string[] = [];
    
    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newImages.push(url);
        
        // Simulate upload progress
        const fileKey = `image-${Date.now()}-${index}`;
        setUploadProgress(prev => ({ ...prev, [fileKey]: 0 }));
        
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = (prev[fileKey] || 0) + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                setUploadProgress(prev => {
                  const { [fileKey]: _, ...rest } = prev;
                  return rest;
                });
              }, 500);
              return { ...prev, [fileKey]: 100 };
            }
            return { ...prev, [fileKey]: newProgress };
          });
        }, 100);
      }
    });
    
    if (newImages.length > 0) {
      form.setValue("images", [...currentImages, ...newImages]);
    }
  };

  const handleDocumentUpload = (files: FileList | null) => {
    if (!files) return;
    
    const currentDocs = form.getValues("documents") || [];
    const newDocs: string[] = [];
    
    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith('image/')) {
        newDocs.push(file.name);
        
        // Simulate upload progress
        const fileKey = `doc-${Date.now()}-${index}`;
        setUploadProgress(prev => ({ ...prev, [fileKey]: 0 }));
        
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = (prev[fileKey] || 0) + 15;
            if (newProgress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                setUploadProgress(prev => {
                  const { [fileKey]: _, ...rest } = prev;
                  return rest;
                });
              }, 500);
              return { ...prev, [fileKey]: 100 };
            }
            return { ...prev, [fileKey]: newProgress };
          });
        }, 120);
      }
    });
    
    if (newDocs.length > 0) {
      form.setValue("documents", [...currentDocs, ...newDocs]);
    }
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
    <div className="space-y-6" dir="rtl">
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
          <h3 className="text-lg font-semibold mb-2 text-center">رفع الملفات</h3>
          <p className="text-muted-foreground text-center mb-4">
            اسحب الملفات هنا أو انقر لاختيار الملفات
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('arabic-image-upload')?.click()}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              رفع الصور
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('arabic-document-upload')?.click()}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              رفع الوثائق
            </Button>
          </div>
          
          <input
            id="arabic-image-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
          <input
            id="arabic-document-upload"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => handleDocumentUpload(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h4 className="text-sm font-medium text-right">جاري الرفع...</h4>
            {Object.entries(uploadProgress).map(([key, progress]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{Math.round(progress)}%</span>
                  <span className="text-muted-foreground">
                    {key.startsWith('image') ? 'صورة' : 'وثيقة'}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Images Preview */}
      {images.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold mb-3 text-right flex items-center gap-2">
              <span>({images.length})</span>
              <span>صور الحصان</span>
              <Image className="h-5 w-5" />
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`صورة الحصان ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 left-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents List */}
      {documents.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold mb-3 text-right flex items-center gap-2">
              <span>({documents.length})</span>
              <span>الوثائق</span>
              <File className="h-5 w-5" />
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="text-destructive hover:text-destructive/80 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-sm truncate">{doc}</span>
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-right">
          <h5 className="font-medium text-blue-900 mb-2 flex items-center gap-2 justify-end">
            <span>إرشادات رفع الملفات</span>
            <FileText className="h-4 w-4" />
          </h5>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• الصور: تنسيق JPG، PNG، أو WEBP (حد أقصى 5 ميجابايت لكل صورة)</li>
            <li>• الوثائق: تنسيق PDF، DOC، DOCX، أو TXT (حد أقصى 10 ميجابايت لكل ملف)</li>
            <li>• مستحسن: صور للحصان من زوايا مختلفة</li>
            <li>• يشمل: أوراق التسجيل، سجلات التطعيم، الشهادات الصحية</li>
          </ul>
        </CardContent>
      </Card>

      {/* Summary */}
      {(images.length > 0 || documents.length > 0) && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-green-800 text-sm">
                المجموع: {images.length + documents.length} ملف
              </div>
              <div className="flex items-center gap-4 text-sm text-green-700">
                <span>{documents.length} وثيقة</span>
                <span>{images.length} صورة</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArabicDocumentsImagesStage;
