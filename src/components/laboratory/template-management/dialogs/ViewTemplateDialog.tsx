
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Template {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  parametersCount: number;
  normalRanges: string;
  lastModified: string;
  status: string;
  usageCount: number;
}

interface ViewTemplateDialogProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewTemplateDialog = ({ template, isOpen, onClose }: ViewTemplateDialogProps) => {
  if (!template) return null;

  // Mock parameter data for the template
  const mockParameters = [
    {
      nameEn: "White Blood Cells",
      nameAr: "خلايا الدم البيضاء",
      unit: "x10³/μL",
      dataType: "numeric",
      normalRange: "4.5 - 11.0",
      criticalValues: "< 2.0 or > 20.0"
    },
    {
      nameEn: "Red Blood Cells",
      nameAr: "خلايا الدم الحمراء",
      unit: "x10⁶/μL",
      dataType: "numeric",
      normalRange: "4.2 - 5.4",
      criticalValues: "< 3.0 or > 7.0"
    },
    {
      nameEn: "Hemoglobin",
      nameAr: "الهيموجلوبين",
      unit: "g/dL",
      dataType: "numeric",
      normalRange: "12.0 - 16.0",
      criticalValues: "< 8.0 or > 20.0"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { variant: "default" as const, label: "Active" },
      draft: { variant: "secondary" as const, label: "Draft" },
      archived: { variant: "outline" as const, label: "Archived" }
    };
    
    return (
      <Badge variant={statusMap[status as keyof typeof statusMap]?.variant || "outline"}>
        {statusMap[status as keyof typeof statusMap]?.label || status}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Template Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Template Name (English)</div>
                  <div className="text-lg font-semibold">{template.nameEn}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Template Name (Arabic)</div>
                  <div className="text-lg font-semibold" dir="rtl">{template.nameAr}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Category</div>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Status</div>
                  {getStatusBadge(template.status)}
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Parameters Count</div>
                  <div>{template.parametersCount} parameters</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Usage Count</div>
                  <div>{template.usageCount} times</div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm font-medium text-muted-foreground">Last Modified</div>
                <div>{template.lastModified}</div>
              </div>
            </CardContent>
          </Card>

          {/* Parameters */}
          <Card>
            <CardHeader>
              <CardTitle>Template Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter Name</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Normal Range</TableHead>
                    <TableHead>Critical Values</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParameters.map((param, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{param.nameEn}</div>
                          <div className="text-sm text-muted-foreground" dir="rtl">{param.nameAr}</div>
                        </div>
                      </TableCell>
                      <TableCell>{param.unit}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{param.dataType}</Badge>
                      </TableCell>
                      <TableCell>{param.normalRange}</TableCell>
                      <TableCell>{param.criticalValues}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTemplateDialog;
