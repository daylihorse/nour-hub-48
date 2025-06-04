
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResultTemplateStep3Props {
  data: any;
  onDataChange: (data: any) => void;
}

const ResultTemplateStep3 = ({ data, onDataChange }: ResultTemplateStep3Props) => {
  const validationChecks = [
    {
      id: "basic_info",
      label: "Basic Information Complete",
      passed: data.basicInfo?.nameEn && data.basicInfo?.nameAr && data.basicInfo?.category,
      message: "Template name in both languages and category are required"
    },
    {
      id: "parameters",
      label: "Parameters Configured",
      passed: data.parameters?.length > 0,
      message: "At least one parameter must be configured"
    },
    {
      id: "normal_ranges",
      label: "Normal Ranges Set",
      passed: data.parameters?.some((p: any) => p.normalRangeMin && p.normalRangeMax),
      message: "Normal ranges should be set for numeric parameters"
    },
    {
      id: "bilingual",
      label: "Bilingual Support",
      passed: data.parameters?.every((p: any) => p.nameEn && p.nameAr),
      message: "All parameters should have names in both languages"
    }
  ];

  const allChecksPass = validationChecks.every(check => check.passed);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Template Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {validationChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {check.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <div className="font-medium">{check.label}</div>
                    <div className="text-sm text-muted-foreground">{check.message}</div>
                  </div>
                </div>
                <Badge variant={check.passed ? "default" : "destructive"}>
                  {check.passed ? "Pass" : "Fail"}
                </Badge>
              </div>
            ))}
          </div>

          {!allChecksPass && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please address the failing validation checks before creating the template.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>English Name:</strong> {data.basicInfo?.nameEn || "Not set"}</div>
                  <div><strong>Arabic Name:</strong> <span dir="rtl">{data.basicInfo?.nameAr || "Not set"}</span></div>
                  <div><strong>Category:</strong> {data.basicInfo?.category || "Not set"}</div>
                  <div><strong>Sample Type:</strong> {data.basicInfo?.sampleType || "Not set"}</div>
                  <div><strong>Turnaround Time:</strong> {data.basicInfo?.turnaroundTime || "Not set"} hours</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>English:</strong> {data.basicInfo?.descriptionEn || "Not set"}</div>
                  <div><strong>Arabic:</strong> <span dir="rtl">{data.basicInfo?.descriptionAr || "Not set"}</span></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Parameters ({data.parameters?.length || 0})</h4>
                <div className="space-y-2">
                  {data.parameters?.map((param: any, index: number) => (
                    <div key={index} className="p-2 border rounded text-sm">
                      <div className="font-medium">{param.nameEn}</div>
                      <div className="text-muted-foreground" dir="rtl">{param.nameAr}</div>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{param.unit}</Badge>
                        <Badge variant="secondary">{param.dataType}</Badge>
                      </div>
                    </div>
                  )) || <div className="text-muted-foreground">No parameters configured</div>}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {allChecksPass && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Template validation passed! You can now create this template.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ResultTemplateStep3;
