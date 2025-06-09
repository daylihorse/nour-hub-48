
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  Plus
} from "lucide-react";
import { Assignment } from "@/types/stableRooms";
import { TerminationData } from "../EnhancedEndAssignmentDialog";

interface DocumentationStepProps {
  assignment: Assignment;
  terminationData: TerminationData;
  updateTerminationData: (updates: Partial<TerminationData>) => void;
  roomNumber?: string;
}

const documentTypes = [
  {
    id: 'termination_notice',
    name: 'Termination Notice',
    description: 'Official notice of assignment termination',
    required: true
  },
  {
    id: 'room_inspection',
    name: 'Room Inspection Report',
    description: 'Condition report of the room after vacation',
    required: true
  },
  {
    id: 'final_invoice',
    name: 'Final Invoice',
    description: 'Final billing statement and payment confirmation',
    required: false
  },
  {
    id: 'photos',
    name: 'Photographic Evidence',
    description: 'Photos of room condition and any damage',
    required: false
  },
  {
    id: 'health_certificate',
    name: 'Health Certificate',
    description: 'Health clearance certificate if applicable',
    required: false
  },
  {
    id: 'transfer_docs',
    name: 'Transfer Documentation',
    description: 'Documents for transfer to new facility',
    required: false
  }
];

const DocumentationStep = ({ 
  assignment, 
  terminationData, 
  updateTerminationData 
}: DocumentationStepProps) => {
  const addDocument = (documentType: string) => {
    const newDocument = `${documentType}_${Date.now()}`;
    updateTerminationData({
      documents: [...terminationData.documents, newDocument]
    });
  };

  const removeDocument = (documentId: string) => {
    updateTerminationData({
      documents: terminationData.documents.filter(doc => doc !== documentId)
    });
  };

  const requiredDocs = documentTypes.filter(doc => doc.required);
  const optionalDocs = documentTypes.filter(doc => !doc.required);

  return (
    <div className="space-y-6">
      {/* Documentation Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Termination Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Collect and attach all necessary documentation for the termination process. 
            This ensures proper record-keeping and compliance with facility procedures.
          </p>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              {terminationData.documents.length} Documents Attached
            </Badge>
            <Badge variant={requiredDocs.every(doc => 
              terminationData.documents.some(attachedDoc => attachedDoc.includes(doc.id))
            ) ? "default" : "secondary"}>
              Required Documents: {requiredDocs.filter(doc => 
                terminationData.documents.some(attachedDoc => attachedDoc.includes(doc.id))
              ).length}/{requiredDocs.length}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredDocs.map((docType) => {
              const isAttached = terminationData.documents.some(doc => doc.includes(docType.id));
              
              return (
                <div
                  key={docType.id}
                  className={`
                    p-4 rounded-lg border-2 
                    ${isAttached ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{docType.name}</span>
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {docType.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isAttached ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeDocument(terminationData.documents.find(doc => doc.includes(docType.id))!)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => addDocument(docType.id)}
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Optional Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Optional Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {optionalDocs.map((docType) => {
              const isAttached = terminationData.documents.some(doc => doc.includes(docType.id));
              
              return (
                <div
                  key={docType.id}
                  className="p-4 rounded-lg border border-muted"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{docType.name}</span>
                        <Badge variant="outline" className="text-xs">
                          Optional
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {docType.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isAttached ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeDocument(terminationData.documents.find(doc => doc.includes(docType.id))!)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addDocument(docType.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Additional Documentation Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="doc-notes">
              Add any additional notes about the documentation or special circumstances
            </Label>
            <Textarea
              id="doc-notes"
              value={terminationData.notes}
              onChange={(e) => updateTerminationData({ notes: e.target.value })}
              placeholder="Document any special circumstances, damage assessments, or additional requirements..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-primary">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Generate Standard Documents</h4>
              <p className="text-sm text-muted-foreground">
                Auto-generate standard termination documents
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3 mr-1" />
                Termination Notice
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3 mr-1" />
                Inspection Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationStep;
