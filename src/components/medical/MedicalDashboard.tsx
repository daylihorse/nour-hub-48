
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Syringe, 
  Pill, 
  UserCheck, 
  AlertTriangle,
  Calendar,
  TrendingUp,
  Shield
} from "lucide-react";
import { useVaccinations } from "@/hooks/useVaccinations";
import { useMedications } from "@/hooks/useMedications";
import { useVeterinarians } from "@/hooks/useVeterinarians";
import { useMedicalAlerts } from "@/hooks/useMedicalAlerts";

const MedicalDashboard = () => {
  const { vaccinations, loading: vaccinationsLoading } = useVaccinations();
  const { medications, loading: medicationsLoading } = useMedications();
  const { veterinarians, loading: veterinariansLoading } = useVeterinarians();
  const { alerts, loading: alertsLoading } = useMedicalAlerts();

  const isLoading = vaccinationsLoading || medicationsLoading || veterinariansLoading || alertsLoading;

  // Filter active/recent items
  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const overdueMedications = medications.filter(medication => 
    medication.status === 'active' && medication.end_date && new Date(medication.end_date) < new Date()
  );
  const upcomingVaccinations = vaccinations.filter(vaccination =>
    vaccination.next_due_date && new Date(vaccination.next_due_date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  const emergencyVets = veterinarians.filter(vet => vet.emergency_contact && vet.status === 'active');

  const metrics = [
    {
      title: "Active Alerts",
      value: activeAlerts.length,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      title: "Vaccinations Due",
      value: upcomingVaccinations.length,
      icon: Syringe,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Active Medications",
      value: medications.filter(m => m.status === 'active').length,
      icon: Pill,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Emergency Vets",
      value: emergencyVets.length,
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className={`${metric.bgColor} ${metric.borderColor} border`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Medical Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Active Medical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                  </div>
                  <Badge 
                    variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                    className="capitalize"
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
              {activeAlerts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No active alerts
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Vaccinations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Upcoming Vaccinations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingVaccinations.slice(0, 5).map((vaccination) => (
                <div key={vaccination.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{vaccination.vaccine_name}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {vaccination.next_due_date ? new Date(vaccination.next_due_date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {vaccination.vaccine_type.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
              {upcomingVaccinations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No upcoming vaccinations
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-green-500" />
              Recent Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {medications.slice(0, 5).map((medication) => (
                <div key={medication.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{medication.medication_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {medication.dosage} - {medication.frequency}
                    </p>
                  </div>
                  <Badge 
                    variant={medication.status === 'active' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {medication.status}
                  </Badge>
                </div>
              ))}
              {medications.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No medication records
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-500" />
              Emergency Veterinarians
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyVets.map((vet) => (
                <div key={vet.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{vet.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {vet.specialty && `${vet.specialty} • `}{vet.phone}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Emergency
                  </Badge>
                </div>
              ))}
              {emergencyVets.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No emergency contacts configured
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalDashboard;
