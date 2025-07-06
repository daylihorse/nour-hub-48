
import { useState, useMemo } from "react";
import { 
  Users, 
  UserPlus, 
  Calendar, 
  DollarSign, 
  Award, 
  BookOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Employee } from "@/types/employee";
import { useLanguage } from "@/contexts/LanguageContext";

interface HRDashboardProps {
  employees: Employee[];
}

const HRDashboard = ({ employees }: HRDashboardProps) => {
  const { direction } = useLanguage();
  // Calculate metrics based on employees data
  const metrics = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(emp => emp.status === "active").length;
    const inactive = employees.filter(emp => emp.status === "inactive").length;
    const onLeave = employees.filter(emp => emp.status === "on-leave").length;
    
    // Sample data for demonstration - in real app would come from database
    const totalPayroll = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const avgSalary = total > 0 ? totalPayroll / total : 0;
    
    return {
      totalEmployees: total,
      activeEmployees: active,
      inactiveEmployees: inactive,
      onLeaveEmployees: onLeave,
      totalPayroll,
      avgSalary,
      pendingReviews: Math.floor(total * 0.3), // 30% need reviews
      completedTrainings: Math.floor(total * 0.7), // 70% completed training
      upcomingTrainings: Math.floor(total * 0.4), // 40% have upcoming training
    };
  }, [employees]);

  // Sample recent activities
  const recentActivities = [
    { type: "hire", message: "New employee John Smith added to HR Department", time: "2 hours ago" },
    { type: "review", message: "Performance review completed for Sarah Johnson", time: "1 day ago" },
    { type: "training", message: "Safety training scheduled for 5 employees", time: "2 days ago" },
    { type: "payroll", message: "Monthly payroll processed successfully", time: "3 days ago" },
  ];

  // Department distribution
  const departmentStats = useMemo(() => {
    const deptCount: Record<string, number> = {};
    employees.forEach(emp => {
      emp.department.forEach(dept => {
        deptCount[dept] = (deptCount[dept] || 0) + 1;
      });
    });
    return Object.entries(deptCount).map(([dept, count]) => ({ dept, count }));
  }, [employees]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "hire": return <UserPlus className="h-4 w-4 text-green-600" />;
      case "review": return <Award className="h-4 w-4 text-purple-600" />;
      case "training": return <BookOpen className="h-4 w-4 text-blue-600" />;
      case "payroll": return <DollarSign className="h-4 w-4 text-emerald-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalEmployees}</div>
            <div className="flex gap-2 text-xs text-muted-foreground mt-2">
              <span className="text-green-600">{metrics.activeEmployees} Active</span>
              <span className="text-red-600">{metrics.inactiveEmployees} Inactive</span>
              <span className="text-yellow-600">{metrics.onLeaveEmployees} On Leave</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.totalPayroll.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Avg: ${metrics.avgSalary.toFixed(0)}/employee
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Reviews</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              Pending reviews this quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completedTrainings}</div>
            <p className="text-xs text-muted-foreground">
              Completed this year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Employee Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active</span>
                <span className="text-sm font-medium">{metrics.activeEmployees}</span>
              </div>
              <Progress 
                value={metrics.totalEmployees > 0 ? (metrics.activeEmployees / metrics.totalEmployees) * 100 : 0} 
                className="h-2" 
              />
              
              <div className="flex items-center justify-between">
                <span className="text-sm">On Leave</span>
                <span className="text-sm font-medium">{metrics.onLeaveEmployees}</span>
              </div>
              <Progress 
                value={metrics.totalEmployees > 0 ? (metrics.onLeaveEmployees / metrics.totalEmployees) * 100 : 0} 
                className="h-2" 
              />
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Inactive</span>
                <span className="text-sm font-medium">{metrics.inactiveEmployees}</span>
              </div>
              <Progress 
                value={metrics.totalEmployees > 0 ? (metrics.inactiveEmployees / metrics.totalEmployees) * 100 : 0} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentStats.slice(0, 5).map((stat) => (
                <div key={stat.dept} className="flex items-center justify-between">
                  <Badge variant="outline">{stat.dept}</Badge>
                  <span className="text-sm font-medium">{stat.count} employees</span>
                </div>
              ))}
              {departmentStats.length === 0 && (
                <p className="text-sm text-muted-foreground">No department assignments yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              HR Alerts & Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-sm">3 employees have expiring certifications</span>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{metrics.upcomingTrainings} upcoming training sessions</span>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">All payroll processing completed</span>
              </div>
              
              {metrics.pendingReviews > 0 && (
                <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                  <Award className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">{metrics.pendingReviews} performance reviews due</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HRDashboard;
