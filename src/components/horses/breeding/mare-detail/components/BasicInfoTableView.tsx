
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

interface BasicInfoTableViewProps {
  data: BasicInfoData;
}

const BasicInfoTableView = ({ data }: BasicInfoTableViewProps) => {
  const tableData = [
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-slate-600">Field</TableHead>
              <TableHead className="font-semibold text-slate-600">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-slate-600">{item.field}</TableCell>
                <TableCell className="text-slate-800">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BasicInfoTableView;
