
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Calendar, Baby, Heart, AlertTriangle } from "lucide-react";
import PregnancyGridView from "./components/PregnancyGridView";
import PregnancyListView from "./components/PregnancyListView";
import PregnancyTableView from "./components/PregnancyTableView";
import ViewSelector from "./components/ViewSelector";
import AddPregnancyDialog from "./AddPregnancyDialog";
import UltrasoundDialog from "./UltrasoundDialog";
import VetCheckupDialog from "./VetCheckupDialog";
import { usePregnancyManagement } from "./hooks/usePregnancyManagement";

const PregnancyManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    showAddDialog,
    setShowAddDialog,
    showUltrasoundDialog,
    setShowUltrasoundDialog,
    showCheckupDialog,
    setShowCheckupDialog,
    selectedPregnancy,
    setSelectedPregnancy,
    filteredPregnancies,
    stats,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  } = usePregnancyManagement();

  const handleScheduleUltrasound = (pregnancyId: string) => {
    setSelectedPregnancy(pregnancyId);
    setShowUltrasoundDialog(true);
  };

  const handleScheduleCheckup = (pregnancyId: string) => {
    setSelectedPregnancy(pregnancyId);
    setShowCheckupDialog(true);
  };

  const renderView = () => {
    const commonProps = {
      pregnancies: filteredPregnancies,
      onScheduleUltrasound: handleScheduleUltrasound,
      onScheduleCheckup: handleScheduleCheckup,
      onEditPregnancy: (pregnancyId: string) => console.log('Edit pregnancy:', pregnancyId),
    };

    switch (viewMode) {
      case "grid":
        return <PregnancyGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <PregnancyListView {...commonProps} />;
      case "table":
        return <PregnancyTableView {...commonProps} />;
      default:
        return <PregnancyGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Pregnancy Tracking</h2>
          <p className="text-muted-foreground">Monitor pregnancies and veterinary care</p>
        </div>
        <div className="flex items-center gap-4">
          <ViewSelector 
            currentView={viewMode}
            onViewChange={setViewMode}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />
          <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Pregnancy
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Baby className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Pregnancies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{stats.monitoring}</div>
            <p className="text-sm text-muted-foreground">Monitoring</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{stats.delivered}</div>
            <p className="text-sm text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search pregnancies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === "confirmed" ? "default" : "outline"}
                onClick={() => setStatusFilter("confirmed")}
              >
                Confirmed
              </Button>
              <Button 
                variant={statusFilter === "monitoring" ? "default" : "outline"}
                onClick={() => setStatusFilter("monitoring")}
              >
                Monitoring
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pregnancy Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Pregnancies</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          {renderView()}
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pregnancy History</h3>
              <p className="text-muted-foreground">
                Historical pregnancy records and outcomes
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
              <p className="text-muted-foreground">
                Visual calendar showing due dates and checkups
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddPregnancyDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
      
      <UltrasoundDialog 
        open={showUltrasoundDialog} 
        onOpenChange={setShowUltrasoundDialog}
        pregnancyId={selectedPregnancy}
      />
      
      <VetCheckupDialog 
        open={showCheckupDialog} 
        onOpenChange={setShowCheckupDialog}
        pregnancyId={selectedPregnancy}
      />
    </div>
  );
};

export default PregnancyManagement;
