
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, FileText, BarChart3, Award, Dna } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PedigreeHeader from "./components/PedigreeHeader";
import AddHorseDialog from "./components/AddHorseDialog";
import PedigreeGridView from "./components/PedigreeGridView";
import PedigreeListView from "./components/PedigreeListView";
import PedigreeTreeVisualization from "../breeding/pedigree/PedigreeTreeVisualization";

interface Horse {
  id: string;
  name: string;
  breed: string;
  gender: 'stallion' | 'mare' | 'gelding';
  birthDate: string;
  sire?: string;
  dam?: string;
  offspring: number;
  pedigreeComplete: boolean;
  achievements?: string[];
}

const PedigreeManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Enhanced mock horses data
  const horses: Horse[] = [
    {
      id: "1",
      name: "Thunder Storm",
      breed: "Arabian",
      gender: "stallion",
      birthDate: "2018-03-15",
      sire: "Lightning Bolt",
      dam: "Storm Cloud",
      offspring: 12,
      pedigreeComplete: true,
      achievements: ["Regional Champion", "Best Bloodline"]
    },
    {
      id: "2",
      name: "Mystic Moon",
      breed: "Arabian",
      gender: "mare",
      birthDate: "2019-07-22",
      sire: "Desert King",
      dam: "Moon Dancer",
      offspring: 8,
      pedigreeComplete: true,
      achievements: ["Top Producer", "Excellence Award"]
    },
    {
      id: "3",
      name: "Golden Dawn",
      breed: "Thoroughbred",
      gender: "mare",
      birthDate: "2020-04-10",
      sire: "Sunrise Glory",
      dam: "Golden Queen",
      offspring: 3,
      pedigreeComplete: false,
      achievements: ["Young Horse Champion"]
    },
    {
      id: "4",
      name: "Royal Prince",
      breed: "Arabian",
      gender: "stallion",
      birthDate: "2017-11-08",
      sire: "King's Glory",
      dam: "Royal Lady",
      offspring: 18,
      pedigreeComplete: true,
      achievements: ["National Champion", "Hall of Fame", "Top Sire"]
    }
  ];

  const filteredHorses = horses.filter(horse =>
    horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    horse.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (horse.sire && horse.sire.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (horse.dam && horse.dam.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedHorseData = horses.find(horse => horse.id === selectedHorse);

  const handleAddNewHorse = () => {
    navigate('/dashboard/horses', { 
      state: { 
        activeTab: 'horses',
        showAddForm: true 
      } 
    });
  };

  const handleSelectExistingHorse = (horseId: string) => {
    console.log('Adding existing horse to pedigree system:', horseId);
    // TODO: Implement adding existing horse to pedigree system
  };

  const handleViewPedigree = (horseId: string) => {
    setSelectedHorse(horseId);
    setActiveTab("tree");
  };

  const handleEditHorse = (horseId: string) => {
    console.log('Edit horse:', horseId);
    // TODO: Implement horse editing
  };

  const handleGenerateCertificate = (horseId: string) => {
    console.log('Generate certificate for horse:', horseId);
    // TODO: Implement certificate generation
  };

  const handleExport = () => {
    console.log('Export pedigree data');
    // TODO: Implement export functionality
  };

  const handleFilter = () => {
    console.log('Open filter dialog');
    // TODO: Implement filter dialog
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tree">Pedigree Tree</TabsTrigger>
          <TabsTrigger value="lineage">Lineage Analysis</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            <PedigreeHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onAddHorse={() => setShowAddDialog(true)}
              onExport={handleExport}
              onFilter={handleFilter}
            />

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Horses</p>
                      <p className="text-2xl font-bold">{horses.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Complete Pedigrees</p>
                      <p className="text-2xl font-bold">
                        {horses.filter(h => h.pedigreeComplete).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Stallions</p>
                      <p className="text-2xl font-bold">
                        {horses.filter(h => h.gender === 'stallion').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Offspring</p>
                      <p className="text-2xl font-bold">
                        {horses.reduce((sum, h) => sum + h.offspring, 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Horses Display */}
            {viewMode === 'grid' ? (
              <PedigreeGridView
                horses={filteredHorses}
                onViewPedigree={handleViewPedigree}
                onEditHorse={handleEditHorse}
                onGenerateCertificate={handleGenerateCertificate}
              />
            ) : (
              <PedigreeListView
                horses={filteredHorses}
                onViewPedigree={handleViewPedigree}
                onEditHorse={handleEditHorse}
                onGenerateCertificate={handleGenerateCertificate}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="tree" className="mt-6">
          <div className="space-y-6">
            {/* Horse Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Pedigree Tree Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <label htmlFor="horse-select" className="text-sm font-medium">
                    Select Horse:
                  </label>
                  <select 
                    id="horse-select"
                    value={selectedHorse || ""}
                    onChange={(e) => setSelectedHorse(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="">Choose a horse...</option>
                    {horses.map(horse => (
                      <option key={horse.id} value={horse.id}>
                        {horse.name} ({horse.breed})
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Pedigree Tree */}
            {selectedHorse && selectedHorseData ? (
              <PedigreeTreeVisualization 
                horseId={selectedHorse}
                horseName={selectedHorseData.name}
              />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <GitBranch className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Horse</h3>
                  <p className="text-muted-foreground">
                    Choose a horse from the dropdown above to view its pedigree tree
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="lineage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5" />
                Lineage Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Lineage Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Genetic diversity analysis, inbreeding coefficients, and lineage strength metrics
              </p>
              <Button>
                Run Analysis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Pedigree Certificates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Generate Pedigree Certificates</h3>
              <p className="text-muted-foreground mb-4">
                Create official pedigree certificates for registration and breeding purposes
              </p>
              <div className="flex gap-3 justify-center">
                <Button>
                  Generate Certificate
                </Button>
                <Button variant="outline">
                  View Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Pedigree Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Comprehensive Pedigree Reports</h3>
              <p className="text-muted-foreground mb-4">
                Detailed analytics on bloodlines, breeding success rates, and genetic diversity
              </p>
              <div className="flex gap-3 justify-center">
                <Button>
                  Generate Report
                </Button>
                <Button variant="outline">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Horse Dialog */}
      <AddHorseDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddNew={handleAddNewHorse}
        onSelectExisting={handleSelectExistingHorse}
      />
    </div>
  );
};

export default PedigreeManagement;
