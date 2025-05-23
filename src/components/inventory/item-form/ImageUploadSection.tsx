
import { Upload } from "lucide-react";

interface ImageUploadSectionProps {
  selectedImages: string[];
  setSelectedImages: (images: string[]) => void;
}

const ImageUploadSection = ({ selectedImages, setSelectedImages }: ImageUploadSectionProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Images</h2>

      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="border-2 border-dashed rounded-md flex flex-col items-center justify-center p-6 hover:border-primary cursor-pointer"
            onClick={() => {
              // In a real app, this would open a file picker
              const mockImage = `image-${index + 1}`;
              if (!selectedImages.includes(mockImage)) {
                setSelectedImages([...selectedImages, mockImage]);
              }
            }}
          >
            {selectedImages[index] ? (
              <div className="text-primary">Image Selected</div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Upload Image</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadSection;
