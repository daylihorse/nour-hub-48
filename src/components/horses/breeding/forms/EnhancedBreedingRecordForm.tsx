
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Save, X, FileText, Award } from "lucide-react";
import { format } from "date-fns";
import { BreedingRecord } from "@/types/breeding";
import BreedingCertificateGenerator from "../certificates/BreedingCertificateGenerator";
import PedigreeTreeVisualization from "../pedigree/PedigreeTreeVisualization";

interface EnhancedBreedingRecordFormProps {
  record?: Partial<BreedingRecord>;
  onSave: (record: Partial<BreedingRecord>) => void;
  onCancel: () => void;
  mode: "create" | "edit";
}

const EnhancedBreedingRecordForm = ({ record, onSave, onCancel, mode }: EnhancedBreedingRecordFormProps) => {
  const [formData, setFormData] = useState<Partial<BreedingRecord>>(record || {
    type: "breeding",
    status: "planned",
    breedingMethod: "natural",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    record?.breedingDate || record?.pregnancyStartDate || record?.birthDate
  );
  const [showCertificate, setShowCertificate] = useState(false);
  const [showPedigree, setShowPedigree] = useState(false);

  // Additional form fields inspired by the Arabic breeding record
  const [additionalData, setAdditionalData] = useState({
    ownerName: "",
    ownerAddress: "",
    stallionOwner: "",
    breedingLocation: "",
    witnessName: "",
    bloodlineOrigin: "",
    expectedTraits: [] as string[],
    breedingPurpose: "",
    contractTerms: "",
    insuranceDetails: "",
    breedingFee: 0,
    paymentStatus: "pending",
    followUpRequired: false,
    additionalDocuments: [] as string[],
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdditionalDataChange = (field: string, value: any) => {
    setAdditionalData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (formData.type === "breeding") {
      handleInputChange("breedingDate", date);
    } else if (formData.type === "pregnancy") {
      handleInputChange("pregnancyStartDate", date);
    } else if (formData.type === "birth") {
      handleInputChange("birthDate", date);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      ...additionalData,
      createdAt: record?.createdAt || new Date(),
      updatedAt: new Date(),
    });
  };

  const getDateLabel = () => {
    switch (formData.type) {
      case "breeding": return "Breeding Date";
      case "pregnancy": return "Pregnancy Start Date";
      case "birth": return "Birth Date";
      default: return "Date";
    }
  };

  const breedingPurposes = [
    "Commercial breeding",
    "Genetic improvement",
    "Sport horse production",
    "Preservation breeding",
    "Research purposes"
  ];

  const expectedTraitOptions = [
    "Speed", "Endurance", "Jumping ability", "Temperament", 
    "Conformation", "Color", "Size", "Intelligence"
  ];

  if (showCertificate && formData.id) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowCertificate(false)}
          className="mb-4"
        >
          ← Back to Form
        </Button>
        <BreedingCertificateGenerator 
          record={formData as BreedingRecord}
          onDownload={() => console.log("Download certificate")}
          onPrint={() => console.log("Print certificate")}
        />
      </div>
    );
  }

  if (showPedigree && formData.horseId) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowPedigree(false)}
          className="mb-4"
        >
          ← Back to Form
        </Button>
        <PedigreeTreeVisualization 
          horseId={formData.horseId}
          horseName={formData.horseName || "Unknown Horse"}
        />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {mode === "create" ? "Create" : "Edit"} Enhanced Breeding Record
          </CardTitle>
          <div className="flex gap-2">
            {formData.id && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCertificate(true)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Certificate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPedigree(true)}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Pedigree
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="horseName">Horse Name</Label>
                <Input
                  id="horseName"
                  value={formData.horseName || ""}
                  onChange={(e) => handleInputChange("horseName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Record Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breeding">Breeding</SelectItem>
                    <SelectItem value="pregnancy">Pregnancy</SelectItem>
                    <SelectItem value="birth">Birth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Ownership Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Ownership Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Mare Owner Name</Label>
                <Input
                  id="ownerName"
                  value={additionalData.ownerName}
                  onChange={(e) => handleAdditionalDataChange("ownerName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stallionOwner">Stallion Owner Name</Label>
                <Input
                  id="stallionOwner"
                  value={additionalData.stallionOwner}
                  onChange={(e) => handleAdditionalDataChange("stallionOwner", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerAddress">Owner Address</Label>
              <Textarea
                id="ownerAddress"
                value={additionalData.ownerAddress}
                onChange={(e) => handleAdditionalDataChange("ownerAddress", e.target.value)}
                rows={2}
              />
            </div>
          </div>

          {/* Breeding Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Breeding Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{getDateLabel()}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="breedingLocation">Breeding Location</Label>
                <Input
                  id="breedingLocation"
                  value={additionalData.breedingLocation}
                  onChange={(e) => handleAdditionalDataChange("breedingLocation", e.target.value)}
                />
              </div>
            </div>

            {formData.type === "breeding" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mateName">Mate Name</Label>
                  <Input
                    id="mateName"
                    value={formData.mateName || ""}
                    onChange={(e) => handleInputChange("mateName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breedingMethod">Breeding Method</Label>
                  <Select 
                    value={formData.breedingMethod} 
                    onValueChange={(value) => handleInputChange("breedingMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="artificial_insemination">Artificial Insemination</SelectItem>
                      <SelectItem value="embryo_transfer">Embryo Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="witnessName">Witness Name</Label>
                  <Input
                    id="witnessName"
                    value={additionalData.witnessName}
                    onChange={(e) => handleAdditionalDataChange("witnessName", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Genetic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Genetic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodlineOrigin">Bloodline Origin</Label>
                <Input
                  id="bloodlineOrigin"
                  value={additionalData.bloodlineOrigin}
                  onChange={(e) => handleAdditionalDataChange("bloodlineOrigin", e.target.value)}
                  placeholder="e.g., Arabian, Thoroughbred"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breedingPurpose">Breeding Purpose</Label>
                <Select 
                  value={additionalData.breedingPurpose} 
                  onValueChange={(value) => handleAdditionalDataChange("breedingPurpose", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {breedingPurposes.map(purpose => (
                      <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Expected Traits</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {expectedTraitOptions.map(trait => (
                  <div key={trait} className="flex items-center space-x-2">
                    <Checkbox
                      id={trait}
                      checked={additionalData.expectedTraits.includes(trait)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleAdditionalDataChange("expectedTraits", [...additionalData.expectedTraits, trait]);
                        } else {
                          handleAdditionalDataChange("expectedTraits", additionalData.expectedTraits.filter(t => t !== trait));
                        }
                      }}
                    />
                    <Label htmlFor={trait} className="text-sm">{trait}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="breedingFee">Breeding Fee ($)</Label>
                <Input
                  id="breedingFee"
                  type="number"
                  value={additionalData.breedingFee}
                  onChange={(e) => handleAdditionalDataChange("breedingFee", parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select 
                  value={additionalData.paymentStatus} 
                  onValueChange={(value) => handleAdditionalDataChange("paymentStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partial Payment</SelectItem>
                    <SelectItem value="paid">Paid in Full</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Additional Costs ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.cost || ""}
                  onChange={(e) => handleInputChange("cost", parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="veterinarian">Veterinarian</Label>
                <Input
                  id="veterinarian"
                  value={formData.veterinarian || ""}
                  onChange={(e) => handleInputChange("veterinarian", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceDetails">Insurance Details</Label>
                <Input
                  id="insuranceDetails"
                  value={additionalData.insuranceDetails}
                  onChange={(e) => handleAdditionalDataChange("insuranceDetails", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractTerms">Contract Terms</Label>
              <Textarea
                id="contractTerms"
                value={additionalData.contractTerms}
                onChange={(e) => handleAdditionalDataChange("contractTerms", e.target.value)}
                rows={3}
                placeholder="Terms and conditions of the breeding agreement"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="followUpRequired"
                checked={additionalData.followUpRequired}
                onCheckedChange={(checked) => handleAdditionalDataChange("followUpRequired", checked)}
              />
              <Label htmlFor="followUpRequired">Follow-up required</Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {mode === "create" ? "Create" : "Update"} Record
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedBreedingRecordForm;
