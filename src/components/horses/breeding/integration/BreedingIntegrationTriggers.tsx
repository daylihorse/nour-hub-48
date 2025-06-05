
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Baby, Stethoscope } from "lucide-react";
import { useBreedingClinicIntegration } from "@/hooks/useIntegration";
import { useToast } from "@/hooks/use-toast";

interface BreedingIntegrationTriggersProps {
  breedingRecord?: any;
  pregnancyRecord?: any;
  foalingRecord?: any;
}

const BreedingIntegrationTriggers = ({ 
  breedingRecord, 
  pregnancyRecord, 
  foalingRecord 
}: BreedingIntegrationTriggersProps) => {
  const { triggerBreedingEvent, integrations } = useBreedingClinicIntegration();
  const { toast } = useToast();

  const handleTriggerEvent = async (eventType: string, payload: any, description: string) => {
    try {
      await triggerBreedingEvent(eventType, payload);
      toast({
        title: "Integration Triggered",
        description: `${description} has been scheduled with the clinic department.`,
      });
    } catch (error) {
      toast({
        title: "Integration Failed",
        description: "Failed to trigger clinic integration. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getIntegrationStatus = (breedingId: string, triggerType: string) => {
    return integrations.find(i => 
      i.breedingEventId === breedingId && i.triggerType === triggerType
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Clinic Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {breedingRecord && (
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Pre-Breeding Health Check</p>
                <p className="text-xs text-muted-foreground">Schedule veterinary examination</p>
              </div>
            </div>
            {getIntegrationStatus(breedingRecord.id, 'breeding_scheduled') ? (
              <Badge variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                Scheduled
              </Badge>
            ) : (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleTriggerEvent(
                  'breeding_scheduled',
                  {
                    breedingId: breedingRecord.id,
                    mareName: breedingRecord.mareName,
                    stallionName: breedingRecord.stallionName,
                  },
                  'Pre-breeding health check'
                )}
              >
                Schedule
              </Button>
            )}
          </div>
        )}

        {pregnancyRecord && (
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Heart className="h-4 w-4 text-pink-500" />
              <div>
                <p className="text-sm font-medium">Pregnancy Monitoring</p>
                <p className="text-xs text-muted-foreground">Schedule ultrasound and check-ups</p>
              </div>
            </div>
            {getIntegrationStatus(pregnancyRecord.id, 'pregnancy_confirmed') ? (
              <Badge variant="outline">
                <Heart className="h-3 w-3 mr-1" />
                Monitoring
              </Badge>
            ) : (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleTriggerEvent(
                  'pregnancy_confirmed',
                  {
                    pregnancyId: pregnancyRecord.id,
                    mareName: pregnancyRecord.mareName,
                  },
                  'Pregnancy monitoring'
                )}
              >
                Schedule
              </Button>
            )}
          </div>
        )}

        {foalingRecord && (
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Baby className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Foaling Support</p>
                <p className="text-xs text-muted-foreground">Veterinary support during birth</p>
              </div>
            </div>
            {getIntegrationStatus(foalingRecord.id, 'foaling_due') ? (
              <Badge variant="outline">
                <Baby className="h-3 w-3 mr-1" />
                Prepared
              </Badge>
            ) : (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleTriggerEvent(
                  'foaling_due',
                  {
                    pregnancyId: foalingRecord.id,
                    mareName: foalingRecord.mareName,
                    expectedDate: foalingRecord.expectedDate,
                  },
                  'Foaling support'
                )}
              >
                Prepare
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BreedingIntegrationTriggers;
