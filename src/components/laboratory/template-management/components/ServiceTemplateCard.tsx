
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";
import ServiceTemplateActions from "./ServiceTemplateActions";

interface ServiceTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  description: string;
  testsIncluded: string[];
  duration: string;
  price: string;
  category: string;
  status: string;
}

interface ServiceTemplateCardProps {
  template: ServiceTemplate;
  onView: (template: ServiceTemplate) => void;
  onEdit: (template: ServiceTemplate) => void;
  onDuplicate: (template: ServiceTemplate) => void;
  onDelete: (template: ServiceTemplate) => void;
}

const ServiceTemplateCard = ({ 
  template, 
  onView, 
  onEdit, 
  onDuplicate, 
  onDelete 
}: ServiceTemplateCardProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { variant: "default" as const, label: "Active" },
      draft: { variant: "secondary" as const, label: "Draft" },
      archived: { variant: "outline" as const, label: "Archived" }
    };
    
    return (
      <Badge variant={statusMap[status as keyof typeof statusMap]?.variant || "outline"}>
        {statusMap[status as keyof typeof statusMap]?.label || status}
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{template.nameEn}</CardTitle>
            <div className="text-sm text-muted-foreground" dir="rtl">
              {template.nameAr}
            </div>
          </div>
          <ServiceTemplateActions
            template={template}
            onView={onView}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{template.description}</p>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Included Tests:</div>
          <div className="flex flex-wrap gap-1">
            {template.testsIncluded.map((test, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {test}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {template.duration}
          </div>
          <div className="flex items-center gap-1 font-medium">
            <DollarSign className="h-4 w-4" />
            {template.price}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Badge variant="secondary">{template.category}</Badge>
          {getStatusBadge(template.status)}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTemplateCard;
