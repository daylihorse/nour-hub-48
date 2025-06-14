
import ChartBarChart from "@/components/ui/charts/BarChart";

const DailyScheduleChart = () => {
  const dailySchedule = [
    { time: "08:00", appointments: 8, capacity: 10 },
    { time: "10:00", appointments: 12, capacity: 12 },
    { time: "12:00", appointments: 6, capacity: 8 },
    { time: "14:00", appointments: 10, capacity: 12 },
    { time: "16:00", appointments: 9, capacity: 10 },
    { time: "18:00", appointments: 4, capacity: 6 },
  ];

  const chartConfig = {
    appointments: { label: "Scheduled", color: "#8884d8" },
    capacity: { label: "Capacity", color: "#82ca9d" },
  };

  return (
    <ChartBarChart
      title="Today's Schedule Capacity"
      data={dailySchedule}
      dataKey="appointments"
      xAxisKey="time"
      fill="#8884d8"
      config={chartConfig}
    />
  );
};

export default DailyScheduleChart;
