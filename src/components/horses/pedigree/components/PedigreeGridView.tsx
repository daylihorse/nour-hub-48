
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Heart, Baby } from "lucide-react";

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
  image?: string;
}

interface PedigreeGridViewProps {
  horses: Horse[];
  onViewPedigree: (horseId: string) => void;
  onEditHorse: (horseId: string) => void;
  onGenerateCertificate: (horseId: string) => void;
}

const PedigreeGridView = ({ horses, onViewPedigree, onEditHorse, onGenerateCertificate }: PedigreeGridViewProps) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {horses.map((horse) => (
        <Card key={horse.id} className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{horse.name}</CardTitle>
              <div className="flex gap-2">
                <Badge className={getGenderColor(horse.gender)}>
                  {horse.gender}
                </Badge>
                <Badge variant={horse.pedigreeComplete ? 'default' : 'secondary'}>
                  {horse.pedigreeComplete ? 'Complete' : 'Incomplete'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Horse Image Placeholder */}
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Horse Photo</span>
            </div>

            {/* Basic Info */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Breed:</span>
                <span className="font-medium">{horse.breed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium">{calculateAge(horse.birthDate)} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Birth Date:</span>
                <span className="font-medium">{new Date(horse.birthDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Pedigree Info */}
            {(horse.sire || horse.dam) && (
              <div className="space-y-2 text-sm">
                <h4 className="font-semibold flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Lineage
                </h4>
                {horse.sire && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sire:</span>
                    <span className="font-medium">{horse.sire}</span>
                  </div>
                )}
                {horse.dam && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dam:</span>
                    <span className="font-medium">{horse.dam}</span>
                  </div>
                )}
              </div>
            )}

            {/* Offspring Info */}
            {horse.offspring > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Baby className="h-4 w-4" />
                  Offspring:
                </span>
                <span className="font-bold text-lg">{horse.offspring}</span>
              </div>
            )}

            {/* Achievements */}
            {horse.achievements && horse.achievements.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Achievements</h4>
                <div className="flex flex-wrap gap-1">
                  {horse.achievements.slice(0, 2).map((achievement, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {achievement}
                    </Badge>
                  ))}
                  {horse.achievements.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{horse.achievements.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onViewPedigree(horse.id)}
              >
                View Tree
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onGenerateCertificate(horse.id)}
              >
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PedigreeGridView;
