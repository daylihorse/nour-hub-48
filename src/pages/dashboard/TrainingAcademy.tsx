
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RidingReservationDashboard from "@/components/training-academy/RidingReservationDashboard";
import RideSessionManagement from "@/components/training-academy/RideSessionManagement";
import ReservationSystem from "@/components/training-academy/ReservationSystem";
import InstructorManagement from "@/components/training-academy/InstructorManagement";
import HorseManagement from "@/components/training-academy/HorseManagement";
import PaymentManagement from "@/components/training-academy/PaymentManagement";
import { Horse, Users, Calendar, UserCheck, MapPin, CreditCard } from "lucide-react";

const TrainingAcademy = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horse Riding Reservations</h1>
        <p className="text-muted-foreground">
          Book unforgettable horse riding experiences with professional guides and well-trained horses
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Horse className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Ride Sessions
          </TabsTrigger>
          <TabsTrigger value="reservations" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Reservations
          </TabsTrigger>
          <TabsTrigger value="instructors" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="horses" className="flex items-center gap-2">
            <Horse className="h-4 w-4" />
            Horses
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <RidingReservationDashboard />
        </TabsContent>
        
        <TabsContent value="sessions" className="mt-6">
          <RideSessionManagement />
        </TabsContent>
        
        <TabsContent value="reservations" className="mt-6">
          <ReservationSystem />
        </TabsContent>
        
        <TabsContent value="instructors" className="mt-6">
          <InstructorManagement />
        </TabsContent>
        
        <TabsContent value="horses" className="mt-6">
          <HorseManagement />
        </TabsContent>
        
        <TabsContent value="payments" className="mt-6">
          <PaymentManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingAcademy;
