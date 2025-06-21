
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePaddockService } from "@/hooks/usePaddockService";
import PaddockGridView from "./components/PaddockGridView";
import PaddockListView from "./components/PaddockListView";
import PaddockTableView from "./components/PaddockTableView";
import PaddockViewSelector from "./components/PaddockViewSelector";
import AddPaddockDialog from "./components/AddPaddockDialog";
import PaddockHorseAssignment from "./PaddockHorseAssignment";

const PaddockManagement = () => {
  const { usePaddocks } = usePaddockService();
  const { data: paddocks = [], isLoading } = usePaddocks();
  
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid");
  const [showAddDialog, setShowAddDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading paddocks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="paddocks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paddocks">Manage Paddocks</TabsTrigger>
          <TabsTrigger value="assignments">Horse Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="paddocks" className="space-y-4">
          {/* Header with actions */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Paddock Management</h2>
              <p className="text-muted-foreground">Manage your paddocks and grazing areas</p>
            </div>
            <div className="flex items-center gap-2">
              <PaddockViewSelector viewMode={viewMode} onViewModeChange={setViewMode} />
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Paddock
              </Button>
            </div>
          </div>

          {/* Paddock Views */}
          {viewMode === "grid" && <PaddockGridView paddocks={paddocks} />}
          {viewMode === "list" && <PaddockListView paddocks={paddocks} />}
          {viewMode === "table" && <PaddockTableView paddocks={paddocks} />}
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-4">
          <PaddockHorseAssignment />
        </TabsContent>
      </Tabs>

      <AddPaddockDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default PaddockManagement;
