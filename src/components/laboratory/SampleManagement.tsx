import { useState } from "react";
import EnhancedSampleHeader from "./sample-management/EnhancedSampleHeader";
import SampleStats from "./sample-management/SampleStats";
import EnhancedSampleTable from "./sample-management/EnhancedSampleTable";
import { getEnhancedSamples, EnhancedSample } from "./sample-management/utils/enhancedMockData";

const SampleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [analysisFilter, setAnalysisFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState<{ start?: Date; end?: Date }>({});
  const [samples, setSamples] = useState<EnhancedSample[]>(getEnhancedSamples());

  const handleSampleUpdate = (updatedSample: EnhancedSample) => {
    setSamples(prevSamples => 
      prevSamples.map(sample => 
        sample.id === updatedSample.id ? updatedSample : sample
      )
    );
  };

  const filteredSamples = samples.filter((sample: EnhancedSample) => {
    // Search filter
    const matchesSearch = 
      sample.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.personWhoBrought.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.collectedBy.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === "all" || sample.status === statusFilter;

    // Priority filter
    const matchesPriority = priorityFilter === "all" || sample.priority === priorityFilter;

    // Analysis filter
    const matchesAnalysis = analysisFilter === "all" || 
      sample.requiredAnalysis.some(analysis => analysis.includes(analysisFilter));

    // Date range filter
    let matchesDateRange = true;
    if (dateRangeFilter.start || dateRangeFilter.end) {
      const sampleDate = new Date(sample.collectionDate);
      if (dateRangeFilter.start && sampleDate < dateRangeFilter.start) {
        matchesDateRange = false;
      }
      if (dateRangeFilter.end && sampleDate > dateRangeFilter.end) {
        matchesDateRange = false;
      }
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesAnalysis && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      <EnhancedSampleHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        analysisFilter={analysisFilter}
        setAnalysisFilter={setAnalysisFilter}
        totalSamples={samples.length}
        filteredCount={filteredSamples.length}
      />

      <SampleStats />

      <EnhancedSampleTable 
        samples={filteredSamples} 
        onSampleUpdate={handleSampleUpdate}
      />
    </div>
  );
};

export default SampleManagement;
