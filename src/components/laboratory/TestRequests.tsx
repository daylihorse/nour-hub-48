
import { useState } from "react";
import TestRequestHeader from "./test-requests/TestRequestHeader";
import TestRequestStats from "./test-requests/TestRequestStats";
import TestRequestTable from "./test-requests/TestRequestTable";

const TestRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock test request data
  const testRequests = [
    {
      id: "TR001",
      sampleId: "S001",
      horseName: "Thunder",
      testType: "Complete Blood Count",
      requestedBy: "Dr. Smith",
      requestDate: "2024-06-01",
      priority: "routine",
      status: "pending",
      estimatedCompletion: "2024-06-03",
      notes: "Annual health check"
    },
    {
      id: "TR002",
      sampleId: "S002",
      horseName: "Bella",
      testType: "Urinalysis",
      requestedBy: "Dr. Johnson",
      requestDate: "2024-06-02",
      priority: "urgent",
      status: "in-progress",
      estimatedCompletion: "2024-06-02",
      notes: "Kidney function assessment"
    },
    {
      id: "TR003",
      sampleId: "S003",
      horseName: "Shadow",
      testType: "Parasite Screening",
      requestedBy: "Dr. Brown",
      requestDate: "2024-06-03",
      priority: "routine",
      status: "completed",
      estimatedCompletion: "2024-06-05",
      notes: "Routine parasite check"
    }
  ];

  const filteredRequests = testRequests.filter(request => {
    const matchesSearch = request.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <TestRequestHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <TestRequestStats />

      <TestRequestTable requests={filteredRequests} />
    </div>
  );
};

export default TestRequests;
