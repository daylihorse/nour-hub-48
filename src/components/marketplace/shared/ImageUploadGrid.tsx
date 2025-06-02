
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageUploadGrid = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageUpload = (index: number) => {
    // Mock image upload
    const newImages = [...uploadedImages];
    newImages[index] = `image-${index + 1}-${Date.now()}`;
    setUploadedImages(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages[index] = "";
    setUploadedImages(newImages);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-4">Product Images</h3>
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative">
            {uploadedImages[index] ? (
              <div className="border-2 border-dashed rounded-md p-6 bg-green-50 border-green-300">
                <div className="text-center">
                  <div className="text-green-600 font-medium">Image {index + 1}</div>
                  <div className="text-sm text-green-500">Uploaded ✓</div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed rounded-md p-6 hover:border-primary cursor-pointer"
                onClick={() => handleImageUpload(index)}
              >
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Upload Image {index + 1}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadGrid;
