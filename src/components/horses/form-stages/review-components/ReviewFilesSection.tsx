
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { HorseFormValues } from "../../form-schema/HorseFormSchema";

interface ReviewFilesSectionProps {
  formData: HorseFormValues;
}

const ReviewFilesSection = ({ formData }: ReviewFilesSectionProps) => {
  if (!formData.images?.length && !formData.documents?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5" />
          Files & Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-muted-foreground">Images:</span>
            <span className="ml-2 font-medium">{formData.images?.length || 0} files</span>
          </div>
          <div>
            <span className="text-muted-foreground">Documents:</span>
            <span className="ml-2 font-medium">{formData.documents?.length || 0} files</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewFilesSection;
