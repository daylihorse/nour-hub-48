import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, MapPin, Users, Calendar, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePaddockData } from "@/hooks/usePaddockData";
import PaddockGridView from "./components/PaddockGridView";
import PaddockListView from "./components/PaddockListView";
import PaddockTableView from "./components/PaddockTableView";
import PaddockViewSelector, { ViewMode } from "./components/PaddockViewSelector";
import AddPaddockDialog from "./components/AddPaddockDialog";
import PaddockFilters from "./components/PaddockFilters";
import PaddockStats from "./components/PaddockStats";
import { Paddock, PaddockStatus, PaddockType } from "@/types/paddocks";

const PaddockManagement = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaddockStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<PaddockType | "all">("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { paddocks, loading, error, addPaddock, updatePaddock, deletePaddock } = usePaddockData();

  const filteredPaddocks = paddocks.filter((paddock: Paddock) => {
    const matchesSearch = paddock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paddock.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || paddock.status === statusFilter;
    const matchesType = typeFilter === "all" || paddock.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddPaddock = async (paddockData: Partial<Paddock>) => {
    try {
      await addPaddock(paddockData);
      setShowAddDialog(false);
    } catch (error) {
      console.error("Error adding paddock:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading paddocks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-destructive">
          <p>Error loading paddocks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Paddock Management</h2>
          <p className="text-muted-foreground">Manage paddocks, assignments, and utilization</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Paddock
        </Button>
      </div>

      {/* Stats */}
      <PaddockStats paddocks={paddocks} />

      {/* Search and Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search paddocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={(value: PaddockStatus | "all") => setStatusFilter(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={(value: PaddockType | "all") => setTypeFilter(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="grazing">Grazing</SelectItem>
            <SelectItem value="exercise">Exercise</SelectItem>
            <SelectItem value="turnout">Turnout</SelectItem>
            <SelectItem value="breeding">Breeding</SelectItem>
            <SelectItem value="quarantine">Quarantine</SelectItem>
            <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>

        <PaddockViewSelector
          currentView={viewMode}
          onViewChange={setViewMode}
        />
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle>Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <PaddockFilters />
          </CardContent>
        </Card>
      )}

      {/* Content */}
      <div className="space-y-4">
        {viewMode === "grid" && (
          <PaddockGridView
            paddocks={filteredPaddocks}
            onEdit={updatePaddock}
            onDelete={deletePaddock}
          />
        )}
        
        {viewMode === "list" && (
          <PaddockListView
            paddocks={filteredPaddocks}
            onEdit={updatePaddock}
            onDelete={deletePaddock}
          />
        )}
        
        {viewMode === "table" && (
          <PaddockTableView
            paddocks={filteredPaddocks}
            onEdit={updatePaddock}
            onDelete={deletePaddock}
          />
        )}

        {filteredPaddocks.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Paddocks Found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                  ? "No paddocks match your current filters."
                  : "Get started by adding your first paddock."}
              </p>
              {!searchQuery && statusFilter === "all" && typeFilter === "all" && (
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Paddock
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialogs */}
      <AddPaddockDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAddPaddock}
      />
    </div>
  );
};

export default PaddockManagement;