
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Zap, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Mock horse data - replace with actual API call
const mockHorses = [
  {
    id: "horse-001",
    name: "Thunderbolt",
    breed: "Arabian",
    gender: "stallion" as const,
    age: 8,
    ownerName: "Available",
    registrationNumber: "AR-001",
    status: "active" as const
  },
  {
    id: "horse-002", 
    name: "Moonlight",
    breed: "Thoroughbred",
    gender: "mare" as const,
    age: 6,
    ownerName: "Available",
    registrationNumber: "TB-002",
    status: "active" as const
  },
  {
    id: "horse-003",
    name: "Storm",
    breed: "Quarter Horse",
    gender: "gelding" as const,
    age: 12,
    ownerName: "Available", 
    registrationNumber: "QH-003",
    status: "active" as const
  },
  {
    id: "horse-004",
    name: "Star",
    breed: "Arabian",
    gender: "mare" as const,
    age: 4,
    ownerName: "Available",
    registrationNumber: "AR-004",
    status: "active" as const
  }
];

interface Horse {
  id: string;
  name: string;
  breed: string;
  gender: 'stallion' | 'mare' | 'gelding';
  age: number;
  ownerName: string;
  registrationNumber: string;
  status: string;
}

interface ExistingHorseSelectorProps {
  onHorseSelect: (horse: Horse) => void;
  excludeHorseIds: string[];
}

const ExistingHorseSelector = ({ onHorseSelect, excludeHorseIds }: ExistingHorseSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [horses, setHorses] = useState<Horse[]>([]);
  const [filteredHorses, setFilteredHorses] = useState<Horse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch horses
    setIsLoading(true);
    setTimeout(() => {
      setHorses(mockHorses);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const filtered = horses.filter(horse => {
      const matchesSearch = searchTerm === "" || 
        horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        horse.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        horse.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const notExcluded = !excludeHorseIds.includes(horse.id);
      
      return matchesSearch && notExcluded;
    });

    setFilteredHorses(filtered);
  }, [searchTerm, horses, excludeHorseIds]);

  const handleHorseSelect = (horse: Horse) => {
    onHorseSelect(horse);
    toast.success(`${horse.name} has been linked to this client`);
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'stallion': return 'bg-blue-100 text-blue-800';
      case 'mare': return 'bg-pink-100 text-pink-800';
      case 'gelding': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="horse-search">Search Horses</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="horse-search"
            placeholder="Search by name, breed, or registration number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading horses...</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredHorses.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500">
                  <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    {searchTerm ? "No horses found matching your search" : "No available horses to link"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredHorses.map((horse) => (
              <Card key={horse.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{horse.name}</h4>
                        <Badge variant="outline" className={getGenderColor(horse.gender)}>
                          {horse.gender}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {horse.breed} • {horse.age} years old
                      </p>
                      <p className="text-xs text-gray-500">
                        Registration: {horse.registrationNumber}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleHorseSelect(horse)}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Link Horse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ExistingHorseSelector;
