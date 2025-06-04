
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PreviousSample {
  id: string;
  collectionDate: string;
  analysis: string[];
  status: string;
  priority: string;
  notes: string;
}

interface PreviousSamplesDisplayProps {
  horseName: string;
  samples: PreviousSample[];
  selectedSampleId: string;
  onSampleSelect: (sampleId: string) => void;
}

const PreviousSamplesDisplay = ({ 
  horseName, 
  samples, 
  selectedSampleId, 
  onSampleSelect 
}: PreviousSamplesDisplayProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "urgent":
        return "bg-orange-100 text-orange-800";
      case "routine":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (samples.length === 0) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <p className="text-gray-600 text-center">
            No previous samples found for {horseName}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">
          Select Previous Sample for {horseName} to Retest:
        </Label>
        <Badge variant="outline">{samples.length} sample(s) found</Badge>
      </div>
      
      <RadioGroup value={selectedSampleId} onValueChange={onSampleSelect}>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {samples.map((sample) => (
            <div key={sample.id} className="flex items-start space-x-3">
              <RadioGroupItem value={sample.id} id={sample.id} className="mt-4" />
              <Card className="flex-1 cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Sample ID: {sample.id}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(sample.status)}>
                        {sample.status}
                      </Badge>
                      <Badge className={getPriorityColor(sample.priority)}>
                        {sample.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Collection Date:</span> {sample.collectionDate}
                    </div>
                    <div>
                      <span className="font-medium">Analysis:</span> {sample.analysis.join(", ")}
                    </div>
                    {sample.notes && (
                      <div>
                        <span className="font-medium">Notes:</span> {sample.notes}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default PreviousSamplesDisplay;
