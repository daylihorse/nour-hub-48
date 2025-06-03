
import { useState } from "react";
import SampleHeader from "./sample-management/SampleHeader";
import SampleStats from "./sample-management/SampleStats";
import SampleTable from "./sample-management/SampleTable";

const SampleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock sample data
  const samples = [
    {
      id: "S001",
      horseId: "H001",
      horseName: "Thunder",
      sampleType: "Blood",
      collectionDate: "2024-06-01",
      collectedBy: "Dr. Smith",
      status: "collected",
      priority: "routine",
      notes: "Regular health check"
    },
    {
      id: "S002",
      horseId: "H002",
      horseName: "Bella",
      sampleType: "Urine",
      collectionDate: "2024-06-02",
      collectedBy: "Dr. Johnson",
      status: "processing",
      priority: "urgent",
      notes: "Follow-up test"
    },
    {
      id: "S003",
      horseId: "H003",
      horseName: "Shadow",
      sampleType: "Fecal",
      collectionDate: "2024-06-03",
      collectedBy: "Dr. Brown",
      status: "completed",
      priority: "routine",
      notes: "Parasite screening"
    }
  ];

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = sample.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sample.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <SampleHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <SampleStats />

      <SampleTable samples={filteredSamples} />
    </div>
  );
};

export default SampleManagement;
