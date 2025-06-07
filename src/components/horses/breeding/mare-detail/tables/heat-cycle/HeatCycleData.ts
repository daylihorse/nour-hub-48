
export const mockHeatCycles = [
  {
    id: "HC001",
    title: "Heat Cycle - Strong Intensity",
    startDate: "2023-06-01",
    date: "2023-06-01",
    endDate: "2023-06-07",
    duration: 6,
    intensity: "Strong",
    breedingWindow: "2023-06-03 - 2023-06-05",
    bred: true,
    status: "Completed",
    notes: "Optimal breeding window utilized",
    details: {
      "Duration": "6 days",
      "Intensity": "Strong",
      "Breeding Window": "2023-06-03 - 2023-06-05",
      "Bred": "Yes"
    }
  },
  {
    id: "HC002",
    title: "Heat Cycle - Moderate Intensity",
    startDate: "2023-04-15",
    date: "2023-04-15",
    endDate: "2023-04-20",
    duration: 5,
    intensity: "Moderate",
    breedingWindow: "2023-04-17 - 2023-04-19",
    bred: false,
    status: "Completed",
    notes: "Mare not bred during this cycle",
    details: {
      "Duration": "5 days",
      "Intensity": "Moderate",
      "Breeding Window": "2023-04-17 - 2023-04-19",
      "Bred": "No"
    }
  },
  {
    id: "HC003",
    title: "Heat Cycle - Strong Intensity",
    startDate: "2023-03-01",
    date: "2023-03-01",
    endDate: "2023-03-06",
    duration: 5,
    intensity: "Strong",
    breedingWindow: "2023-03-03 - 2023-03-05",
    bred: false,
    status: "Completed",
    notes: "Stallion not available during optimal window",
    details: {
      "Duration": "5 days",
      "Intensity": "Strong",
      "Breeding Window": "2023-03-03 - 2023-03-05",
      "Bred": "No"
    }
  }
];

export const heatCycleStatistics = [
  { value: "21", label: "Average Cycle (days)", color: "blue" },
  { value: "5.3", label: "Average Duration", color: "green" },
  { value: "1", label: "Successful Breedings", color: "purple" },
  { value: "N/A", label: "Next Expected", color: "orange" }
];
