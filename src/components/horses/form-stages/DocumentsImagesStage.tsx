
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HorseFormData } from "@/types/horse";

const DocumentsImagesStage = () => {
  const form = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Images & Documents</h3>
          <p className="text-sm text-muted-foreground">
            Upload horse images and relevant documents such as registration papers, medical records, etc.
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Image and document upload functionality will be implemented here</p>
            <p className="text-sm text-gray-400 mt-2">Drag & drop files or click to browse</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsImagesStage;
