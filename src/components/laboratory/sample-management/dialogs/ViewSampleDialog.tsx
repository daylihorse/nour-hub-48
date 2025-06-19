import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EnhancedSample } from "../utils/enhancedMockData";
import { TestTube, Clock, User, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

interface ViewSampleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sample: EnhancedSample | null;
}

const ViewSampleDialog = ({ open, onOpenChange, sample }: ViewSampleDialogProps) => {
  if (!sample) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      collected: { variant: "outline" as const, className: "border-blue-500 text-blue-700", icon: Clock },
      processing: { variant: "default" as const, className: "bg-yellow-500 text-white", icon: Clock },
      completed: { variant: "secondary" as const, className: "bg-green-500 text-white", icon: CheckCircle },
      rejected: { variant: "destructive" as const, className: "", icon: AlertTriangle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.collected;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className={`${config.className} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      routine: { variant: "outline" as const, className: "" },
      urgent: { variant: "default" as const, className: "bg-orange-500 text-white" },
      critical: { variant: "destructive" as const, className: "" }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.routine;
    return (
      <Badge variant={config.variant} className={config.className}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Sample Details - {sample.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex flex-wrap items-center gap-4">
            {getStatusBadge(sample.status)}
            {getPriorityBadge(sample.priority)}
            <span className="text-sm text-muted-foreground">
              Created: {sample.collectionDate}
            </span>
          </div>

          {/* Main Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Sample ID</label>
                  <p className="font-mono text-sm">{sample.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Horse</label>
                  <p>{sample.horseName} ({sample.horseId})</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Sample Type</label>
                  <p>{sample.sampleType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Collected By</label>
                  <p>{sample.collectedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Person Who Brought</label>
                  <p>{sample.personWhoBrought}</p>
                </div>
              </CardContent>
            </Card>

            {/* Dates & Processing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Timeline & Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Collection Date</label>
                  <p>{sample.collectionDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Receipt Date</label>
                  <p>{sample.sampleReceiptDate}</p>
                </div>
                {sample.labTechnician && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Lab Technician</label>
                    <p>{sample.labTechnician}</p>
                  </div>
                )}
                {sample.processingTime && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Processing Time</label>
                    <p>{sample.processingTime}</p>
                  </div>
                )}
                {sample.completionDate && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Completion Date</label>
                    <p>{sample.completionDate}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analysis Required */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TestTube className="w-4 h-4" />
                Analysis Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sample.requiredAnalysis.map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{analysis}</span>
                    <Badge 
                      variant={sample.tubeStatus[analysis.toLowerCase().replace(/\s+/g, '_')] === 'yes' ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {sample.tubeStatus[analysis.toLowerCase().replace(/\s+/g, '_')] === 'yes' ? 'Suitable' : 'Rejected'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rejection Reasons */}
          {Object.keys(sample.rejectionReasons).length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  Rejection Reasons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(sample.rejectionReasons).map(([analysis, reason]) => (
                    <div key={analysis} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="font-medium text-red-800">{analysis}</p>
                      <p className="text-sm text-red-600">{reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {sample.results && Object.keys(sample.results).length > 0 && (
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(sample.results).map(([test, result]) => (
                    <div key={test} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-medium text-green-800">{test}</p>
                      <p className="text-sm text-green-600">{result}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {sample.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{sample.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSampleDialog;
