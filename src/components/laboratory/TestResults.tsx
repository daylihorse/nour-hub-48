
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import TestResultsHeader from "./test-results/TestResultsHeader";
import TestResultsStats from "./test-results/TestResultsStats";
import EnhancedTestResultsTable from "./test-results/EnhancedTestResultsTable";
import AddTestResultDialog from "./test-results/AddTestResultDialog";
import { getEnhancedTestResults } from "./test-results/utils/enhancedTestResultsData";

const TestResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const allResults = getEnhancedTestResults();

  const filteredResults = allResults.filter(result => {
    const matchesSearch = result.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Test Results</h2>
          <p className="text-muted-foreground">
            Showing {filteredResults.length} of {allResults.length} test results
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Register New Result
            </Button>
          </DialogTrigger>
          <AddTestResultDialog 
            isOpen={isAddDialogOpen}
            setIsOpen={setIsAddDialogOpen}
          />
        </Dialog>
      </div>

      <TestResultsHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <TestResultsStats />

      <EnhancedTestResultsTable results={filteredResults} />
    </div>
  );
};

export default TestResults;
