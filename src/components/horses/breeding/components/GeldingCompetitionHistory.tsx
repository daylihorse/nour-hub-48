
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Calendar, MapPin, Plus } from "lucide-react";

const mockCompetitions = [
  {
    id: "comp-1",
    geldingName: "Thunder Strike",
    eventName: "Arabian Horse Championship",
    date: "2023-11-15",
    location: "Kentucky Horse Park",
    discipline: "Halter",
    placement: 1,
    award: "Champion",
    points: 25,
    notes: "Outstanding performance in conformation class"
  },
  {
    id: "comp-2",
    geldingName: "Midnight Runner",
    eventName: "Regional Dressage Competition",
    date: "2023-10-20",
    location: "Wellington Equestrian Center",
    discipline: "Dressage",
    placement: 3,
    award: "Third Place",
    points: 15,
    notes: "Excellent test scores, minor deductions for rhythm"
  },
  {
    id: "comp-3",
    geldingName: "Golden Flash",
    eventName: "Quarter Horse Congress",
    date: "2023-09-08",
    location: "Ohio Expo Center",
    discipline: "Western Pleasure",
    placement: 2,
    award: "Reserve Champion",
    points: 20,
    notes: "Consistent performance throughout the class"
  }
];

const GeldingCompetitionHistory = () => {
  const getPlacementIcon = (placement: number) => {
    switch (placement) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Award className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPlacementColor = (placement: number) => {
    switch (placement) {
      case 1:
        return "bg-yellow-100 text-yellow-800";
      case 2:
        return "bg-gray-100 text-gray-800";
      case 3:
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Competition History</h2>
          <p className="text-gray-600">Track gelding competition results and achievements</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Competition Result
        </Button>
      </div>

      {/* Competition Cards */}
      <div className="grid gap-6">
        {mockCompetitions.map((competition) => (
          <Card key={competition.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getPlacementIcon(competition.placement)}
                  <div>
                    <CardTitle className="text-lg">{competition.eventName}</CardTitle>
                    <p className="text-sm text-gray-600 font-medium">{competition.geldingName}</p>
                  </div>
                </div>
                <Badge className={getPlacementColor(competition.placement)}>
                  {competition.award}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{competition.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{competition.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{competition.discipline}</Badge>
                  <span className="text-sm font-medium text-blue-600">{competition.points} pts</span>
                </div>
              </div>
              {competition.notes && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{competition.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1</div>
            <div className="text-sm text-gray-600">Championships</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Medal className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1</div>
            <div className="text-sm text-gray-600">Reserve Championships</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1</div>
            <div className="text-sm text-gray-600">Third Place</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mx-auto mb-2">60</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeldingCompetitionHistory;
