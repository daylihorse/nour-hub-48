
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horse Management Dashboard</h1>
        <p className="text-muted-foreground">Manage all aspects of your equestrian operation</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="horses" className="flex items-center gap-2">
            <Rabbit className="h-4 w-4" />
            <span className="hidden sm:inline">Horses</span>
          </TabsTrigger>
          <TabsTrigger value="laboratory" className="flex items-center gap-2">
            <FlaskRound className="h-4 w-4" />
            <span className="hidden sm:inline">Lab</span>
          </TabsTrigger>
          <TabsTrigger value="clinic" className="flex items-center gap-2">
            <Hospital className="h-4 w-4" />
            <span className="hidden sm:inline">Clinic</span>
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Finance</span>
          </TabsTrigger>
          <TabsTrigger value="hr" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">HR</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Market</span>
          </TabsTrigger>
          <TabsTrigger value="movements" className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Movements</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Training</span>
          </TabsTrigger>
          <TabsTrigger value="rooms" className="flex items-center gap-2">
            <Warehouse className="h-4 w-4" />
            <span className="hidden sm:inline">Rooms</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Maint</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Welcome to your horse management system. Select a department tab above to get started.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horses">
          <Card>
            <CardHeader>
              <CardTitle>Horses Department</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/horses" className="text-primary hover:underline">
                Go to Horses Management →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="laboratory">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/laboratory" className="text-primary hover:underline">
                Go to Laboratory →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinic">
          <Card>
            <CardHeader>
              <CardTitle>Clinic</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/clinic" className="text-primary hover:underline">
                Go to Clinic →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>Finance</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/finance" className="text-primary hover:underline">
                Go to Finance →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hr">
          <Card>
            <CardHeader>
              <CardTitle>HR Department</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/hr" className="text-primary hover:underline">
                Go to HR →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/inventory" className="text-primary hover:underline">
                Go to Inventory →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/marketplace" className="text-primary hover:underline">
                Go to Marketplace →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Arrivals & Departures</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/movements" className="text-primary hover:underline">
                Go to Movements →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Training Center</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/training" className="text-primary hover:underline">
                Go to Training →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms">
          <Card>
            <CardHeader>
              <CardTitle>Stable Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/rooms" className="text-primary hover:underline">
                Go to Rooms →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/maintenance" className="text-primary hover:underline">
                Go to Maintenance →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
