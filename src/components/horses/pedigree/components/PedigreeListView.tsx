
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Heart, Baby, Calendar } from "lucide-react";

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

interface PedigreeListViewProps {
  horses: Horse[];
  onViewPedigree: (horseId: string) => void;
  onEditHorse: (horseId: string) => void;
  onGenerateCertificate: (horseId: string) => void;
}

const PedigreeListView = ({ horses, onViewPedigree, onEditHorse, onGenerateCertificate }: PedigreeListViewProps) => {
  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'stallion': return 'bg-blue-500';
      case 'mare': return 'bg-pink-500';
      case 'gelding': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return age;
  };

  return (
    <div className="space-y-4">
      {horses.map((horse) => (
        <Card key={horse.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {/* Left Side - Main Info */}
              <div className="flex items-center gap-6">
                {/* Horse Avatar */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Photo</span>
                </div>

                {/* Basic Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{horse.name}</h3>
                    <Badge className={getGenderColor(horse.gender)}>
                      {horse.gender}
                    </Badge>
                    <Badge variant={horse.pedigreeComplete ? 'default' : 'secondary'}>
                      {horse.pedigreeComplete ? 'Complete' : 'Incomplete'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>{horse.breed}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {calculateAge(horse.birthDate)} years old
                    </span>
                    {horse.offspring > 0 && (
                      <span className="flex items-center gap-1">
                        <Baby className="h-4 w-4" />
                        {horse.offspring} offspring
                      </span>
                    )}
                  </div>

                  {/* Lineage */}
                  {(horse.sire || horse.dam) && (
                    <div className="flex items-center gap-4 text-sm">
                      <Heart className="h-4 w-4 text-red-500" />
                      <div className="flex gap-4">
                        {horse.sire && (
                          <span>
                            <span className="text-muted-foreground">Sire:</span> {horse.sire}
                          </span>
                        )}
                        {horse.dam && (
                          <span>
                            <span className="text-muted-foreground">Dam:</span> {horse.dam}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Actions */}
              <div className="flex items-center gap-3">
                {/* Achievements */}
                {horse.achievements && horse.achievements.length > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Achievements</p>
                    <div className="flex gap-1 justify-end">
                      {horse.achievements.slice(0, 2).map((achievement, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {achievement.length > 10 ? achievement.substring(0, 10) + '...' : achievement}
                        </Badge>
                      ))}
                      {horse.achievements.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{horse.achievements.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewPedigree(horse.id)}
                  >
                    View Pedigree
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditHorse(horse.id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onGenerateCertificate(horse.id)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PedigreeListView;
