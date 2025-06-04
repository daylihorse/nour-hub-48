
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Beaker } from "lucide-react";

interface Template {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  sampleType: string;
  methodology: string;
  turnaroundTime: string;
  parametersCount: number;
}

interface TemplateSelectionSectionProps {
  selectedTemplates: string[];
  onTemplateChange: (templateId: string, checked: boolean) => void;
}

const mockTemplates: Template[] = [
  {
    id: "cbc-template",
    nameEn: "Complete Blood Count",
    nameAr: "تعداد الدم الكامل",
    category: "Hematology",
    sampleType: "Blood",
    methodology: "Automated",
    turnaroundTime: "2 hours",
    parametersCount: 12
  },
  {
    id: "chemistry-template",
    nameEn: "Blood Chemistry Panel",
    nameAr: "فحص كيمياء الدم",
    category: "Clinical Chemistry",
    sampleType: "Serum",
    methodology: "Automated",
    turnaroundTime: "4 hours",
    parametersCount: 8
  },
  {
    id: "liver-template",
    nameEn: "Liver Function Panel",
    nameAr: "فحص وظائف الكبد",
    category: "Clinical Chemistry",
    sampleType: "Serum",
    methodology: "Automated",
    turnaroundTime: "3 hours",
    parametersCount: 6
  },
  {
    id: "thyroid-template",
    nameEn: "Thyroid Profile",
    nameAr: "ملف الغدة الدرقية",
    category: "Endocrinology",
    sampleType: "Serum",
    methodology: "Immunoassay",
    turnaroundTime: "6 hours",
    parametersCount: 5
  }
];

const TemplateSelectionSection = ({
  selectedTemplates,
  onTemplateChange
}: TemplateSelectionSectionProps) => {
  return (
    <div>
      <Label className="block mb-3">Required Test Templates *</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplates.includes(template.id) 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onTemplateChange(template.id, !selectedTemplates.includes(template.id))}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedTemplates.includes(template.id)}
                    onChange={() => {}} // Handled by card click
                    className="mt-1"
                  />
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {template.nameEn}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground" dir="rtl">
                      {template.nameAr}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Sample: {template.sampleType}</span>
                  <span>{template.methodology}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{template.turnaroundTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Beaker className="h-3 w-3" />
                    <span>{template.parametersCount} parameters</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedTemplates.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-800 mb-2">
            Selected Templates ({selectedTemplates.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTemplates.map((templateId) => {
              const template = mockTemplates.find(t => t.id === templateId);
              return template ? (
                <Badge key={templateId} variant="default" className="text-xs">
                  {template.nameEn}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelectionSection;
