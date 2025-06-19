import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, ArrowLeft, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EnglishAddHorseForm from "./EnglishAddHorseForm";
import HorseDetailsView from "./HorseDetailsView";
import HorseViewSelector, { ViewMode, GridSize } from "./components/HorseViewSelector";
import HorseGridView from "./components/HorseGridView";
import HorseListView from "./components/HorseListView";
import HorseTableView from "./components/HorseTableView";
import { HorseFormData } from "@/types/horse-unified";
import { useToast } from "@/hooks/use-toast";
import { getClientById } from "@/data/clients";

interface HorseManagementProps {
  clientId?: string | null;
}

const HorseManagement = ({ clientId }: HorseManagementProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showHorseDetails, setShowHorseDetails] = useState(false);
  const [showHorseEdit, setShowHorseEdit] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  // Handle navigation state from breeding management
  useEffect(() => {
    if (location.state?.showAddForm) {
      setShowAddForm(true);
    }
  }, [location.state]);

  console.log("HorseManagement rendering, showAddForm:", showAddForm, "clientId:", clientId);

  // Enhanced mock data for existing horses with owner information and horse images
  const allHorses = [
    {
      id: "1",
      name: "Thunder",
      breed: "Arabian",
      gender: "stallion" as const,
      owner: "John Smith",
      ownerId: "client-001",
      status: "active",
      age: 8,
      registrationNumber: "AR-001",
      image: "/api/placeholder/200/200" // Placeholder horse image
    },
    {
      id: "2", 
      name: "Lightning",
      breed: "Thoroughbred",
      gender: "mare" as const,
      owner: "John Smith",
      ownerId: "client-001",
      status: "active",
      age: 6,
      registrationNumber: "TB-002",
      image: "/api/placeholder/200/200" // Placeholder horse image
    },
    {
      id: "3",
      name: "Storm",
      breed: "Quarter Horse",
      gender: "gelding" as const,
      owner: "John Smith",
      ownerId: "client-001",
      status: "active",
      age: 12,
      registrationNumber: "QH-003",
      image: "/api/placeholder/200/200" // Placeholder horse image
    },
    {
      id: "4",
      name: "Moonlight",
      breed: "Arabian",
      gender: "mare" as const,
      owner: "Sarah Williams", 
      ownerId: "client-003",
      status: "active",
      age: 5,
      registrationNumber: "AR-004",
      image: "/api/placeholder/200/200" // Placeholder horse image
    },
    {
      id: "5",
      name: "Spirit",
      breed: "Mustang",
      gender: "stallion" as const,
      owner: "Sarah Williams",
      ownerId: "client-003",
      status: "active",
      age: 7,
      registrationNumber: "MS-005",
      image: "/api/placeholder/200/200" // Placeholder horse image
    },
    {
      id: "6",
      name: "Starlight",
      breed: "Arabian",
      gender: "mare" as const,
      owner: "Lisa Martinez",
      ownerId: "client-007",
      status: "active",
      age: 4,
      registrationNumber: "AR-006",
      image: "/api/placeholder/200/200" // Placeholder horse image
    },
    {
      id: "7",
      name: "Phoenix",
      breed: "Thoroughbred",
      gender: "stallion" as const,
      owner: "Lisa Martinez",
      ownerId: "client-007",
      status: "active",
      age: 9,
      registrationNumber: "TB-007",
      image: "/api/placeholder/200/200" // Placeholder horse image
    }
  ];

  // Filter horses based on clientId if provided
  const horses = clientId 
    ? allHorses.filter(horse => horse.ownerId === clientId)
    : allHorses;

  // Get client name from actual client data
  const client = clientId ? getClientById(clientId) : null;
  const clientName = client?.name || "Unknown Client";

  const filteredHorses = horses.filter(horse =>
    horse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    horse.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    horse.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveHorse = (data: HorseFormData) => {
    try {
      // Here you would typically save to a database
      console.log("Saving horse data:", data);
      
      toast({
        title: "Success!",
        description: `${data.name} has been registered successfully and added to the breeding program.`,
      });
      
      setShowAddForm(false);
    } catch (error) {
      console.error("Error saving horse:", error);
      toast({
        title: "Error",
        description: "Failed to register horse. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelAdd = () => {
    console.log("Canceling add horse form");
    setShowAddForm(false);
  };

  const handleAddNewHorse = () => {
    console.log("Add new horse button clicked");
    setShowAddForm(true);
  };

  const handleBackToAllHorses = () => {
    navigate("/dashboard/horses");
  };

  const handleViewDetails = (horse: any) => {
    setSelectedHorse(horse);
    setShowHorseDetails(true);
  };

  const handleEditHorse = (horse: any) => {
    setSelectedHorse(horse);
    setShowHorseEdit(true);
  };

  const handleBackToList = () => {
    setShowHorseDetails(false);
    setShowHorseEdit(false);
    setSelectedHorse(null);
  };

  const handleSaveEdit = (data: HorseFormData) => {
    console.log("Saving edited horse data:", data);
    toast({
      title: "Success!",
      description: `${data.name} has been updated successfully.`,
    });
    setShowHorseEdit(false);
    setSelectedHorse(null);
  };

  // Convert horse data to HorseFormData format for editing
  const convertHorseToFormData = (horse: any): HorseFormData => {
    return {
      name: horse.name || "",
      arabicName: horse.arabicName || "",
      breed: horse.breed || "",
      gender: horse.gender || "mare",
      ageClass: horse.ageClass || "",
      adultMaleType: horse.adultMaleType || undefined,
      castrationDate: horse.castrationDate || "",
      isPregnant: horse.isPregnant || undefined,
      pregnancyDuration: horse.pregnancyDuration || undefined,
      color: horse.color || "",
      height: horse.height || undefined,
      weight: horse.weight || undefined,
      birthDate: horse.birthDate || "",
      ownerType: horse.ownerType || "individual",
      ownerName: horse.owner || "",
      ownerContact: horse.ownerContact || "",
      registrationNumber: horse.registrationNumber || "",
      passportNumber: horse.passportNumber || "",
      microchipId: horse.microchipId || "",
      sire: horse.sire || "",
      dam: horse.dam || "",
      bloodlineOrigin: horse.bloodlineOrigin || "",
      healthStatus: horse.healthStatus || "healthy",
      vaccinationStatus: horse.vaccinationStatus || "up_to_date",
      lastVetCheckup: horse.lastVetCheckup || "",
      medicalConditions: horse.medicalConditions || "",
      allergies: horse.allergies || "",
      trainingLevel: horse.trainingLevel || "",
      disciplines: horse.disciplines || "",
      competitionHistory: horse.competitionHistory || "",
      achievements: horse.achievements || "",
      stallNumber: horse.stallNumber || "",
      feedingSchedule: horse.feedingSchedule || "",
      exerciseRoutine: horse.exerciseRoutine || "",
      specialNeeds: horse.specialNeeds || "",
      insured: horse.insured || false,
      insuranceProvider: horse.insuranceProvider || "",
      insuranceValue: horse.insuranceValue || undefined,
      purchasePrice: horse.purchasePrice || undefined,
      marketValue: horse.marketValue || undefined,
      images: horse.images || [],
      documents: horse.documents || [],
      status: horse.status || "active",
    };
  };

  // Render different views based on viewMode
  const renderHorsesView = () => {
    const viewProps = {
      horses: filteredHorses,
      onViewDetails: handleViewDetails,
      onEdit: handleEditHorse,
      clientId,
    };

    switch (viewMode) {
      case "grid":
        return <HorseGridView {...viewProps} gridSize={gridSize} />;
      case "list":
        return <HorseListView {...viewProps} />;
      case "table":
        return <HorseTableView {...viewProps} />;
      default:
        return <HorseGridView {...viewProps} gridSize={gridSize} />;
    }
  };

  if (showAddForm) {
    console.log("Rendering EnglishAddHorseForm...");
    return (
      <EnglishAddHorseForm 
        onSave={handleSaveHorse}
        onCancel={handleCancelAdd}
      />
    );
  }

  if (showHorseDetails && selectedHorse) {
    return (
      <HorseDetailsView
        horse={selectedHorse}
        onBack={handleBackToList}
        onEdit={() => {
          setShowHorseDetails(false);
          setShowHorseEdit(true);
        }}
      />
    );
  }

  if (showHorseEdit && selectedHorse) {
    const editData = convertHorseToFormData(selectedHorse);
    return (
      <EnglishAddHorseForm
        editData={editData}
        onSave={handleSaveEdit}
        onCancel={() => {
          setShowHorseEdit(false);
          setShowHorseDetails(true);
        }}
      />
    );
  }

  console.log("Rendering horse list view...");

  return (
    <div className="space-y-6">
      {/* Client Filter Notice */}
      {clientId && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Viewing horses for {clientName}</h3>
                  <p className="text-sm text-blue-700">
                    Showing {filteredHorses.length} horse{filteredHorses.length !== 1 ? 's' : ''} owned by this client
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleBackToAllHorses}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                View All Horses
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {clientId ? `${clientName}'s Horses` : "Horse Registry"}
          </h2>
          <p className="text-muted-foreground">
            {clientId ? `Manage horses owned by ${clientName}` : "Manage all horses in the stable"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <HorseViewSelector 
            currentView={viewMode} 
            onViewChange={setViewMode}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />
          <Button 
            onClick={handleAddNewHorse}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Horse
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search horses by name, breed, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredHorses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              {searchQuery ? (
                <p>No horses found matching "{searchQuery}"</p>
              ) : clientId ? (
                <p>{clientName} doesn't have any horses registered yet.</p>
              ) : (
                <p>No horses found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredHorses.length} of {horses.length} horses
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* Dynamic Horse View */}
          {renderHorsesView()}
        </>
      )}
    </div>
  );
};

export default HorseManagement;
