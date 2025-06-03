
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const QualityActionItems = () => {
  const actionItems = [
    {
      title: "Address Contamination Issue",
      description: "Failed QC check QC003 requires immediate attention",
      priority: "High Priority",
      priorityVariant: "destructive",
      bgColor: "bg-red-50",
      action: "Assign"
    },
    {
      title: "Equipment Calibration Review",
      description: "Precision variance trending upward - review needed",
      priority: "Medium Priority",
      priorityVariant: "default",
      bgColor: "bg-yellow-50",
      action: "Schedule"
    },
    {
      title: "Update SOPs",
      description: "Annual review of standard operating procedures due",
      priority: "Low Priority",
      priorityVariant: "outline",
      bgColor: "bg-blue-50",
      action: "Plan"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Quality Action Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actionItems.map((item, index) => (
            <div key={index} className={`flex items-center justify-between p-3 ${item.bgColor} rounded-lg`}>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant={item.priorityVariant as any}>{item.priority}</Badge>
                <Button size="sm">{item.action}</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityActionItems;
