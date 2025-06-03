
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Rabbit, // Changed from Horse to Rabbit 
  FlaskRound, 
  Hospital, 
  DollarSign, 
  Users, 
  Package, 
  ArrowRightLeft, 
  Dumbbell, 
  Warehouse, 
  Wrench,
  Store,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const departments = [
    {
      title: "Horses Department",
      icon: Rabbit,
      description: "Manage horse records, health, and breeding information",
      link: "/dashboard/horses",
      color: "bg-blue-500"
    },
    {
      title: "Laboratory",
      icon: FlaskRound,
      description: "Lab tests, results, and medical analysis",
      link: "/dashboard/laboratory",
      color: "bg-green-500"
    },
    {
      title: "Clinic",
      icon: Hospital,
      description: "Veterinary care, appointments, and medical records",
      link: "/dashboard/clinic",
      color: "bg-red-500"
    },
    {
      title: "Finance",
      icon: DollarSign,
      description: "Financial management, invoicing, and accounting",
      link: "/dashboard/finance",
      color: "bg-yellow-500"
    },
    {
      title: "HR Department",
      icon: Users,
      description: "Employee management, payroll, and scheduling",
      link: "/dashboard/hr",
      color: "bg-purple-500"
    },
    {
      title: "Inventory",
      icon: Package,
      description: "Stock management, supplies, and equipment",
      link: "/dashboard/inventory",
      color: "bg-orange-500"
    },
    {
      title: "Marketplace",
      icon: Store,
      description: "Stable store and marketplace integration",
      link: "/dashboard/marketplace",
      color: "bg-pink-500"
    },
    {
      title: "Horse Movements",
      icon: ArrowRightLeft,
      description: "Track arrivals, departures, and transfers",
      link: "/dashboard/movements",
      color: "bg-indigo-500"
    },
    {
      title: "Training Center",
      icon: Dumbbell,
      description: "Training programs, schedules, and progress tracking",
      link: "/dashboard/training",
      color: "bg-teal-500"
    },
    {
      title: "Stable Rooms",
      icon: Warehouse,
      description: "Room assignments, availability, and maintenance",
      link: "/dashboard/rooms",
      color: "bg-cyan-500"
    },
    {
      title: "Maintenance",
      icon: Wrench,
      description: "Facility maintenance, repairs, and schedules",
      link: "/dashboard/maintenance",
      color: "bg-gray-500"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      description: "Internal messaging and communications",
      link: "/dashboard/messages",
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horse Management Dashboard</h1>
        <p className="text-muted-foreground">Manage all aspects of your equestrian operation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {departments.map((dept) => (
          <Link key={dept.title} to={dept.link} className="group">
            <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg ${dept.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <dept.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{dept.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{dept.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
