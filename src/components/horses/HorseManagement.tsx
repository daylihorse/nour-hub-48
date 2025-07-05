
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { HorseFormData } from "@/types/horse-unified";
import HorseGridView from "./components/HorseGridView";
import HorseListView from "./components/HorseListView";
import HorseTableView from "./components/HorseTableView";
import HorseViewSelector from "./components/HorseViewSelector";
import AddHorseForm from "./AddHorseForm";
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

  const handleSaveHorse = async (data: HorseFormData) => {
    try {
      console.log("Saving horse:", data);
      toast({
        title: "Success",
        description: "Horse registered successfully!",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error saving horse:", error);
      toast({
        title: "Error",
        description: "Failed to save horse. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewHorse = (horseId: string) => {
    navigate(`/horses/${horseId}`);
  };

  const handleEditHorse = (horseId: string) => {
    console.log("Edit horse:", horseId);
    toast({
      title: "Edit Horse",
      description: "Edit functionality coming soon!",
    });
  };

  const handleDeleteHorse = (horseId: string) => {
    console.log("Delete horse:", horseId);
    toast({
      title: "Delete Horse",
      description: "Delete functionality coming soon!",
      variant: "destructive",
    });
  };

  if (isDetailsView) {
    return (
      <Routes>
        <Route path=":horseId" element={<HorseDetailsView />} />
      </Routes>
    );
  }

  if (showAddForm) {
    return (
      <AddHorseForm
        onSave={handleSaveHorse}
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Horse Management</h1>
          <p className="text-muted-foreground">
            Manage your stable's horses and their information
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Horse
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Horses</TabsTrigger>
            <TabsTrigger value="stallions">Stallions</TabsTrigger>
            <TabsTrigger value="mares">Mares</TabsTrigger>
            <TabsTrigger value="foals">Foals</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <HorseViewSelector 
              currentView={viewMode} 
              onViewChange={setViewMode} 
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          {viewMode === 'grid' && (
            <HorseGridView
              onViewHorse={handleViewHorse}
              onEditHorse={handleEditHorse}
              onDeleteHorse={handleDeleteHorse}
            />
          )}
          {viewMode === 'list' && (
            <HorseListView
              onViewHorse={handleViewHorse}
              onEditHorse={handleEditHorse}
              onDeleteHorse={handleDeleteHorse}
            />
          )}
          {viewMode === 'table' && (
            <HorseTableView
              onViewHorse={handleViewHorse}
              onEditHorse={handleEditHorse}
              onDeleteHorse={handleDeleteHorse}
            />
          )}
        </TabsContent>

        <TabsContent value="stallions" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Stallion management coming soon!</p>
          </div>
        </TabsContent>

        <TabsContent value="mares" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Mare management coming soon!</p>
          </div>
        </TabsContent>

        <TabsContent value="foals" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Foal management coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HorseManagement;
