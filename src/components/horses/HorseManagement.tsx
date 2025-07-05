
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import HorseGridView from "./components/HorseGridView";
import HorseListView from "./components/HorseListView";
import HorseTableView from "./components/HorseTableView";
import HorseViewSelector from "./components/HorseViewSelector";
import EnhancedAddHorseForm from "./EnhancedAddHorseForm";
import HorseDetailsView from "./details/HorseDetailsView";

interface HorseManagementProps {
  clientId?: string | null;
}

const HorseManagement = ({ clientId }: HorseManagementProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if we're in a sub-route (horse details)
  const isDetailsView = location.pathname.includes('/horses/') && location.pathname.split('/').length > 2;

  useEffect(() => {
    if (clientId) {
      console.log(`Filtering horses for client: ${clientId}`);
      toast({
        title: "Client Filter Applied",
        description: `Showing horses for selected client`,
      });
    }
  }, [clientId, toast]);

  const handleAddHorse = () => {
    setShowAddForm(true);
  };

  const handleViewDetails = (horseId: string) => {
    navigate(`/horses/${horseId}`);
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your horse data is being exported...",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Feature",
      description: "Import functionality will be available soon.",
    });
  };

  // If showing details view, render the nested route
  if (isDetailsView) {
    return (
      <Routes>
        <Route path=":horseId" element={<HorseDetailsView />} />
      </Routes>
    );
  }

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Horse</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowAddForm(false)}
          >
            Back to Horses
          </Button>
        </div>
        <EnhancedAddHorseForm 
          onCancel={() => setShowAddForm(false)} 
          onSave={(data) => {
            console.log('Enhanced horse data saved:', data);
            setShowAddForm(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Horse Registry</h2>
          <p className="text-muted-foreground">
            Manage and track all horses in your facility
            {clientId && " (filtered by client)"}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleAddHorse}>
            <Plus className="h-4 w-4 mr-2" />
            Add Horse
          </Button>
        </div>
      </div>

      {/* View Controls */}
        <div className="flex items-center justify-between">
          <HorseViewSelector 
            currentView={viewMode} 
            onViewChange={setViewMode}
          />
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list' | 'table')}>
        <TabsContent value="grid">
          <HorseGridView onViewDetails={handleViewDetails} />
        </TabsContent>
        <TabsContent value="list">
          <HorseListView 
            horses={[]} 
            onViewDetails={(horse) => handleViewDetails(horse.id)} 
            onEdit={(horse) => console.log('Edit horse:', horse)}
          />
        </TabsContent>
        <TabsContent value="table">
          <HorseTableView 
            horses={[]} 
            onViewDetails={(horse) => handleViewDetails(horse.id)} 
            onEdit={(horse) => console.log('Edit horse:', horse)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HorseManagement;
