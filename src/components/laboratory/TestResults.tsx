
import { useState } from "react";
import TestResultsHeader from "./test-results/TestResultsHeader";
import TestResultsStats from "./test-results/TestResultsStats";
import TestResultsTable from "./test-results/TestResultsTable";

const TestResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock test results data
  const testResults = [
    {
      id: "TR001",
      sampleId: "S001",
      horseName: "Thunder",
      testType: "Complete Blood Count",
      completedDate: "2024-06-03",
      status: "normal",
      technician: "Lab Tech A",
      reviewedBy: "Dr. Smith",
      findings: "All parameters within normal ranges",
      values: [
        { parameter: "White Blood Cells", value: "6.5", unit: "x10³/μL", reference: "5.0-10.0", status: "normal" },
        { parameter: "Red Blood Cells", value: "8.2", unit: "x10⁶/μL", reference: "6.5-12.0", status: "normal" },
        { parameter: "Hemoglobin", value: "14.5", unit: "g/dL", reference: "11.0-18.0", status: "normal" }
      ]
    },
    {
      id: "TR002",
      sampleId: "S002",
      horseName: "Bella",
      testType: "Urinalysis",
      completedDate: "2024-06-02",
      status: "abnormal",
      technician: "Lab Tech B",
      reviewedBy: "Dr. Johnson",
      findings: "Elevated protein levels detected",
      values: [
        { parameter: "Protein", value: "150", unit: "mg/dL", reference: "0-30", status: "high" },
        { parameter: "Glucose", value: "Negative", unit: "", reference: "Negative", status: "normal" },
        { parameter: "Specific Gravity", value: "1.025", unit: "", reference: "1.020-1.050", status: "normal" }
      ]
    },
    {
      id: "TR003",
      sampleId: "S003",
      horseName: "Shadow",
      testType: "Parasite Screening",
      completedDate: "2024-06-05",
      status: "normal",
      technician: "Lab Tech C",
      reviewedBy: "Dr. Brown",
      findings: "No parasites detected",
      values: [
        { parameter: "Strongyles", value: "Negative", unit: "", reference: "Negative", status: "normal" },
        { parameter: "Roundworms", value: "Negative", unit: "", reference: "Negative", status: "normal" },
        { parameter: "Tapeworms", value: "Negative", unit: "", reference: "Negative", status: "normal" }
      ]
    }
  ];

  const filteredResults = testResults.filter(result => {
    const matchesSearch = result.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <TestResultsHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <TestResultsStats />

      <TestResultsTable results={filteredResults} />
    </div>
  );
};

export default TestResults;
