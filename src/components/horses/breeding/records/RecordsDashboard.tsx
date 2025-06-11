
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRecords } from "./RecordsProvider";
import { getRecordStatusColor, getRecordPriorityColor, getRecordTypeLabel } from "./utils/recordUtils";
import { Calendar, AlertTriangle, Clock, CheckCircle, TrendingUp } from "lucide-react";

const RecordsDashboard = () => {
  const { stats, getOverdueRecords, getUpcomingRecords } = useRecords();
  
  const overdueRecords = getOverdueRecords();
  const upcomingRecords = getUpcomingRecords();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.byStatus.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Records by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Records by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(stats.byType)
              .filter(([_, count]) => count > 0)
              .map(([type, count]) => (
                <div key={type} className="text-center">
                  <div className="text-lg font-semibold">{count}</div>
                  <div className="text-sm text-muted-foreground">
                    {getRecordTypeLabel(type as any)}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.byPriority)
              .filter(([_, count]) => count > 0)
              .map(([priority, count]) => (
                <div key={priority} className="flex items-center justify-between">
                  <Badge className={getRecordPriorityColor(priority as any)}>
                    {priority}
                  </Badge>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Overdue Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overdueRecords.length === 0 ? (
              <p className="text-muted-foreground">No overdue records</p>
            ) : (
              <div className="space-y-3">
                {overdueRecords.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{record.title}</div>
                      <div className="text-sm text-muted-foreground">{record.horseName}</div>
                    </div>
                    <Badge className={getRecordStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                ))}
                {overdueRecords.length > 5 && (
                  <Button variant="link" className="p-0">
                    View all {overdueRecords.length} overdue records
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Upcoming Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingRecords.length === 0 ? (
              <p className="text-muted-foreground">No upcoming records</p>
            ) : (
              <div className="space-y-3">
                {upcomingRecords.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{record.title}</div>
                      <div className="text-sm text-muted-foreground">{record.horseName}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {record.scheduledDate?.toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {upcomingRecords.length > 5 && (
                  <Button variant="link" className="p-0">
                    View all {upcomingRecords.length} upcoming records
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecordsDashboard;
