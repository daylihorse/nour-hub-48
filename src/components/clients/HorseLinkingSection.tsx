
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Plus, Search, CheckCircle, AlertCircle } from "lucide-react";
import ExistingHorseSelector from "./ExistingHorseSelector";
import QuickHorseForm from "./QuickHorseForm";

interface LinkedHorse {
  id: string;
  name: string;
  breed: string;
  gender: 'stallion' | 'mare' | 'gelding';
  age?: number;
  isComplete: boolean;
  status: 'active' | 'incomplete';
}

interface HorseLinkingSectionProps {
  linkedHorses: LinkedHorse[];
  onAddExistingHorse: (horse: LinkedHorse) => void;
  onAddNewHorse: (horse: Omit<LinkedHorse, 'id' | 'isComplete' | 'status'>) => void;
  onRemoveHorse: (horseId: string) => void;
}

const HorseLinkingSection = ({
  linkedHorses = [],
  onAddExistingHorse,
  onAddNewHorse,
  onRemoveHorse
}: HorseLinkingSectionProps) => {
  const [activeTab, setActiveTab] = useState("existing");

  const handleExistingHorseSelect = (horse: any) => {
    const linkedHorse: LinkedHorse = {
      id: horse.id,
      name: horse.name,
      breed: horse.breed,
      gender: horse.gender,
      age: horse.age,
      isComplete: true,
      status: 'active'
    };
    onAddExistingHorse(linkedHorse);
  };

  const handleNewHorseAdd = (horseData: { name: string; breed: string; gender: 'stallion' | 'mare' | 'gelding'; age?: number }) => {
    onAddNewHorse(horseData);
  };

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-600" />
          Horse Management
          <Badge variant="secondary" className="ml-2">
            {linkedHorses.length} horse{linkedHorses.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Linked Horses */}
        {linkedHorses.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Linked Horses:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {linkedHorses.map((horse) => (
                <div
                  key={horse.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    {horse.isComplete ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{horse.name}</p>
                      <p className="text-xs text-gray-500">
                        {horse.breed} • {horse.gender}
                        {horse.age && ` • ${horse.age} years`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={horse.isComplete ? "default" : "secondary"}
                      className={horse.isComplete ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                    >
                      {horse.isComplete ? "Complete" : "Incomplete"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveHorse(horse.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Horse Options */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Link Existing Horse
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Horse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="mt-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Search and select horses that are already registered in the system.
              </p>
              <ExistingHorseSelector
                onHorseSelect={handleExistingHorseSelect}
                excludeHorseIds={linkedHorses.map(h => h.id)}
              />
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Add basic horse information. The full registration can be completed later in the Horse Department.
              </p>
              <QuickHorseForm onHorseAdd={handleNewHorseAdd} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HorseLinkingSection;
