
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface ResultTemplateStep1Props {
  data: any;
  onDataChange: (data: any) => void;
}

const ResultTemplateStep1 = ({ data, onDataChange }: ResultTemplateStep1Props) => {
  const updateBasicInfo = (field: string, value: string) => {
    onDataChange({
      ...data,
      basicInfo: {
        ...data.basicInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Basic Template Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nameEn">Template Name (English)</Label>
              <Input
                id="nameEn"
                placeholder="e.g., Complete Blood Count"
                value={data.basicInfo?.nameEn || ""}
                onChange={(e) => updateBasicInfo("nameEn", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nameAr">Template Name (Arabic)</Label>
              <Input
                id="nameAr"
                placeholder="مثال: تعداد الدم الكامل"
                dir="rtl"
                value={data.basicInfo?.nameAr || ""}
                onChange={(e) => updateBasicInfo("nameAr", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => updateBasicInfo("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hematology">Hematology</SelectItem>
                  <SelectItem value="chemistry">Clinical Chemistry</SelectItem>
                  <SelectItem value="microbiology">Microbiology</SelectItem>
                  <SelectItem value="immunology">Immunology</SelectItem>
                  <SelectItem value="endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="toxicology">Toxicology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="descriptionEn">Description (English)</Label>
              <Textarea
                id="descriptionEn"
                placeholder="Detailed description of the test template..."
                value={data.basicInfo?.descriptionEn || ""}
                onChange={(e) => updateBasicInfo("descriptionEn", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descriptionAr">Description (Arabic)</Label>
              <Textarea
                id="descriptionAr"
                placeholder="وصف مفصل لقالب الفحص..."
                dir="rtl"
                value={data.basicInfo?.descriptionAr || ""}
                onChange={(e) => updateBasicInfo("descriptionAr", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="methodology">Test Methodology</Label>
              <Select onValueChange={(value) => updateBasicInfo("methodology", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select methodology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automated">Automated Analyzer</SelectItem>
                  <SelectItem value="manual">Manual Counting</SelectItem>
                  <SelectItem value="flow-cytometry">Flow Cytometry</SelectItem>
                  <SelectItem value="immunoassay">Immunoassay</SelectItem>
                  <SelectItem value="molecular">Molecular Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sampleType">Sample Type</Label>
            <Select onValueChange={(value) => updateBasicInfo("sampleType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sample type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood">Blood</SelectItem>
                <SelectItem value="urine">Urine</SelectItem>
                <SelectItem value="serum">Serum</SelectItem>
                <SelectItem value="plasma">Plasma</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="turnaroundTime">Turnaround Time (hours)</Label>
            <Input
              id="turnaroundTime"
              type="number"
              placeholder="24"
              value={data.basicInfo?.turnaroundTime || ""}
              onChange={(e) => updateBasicInfo("turnaroundTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Default Priority</Label>
            <Select onValueChange={(value) => updateBasicInfo("priority", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="stat">STAT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultTemplateStep1;
