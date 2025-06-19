import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { EnhancedSample } from "../utils/enhancedMockData";
import { TestTube, Save, X, Calendar } from "lucide-react";
import { z } from "zod";

interface EditSampleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sample: EnhancedSample | null;
  onSaveEdit: (updatedSample: EnhancedSample) => void;
}

const editSampleSchema = z.object({
  horseName: z.string().min(1, "Horse name is required"),
  sampleType: z.string().min(1, "Sample type is required"),
  collectionDate: z.string().min(1, "Collection date is required"),
  collectedBy: z.string().min(1, "Collector name is required"),
  personWhoBrought: z.string().min(1, "Person who brought sample is required"),
  sampleReceiptDate: z.string().min(1, "Receipt date is required"),
  priority: z.enum(["routine", "urgent", "critical"]),
  status: z.enum(["collected", "processing", "completed", "rejected"]),
  notes: z.string().optional(),
  labTechnician: z.string().optional(),
  processingTime: z.string().optional(),
  completionDate: z.string().optional()
});

const EditSampleDialog = ({ open, onOpenChange, sample, onSaveEdit }: EditSampleDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<EnhancedSample>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sample) {
      setFormData({
        ...sample
      });
      setErrors({});
    }
  }, [sample]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    if (!sample) return;

    try {
      setIsLoading(true);
      
      // Validate form data
      const validatedData = editSampleSchema.parse(formData);
      
      const updatedSample: EnhancedSample = {
        ...sample,
        ...validatedData,
        requiredAnalysis: sample.requiredAnalysis, // Keep existing analysis
        tubeStatus: sample.tubeStatus, // Keep existing tube status
        rejectionReasons: sample.rejectionReasons, // Keep existing rejection reasons
        results: sample.results, // Keep existing results
        templateIds: sample.templateIds // Keep existing template IDs
      };

      onSaveEdit(updatedSample);
      onOpenChange(false);
      
      toast({
        title: "Success",
        description: `Sample ${sample.id} has been updated successfully.`,
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "Error",
          description: "Failed to update sample. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setErrors({});
    if (sample) {
      setFormData({ ...sample });
    }
  };

  if (!sample) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Edit Sample - {sample.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="horseName">Horse Name *</Label>
                <Input
                  id="horseName"
                  value={formData.horseName || ""}
                  onChange={(e) => handleInputChange("horseName", e.target.value)}
                  className={errors.horseName ? "border-red-500" : ""}
                />
                {errors.horseName && (
                  <p className="text-sm text-red-500">{errors.horseName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sampleType">Sample Type *</Label>
                <Select 
                  value={formData.sampleType || ""} 
                  onValueChange={(value) => handleInputChange("sampleType", value)}
                >
                  <SelectTrigger className={errors.sampleType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select sample type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blood">Blood</SelectItem>
                    <SelectItem value="Urine">Urine</SelectItem>
                    <SelectItem value="Fecal">Fecal</SelectItem>
                    <SelectItem value="Tissue">Tissue</SelectItem>
                    <SelectItem value="Hair">Hair</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sampleType && (
                  <p className="text-sm text-red-500">{errors.sampleType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="collectedBy">Collected By *</Label>
                <Input
                  id="collectedBy"
                  value={formData.collectedBy || ""}
                  onChange={(e) => handleInputChange("collectedBy", e.target.value)}
                  className={errors.collectedBy ? "border-red-500" : ""}
                />
                {errors.collectedBy && (
                  <p className="text-sm text-red-500">{errors.collectedBy}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="personWhoBrought">Person Who Brought *</Label>
                <Input
                  id="personWhoBrought"
                  value={formData.personWhoBrought || ""}
                  onChange={(e) => handleInputChange("personWhoBrought", e.target.value)}
                  className={errors.personWhoBrought ? "border-red-500" : ""}
                />
                {errors.personWhoBrought && (
                  <p className="text-sm text-red-500">{errors.personWhoBrought}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Dates and Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Dates & Priority
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collectionDate">Collection Date *</Label>
                <Input
                  id="collectionDate"
                  type="date"
                  value={formData.collectionDate || ""}
                  onChange={(e) => handleInputChange("collectionDate", e.target.value)}
                  className={errors.collectionDate ? "border-red-500" : ""}
                />
                {errors.collectionDate && (
                  <p className="text-sm text-red-500">{errors.collectionDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sampleReceiptDate">Receipt Date *</Label>
                <Input
                  id="sampleReceiptDate"
                  type="date"
                  value={formData.sampleReceiptDate || ""}
                  onChange={(e) => handleInputChange("sampleReceiptDate", e.target.value)}
                  className={errors.sampleReceiptDate ? "border-red-500" : ""}
                />
                {errors.sampleReceiptDate && (
                  <p className="text-sm text-red-500">{errors.sampleReceiptDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select 
                  value={formData.priority || ""} 
                  onValueChange={(value) => handleInputChange("priority", value)}
                >
                  <SelectTrigger className={errors.priority ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <p className="text-sm text-red-500">{errors.priority}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select 
                  value={formData.status || ""} 
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="collected">Collected</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Processing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Processing Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="labTechnician">Lab Technician</Label>
                <Input
                  id="labTechnician"
                  value={formData.labTechnician || ""}
                  onChange={(e) => handleInputChange("labTechnician", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="processingTime">Processing Time</Label>
                <Input
                  id="processingTime"
                  value={formData.processingTime || ""}
                  onChange={(e) => handleInputChange("processingTime", e.target.value)}
                  placeholder="e.g., 2 days"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={formData.completionDate || ""}
                  onChange={(e) => handleInputChange("completionDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis Required (Read-only display) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Required</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sample.requiredAnalysis.map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
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

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Add notes about the sample..."
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSampleDialog;
