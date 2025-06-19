
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, TestTube } from "lucide-react";

interface HorseSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onHorseSelect: (horseId: string, horseName: string) => void;
}

const HorseSelectionDialog = ({ isOpen, onClose, onHorseSelect }: HorseSelectionDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - would come from API
  const horses = [
    {
      id: "H001",
      name: "Thunder",
      photo: "/placeholder.svg",
      lastTest: "2024-06-03",
      totalTests: 12,
      recentTests: ["Complete Blood Count", "Blood Chemistry", "Urinalysis"]
    },
    {
      id: "H002", 
      name: "Bella",
      photo: "/placeholder.svg",
      lastTest: "2024-06-02",
      totalTests: 8,
      recentTests: ["Urinalysis", "Parasite Screening", "Liver Function"]
    },
    {
      id: "H003",
      name: "Shadow",
      photo: "/placeholder.svg", 
      lastTest: "2024-06-05",
      totalTests: 15,
      recentTests: ["Parasite Screening", "Complete Blood Count", "Thyroid Panel"]
    },
    {
      id: "H004",
      name: "Lightning",
      photo: "/placeholder.svg",
      lastTest: "2024-05-28",
      totalTests: 6,
      recentTests: ["Blood Chemistry", "Drug Screen", "Kidney Function"]
    },
    {
      id: "H005",
      name: "Spirit",
      photo: "/placeholder.svg",
      lastTest: "2024-06-01",
      totalTests: 10,
      recentTests: ["Complete Blood Count", "Urinalysis", "Blood Chemistry"]
    }
  ];

  const filteredHorses = horses.filter(horse =>
    horse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Horse for Analysis</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search horses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHorses.map((horse) => (
              <div
                key={horse.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onHorseSelect(horse.id, horse.name)}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={horse.photo} alt={horse.name} />
                    <AvatarFallback>{horse.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{horse.name}</h3>
                      <Badge variant="outline">{horse.totalTests} tests</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Last test: {horse.lastTest}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <TestTube className="h-4 w-4" />
                        <span className="font-medium">Recent tests:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {horse.recentTests.slice(0, 2).map((test, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {test}
                          </Badge>
                        ))}
                        {horse.recentTests.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{horse.recentTests.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHorses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No horses found matching your search criteria
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HorseSelectionDialog;
