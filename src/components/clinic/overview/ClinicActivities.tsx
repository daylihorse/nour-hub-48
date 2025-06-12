
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, AlertTriangle, CheckCircle, Activity, Clock, Calendar, Heart } from "lucide-react";

const ClinicActivities = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-blue-500" />
            Recent Patient Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Successful Surgery - Thunder</p>
                <p className="text-xs text-muted-foreground">Colic surgery completed, stable condition</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Activity className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Wellness Check - Bella</p>
                <p className="text-xs text-muted-foreground">Annual vaccination and health screening</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Follow-up Due - Shadow</p>
                <p className="text-xs text-muted-foreground">Post-surgery check scheduled for tomorrow</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Clinical Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Emergency Case</p>
                <p className="text-xs text-muted-foreground">Whisper - Severe lameness, requires immediate attention</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Calendar className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Overbooked Schedule</p>
                <p className="text-xs text-muted-foreground">3:00 PM slot has 3 appointments scheduled</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Heart className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Medication Reminder</p>
                <p className="text-xs text-muted-foreground">Star needs pain medication in 2 hours</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicActivities;
