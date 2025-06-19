import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardCheck, Building, Clock, Target } from "lucide-react";

interface QCTemplateStep1Props {
  data: any;
  onDataChange: (data: any) => void;
}

const QCTemplateStep1 = ({ data, onDataChange }: QCTemplateStep1Props) => {
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    description: "",
    department: "",
    frequency: "",
    category: "",
    ...data.basicInfo
  });

  useEffect(() => {
    onDataChange({
      ...data,
      basicInfo: formData
    });
  }, [formData]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const departments = [
    "Chemistry",
    "Hematology", 
    "Microbiology",
    "Immunology",
    "Endocrinology",
    "Molecular Biology"
  ];

  const frequencies = [
    "Daily",
    "Weekly", 
    "Monthly",
    "Quarterly",
    "Annual",
    "As Needed"
  ];

  const categories = [
    "Daily Controls",
    "Weekly Controls",
    "Monthly Controls",
    "Calibration",
    "Proficiency Testing",
    "Maintenance QC",
    "Method Validation"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ClipboardCheck className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold">QC Template Basic Information</h3>
          <p className="text-sm text-muted-foreground">
            Provide the basic details for your Quality Control template
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Template Identification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nameEn">Template Name (English) *</Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => handleChange("nameEn", e.target.value)}
                placeholder="e.g., Chemistry QC Daily"
                required
              />
            </div>

            <div>
              <Label htmlFor="nameAr">Template Name (Arabic) *</Label>
              <Input
                id="nameAr"
                value={formData.nameAr}
                onChange={(e) => handleChange("nameAr", e.target.value)}
                placeholder="e.g., ضبط الجودة اليومي للكيمياء"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe the purpose and scope of this QC template..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="department" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Department *
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department..." />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="frequency" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Testing Frequency *
              </Label>
              <Select value={formData.frequency} onValueChange={(value) => handleChange("frequency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency..." />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                QC Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">QC Template Guidelines</h4>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• Choose descriptive names that clearly identify the QC purpose</li>
                <li>• Select the appropriate department and frequency for your QC protocol</li>
                <li>• Categories help organize and filter templates in the system</li>
                <li>• Required fields are marked with an asterisk (*)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QCTemplateStep1; 