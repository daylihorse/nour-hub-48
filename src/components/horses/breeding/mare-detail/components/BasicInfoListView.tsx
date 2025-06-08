
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BasicInfoData {
  registrationNumber: string;
  microchipId: string;
  passportNumber: string;
  birthDate: string;
  color: string;
  height: string;
  weight: string;
  sire: string;
  dam: string;
  bloodlineOrigin: string;
  owner: string;
  location: string;
  insuranceValue: string;
  acquisitionDate: string;
  acquisitionPrice: string;
}

interface BasicInfoListViewProps {
  data: BasicInfoData;
}

const BasicInfoListView = ({ data }: BasicInfoListViewProps) => {
  const listData = [
    { field: "Registration Number", value: data.registrationNumber },
    { field: "Microchip ID", value: data.microchipId },
    { field: "Passport Number", value: data.passportNumber },
    { field: "Birth Date", value: new Date(data.birthDate).toLocaleDateString() },
    { field: "Color", value: data.color },
    { field: "Height", value: data.height },
    { field: "Weight", value: data.weight },
    { field: "Sire", value: data.sire },
    { field: "Dam", value: data.dam },
    { field: "Bloodline Origin", value: data.bloodlineOrigin },
    { field: "Owner", value: data.owner },
    { field: "Current Location", value: data.location },
    { field: "Insurance Value", value: data.insuranceValue },
    { field: "Acquisition Date", value: new Date(data.acquisitionDate).toLocaleDateString() },
    { field: "Acquisition Price", value: data.acquisitionPrice }
  ];

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg text-slate-700">Basic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {listData.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 px-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
              <span className="font-medium text-slate-600">{item.field}:</span>
              <span className="text-slate-800 font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoListView;
