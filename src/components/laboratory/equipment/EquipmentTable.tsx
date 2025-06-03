
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wrench, AlertTriangle, CheckCircle } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: string;
  location: string;
  condition: string;
  warrantyExpiry: string;
}

interface EquipmentTableProps {
  equipment: Equipment[];
}

const EquipmentTable = ({ equipment }: EquipmentTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      operational: { variant: "secondary", icon: CheckCircle, color: "green" },
      maintenance: { variant: "default", icon: Wrench, color: "yellow" },
      "needs-repair": { variant: "destructive", icon: AlertTriangle, color: "red" },
      "out-of-service": { variant: "destructive", icon: AlertTriangle, color: "red" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.operational;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  const getConditionBadge = (condition: string) => {
    const conditionMap = {
      excellent: "text-green-600",
      good: "text-blue-600",
      fair: "text-orange-600",
      poor: "text-red-600"
    };
    return (
      <span className={conditionMap[condition as keyof typeof conditionMap] || "text-gray-600"}>
        {condition.charAt(0).toUpperCase() + condition.slice(1)}
      </span>
    );
  };

  const isMaintenanceDue = (nextMaintenance: string) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const daysDiff = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 7;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipment Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Next Maintenance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.manufacturer}</div>
                  </div>
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{getConditionBadge(item.condition)}</TableCell>
                <TableCell>
                  <span className={isMaintenanceDue(item.nextMaintenance) ? "text-red-600 font-medium" : ""}>
                    {item.nextMaintenance}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EquipmentTable;
