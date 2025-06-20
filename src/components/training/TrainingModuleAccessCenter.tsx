
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  MapPin, 
  Trophy, 
  Star,
  BarChart3,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const TrainingModuleAccessCenter = () => {
  const trainingFeatures = [
    {
      icon: Target,
      title: "Training Dashboard",
      description: "Overview of all training activities, metrics, and performance indicators",
      status: "active",
      route: "/dashboard/training"
    },
    {
      icon: BarChart3,
      title: "Training Programs",
      description: "Create and manage comprehensive training programs for different disciplines",
      status: "active",
      route: "/dashboard/training/programs"
    },
    {
      icon: Users,
      title: "Trainer Management",
      description: "Manage trainer profiles, schedules, and certifications",
      status: "active", 
      route: "/dashboard/training/trainers"
    },
    {
      icon: MapPin,
      title: "Facility Management",
      description: "Track facility availability, bookings, and maintenance schedules",
      status: "coming_soon",
      route: "/dashboard/training/facilities"
    },
    {
      icon: Trophy,
      title: "Competition Tracking",
      description: "Monitor competitions, events, and performance results",
      status: "coming_soon",
      route: "/dashboard/training/competitions"
    },
    {
      icon: Award,
      title: "Achievement Records",
      description: "Track horse achievements, awards, and performance milestones",
      status: "coming_soon",
      route: "/dashboard/training/achievements"
    },
    {
      icon: Star,
      title: "Training Assessments",
      description: "Conduct and manage training assessments and progress evaluations",
      status: "coming_soon",
      route: "/dashboard/training/assessments"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'coming_soon':
        return <Badge variant="outline">Coming Soon</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Training & Performance Management</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive training management system for tracking programs, trainers, facilities, and performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingFeatures.map((feature) => (
          <Card key={feature.title} className="relative group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <feature.icon className="h-8 w-8 text-primary mb-2" />
                {getStatusBadge(feature.status)}
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              
              <Button 
                className="w-full" 
                variant={feature.status === 'active' ? 'default' : 'outline'}
                disabled={feature.status !== 'active'}
              >
                {feature.status === 'active' ? 'Access Module' : 'Coming Soon'}
                {feature.status === 'active' && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Target className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-900">Training System Integration</h3>
              <p className="text-blue-800 text-sm">
                The training management system integrates seamlessly with horse profiles, health records, 
                and performance tracking to provide comprehensive training oversight and progress monitoring.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingModuleAccessCenter;
