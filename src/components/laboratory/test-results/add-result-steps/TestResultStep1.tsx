
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Beaker } from "lucide-react";
import { TestResultFormData } from "../AddTestResultDialog";
import { useTemplateIntegration } from "../hooks/useTemplateIntegration";

interface TestResultStep1Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep1 = ({ formData, updateFormData }: TestResultStep1Props) => {
  const { templates, loading, getTemplateById } = useTemplateIntegration();

  // Mock samples data - in real app this would come from an API
  const availableSamples = [
    { id: "S004", horseName: "Lightning", horsePhoto: "/placeholder.svg", clientName: "Mike Johnson", clientPhone: "+1-555-0126", clientEmail: "mike.j@email.com" },
    { id: "S005", horseName: "Spirit", horsePhoto: "/placeholder.svg", clientName: "Sarah Wilson", clientPhone: "+1-555-0127", clientEmail: "sarah.w@email.com" },
    { id: "S006", horseName: "Midnight", horsePhoto: "/placeholder.svg", clientName: "Tom Davis", clientPhone: "+1-555-0128", clientEmail: "tom.d@email.com" }
  ];

  const handleSampleSelect = (sampleId: string) => {
    const sample = availableSamples.find(s => s.id === sampleId);
    if (sample) {
      updateFormData({
        sampleId: sample.id,
        horseName: sample.horseName,
        horsePhoto: sample.horsePhoto,
        clientName: sample.clientName,
        clientPhone: sample.clientPhone,
        clientEmail: sample.clientEmail
      });
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      updateFormData({
        testType: template.nameEn,
        templateId: templateId
      });
    }
  };

  const selectedTemplate = formData.templateId ? getTemplateById(formData.templateId) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sample Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sample">Select Sample</Label>
            <Select value={formData.sampleId} onValueChange={handleSampleSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a sample to analyze" />
              </SelectTrigger>
              <SelectContent>
                {availableSamples.map((sample) => (
                  <SelectItem key={sample.id} value={sample.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={sample.horsePhoto} alt={sample.horseName} />
                        <AvatarFallback>{sample.horseName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{sample.id} - {sample.horseName} ({sample.clientName})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.sampleId && (
            <Card className="bg-gray-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={formData.horsePhoto} alt={formData.horseName} />
                    <AvatarFallback>{formData.horseName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{formData.horseName}</h3>
                    <p className="text-sm text-muted-foreground">Sample ID: {formData.sampleId}</p>
                    <p className="text-sm text-muted-foreground">Client: {formData.clientName}</p>
                    <p className="text-sm text-muted-foreground">Phone: {formData.clientPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            Test Template Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="template">Select Test Template</Label>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading templates...</div>
            ) : (
              <Select value={formData.templateId} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a test template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{template.nameEn}</span>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{template.nameAr}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {selectedTemplate && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{selectedTemplate.nameEn}</h4>
                    <Badge>{selectedTemplate.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground" dir="rtl">{selectedTemplate.nameAr}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sample Type:</span>
                      <span className="capitalize">{selectedTemplate.sampleType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedTemplate.turnaroundTime}h turnaround</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Methodology:</span>
                      <span className="capitalize">{selectedTemplate.methodology}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Parameters:</span>
                      <span>{selectedTemplate.parameters.length} configured</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <Label htmlFor="completedDate">Completion Date</Label>
            <Input
              id="completedDate"
              type="date"
              value={formData.completedDate}
              onChange={(e) => updateFormData({ completedDate: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResultStep1;
