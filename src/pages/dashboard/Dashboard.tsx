
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
  Wrench 
} from "lucide-react";
import { Link } from "react-router-dom";

const departmentCards = [
  { title: "Horses Department", path: "/dashboard/horses", icon: Rabbit, color: "bg-blue-100" },
  { title: "Laboratory", path: "/dashboard/laboratory", icon: FlaskRound, color: "bg-purple-100" },
  { title: "Clinic", path: "/dashboard/clinic", icon: Hospital, color: "bg-green-100" },
  { title: "Finance", path: "/dashboard/finance", icon: DollarSign, color: "bg-yellow-100" },
  { title: "HR Department", path: "/dashboard/hr", icon: Users, color: "bg-pink-100" },
  { title: "Inventory", path: "/dashboard/inventory", icon: Package, color: "bg-indigo-100" },
  { title: "Arrivals & Departures", path: "/dashboard/movements", icon: ArrowRightLeft, color: "bg-orange-100" },
  { title: "Training Center", path: "/dashboard/training", icon: Dumbbell, color: "bg-red-100" },
  { title: "Stable Rooms", path: "/dashboard/rooms", icon: Warehouse, color: "bg-emerald-100" },
  { title: "Maintenance", path: "/dashboard/maintenance", icon: Wrench, color: "bg-cyan-100" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horse Management Dashboard</h1>
        <p className="text-muted-foreground">Manage all aspects of your equestrian operation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentCards.map((dept) => (
          <Link to={dept.path} key={dept.path}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className={`p-2 rounded-md ${dept.color}`}>
                  <dept.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{dept.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access and manage {dept.title.toLowerCase()} data
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
