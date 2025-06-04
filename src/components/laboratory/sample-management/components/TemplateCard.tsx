
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Clock, Beaker, Eye } from "lucide-react";
import { Template } from "@/types/template";

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelectionChange: (templateId: string, checked: boolean) => void;
  onPreview: (template: Template) => void;
}

const TemplateCard = ({ template, isSelected, onSelectionChange, onPreview }: TemplateCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected 
          ? 'ring-2 ring-primary bg-primary/5' 
          : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelectionChange(template.id, !isSelected)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelectionChange(template.id, checked as boolean)}
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
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {template.category}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
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
  );
};

export default TemplateCard;
