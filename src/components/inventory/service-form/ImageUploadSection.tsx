
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormValues } from "./FormSchema";

interface ImageUploadSectionProps {
  form: UseFormReturn<FormValues>;
}

const ImageUploadSection = ({ form }: ImageUploadSectionProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...imageUrls]);
      form.setValue('images', [...selectedImages, ...imageUrls]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    form.setValue('images', updatedImages);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Service Images</h2>
      
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload Service Images</FormLabel>
            <FormControl>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedImages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Selected Images:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Service image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={() => removeImage(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;
