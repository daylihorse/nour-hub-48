
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface ServiceTemplateStep1Props {
  data: any;
  onDataChange: (data: any) => void;
}

const ServiceTemplateStep1 = ({ data, onDataChange }: ServiceTemplateStep1Props) => {
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
            Service Template Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceNameEn">Service Name (English)</Label>
              <Input
                id="serviceNameEn"
                placeholder="e.g., Basic Health Checkup"
                value={data.basicInfo?.serviceNameEn || ""}
                onChange={(e) => updateBasicInfo("serviceNameEn", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceNameAr">Service Name (Arabic)</Label>
              <Input
                id="serviceNameAr"
                placeholder="مثال: فحص صحي أساسي"
                dir="rtl"
                value={data.basicInfo?.serviceNameAr || ""}
                onChange={(e) => updateBasicInfo("serviceNameAr", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceCategory">Service Category</Label>
              <Select onValueChange={(value) => updateBasicInfo("serviceCategory", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preventive">Preventive Care</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic Services</SelectItem>
                  <SelectItem value="wellness">Wellness Packages</SelectItem>
                  <SelectItem value="competition">Competition Screening</SelectItem>
                  <SelectItem value="emergency">Emergency Services</SelectItem>
                  <SelectItem value="specialized">Specialized Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Select onValueChange={(value) => updateBasicInfo("targetAudience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="racing">Racing Horses</SelectItem>
                  <SelectItem value="breeding">Breeding Stock</SelectItem>
                  <SelectItem value="recreational">Recreational Horses</SelectItem>
                  <SelectItem value="young">Young Horses</SelectItem>
                  <SelectItem value="senior">Senior Horses</SelectItem>
                  <SelectItem value="all">All Horses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shortDescEn">Short Description (English)</Label>
              <Textarea
                id="shortDescEn"
                placeholder="Brief description of the service..."
                value={data.basicInfo?.shortDescEn || ""}
                onChange={(e) => updateBasicInfo("shortDescEn", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescAr">Short Description (Arabic)</Label>
              <Textarea
                id="shortDescAr"
                placeholder="وصف مختصر للخدمة..."
                dir="rtl"
                value={data.basicInfo?.shortDescAr || ""}
                onChange={(e) => updateBasicInfo("shortDescAr", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailedDescEn">Detailed Description (English)</Label>
              <Textarea
                id="detailedDescEn"
                placeholder="Comprehensive description including benefits, procedures, etc..."
                value={data.basicInfo?.detailedDescEn || ""}
                onChange={(e) => updateBasicInfo("detailedDescEn", e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailedDescAr">Detailed Description (Arabic)</Label>
              <Textarea
                id="detailedDescAr"
                placeholder="وصف شامل يتضمن الفوائد والإجراءات وغيرها..."
                dir="rtl"
                value={data.basicInfo?.detailedDescAr || ""}
                onChange={(e) => updateBasicInfo("detailedDescAr", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceTemplateStep1;
