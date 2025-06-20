
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  MapPin, 
  Trophy, 
  Star,
  BarChart3,
  Calendar,
  Award
} from "lucide-react";
import TrainingDashboard from "./TrainingDashboard";
import TrainingPrograms from "./TrainingPrograms";
import TrainerManagement from "./TrainerManagement";
import FacilityManagement from "./FacilityManagement";
import CompetitionManagement from "./CompetitionManagement";
import AchievementTracking from "./AchievementTracking";
import TrainingAssessments from "./TrainingAssessments";

const TrainingManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabsConfig = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Target,
      component: TrainingDashboard,
      description: "Training overview and key metrics"
    },
    {
      id: "programs",
      label: "Programs",
      icon: BarChart3,
      component: TrainingPrograms,
      description: "Manage training programs and curricula"
    },
    {
      id: "trainers",
      label: "Trainers",
      icon: Users,
      component: TrainerManagement,
      description: "Manage trainer profiles and schedules"
    },
    {
      id: "facilities",
      label: "Facilities",
      icon: MapPin,
      component: FacilityManagement,
      description: "Manage training facilities and bookings"
    },
    {
      id: "competitions",
      label: "Competitions",
      icon: Trophy,
      component: CompetitionManagement,
      description: "Track competitions and events"
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Award,
      component: AchievementTracking,
      description: "Track horse achievements and records"
    },
    {
      id: "assessments",
      label: "Assessments",
      icon: Star,
      component: TrainingAssessments,
      description: "Manage training assessments and progress"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Training Management</h1>
          <p className="text-muted-foreground">
            Comprehensive training program and performance management system
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Target className="h-3 w-3 mr-1" />
          Training Module Active
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          {tabsConfig.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsConfig.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <tab.icon className="h-5 w-5 text-primary" />
                  <CardTitle>{tab.label}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{tab.description}</p>
              </CardHeader>
              <CardContent>
                <tab.component />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TrainingManagement;
