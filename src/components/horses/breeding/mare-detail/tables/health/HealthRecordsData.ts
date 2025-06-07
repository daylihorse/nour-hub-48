
export const mockHealthRecords = [
  {
    id: "HR001",
    title: "Pregnancy Checkup",
    date: "2024-03-01",
    type: "Pregnancy Checkup",
    veterinarian: "Dr. Sarah Ahmed",
    findings: "Healthy pregnancy progression",
    treatment: "Prenatal vitamins",
    nextAppointment: "2024-04-01",
    status: "Normal",
    details: {
      "Type": "Pregnancy Checkup",
      "Veterinarian": "Dr. Sarah Ahmed",
      "Treatment": "Prenatal vitamins",
      "Next Appointment": "2024-04-01"
    }
  },
  {
    id: "HR002",
    title: "Annual Vaccination",
    date: "2024-01-15",
    type: "Vaccination",
    veterinarian: "Dr. Michael Roberts",
    findings: "Annual vaccinations administered",
    treatment: "EHV, WNV, Tetanus vaccines",
    nextAppointment: "2025-01-15",
    status: "Completed",
    details: {
      "Type": "Vaccination",
      "Veterinarian": "Dr. Michael Roberts",
      "Treatment": "EHV, WNV, Tetanus vaccines",
      "Next Appointment": "2025-01-15"
    }
  },
  {
    id: "HR003",
    title: "Dental Checkup",
    date: "2023-12-10",
    type: "Dental Checkup",
    veterinarian: "Dr. Sarah Ahmed",
    findings: "Minor dental wear, no issues",
    treatment: "Routine dental float",
    nextAppointment: "2024-12-10",
    status: "Normal",
    details: {
      "Type": "Dental Checkup",
      "Veterinarian": "Dr. Sarah Ahmed",
      "Treatment": "Routine dental float",
      "Next Appointment": "2024-12-10"
    }
  }
];

export const healthStatistics = [
  { value: "3", label: "Total Records", color: "green" },
  { value: "1", label: "Recent Checkups", color: "blue" },
  { value: "2", label: "Vaccinations", color: "purple" },
  { value: "0", label: "Pending Follow-ups", color: "orange" }
];
