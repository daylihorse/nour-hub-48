import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Copy, Trash2, ClipboardCheck, TestTube, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface QCTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  description: string;
  analysesIncluded: string[];
  department: string;
  equipment: string[];
  frequency: string;
  expectedValues: { [key: string]: string };
  toleranceLimits: { [key: string]: string };
  category: string;
  status: "active" | "draft" | "archived";
  createdDate: string;
  lastModified: string;
  usageCount: number;
}

interface QCTemplatesListProps {
  searchTerm: string;
}

const QCTemplatesList = ({ searchTerm }: QCTemplatesListProps) => {
  const { toast } = useToast();
  const [deletingTemplate, setDeletingTemplate] = useState<QCTemplate | null>(null);
  
  const [templates] = useState<QCTemplate[]>([
    {
      id: "qc-1",
      nameEn: "Chemistry QC Daily",
      nameAr: "ضبط الجودة اليومي للكيمياء",
      description: "Daily quality control for chemistry department",
      analysesIncluded: ["Glucose Control", "Cholesterol Control", "Creatinine Control", "ALT Control"],
      department: "Chemistry",
      equipment: ["Cobas c702", "Architect c4000"],
      frequency: "Daily",
      expectedValues: {
        "Glucose": "100 mg/dL",
        "Cholesterol": "200 mg/dL",
        "Creatinine": "1.0 mg/dL",
        "ALT": "40 U/L"
      },
      toleranceLimits: {
        "Glucose": "±5%",
        "Cholesterol": "±3%", 
        "Creatinine": "±10%",
        "ALT": "±8%"
      },
      category: "Daily Controls",
      status: "active",
      createdDate: "2024-06-01",
      lastModified: "2024-06-15",
      usageCount: 45
    },
    {
      id: "qc-2",
      nameEn: "Hematology QC Weekly",
      nameAr: "ضبط الجودة الأسبوعي لأمراض الدم",
      description: "Weekly quality control for hematology department",
      analysesIncluded: ["CBC Control", "Platelet Control", "Hemoglobin Control", "WBC Differential"],
      department: "Hematology",
      equipment: ["XN-3000", "DxH 900"],
      frequency: "Weekly",
      expectedValues: {
        "Hemoglobin": "14.0 g/dL",
        "Platelets": "250 x10³/μL",
        "WBC": "7.5 x10³/μL",
        "RBC": "4.5 x10⁶/μL"
      },
      toleranceLimits: {
        "Hemoglobin": "±3%",
        "Platelets": "±5%",
        "WBC": "±4%",
        "RBC": "±2%"
      },
      category: "Weekly Controls", 
      status: "active",
      createdDate: "2024-05-15",
      lastModified: "2024-06-10",
      usageCount: 12
    },
    {
      id: "qc-3",
      nameEn: "Microbiology QC Monthly",
      nameAr: "ضبط الجودة الشهري للأحياء المجهرية",
      description: "Monthly quality control for microbiology department",
      analysesIncluded: ["Culture Control", "Sensitivity Control", "Gram Stain Control"],
      department: "Microbiology",
      equipment: ["Incubator IC-150", "VITEK 2"],
      frequency: "Monthly",
      expectedValues: {
        "E.coli Growth": "Positive",
        "S.aureus Growth": "Positive",
        "Sterility Control": "Negative",
        "Antibiotic Sensitivity": "Standard"
      },
      toleranceLimits: {
        "Growth": "Pass/Fail",
        "Sensitivity": "±1 zone diameter",
        "Sterility": "Pass/Fail",
        "Identification": "100% accuracy"
      },
      category: "Monthly Controls",
      status: "draft",
      createdDate: "2024-06-01",
      lastModified: "2024-06-01",
      usageCount: 0
    }
  ]);

  const filteredTemplates = templates.filter(template =>
    template.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.nameAr.includes(searchTerm) ||
    template.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTemplate = (template: QCTemplate) => {
    toast({
      title: "View QC Template",
      description: `Viewing details for "${template.nameEn}"`,
    });
    console.log("View QC template:", template);
  };

  const handleEditTemplate = (template: QCTemplate) => {
    toast({
      title: "Edit QC Template",
      description: `Editing "${template.nameEn}"`,
    });
    console.log("Edit QC template:", template);
  };

  const handleDuplicateTemplate = (template: QCTemplate) => {
    toast({
      title: "QC Template Duplicated",
      description: `"${template.nameEn}" has been duplicated successfully.`,
    });
    console.log("Duplicate QC template:", template);
  };

  const handleDeleteTemplate = (template: QCTemplate) => {
    setDeletingTemplate(template);
  };

  const confirmDeleteTemplate = () => {
    if (deletingTemplate) {
      toast({
        title: "QC Template Deleted",
        description: `"${deletingTemplate.nameEn}" has been deleted successfully.`,
        variant: "destructive",
      });
      setDeletingTemplate(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      draft: "secondary", 
      archived: "outline"
    } as const;

    const colors = {
      active: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-blue-600" />
                  {getStatusBadge(template.status)}
                </div>
                <Badge variant="outline" className="text-xs">
                  {template.department}
                </Badge>
              </div>
              <CardTitle className="text-lg">{template.nameEn}</CardTitle>
              <p className="text-sm text-muted-foreground">{template.nameAr}</p>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <TestTube className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Analyses:</span>
                  <span className="font-medium">{template.analysesIncluded.length}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Equipment:</span>
                  <span className="font-medium">{template.equipment.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frequency:</span>
                  <span className="font-medium">{template.frequency}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Usage:</span>
                  <span className="font-medium">{template.usageCount} times</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Modified:</span>
                  <span className="text-xs">{template.lastModified}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewTemplate(template)}
                  className="flex-1"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditTemplate(template)}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDuplicateTemplate(template)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTemplate(template)}
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <ClipboardCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No QC Templates Found</h3>
          <p className="text-muted-foreground">
            {searchTerm 
              ? `No templates match your search "${searchTerm}"`
              : "Create your first QC template to get started"
            }
          </p>
        </div>
      )}

      <AlertDialog open={!!deletingTemplate} onOpenChange={() => setDeletingTemplate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete QC Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingTemplate?.nameEn}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTemplate}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QCTemplatesList; 