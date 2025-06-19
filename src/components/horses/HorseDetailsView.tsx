import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, FileText, Heart, User, Calendar, Activity, Trophy, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HorseDetailsViewProps {
  horse: {
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: number;
    owner: string;
    ownerId: string;
    status: string;
    registrationNumber: string;
  };
  onBack: () => void;
  onEdit: () => void;
}

const HorseDetailsView = ({ horse, onBack, onEdit }: HorseDetailsViewProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock additional data that would come from API
  const horseDetails = {
    ...horse,
    height: "15.2 hands",
    weight: "450 kg",
    color: "Bay",
    birthDate: "2018-03-15",
    microchipId: "985112345678901",
    passportNumber: "UAE-2018-0047",
    sire: "Golden Thunder",
    dam: "Silver Moon",
    bloodlineOrigin: "Egyptian Arabian",
    location: "Stable Block A, Stall 12",
    insuranceValue: "$50,000",
    healthStatus: "Excellent",
    lastVetCheckup: "2024-01-15",
    vaccinations: [
      { name: "Influenza", date: "2024-01-15", nextDue: "2024-07-15" },
      { name: "Tetanus", date: "2024-01-15", nextDue: "2024-07-15" },
      { name: "EHV", date: "2024-01-15", nextDue: "2024-07-15" }
    ],
    trainingLevel: "Advanced",
    disciplines: ["Dressage", "Show Jumping"],
    achievements: [
      "Regional Champion 2023",
      "Best Bloodline Award 2022"
    ],
    medicalHistory: [
      { date: "2024-01-15", type: "Routine Checkup", vet: "Dr. Johnson", notes: "All clear" },
      { date: "2023-11-20", type: "Dental Care", vet: "Dr. Smith", notes: "Teeth cleaned and checked" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'stallion': return 'bg-blue-100 text-blue-800';
      case 'mare': return 'bg-pink-100 text-pink-800';
      case 'gelding': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Registry
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{horseDetails.name}</h1>
            <p className="text-muted-foreground">Registration: {horseDetails.registrationNumber}</p>
          </div>
        </div>
        <Button onClick={onEdit} className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Horse
        </Button>
      </div>

      {/* Basic Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Breed & Gender</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{horseDetails.breed}</span>
                  <Badge variant="outline" className={getGenderColor(horseDetails.gender)}>
                    {horseDetails.gender}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{horseDetails.age} years old</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Health Status</p>
                <Badge className="bg-green-100 text-green-800">
                  {horseDetails.healthStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Activity className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(horseDetails.status)}>
                  {horseDetails.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="pedigree">Pedigree</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{horseDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Breed:</span>
                  <span>{horseDetails.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="capitalize">{horseDetails.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Birth Date:</span>
                  <span>{horseDetails.birthDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color:</span>
                  <span>{horseDetails.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height:</span>
                  <span>{horseDetails.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span>{horseDetails.weight}</span>
                </div>
              </CardContent>
            </Card>

            {/* Identification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Identification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration #:</span>
                  <span className="font-medium">{horseDetails.registrationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passport #:</span>
                  <span>{horseDetails.passportNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Microchip ID:</span>
                  <span>{horseDetails.microchipId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner:</span>
                  <span>{horseDetails.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{horseDetails.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insurance Value:</span>
                  <span className="font-medium text-green-600">{horseDetails.insuranceValue}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Health Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Health Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall Status:</span>
                  <Badge className="bg-green-100 text-green-800">{horseDetails.healthStatus}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Checkup:</span>
                  <span>{horseDetails.lastVetCheckup}</span>
                </div>
              </CardContent>
            </Card>

            {/* Vaccinations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Vaccinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {horseDetails.vaccinations.map((vaccination, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{vaccination.name}</p>
                        <p className="text-sm text-muted-foreground">Given: {vaccination.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Next due:</p>
                        <p className="text-sm font-medium">{vaccination.nextDue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pedigree" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pedigree Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sire (Father)</p>
                  <p className="font-medium text-lg">{horseDetails.sire}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dam (Mother)</p>
                  <p className="font-medium text-lg">{horseDetails.dam}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bloodline Origin</p>
                <p className="font-medium">{horseDetails.bloodlineOrigin}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Training Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Training Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Training Level:</span>
                  <Badge className="bg-blue-100 text-blue-800">{horseDetails.trainingLevel}</Badge>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2">Disciplines:</p>
                  <div className="flex gap-2">
                    {horseDetails.disciplines.map((discipline, index) => (
                      <Badge key={index} variant="outline">{discipline}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {horseDetails.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Document management system coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HorseDetailsView; 