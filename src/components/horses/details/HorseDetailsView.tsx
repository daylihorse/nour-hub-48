
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DynamicHorseDetailTabs from "./DynamicHorseDetailTabs";
import AgeDisplay from "../form-components/AgeDisplay";
import { HorseGender } from "@/types/horse-unified";

// Mock horse data - in a real app, this would come from your data store
const mockHorse = {
  id: "1",
  name: "Thunder Storm",
  arabicName: "عاصفة الرعد",
  breed: "Arabian",
  gender: "stallion" as HorseGender,
  birthDate: "2018-05-15",
  color: "Bay",
  height: 15.2,
  weight: 1200,
  status: "active",
  ownerName: "Elite Equestrian Center",
  registrationNumber: "AHR-2018-001234",
  microchipId: "985112001234567"
};

const HorseDetailsView = () => {
  const { horseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("training");
  const [horse, setHorse] = useState(mockHorse);

  useEffect(() => {
    // In a real app, fetch horse data based on horseId
    console.log("Fetching horse details for ID:", horseId);
    
    // Set default tab based on horse gender
    switch (horse.gender) {
      case 'stallion':
        setActiveTab('collected-semen');
        break;
      case 'mare':
        setActiveTab('breeding-history');
        break;
      case 'gelding':
        setActiveTab('training');
        break;
      default:
        setActiveTab('training');
    }
  }, [horseId, horse.gender]);

  const handleBackToHorses = () => {
    navigate('/horses');
  };

  const handleActionClick = (action: string, title: string, data?: any) => {
    console.log('Action clicked:', action, title, data);
    // Handle action clicks (e.g., open dialogs, navigate, etc.)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'transferred':
        return 'bg-blue-100 text-blue-800';
      case 'deceased':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGenderColor = (gender: HorseGender) => {
    switch (gender) {
      case 'stallion':
        return 'bg-blue-100 text-blue-800';
      case 'mare':
        return 'bg-purple-100 text-purple-800';
      case 'gelding':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToHorses}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Horses
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{horse.name}</h1>
            {horse.arabicName && (
              <p className="text-lg text-muted-foreground" dir="rtl">
                {horse.arabicName}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(horse.status)}>
            {horse.status}
          </Badge>
          <Badge className={getGenderColor(horse.gender)}>
            {horse.gender}
          </Badge>
        </div>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Horse Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Basic Information</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Breed:</span> {horse.breed}</p>
                <p><span className="font-medium">Color:</span> {horse.color}</p>
                <div className="flex items-start gap-2">
                  <span className="font-medium">Age:</span>
                  <AgeDisplay birthDate={horse.birthDate} className="mt-0" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Physical</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Height:</span> {horse.height} hands</p>
                <p><span className="font-medium">Weight:</span> {horse.weight} lbs</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Ownership</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Owner:</span> {horse.ownerName}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Identification</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Registration:</span> {horse.registrationNumber}</p>
                <p><span className="font-medium">Microchip:</span> {horse.microchipId}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Tabs */}
      <DynamicHorseDetailTabs
        horseId={horse.id}
        horseGender={horse.gender}
        activeTab={activeTab}
        onActiveTabChange={setActiveTab}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default HorseDetailsView;
