
import EnhancedFeaturesHighlight from "./dashboard/EnhancedFeaturesHighlight";
import BreedingKeyMetrics from "./dashboard/BreedingKeyMetrics";
import BreedingRecentActivity from "./dashboard/BreedingRecentActivity";
import BreedingUpcomingEvents from "./dashboard/BreedingUpcomingEvents";
import BreedingPregnancyProgress from "./dashboard/BreedingPregnancyProgress";

const BreedingDashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalStallions: 8,
    activeStallions: 6,
    totalMares: 25,
    pregnantMares: 7,
    expectedFoals: 7,
    totalBookings: 12,
    successRate: 85.5,
  };

  const recentActivity = [
    {
      id: 1,
      type: "breeding",
      message: "Breeding completed: Thunder × Lightning",
      date: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "pregnancy",
      message: "Pregnancy confirmed: Bella (Day 18)",
      date: "1 day ago",
      status: "success",
    },
    {
      id: 3,
      type: "booking",
      message: "New booking request: Storm × Aurora",
      date: "2 days ago",
      status: "pending",
    },
    {
      id: 4,
      type: "birth",
      message: "Foal born: Whisper's colt",
      date: "3 days ago",
      status: "success",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      type: "due_date",
      title: "Expected Foaling",
      horse: "Bella",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      type: "checkup",
      title: "Pregnancy Checkup",
      horse: "Luna",
      date: "2024-01-10",
      priority: "medium",
    },
    {
      id: 3,
      type: "breeding",
      title: "Scheduled Breeding",
      horse: "Thunder × Storm",
      date: "2024-01-08",
      priority: "medium",
    },
  ];

  const pregnancies = [
    {
      name: "Bella",
      currentDay: 280,
      totalDays: 340,
      expectedDate: "Jan 15, 2024",
    },
    {
      name: "Luna",
      currentDay: 180,
      totalDays: 340,
      expectedDate: "Mar 20, 2024",
    },
    {
      name: "Aurora",
      currentDay: 45,
      totalDays: 340,
      expectedDate: "Sep 15, 2024",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Features Highlight */}
      <EnhancedFeaturesHighlight />

      {/* Key Metrics */}
      <BreedingKeyMetrics stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <BreedingRecentActivity activities={recentActivity} />

        {/* Upcoming Events */}
        <BreedingUpcomingEvents events={upcomingEvents} />

        {/* Pregnancy Progress */}
        <BreedingPregnancyProgress pregnancies={pregnancies} />
      </div>
    </div>
  );
};

export default BreedingDashboard;
