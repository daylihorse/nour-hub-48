import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import EnglishAddHorseForm from "./EnglishAddHorseForm";
import { HorseFormData } from "@/types/horse";
import { useToast } from "@/hooks/use-toast";

const HorseManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  console.log("HorseManagement rendering, showAddForm:", showAddForm);

  // Mock data for existing horses
  const horses = [
    {
      id: "1",
      name: "Thunder",
      breed: "Arabian",
      gender: "stallion",
      owner: "John Smith",
      status: "active"
    },
    {
      id: "2", 
      name: "Lightning",
      breed: "Thoroughbred",
      gender: "mare",
      owner: "Sarah Johnson",
      status: "active"
    }
  ];

  const handleSaveHorse = async (data: HorseFormData) => {
    try {
      // Here you would typically save to a database
      console.log("Saving horse data:", data);
      
      toast({
        title: "Success!",
        description: `${data.name} has been registered successfully.`,
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

  if (showAddForm) {
    console.log("Rendering EnglishAddHorseForm...");
    return (
      <EnglishAddHorseForm 
        onSave={handleSaveHorse}
        onCancel={handleCancelAdd}
      />
    );
  }

  console.log("Rendering horse list view...");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Horse Registry</h2>
          <p className="text-muted-foreground">Manage all horses in the stable</p>
        </div>
        <Button 
          onClick={handleAddNewHorse}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Horse
        </Button>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Horse List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {horses.map((horse) => (
          <Card key={horse.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{horse.name}</span>
                <span className="text-sm font-normal text-muted-foreground capitalize">
                  {horse.gender}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Breed:</span>
                  <span>{horse.breed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Owner:</span>
                  <span>{horse.owner}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="capitalize">{horse.status}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HorseManagement;
