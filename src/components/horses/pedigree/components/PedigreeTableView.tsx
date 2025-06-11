
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, FileText, GitBranch } from "lucide-react";

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

interface PedigreeTableViewProps {
  horses: Horse[];
  onViewPedigree: (horseId: string) => void;
  onEditHorse: (horseId: string) => void;
  onGenerateCertificate: (horseId: string) => void;
}

const PedigreeTableView = ({ 
  horses, 
  onViewPedigree, 
  onEditHorse, 
  onGenerateCertificate 
}: PedigreeTableViewProps) => {
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
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-700">Horse</th>
                <th className="text-left p-4 font-semibold text-slate-700">Gender</th>
                <th className="text-left p-4 font-semibold text-slate-700">Breed</th>
                <th className="text-left p-4 font-semibold text-slate-700">Age</th>
                <th className="text-left p-4 font-semibold text-slate-700">Pedigree</th>
                <th className="text-left p-4 font-semibold text-slate-700">Lineage</th>
                <th className="text-left p-4 font-semibold text-slate-700">Offspring</th>
                <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {horses.map((horse, index) => (
                <tr
                  key={horse.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    index !== horses.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-slate-800">{horse.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Born: {new Date(horse.birthDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={`${getGenderColor(horse.gender)} text-white`}>
                      {horse.gender}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-700">{horse.breed}</td>
                  <td className="p-4 text-slate-700">{calculateAge(horse.birthDate)} years</td>
                  <td className="p-4">
                    <Badge variant={horse.pedigreeComplete ? 'default' : 'secondary'}>
                      {horse.pedigreeComplete ? 'Complete' : 'Incomplete'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {horse.sire && (
                        <div className="text-blue-600">Sire: {horse.sire}</div>
                      )}
                      {horse.dam && (
                        <div className="text-pink-600">Dam: {horse.dam}</div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-green-600">{horse.offspring}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewPedigree(horse.id)}
                        className="h-8 w-8 p-0"
                      >
                        <GitBranch className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditHorse(horse.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onGenerateCertificate(horse.id)}
                        className="h-8 w-8 p-0"
                      >
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PedigreeTableView;
