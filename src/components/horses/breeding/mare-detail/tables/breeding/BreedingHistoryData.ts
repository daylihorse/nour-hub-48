
export const mockBreedingHistory = [
  {
    id: "BH001",
    title: "Breeding with Thunder Storm",
    date: "2023-07-20",
    stallion: "Thunder Storm",
    method: "Natural",
    veterinarian: "Dr. Sarah Ahmed",
    result: "Pregnant",
    status: "Pregnant",
    notes: "Successful breeding, mare responded well",
    cost: "$2,500",
    season: "2023",
    cycle: "Second heat",
    details: {
      "Method": "Natural",
      "Veterinarian": "Dr. Sarah Ahmed",
      "Cost": "$2,500",
      "Season": "2023"
    }
  },
  {
    id: "BH002",
    title: "Breeding with Golden Thunder",
    date: "2022-05-15",
    stallion: "Golden Thunder",
    method: "AI",
    veterinarian: "Dr. Michael Roberts",
    result: "Live Foal",
    status: "Completed",
    notes: "Excellent breeding, produced healthy colt",
    cost: "$3,000",
    season: "2022",
    cycle: "First heat",
    details: {
      "Method": "AI",
      "Veterinarian": "Dr. Michael Roberts",
      "Cost": "$3,000",
      "Season": "2022"
    }
  },
  {
    id: "BH003",
    title: "Breeding with Silver Knight",
    date: "2021-06-10",
    stallion: "Silver Knight",
    method: "Natural",
    veterinarian: "Dr. Sarah Ahmed",
    result: "Live Foal",
    status: "Completed",
    notes: "Standard breeding procedure, healthy filly born",
    cost: "$2,800",
    season: "2021",
    cycle: "Third heat",
    details: {
      "Method": "Natural",
      "Veterinarian": "Dr. Sarah Ahmed",
      "Cost": "$2,800",
      "Season": "2021"
    }
  },
  {
    id: "BH004",
    title: "Breeding with Desert Wind",
    date: "2020-04-22",
    stallion: "Desert Wind",
    method: "AI",
    veterinarian: "Dr. James Wilson",
    result: "Failed",
    status: "Failed",
    notes: "Mare did not conceive, will retry next cycle",
    cost: "$2,200",
    season: "2020",
    cycle: "First heat",
    details: {
      "Method": "AI",
      "Veterinarian": "Dr. James Wilson",
      "Cost": "$2,200",
      "Season": "2020"
    }
  }
];

export const breedingStatistics = [
  { value: "3", label: "Successful Breedings", color: "green" },
  { value: "1", label: "Currently Pregnant", color: "blue" },
  { value: "1", label: "Failed Attempts", color: "red" },
  { value: "75%", label: "Success Rate", color: "purple" }
];
