
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Syringe, Pill, AlertTriangle, Calendar, DollarSign } from "lucide-react";
import { useVaccinations } from "@/hooks/useVaccinations";
import { useMedications } from "@/hooks/useMedications";
import { useMedicalAlerts } from "@/hooks/useMedicalAlerts";
import { useVeterinarians } from "@/hooks/useVeterinarians";

const MedicalDashboard = () => {
  const { vaccinations, loading: vaccinationsLoading } = useVaccinations();
  const { medications, loading: medicationsLoading } = useMedications();
  const { alerts, loading: alertsLoading } = useMedicalAlerts();
  const { veterinarians, loading: veterinariansLoading } = useVeterinarians();

  // Calculate key metrics
  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical');
  const activeMedications = medications.filter(med => med.status === 'active');
  const upcomingVaccinations = vaccinations.filter(vacc => 
    vacc.next_due_date && new Date(vacc.next_due_date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );

  const totalMedicalCosts = [
    ...vaccinations.map(v => v.cost || 0),
    ...medications.map(m => m.cost || 0)
  ].reduce((sum, cost) => sum + cost, 0);

  const keyMetrics = [
    {
      title: "Active Alerts",
      value: activeAlerts.length.toString(),
      change: criticalAlerts.length > 0 ? `${criticalAlerts.length} critical` : "All under control",
      trend: criticalAlerts.length > 0 ? "down" : "up",
      icon: AlertTriangle,
      color: criticalAlerts.length > 0 ? "text-red-600" : "text-green-600"
    },
    {
      title: "Active Medications",
      value: activeMedications.length.toString(),
      change: `${medications.length} total records`,
      trend: "up",
      icon: Pill,
      color: "text-blue-600"
    },
    {
      title: "Upcoming Vaccinations",
      value: upcomingVaccinations.length.toString(),
      change: "Next 30 days",
      trend: upcomingVaccinations.length > 0 ? "down" : "up",
      icon: Syringe,
      color: upcomingVaccinations.length > 0 ? "text-orange-600" : "text-green-600"
    },
    {
      title: "Medical Costs (YTD)",
      value: `$${totalMedicalCosts.toLocaleString()}`,
      change: "Year to date",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ];

  const loading = vaccinationsLoading || medicationsLoading || alertsLoading || veterinariansLoading;

  if (loading) {
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
        {keyMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalAlerts.length === 0 ? (
                <p className="text-muted-foreground">No critical alerts at this time.</p>
              ) : (
                criticalAlerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.due_date && `Due: ${new Date(alert.due_date).toLocaleDateString()}`}
                      </p>
                    </div>
                    <Badge variant="destructive">{alert.alert_type.replace('_', ' ')}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Vaccinations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-4 w-4 text-blue-500" />
              Recent Vaccinations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vaccinations.slice(0, 5).map((vaccination) => (
                <div key={vaccination.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{vaccination.vaccine_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(vaccination.vaccination_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={vaccination.status === 'completed' ? 'default' : 'secondary'}
                  >
                    {vaccination.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-green-500" />
              Active Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeMedications.slice(0, 5).map((medication) => (
                <div key={medication.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{medication.medication_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {medication.dosage} - {medication.frequency}
                    </p>
                  </div>
                  <Badge variant="outline">{medication.medication_type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Veterinarian Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-purple-500" />
              Veterinarian Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {veterinarians.filter(vet => vet.status === 'active').slice(0, 5).map((vet) => (
                <div key={vet.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{vet.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {vet.specialty || 'General Practice'}
                      {vet.emergency_contact && ' • Emergency Contact'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{vet.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalDashboard;
