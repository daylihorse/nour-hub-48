
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, GitBranch, FileText, BarChart3 } from "lucide-react";
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
}

const PedigreeManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);

  // Mock horses data
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
      pedigreeComplete: true
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
      pedigreeComplete: true
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
      pedigreeComplete: false
    }
  ];

  const filteredHorses = horses.filter(horse =>
    horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    horse.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Pedigree Management</h1>
        <p className="text-muted-foreground">
          Comprehensive lineage tracking and breeding history analysis
        </p>
      </div>

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
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search horses by name or breed..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Horse
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <GitBranch className="h-8 w-8 text-orange-600" />
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

            {/* Horses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHorses.map((horse) => (
                <Card key={horse.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedHorse(horse.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{horse.name}</CardTitle>
                      <Badge variant={horse.pedigreeComplete ? 'default' : 'secondary'}>
                        {horse.pedigreeComplete ? 'Complete' : 'Incomplete'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Breed:</span>
                        <span>{horse.breed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gender:</span>
                        <span className="capitalize">{horse.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Birth Date:</span>
                        <span>{horse.birthDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Offspring:</span>
                        <span>{horse.offspring}</span>
                      </div>
                      {horse.sire && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sire:</span>
                          <span>{horse.sire}</span>
                        </div>
                      )}
                      {horse.dam && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dam:</span>
                          <span>{horse.dam}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
            {selectedHorse ? (
              <PedigreeTreeVisualization />
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
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Lineage Analysis</h3>
              <p className="text-muted-foreground">
                Advanced lineage analysis and genetic tracking tools
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pedigree Certificates</h3>
              <p className="text-muted-foreground">
                Generate and manage official pedigree certificates
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pedigree Reports</h3>
              <p className="text-muted-foreground">
                Comprehensive reports and analytics on lineage data
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PedigreeManagement;
