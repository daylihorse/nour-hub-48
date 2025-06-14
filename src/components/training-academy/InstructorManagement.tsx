
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Star, Calendar } from "lucide-react";

const InstructorManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Guide Management</h2>
        <p className="text-muted-foreground">
          Manage riding guides, schedules, and certifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Active Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Currently available</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-sm text-muted-foreground">Customer rating</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Rides Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">Scheduled rides</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guide Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Comprehensive guide management system coming soon. This will include
              staff scheduling, certification tracking, and performance analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorManagement;
