import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, Eye, Edit, Clock, User, Calendar, TestTube } from "lucide-react";
import { EnhancedSample, getStatusColor, getPriorityColor, formatAnalysisList } from "./utils/enhancedMockData";
import ViewSampleDialog from "./dialogs/ViewSampleDialog";
import EditSampleDialog from "./dialogs/EditSampleDialog";
import { useToast } from "@/hooks/use-toast";

interface EnhancedSampleTableProps {
  samples: EnhancedSample[];
  onSampleUpdate?: (updatedSample: EnhancedSample) => void;
}

const EnhancedSampleTable = ({ samples, onSampleUpdate }: EnhancedSampleTableProps) => {
  const { toast } = useToast();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState<EnhancedSample | null>(null);

  const toggleRowExpansion = (sampleId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(sampleId)) {
      newExpanded.delete(sampleId);
    } else {
      newExpanded.add(sampleId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      collected: { variant: "outline" as const, className: "border-blue-500 text-blue-700" },
      processing: { variant: "default" as const, className: "bg-yellow-500 text-white" },
      completed: { variant: "secondary" as const, className: "bg-green-500 text-white" },
      rejected: { variant: "destructive" as const, className: "" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.collected;
    return (
      <Badge variant={config.variant} className={config.className}>
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

  const renderExpandedContent = (sample: EnhancedSample) => (
    <div className="bg-gray-50 p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample Details */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Sample Details
          </h4>
          <div className="text-sm space-y-1">
            <p><span className="font-medium">Receipt Date:</span> {sample.sampleReceiptDate}</p>
            <p><span className="font-medium">Person Who Brought:</span> {sample.personWhoBrought}</p>
            <p><span className="font-medium">Sample Type:</span> {sample.sampleType}</p>
          </div>
        </div>

        {/* Analysis Information */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Analysis Required
          </h4>
          <div className="text-sm space-y-1">
            {sample.requiredAnalysis.map((analysis, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{analysis}</span>
                <Badge 
                  variant={sample.tubeStatus[analysis.toLowerCase().replace(/\s+/g, '_')] === 'yes' ? 'secondary' : 'destructive'}
                  className="text-xs"
                >
                  {sample.tubeStatus[analysis.toLowerCase().replace(/\s+/g, '_')] === 'yes' ? 'Suitable' : 'Rejected'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Information */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Processing Info
          </h4>
          <div className="text-sm space-y-1">
            {sample.labTechnician && (
              <p><span className="font-medium">Lab Technician:</span> {sample.labTechnician}</p>
            )}
            {sample.processingTime && (
              <p><span className="font-medium">Processing Time:</span> {sample.processingTime}</p>
            )}
            {sample.completionDate && (
              <p><span className="font-medium">Completion Date:</span> {sample.completionDate}</p>
            )}
          </div>
        </div>
      </div>

      {/* Rejection Reasons */}
      {Object.keys(sample.rejectionReasons).length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-semibold text-sm text-red-600 mb-2">Rejection Reasons</h4>
          <div className="space-y-1">
            {Object.entries(sample.rejectionReasons).map(([analysis, reason]) => (
              <p key={analysis} className="text-sm text-red-600">
                <span className="font-medium">{analysis}:</span> {reason}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {sample.results && Object.keys(sample.results).length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-semibold text-sm text-green-600 mb-2">Results</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(sample.results).map(([test, result]) => (
              <p key={test} className="text-sm">
                <span className="font-medium">{test}:</span> {result}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {sample.notes && (
        <div className="border-t pt-3">
          <h4 className="font-semibold text-sm mb-2">Notes</h4>
          <p className="text-sm text-gray-600">{sample.notes}</p>
        </div>
      )}
    </div>
  );

  const handleViewSample = (sample: EnhancedSample) => {
    setSelectedSample(sample);
    setViewDialogOpen(true);
  };

  const handleEditSample = (sample: EnhancedSample) => {
    setSelectedSample(sample);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedSample: EnhancedSample) => {
    if (onSampleUpdate) {
      onSampleUpdate(updatedSample);
    }
    toast({
      title: "Success",
      description: `Sample ${updatedSample.id} has been updated successfully.`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Sample Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Sample ID</TableHead>
                  <TableHead>Horse</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Collection Date</TableHead>
                  <TableHead>Collected By</TableHead>
                  <TableHead>Analysis Required</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Person Brought</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples.map((sample) => {
                  const isExpanded = expandedRows.has(sample.id);
                  return (
                    <>
                      <TableRow key={sample.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(sample.id)}
                            className="p-1"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{sample.id}</TableCell>
                        <TableCell>{sample.horseName}</TableCell>
                        <TableCell>{sample.sampleType}</TableCell>
                        <TableCell>{sample.collectionDate}</TableCell>
                        <TableCell>{sample.collectedBy}</TableCell>
                        <TableCell>
                          <span className="text-sm" title={sample.requiredAnalysis.join(", ")}>
                            {formatAnalysisList(sample.requiredAnalysis)}
                          </span>
                        </TableCell>
                        <TableCell>{getPriorityBadge(sample.priority)}</TableCell>
                        <TableCell>{getStatusBadge(sample.status)}</TableCell>
                        <TableCell>{sample.personWhoBrought}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleViewSample(sample)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditSample(sample)}>
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={11} className="p-0">
                            {renderExpandedContent(sample)}
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <ViewSampleDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        sample={selectedSample}
      />
      
      <EditSampleDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        sample={selectedSample}
        onSaveEdit={handleSaveEdit}
      />
    </>
  );
};

export default EnhancedSampleTable;
