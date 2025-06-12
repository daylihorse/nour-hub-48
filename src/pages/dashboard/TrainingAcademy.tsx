
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingAcademyDashboard from "@/components/training-academy/TrainingAcademyDashboard";
import PublicLessonsManagement from "@/components/training-academy/PublicLessonsManagement";
import ReservationSystem from "@/components/training-academy/ReservationSystem";
import InstructorManagement from "@/components/training-academy/InstructorManagement";
import FacilityBooking from "@/components/training-academy/FacilityBooking";
import PaymentManagement from "@/components/training-academy/PaymentManagement";
import { GraduationCap, Users, Calendar, UserCheck, MapPin, CreditCard } from "lucide-react";

const TrainingAcademy = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Training Academy</h1>
        <p className="text-muted-foreground">
          Public riding lessons, instructor management, and comprehensive reservation system
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="reservations" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Reservations
          </TabsTrigger>
          <TabsTrigger value="instructors" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Instructors
          </TabsTrigger>
          <TabsTrigger value="facilities" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Facilities
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <TrainingAcademyDashboard />
        </TabsContent>
        
        <TabsContent value="lessons" className="mt-6">
          <PublicLessonsManagement />
        </TabsContent>
        
        <TabsContent value="reservations" className="mt-6">
          <ReservationSystem />
        </TabsContent>
        
        <TabsContent value="instructors" className="mt-6">
          <InstructorManagement />
        </TabsContent>
        
        <TabsContent value="facilities" className="mt-6">
          <FacilityBooking />
        </TabsContent>
        
        <TabsContent value="payments" className="mt-6">
          <PaymentManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingAcademy;
