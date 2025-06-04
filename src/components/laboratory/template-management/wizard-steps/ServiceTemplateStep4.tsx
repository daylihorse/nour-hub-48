
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Info, Eye, DollarSign, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ServiceTemplateStep4Props {
  data: any;
  onDataChange: (data: any) => void;
}

const ServiceTemplateStep4 = ({ data, onDataChange }: ServiceTemplateStep4Props) => {
  const validationChecks = [
    {
      id: "basic_info",
      label: "Service Information Complete",
      passed: data.basicInfo?.serviceNameEn && data.basicInfo?.serviceNameAr && data.basicInfo?.serviceCategory,
      message: "Service name in both languages and category are required"
    },
    {
      id: "tests_selected",
      label: "Tests Selected",
      passed: data.testsServices?.length > 0,
      message: "At least one test must be selected for the service"
    },
    {
      id: "pricing_set",
      label: "Pricing Configured",
      passed: data.pricing?.basePrice && data.pricing?.currency,
      message: "Base price and currency must be set"
    },
    {
      id: "scheduling_set",
      label: "Scheduling Information",
      passed: data.pricing?.estimatedDuration && data.pricing?.scheduleType,
      message: "Duration and schedule type must be configured"
    }
  ];

  const allChecksPass = validationChecks.every(check => check.passed);
  const totalDuration = data.testsServices?.reduce((total: number, test: any) => total + test.duration, 0) || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Service Template Validation
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
                Please address the failing validation checks before creating the service template.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Service Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Information</h4>
              <div className="space-y-2 text-sm">
                <div><strong>English Name:</strong> {data.basicInfo?.serviceNameEn || "Not set"}</div>
                <div><strong>Arabic Name:</strong> <span dir="rtl">{data.basicInfo?.serviceNameAr || "Not set"}</span></div>
                <div><strong>Category:</strong> {data.basicInfo?.serviceCategory || "Not set"}</div>
                <div><strong>Target Audience:</strong> {data.basicInfo?.targetAudience || "Not set"}</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <div className="space-y-2 text-sm">
                <div><strong>English:</strong> {data.basicInfo?.shortDescEn || "Not set"}</div>
                <div><strong>Arabic:</strong> <span dir="rtl">{data.basicInfo?.shortDescAr || "Not set"}</span></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Included Tests ({data.testsServices?.length || 0})</h4>
              <div className="space-y-1">
                {data.testsServices?.map((test: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                    <span>{test.name}</span>
                    <Badge variant="outline">{test.duration}h</Badge>
                  </div>
                )) || <div className="text-sm text-muted-foreground">No tests selected</div>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing & Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border rounded">
                <div className="text-2xl font-bold text-green-600">
                  {data.pricing?.basePrice ? `$${data.pricing.basePrice}` : "Not set"}
                </div>
                <div className="text-sm text-muted-foreground">Base Price</div>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-2xl font-bold text-blue-600">
                  {totalDuration}h
                </div>
                <div className="text-sm text-muted-foreground">Total Duration</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div><strong>Currency:</strong> {data.pricing?.currency?.toUpperCase() || "Not set"}</div>
              <div><strong>Payment Terms:</strong> {data.pricing?.paymentTerms || "Not set"}</div>
              <div><strong>Schedule Type:</strong> {data.pricing?.scheduleType || "Not set"}</div>
              <div><strong>Availability:</strong> {data.pricing?.availability || "Not set"}</div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Preparation Instructions</h4>
              <div className="space-y-1 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <strong>English:</strong> {data.pricing?.preparationInstructionsEn || "None provided"}
                </div>
                <div className="p-2 bg-gray-50 rounded" dir="rtl">
                  <strong>Arabic:</strong> {data.pricing?.preparationInstructionsAr || "لم يتم تقديم تعليمات"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {allChecksPass && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Service template validation passed! Ready to create.</span>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview Template
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ServiceTemplateStep4;
