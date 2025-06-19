import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, TestTube, Building, Clock, Target, ClipboardCheck } from "lucide-react";

interface QCTemplateStep3Props {
  data: any;
}

const QCTemplateStep3 = ({ data }: QCTemplateStep3Props) => {
  const { basicInfo, analyses } = data;
  
  const validationErrors = [];
  const validationWarnings = [];

  // Validation checks
  if (!basicInfo?.nameEn) validationErrors.push("English name is required");
  if (!basicInfo?.nameAr) validationErrors.push("Arabic name is required");
  if (!basicInfo?.department) validationErrors.push("Department is required");
  if (!basicInfo?.frequency) validationErrors.push("Frequency is required");
  if (!basicInfo?.category) validationErrors.push("Category is required");
  if (!analyses || analyses.length === 0) validationErrors.push("At least one analysis must be selected");

  if (analyses && analyses.length > 20) validationWarnings.push("Large number of analyses may affect performance");
  if (!basicInfo?.description) validationWarnings.push("Description is recommended for better organization");

  const isValid = validationErrors.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ClipboardCheck className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold">Review & Validate Template</h3>
          <p className="text-sm text-muted-foreground">
            Review your QC template configuration before creating
          </p>
        </div>
      </div>

      {/* Validation Status */}
      <Card className={isValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className={`font-medium ${isValid ? "text-green-900" : "text-red-900"}`}>
                {isValid ? "Template Ready for Creation" : "Validation Issues Found"}
              </h4>
              
              {validationErrors.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-red-800 font-medium">Errors to fix:</p>
                  <ul className="text-sm text-red-700 mt-1 space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationWarnings.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-yellow-800 font-medium">Warnings:</p>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    {validationWarnings.map((warning, index) => (
                      <li key={index}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isValid && (
                <p className="text-sm text-green-800 mt-2">
                  Your QC template is properly configured and ready to be created.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building className="h-4 w-4" />
              Template Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">English Name</Label>
              <p className="font-medium">{basicInfo?.nameEn || "Not specified"}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Arabic Name</Label>
              <p className="font-medium">{basicInfo?.nameAr || "Not specified"}</p>
            </div>
            
            {basicInfo?.description && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <p className="text-sm">{basicInfo.description}</p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {basicInfo?.department && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {basicInfo.department}
                </Badge>
              )}
              
              {basicInfo?.frequency && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {basicInfo.frequency}
                </Badge>
              )}
              
              {basicInfo?.category && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {basicInfo.category}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analyses Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Selected Analyses ({analyses?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyses && analyses.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {analyses.map((analysis: any, index: number) => (
                  <div key={analysis.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{analysis.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Expected: {analysis.expectedValue} {analysis.unit} (±{analysis.toleranceLimit})
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {analysis.category}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                <TestTube className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No analyses selected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Template Statistics */}
      {analyses && analyses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Template Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analyses.length}</div>
                <div className="text-sm text-muted-foreground">Total Analyses</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {[...new Set(analyses.map((a: any) => a.category))].length}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {[...new Set(analyses.map((a: any) => a.department))].length}
                </div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {basicInfo?.frequency || "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">Frequency</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Creation Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">What happens next?</h4>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• The QC template will be created and available for use</li>
                <li>• Lab technicians can select this template when entering QC results</li>
                <li>• The template can be edited or updated later if needed</li>
                <li>• All selected analyses will be included in the QC workflow</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default QCTemplateStep3; 