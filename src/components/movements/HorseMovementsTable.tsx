
import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface HorseMovementsTableProps {
  movements: Movement[];
}

const HorseMovementsTable = ({ movements }: HorseMovementsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Movement>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getStatusColor = (status: MovementStatus) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: MovementType) => {
    return type === "arrival" 
      ? "bg-emerald-100 text-emerald-800" 
      : "bg-purple-100 text-purple-800";
  };

  const toggleSort = (column: keyof Movement) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredMovements = movements.filter(
    (movement) =>
      movement.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.handler.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMovements = [...filteredMovements].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    const valueA = a[sortBy]?.toString().toLowerCase() || "";
    const valueB = b[sortBy]?.toString().toLowerCase() || "";
    
    if (sortOrder === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  const handleDeleteMovement = (id: string) => {
    toast({
      title: "Movement deleted",
      description: "The movement record has been deleted.",
    });
    // In a real app, you would delete the movement from the database
  };

  const handleExportMovement = (id: string) => {
    toast({
      title: "Movement exported",
      description: "The movement record has been exported.",
    });
    // In a real app, you would export the movement record
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search movements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => toggleSort("type")} className="cursor-pointer">
                Type
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => toggleSort("horseName")} className="cursor-pointer">
                Horse
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => toggleSort("date")} className="cursor-pointer">
                Date/Time
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Origin/Destination</TableHead>
              <TableHead onClick={() => toggleSort("status")} className="cursor-pointer">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => toggleSort("transportMethod")} className="cursor-pointer">
                Transport
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Health Cert</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                  {searchTerm 
                    ? "No movements found matching your search."
                    : "No movement records yet. Use the form to add a new record."}
                </TableCell>
              </TableRow>
            ) : (
              sortedMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>
                    <Badge className={getTypeColor(movement.type)}>
                      {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{movement.horseName}</TableCell>
                  <TableCell>
                    {format(new Date(movement.date), "MMM d, yyyy")}
                    <div className="text-sm text-muted-foreground">{movement.time}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {movement.type === "arrival" ? movement.origin : movement.destination}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {movement.type === "arrival" ? "To: " + movement.destination : "From: " + movement.origin}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(movement.status)}>
                      {movement.status.charAt(0).toUpperCase() + movement.status.slice(1).replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {movement.transportMethod.charAt(0).toUpperCase() + movement.transportMethod.slice(1)}
                  </TableCell>
                  <TableCell>
                    {movement.healthCertificate ? (
                      <FileCheck className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit record</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleExportMovement(movement.id)}>
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteMovement(movement.id)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HorseMovementsTable;
