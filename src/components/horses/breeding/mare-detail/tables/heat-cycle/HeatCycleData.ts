
export const mockHeatCycles = [
  {
    id: "1",
    title: "December 2023 Cycle",
    date: "2023-12-10",
    startDate: "2023-12-10",
    endDate: "2023-12-15",
    duration: 5,
    intensity: "Strong",
    breedingWindow: "Dec 12-14",
    bred: false,
    status: "Completed",
    notes: "Normal cycle, not bred"
  },
  {
    id: "2",
    title: "July 2023 Cycle",
    date: "2023-07-18",
    startDate: "2023-07-18",
    endDate: "2023-07-22",
    duration: 4,
    intensity: "Strong",
    breedingWindow: "Jul 20-21",
    bred: true,
    status: "Bred",
    notes: "Bred with Thunder Storm on July 20"
  }
];

export const heatCycleStatistics = [
  {
    title: "Total Cycles",
    value: "2",
    description: "Recorded cycles",
    trend: "+100%"
  },
  {
    title: "Average Duration",
    value: "4.5 days",
    description: "Cycle length",
    trend: "Normal"
  },
  {
    title: "Breeding Success",
    value: "50%",
    description: "Cycles bred",
    trend: "Good"
  },
  {
    title: "Last Cycle",
    value: "Dec 2023",
    description: "Most recent",
    trend: "Regular"
  }
];
