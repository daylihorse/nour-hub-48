
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TestResultFormData } from "../AddTestResultDialog";

interface TestResultStep1Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep1 = ({ formData, updateFormData }: TestResultStep1Props) => {
  // Mock samples data - in real app this would come from an API
  const availableSamples = [
    { id: "S004", horseName: "Lightning", horsePhoto: "/placeholder.svg", clientName: "Mike Johnson", clientPhone: "+1-555-0126", clientEmail: "mike.j@email.com" },
    { id: "S005", horseName: "Spirit", horsePhoto: "/placeholder.svg", clientName: "Sarah Wilson", clientPhone: "+1-555-0127", clientEmail: "sarah.w@email.com" },
    { id: "S006", horseName: "Midnight", horsePhoto: "/placeholder.svg", clientName: "Tom Davis", clientPhone: "+1-555-0128", clientEmail: "tom.d@email.com" }
  ];

  const testTypes = [
    "Complete Blood Count",
    "Blood Chemistry Panel",
    "Urinalysis",
    "Parasite Screening",
    "Liver Function Test",
    "Kidney Function Test",
    "Thyroid Panel",
    "Drug Screen"
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
          <CardTitle>Test Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="testType">Test Type</Label>
            <Select value={formData.testType} onValueChange={(value) => updateFormData({ testType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select test type" />
              </SelectTrigger>
              <SelectContent>
                {testTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
