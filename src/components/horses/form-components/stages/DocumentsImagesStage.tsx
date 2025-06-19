
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse-unified";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Image } from "lucide-react";

const DocumentsImagesStage = () => {
  const { watch } = useFormContext<HorseFormData>();
  const images = watch("images") || [];
  const documents = watch("documents") || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Image className="h-12 w-12 mx-auto text-gray-400" />
              <div>
                <h3 className="font-medium">Horse Images</h3>
                <p className="text-sm text-gray-600">Upload photos of the horse</p>
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
              {images.length > 0 && (
                <p className="text-sm text-green-600">{images.length} image(s) uploaded</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <div>
                <h3 className="font-medium">Documents</h3>
                <p className="text-sm text-gray-600">Upload certificates, records, etc.</p>
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
              {documents.length > 0 && (
                <p className="text-sm text-green-600">{documents.length} document(s) uploaded</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentsImagesStage;
