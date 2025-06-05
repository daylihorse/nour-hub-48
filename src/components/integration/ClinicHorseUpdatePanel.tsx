
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { useClinicHorsesIntegration } from "@/hooks/useIntegration";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ClinicHorseUpdatePanel = () => {
  const { integrations, updateHorseFromClinic } = useClinicHorsesIntegration();
  const { toast } = useToast();
  const [selectedHorse, setSelectedHorse] = useState("");
  const [clinicRecordId, setClinicRecordId] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [breedingEligible, setBreedingEligible] = useState("");
  const [findings, setFindings] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleUpdateHorse = async () => {
    if (!selectedHorse || !clinicRecordId) {
      toast({
        title: "Missing Information",
        description: "Please select a horse and enter clinic record ID",
        variant: "destructive",
      });
      return;
    }

    try {
      const clinicFindings = {
        healthStatus,
        breedingEligible: breedingEligible === "true",
        findings,
        recommendations: recommendations.split('\n').filter(r => r.trim()),
        requiresFollowUp: healthStatus === "under_treatment",
      };

      await updateHorseFromClinic(clinicRecordId, selectedHorse, clinicFindings);
      
      toast({
        title: "Horse Record Updated",
        description: "Horse health information has been updated from clinic findings.",
      });

      // Reset form
      setSelectedHorse("");
      setClinicRecordId("");
      setHealthStatus("");
      setBreedingEligible("");
      setFindings("");
      setRecommendations("");
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update horse record. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Update Horse Records from Clinic
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Clinic Record ID</label>
            <Input
              value={clinicRecordId}
              onChange={(e) => setClinicRecordId(e.target.value)}
              placeholder="Enter clinic record ID"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Horse ID</label>
            <Input
              value={selectedHorse}
              onChange={(e) => setSelectedHorse(e.target.value)}
              placeholder="Enter horse ID"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Health Status</label>
            <Select value={healthStatus} onValueChange={setHealthStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select health status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="under_treatment">Under Treatment</SelectItem>
                <SelectItem value="quarantine">Quarantine</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Breeding Eligible</label>
            <Select value={breedingEligible} onValueChange={setBreedingEligible}>
              <SelectTrigger>
                <SelectValue placeholder="Select breeding eligibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Eligible</SelectItem>
                <SelectItem value="false">Not Eligible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Clinical Findings</label>
          <Textarea
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            placeholder="Enter detailed clinical findings..."
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Recommendations (one per line)</label>
          <Textarea
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            placeholder="Enter recommendations, one per line..."
            rows={3}
          />
        </div>

        <Button onClick={handleUpdateHorse} className="w-full">
          <FileText className="h-4 w-4 mr-2" />
          Update Horse Record
        </Button>

        {integrations.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Recent Updates</h4>
            <div className="space-y-2">
              {integrations.slice(-5).map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-green-500">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Horse {integration.horseId}</p>
                      <p className="text-xs text-muted-foreground">
                        {integration.updateType.replace('_', ' ')} updated
                      </p>
                    </div>
                  </div>
                  <Badge variant={integration.followUpRequired ? "destructive" : "default"}>
                    {integration.followUpRequired ? (
                      <>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Follow-up Required
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClinicHorseUpdatePanel;
