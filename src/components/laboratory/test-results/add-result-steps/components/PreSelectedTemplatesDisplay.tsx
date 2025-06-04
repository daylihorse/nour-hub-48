
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Beaker, CheckCircle } from "lucide-react";
import { Template } from "@/types/template";

interface PreSelectedTemplatesDisplayProps {
  templates: Template[];
  loading: boolean;
}

const PreSelectedTemplatesDisplay = ({ templates, loading }: PreSelectedTemplatesDisplayProps) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-4 text-muted-foreground">
            Loading templates...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (templates.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-4 text-muted-foreground">
            No templates found for this sample. Please select a different sample.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Pre-Selected Test Templates
          <Badge variant="outline" className="ml-auto">
            {templates.length} template{templates.length > 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground mb-4">
          The following templates were pre-selected during sample registration:
        </div>
        
        {templates.map((template) => (
          <Card key={template.id} className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{template.nameEn}</h4>
                  <Badge>{template.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground" dir="rtl">{template.nameAr}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Sample Type:</span>
                    <span className="capitalize">{template.sampleType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{template.turnaroundTime}h turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Methodology:</span>
                    <span className="capitalize">{template.methodology}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Beaker className="h-4 w-4" />
                    <span>{template.parameters.length} parameters</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default PreSelectedTemplatesDisplay;
