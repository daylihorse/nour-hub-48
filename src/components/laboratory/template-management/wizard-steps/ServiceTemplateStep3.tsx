
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Clock, Calendar } from "lucide-react";

interface ServiceTemplateStep3Props {
  data: any;
  onDataChange: (data: any) => void;
}

const ServiceTemplateStep3 = ({ data, onDataChange }: ServiceTemplateStep3Props) => {
  const updatePricing = (field: string, value: string) => {
    onDataChange({
      ...data,
      pricing: {
        ...data.pricing,
        [field]: value
      }
    });
  };

  const totalTestDuration = data.testsServices?.reduce((total: number, test: any) => total + test.duration, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (USD)</Label>
              <Input
                id="basePrice"
                type="number"
                placeholder="150.00"
                value={data.pricing?.basePrice || ""}
                onChange={(e) => updatePricing("basePrice", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select onValueChange={(value) => updatePricing("currency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="aed">AED - UAE Dirham</SelectItem>
                  <SelectItem value="sar">SAR - Saudi Riyal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountEligible">Discount Eligibility</Label>
              <Select onValueChange={(value) => updatePricing("discountEligible", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select eligibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Discounts</SelectItem>
                  <SelectItem value="seasonal">Seasonal Discounts</SelectItem>
                  <SelectItem value="volume">Volume Discounts</SelectItem>
                  <SelectItem value="membership">Membership Discounts</SelectItem>
                  <SelectItem value="all">All Discount Types</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select onValueChange={(value) => updatePricing("paymentTerms", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Payment on Service</SelectItem>
                  <SelectItem value="net15">Net 15 Days</SelectItem>
                  <SelectItem value="net30">Net 30 Days</SelectItem>
                  <SelectItem value="advance">50% Advance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduling & Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">Estimated Duration (hours)</Label>
              <Input
                id="estimatedDuration"
                type="number"
                placeholder={totalTestDuration.toString()}
                value={data.pricing?.estimatedDuration || totalTestDuration}
                onChange={(e) => updatePricing("estimatedDuration", e.target.value)}
              />
              <div className="text-xs text-muted-foreground">
                Based on selected tests: {totalTestDuration} hours
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preparationTime">Preparation Time (hours)</Label>
              <Input
                id="preparationTime"
                type="number"
                placeholder="0.5"
                value={data.pricing?.preparationTime || ""}
                onChange={(e) => updatePricing("preparationTime", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleType">Schedule Type</Label>
              <Select onValueChange={(value) => updatePricing("scheduleType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointment">By Appointment</SelectItem>
                  <SelectItem value="walk-in">Walk-in Welcome</SelectItem>
                  <SelectItem value="urgent">Urgent/Emergency</SelectItem>
                  <SelectItem value="batch">Batch Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select onValueChange={(value) => updatePricing("availability", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business-hours">Business Hours Only</SelectItem>
                  <SelectItem value="extended">Extended Hours</SelectItem>
                  <SelectItem value="24-7">24/7 Available</SelectItem>
                  <SelectItem value="weekdays">Weekdays Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Additional Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preparationInstructionsEn">Preparation Instructions (English)</Label>
            <Textarea
              id="preparationInstructionsEn"
              placeholder="Detailed instructions for client preparation..."
              value={data.pricing?.preparationInstructionsEn || ""}
              onChange={(e) => updatePricing("preparationInstructionsEn", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preparationInstructionsAr">Preparation Instructions (Arabic)</Label>
            <Textarea
              id="preparationInstructionsAr"
              placeholder="تعليمات مفصلة لتحضير العميل..."
              dir="rtl"
              value={data.pricing?.preparationInstructionsAr || ""}
              onChange={(e) => updatePricing("preparationInstructionsAr", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              placeholder="Any special equipment, staff, or facility requirements..."
              value={data.pricing?.specialRequirements || ""}
              onChange={(e) => updatePricing("specialRequirements", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceTemplateStep3;
