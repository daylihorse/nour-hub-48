
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Printer, Eye } from "lucide-react";
import { BreedingRecord } from "@/types/breeding";

interface BreedingCertificateGeneratorProps {
  record?: BreedingRecord;
  onDownload?: () => void;
  onPrint?: () => void;
}

const BreedingCertificateGenerator = ({ record, onDownload, onPrint }: BreedingCertificateGeneratorProps) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock breeding records for selection
  const mockBreedingRecords: BreedingRecord[] = [
    {
      id: "BR001",
      horseId: "H001",
      horseName: "Whisper",
      type: "breeding",
      status: "completed",
      mateId: "H002",
      mateName: "Thunder",
      breedingDate: new Date("2024-01-15"),
      breedingMethod: "natural",
      veterinarian: "Dr. Smith",
      notes: "Successful breeding session",
      cost: 2500,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15")
    },
    {
      id: "BR002",
      horseId: "H003",
      horseName: "Grace",
      type: "breeding",
      status: "completed",
      mateId: "H004",
      mateName: "Storm",
      breedingDate: new Date("2024-02-10"),
      breedingMethod: "artificial_insemination",
      veterinarian: "Dr. Johnson",
      notes: "AI procedure completed successfully",
      cost: 3000,
      createdAt: new Date("2024-02-10"),
      updatedAt: new Date("2024-02-10")
    }
  ];

  const selectedRecord = record || mockBreedingRecords.find(r => r.id === selectedRecordId);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate certificate generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // If no record is provided and none selected, show record selection
  if (!selectedRecord) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Select Breeding Record
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please select a breeding record to generate a certificate for:
            </p>
            <Select value={selectedRecordId} onValueChange={setSelectedRecordId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a breeding record..." />
              </SelectTrigger>
              <SelectContent>
                {mockBreedingRecords.map((breedingRecord) => (
                  <SelectItem key={breedingRecord.id} value={breedingRecord.id}>
                    {breedingRecord.horseName} × {breedingRecord.mateName} - {formatDate(breedingRecord.breedingDate!)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Record Selection (if no record prop provided) */}
      {!record && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Selected Record:</p>
                <p className="text-sm text-muted-foreground">
                  {selectedRecord.horseName} × {selectedRecord.mateName} - {formatDate(selectedRecord.breedingDate!)}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedRecordId("")}
              >
                Change Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificate Preview */}
      <Card className="border-2 border-dashed border-blue-200">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-900">
            Breeding Certificate
          </CardTitle>
          <p className="text-sm text-blue-700">Official Record of Breeding Activity</p>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          {/* Header Information */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Certificate No: {selectedRecord.id}</h3>
            <p className="text-muted-foreground">
              Issued on {formatDate(new Date())}
            </p>
          </div>

          <Separator />

          {/* Horse Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg border-b pb-2">Mare Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{selectedRecord.horseName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Registration:</span>
                  <span>{selectedRecord.horseId}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg border-b pb-2">Stallion Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{selectedRecord.mateName || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Registration:</span>
                  <span>{selectedRecord.mateId || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Breeding Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b pb-2">Breeding Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <span className="font-medium block">Breeding Date:</span>
                <span>{selectedRecord.breedingDate ? formatDate(selectedRecord.breedingDate) : 'N/A'}</span>
              </div>
              <div className="space-y-2">
                <span className="font-medium block">Method:</span>
                <Badge variant="outline">
                  {selectedRecord.breedingMethod?.replace('_', ' ').toUpperCase() || 'Natural'}
                </Badge>
              </div>
              <div className="space-y-2">
                <span className="font-medium block">Status:</span>
                <Badge variant={selectedRecord.status === 'completed' ? 'default' : 'secondary'}>
                  {selectedRecord.status?.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Veterinarian Information */}
          {selectedRecord.veterinarian && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold text-lg border-b pb-2">Veterinary Supervision</h4>
                <div className="flex justify-between">
                  <span className="font-medium">Supervising Veterinarian:</span>
                  <span>{selectedRecord.veterinarian}</span>
                </div>
              </div>
            </>
          )}

          {/* Notes */}
          {selectedRecord.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold text-lg border-b pb-2">Additional Notes</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.notes}</p>
              </div>
            </>
          )}

          {/* Certificate Footer */}
          <Separator />
          <div className="text-center text-xs text-muted-foreground">
            <p>This certificate is generated by the Horse Management System</p>
            <p>Certificate ID: {selectedRecord.id} | Generated: {formatDate(new Date())}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Preview'}
        </Button>
        <Button 
          variant="outline"
          onClick={onDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button 
          variant="outline"
          onClick={onPrint}
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print Certificate
        </Button>
      </div>
    </div>
  );
};

export default BreedingCertificateGenerator;
