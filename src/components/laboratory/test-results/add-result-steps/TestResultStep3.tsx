
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestResultFormData } from "../AddTestResultDialog";

interface TestResultStep3Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep3 = ({ formData, updateFormData }: TestResultStep3Props) => {
  const technicians = [
    "Lab Tech A",
    "Lab Tech B", 
    "Lab Tech C",
    "Sarah Wilson",
    "Mike Johnson",
    "Dr. Smith",
    "Dr. Johnson"
  ];

  const reviewers = [
    "Dr. Smith",
    "Dr. Johnson", 
    "Dr. Brown",
    "Dr. Davis",
    "Dr. Miller"
  ];

  // Auto-determine status based on test values
  const getAutoDeterminedStatus = () => {
    const abnormalValues = formData.values.filter(v => v.status !== 'normal');
    if (abnormalValues.length === 0) return 'normal';
    
    const criticalValues = abnormalValues.filter(v => {
      // Simple logic - could be more sophisticated
      const numValue = parseFloat(v.value);
      if (isNaN(numValue)) return false;
      
      // Check if value is significantly outside reference range
      const refParts = v.reference.split('-');
      if (refParts.length === 2) {
        const min = parseFloat(refParts[0]);
        const max = parseFloat(refParts[1]);
        if (!isNaN(min) && !isNaN(max)) {
          const range = max - min;
          return numValue < (min - range * 0.5) || numValue > (max + range * 0.5);
        }
      }
      return false;
    });
    
    return criticalValues.length > 0 ? 'critical' : 'abnormal';
  };

  const suggestedStatus = getAutoDeterminedStatus();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analysis & Findings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="status">Overall Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: any) => updateFormData({ status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select overall status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="abnormal">Abnormal</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            {suggestedStatus !== formData.status && (
              <p className="text-sm text-muted-foreground mt-1">
                Suggested status based on values: <span className="font-medium">{suggestedStatus}</span>
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="findings">Clinical Findings</Label>
            <Textarea
              id="findings"
              value={formData.findings}
              onChange={(e) => updateFormData({ findings: e.target.value })}
              placeholder="Enter detailed findings and interpretation..."
              className="min-h-32"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personnel Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="technician">Lab Technician</Label>
            <Select 
              value={formData.technician} 
              onValueChange={(value) => updateFormData({ technician: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select lab technician" />
              </SelectTrigger>
              <SelectContent>
                {technicians.map((tech) => (
                  <SelectItem key={tech} value={tech}>
                    {tech}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reviewedBy">Reviewed By</Label>
            <Select 
              value={formData.reviewedBy} 
              onValueChange={(value) => updateFormData({ reviewedBy: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reviewing doctor" />
              </SelectTrigger>
              <SelectContent>
                {reviewers.map((reviewer) => (
                  <SelectItem key={reviewer} value={reviewer}>
                    {reviewer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResultStep3;
