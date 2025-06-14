
import { useNavigate } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Stallion {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalMares: number;
  successfulBreedings: number;
  livefoals: number;
  successRate: number;
  studFee: number;
  nextAvailable: string;
  bookings: number;
}

interface StallionTableProps {
  stallions: Stallion[];
}

const StallionTable = ({ stallions }: StallionTableProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "retired":
        return "secondary";
      case "unavailable":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Mares</TableHead>
            <TableHead>Live Foals</TableHead>
            <TableHead>Success Rate</TableHead>
            <TableHead>Stud Fee</TableHead>
            <TableHead>Next Available</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stallions.map((stallion) => (
            <TableRow 
              key={stallion.id} 
              className="cursor-pointer"
              onClick={() => navigate(`/dashboard/horses/breeding/stallions/${stallion.id}`)}
            >
              <TableCell className="font-medium">{stallion.horseName}</TableCell>
              <TableCell>{stallion.breed}</TableCell>
              <TableCell>{stallion.age}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(stallion.status) as any}>
                  {stallion.status}
                </Badge>
              </TableCell>
              <TableCell>{stallion.totalMares}</TableCell>
              <TableCell>{stallion.livefoals}</TableCell>
              <TableCell className="text-green-600">{stallion.successRate}%</TableCell>
              <TableCell>
                {stallion.studFee > 0 ? `$${stallion.studFee.toLocaleString()}` : "Retired"}
              </TableCell>
              <TableCell>{stallion.nextAvailable}</TableCell>
              <TableCell>{stallion.bookings}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  // Handle schedule action
                }}>
                  Schedule
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StallionTable;
