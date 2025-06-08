
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Info } from "lucide-react";
import ViewToggle from "../components/ViewToggle";
import EditBasicInfoDialog from "../components/EditBasicInfoDialog";
import BasicInfoTableView from "../components/BasicInfoTableView";
import BasicInfoListView from "../components/BasicInfoListView";

interface MareBasicInfoTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
}

const MareBasicInfoTable = ({ mareId, viewMode, onViewModeChange }: MareBasicInfoTableProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock data - in real app this would come from API
  const basicInfo = {
    registrationNumber: "ARA-2018-0047",
    microchipId: "985112345678901",
    passportNumber: "UAE-2018-0047",
    birthDate: "2018-03-15",
    color: "Bay",
    height: "15.2 hands",
    weight: "450 kg",
    sire: "Golden Thunder",
    dam: "Silver Moon",
    bloodlineOrigin: "Egyptian Arabian",
    owner: "Al Mansouri Stables",
    location: "Stable Block A, Stall 12",
    insuranceValue: "$50,000",
    acquisitionDate: "2020-06-01",
    acquisitionPrice: "$35,000"
  };

  const infoSections = [
    {
      title: "Identification",
      icon: <Info className="h-5 w-5" />,
      fields: [
        { label: "Registration Number", value: basicInfo.registrationNumber },
        { label: "Microchip ID", value: basicInfo.microchipId },
        { label: "Passport Number", value: basicInfo.passportNumber }
      ]
    },
    {
      title: "Physical Characteristics",
      icon: <Info className="h-5 w-5" />,
      fields: [
        { label: "Birth Date", value: new Date(basicInfo.birthDate).toLocaleDateString() },
        { label: "Color", value: basicInfo.color },
        { label: "Height", value: basicInfo.height },
        { label: "Weight", value: basicInfo.weight }
      ]
    },
    {
      title: "Pedigree Information",
      icon: <Info className="h-5 w-5" />,
      fields: [
        { label: "Sire", value: basicInfo.sire },
        { label: "Dam", value: basicInfo.dam },
        { label: "Bloodline Origin", value: basicInfo.bloodlineOrigin }
      ]
    },
    {
      title: "Ownership & Location",
      icon: <Info className="h-5 w-5" />,
      fields: [
        { label: "Owner", value: basicInfo.owner },
        { label: "Current Location", value: basicInfo.location },
        { label: "Insurance Value", value: basicInfo.insuranceValue },
        { label: "Acquisition Date", value: new Date(basicInfo.acquisitionDate).toLocaleDateString() },
        { label: "Acquisition Price", value: basicInfo.acquisitionPrice }
      ]
    }
  ];

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const renderGridView = () => (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {infoSections.map((section, index) => (
          <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                    <span className="font-medium text-slate-600">{field.label}:</span>
                    <span className="text-slate-800 font-semibold">{field.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Badges */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg text-slate-700">Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-500 text-white">Active</Badge>
            <Badge className="bg-blue-500 text-white">Breeding Eligible</Badge>
            <Badge className="bg-purple-500 text-white">Insured</Badge>
            <Badge className="bg-orange-500 text-white">Pregnant</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Basic Information</h2>
        <div className="flex items-center gap-4">
          <ViewToggle currentView={viewMode} onViewChange={onViewModeChange} />
          <Button 
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Information
          </Button>
        </div>
      </div>

      {viewMode === 'grid' && renderGridView()}
      {viewMode === 'table' && <BasicInfoTableView data={basicInfo} />}
      {viewMode === 'list' && <BasicInfoListView data={basicInfo} />}

      <EditBasicInfoDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        mareId={mareId}
      />
    </div>
  );
};

export default MareBasicInfoTable;
