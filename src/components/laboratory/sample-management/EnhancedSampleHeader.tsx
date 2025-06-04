
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, Download, Calendar } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import EnhancedAddSampleDialog from "./EnhancedAddSampleDialog";

interface EnhancedSampleHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  dateRangeFilter: { start?: Date; end?: Date };
  setDateRangeFilter: (range: { start?: Date; end?: Date }) => void;
  analysisFilter: string;
  setAnalysisFilter: (analysis: string) => void;
  totalSamples: number;
  filteredCount: number;
}

const EnhancedSampleHeader = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  dateRangeFilter,
  setDateRangeFilter,
  analysisFilter,
  setAnalysisFilter,
  totalSamples,
  filteredCount
}: EnhancedSampleHeaderProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setAnalysisFilter("all");
    setDateRangeFilter({});
  };

  const activeFiltersCount = [
    searchTerm,
    statusFilter !== "all" ? statusFilter : null,
    priorityFilter !== "all" ? priorityFilter : null,
    analysisFilter !== "all" ? analysisFilter : null,
    dateRangeFilter.start || dateRangeFilter.end ? "date" : null
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Main header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sample Management</h2>
          <p className="text-muted-foreground">
            Showing {filteredCount} of {totalSamples} samples
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
              </Badge>
            )}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Sample
              </Button>
            </DialogTrigger>
            <EnhancedAddSampleDialog 
              isOpen={isAddDialogOpen}
              setIsOpen={setIsAddDialogOpen}
            />
          </Dialog>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by sample ID, horse name, or person..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="collected">Collected</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="routine">Routine</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={analysisFilter} onValueChange={setAnalysisFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Analysis Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Analysis</SelectItem>
              <SelectItem value="Blood Chemistry">Blood Chemistry</SelectItem>
              <SelectItem value="CBC">CBC</SelectItem>
              <SelectItem value="Urinalysis">Urinalysis</SelectItem>
              <SelectItem value="Parasite Screen">Parasite Screen</SelectItem>
              <SelectItem value="Drug Screen">Drug Screen</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1">
            <DatePicker
              date={dateRangeFilter.start}
              onDateChange={(date) => setDateRangeFilter({ ...dateRangeFilter, start: date })}
              placeholder="Start date"
            />
            <DatePicker
              date={dateRangeFilter.end}
              onDateChange={(date) => setDateRangeFilter({ ...dateRangeFilter, end: date })}
              placeholder="End date"
            />
          </div>

          {activeFiltersCount > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSampleHeader;
