
import StableMetricsGrid from "./dashboard/StableMetricsGrid";
import RoomStatusOverview from "./dashboard/RoomStatusOverview";
import RecentActivityPanel from "./dashboard/RecentActivityPanel";
import QuickActionsPanel from "./dashboard/QuickActionsPanel";
import UpcomingEventsPanel from "./dashboard/UpcomingEventsPanel";

const StableRoomsDashboard = () => {
  // Mock data - in real implementation, this would come from a service
  const metrics = {
    totalRooms: 156,
    occupiedRooms: 142,
    availableRooms: 8,
    maintenanceRooms: 6,
    occupancyRate: 91.0,
    monthlyRevenue: 45600,
    pendingMaintenance: 12,
    upcomingCheckouts: 5
  };

  const recentActivity = [
    { id: 1, type: "assignment" as const, message: "Stallion Storm assigned to Stall A-15", time: "2 hours ago" },
    { id: 2, type: "maintenance" as const, message: "Routine cleaning completed for Building B", time: "4 hours ago" },
    { id: 3, type: "checkout" as const, message: "Mare Luna checked out from Paddock C-03", time: "6 hours ago" },
    { id: 4, type: "maintenance" as const, message: "Emergency repair scheduled for Stall A-08", time: "8 hours ago" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Quarterly facility inspection", date: "Tomorrow", type: "inspection" },
    { id: 2, title: "Paddock C renovation starts", date: "Next Monday", type: "maintenance" },
    { id: 3, title: "New equipment delivery", date: "Next Friday", type: "delivery" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <StableMetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status Overview */}
        <RoomStatusOverview metrics={metrics} />

        {/* Recent Activity */}
        <RecentActivityPanel activities={recentActivity} />
      </div>

      {/* Quick Actions and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActionsPanel />
        <UpcomingEventsPanel events={upcomingEvents} />
      </div>
    </div>
  );
};

export default StableRoomsDashboard;
