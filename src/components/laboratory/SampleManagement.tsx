
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, TestTube2, Calendar, User } from "lucide-react";

const SampleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock sample data
  const samples = [
    {
      id: "S001",
      horseId: "H001",
      horseName: "Thunder",
      sampleType: "Blood",
      collectionDate: "2024-06-01",
      collectedBy: "Dr. Smith",
      status: "collected",
      priority: "routine",
      notes: "Regular health check"
    },
    {
      id: "S002",
      horseId: "H002",
      horseName: "Bella",
      sampleType: "Urine",
      collectionDate: "2024-06-02",
      collectedBy: "Dr. Johnson",
      status: "processing",
      priority: "urgent",
      notes: "Follow-up test"
    },
    {
      id: "S003",
      horseId: "H003",
      horseName: "Shadow",
      sampleType: "Fecal",
      collectionDate: "2024-06-03",
      collectedBy: "Dr. Brown",
      status: "completed",
      priority: "routine",
      notes: "Parasite screening"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      collected: { variant: "outline", color: "blue" },
      processing: { variant: "default", color: "yellow" },
      completed: { variant: "secondary", color: "green" },
      rejected: { variant: "destructive", color: "red" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.collected;
    return <Badge variant={config.variant as any}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    return priority === "urgent" ? 
      <Badge variant="destructive">Urgent</Badge> : 
      <Badge variant="outline">Routine</Badge>;
  };

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = sample.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sample.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search samples..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="collected">Collected</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Sample
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Sample</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Horse</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select horse..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thunder">Thunder</SelectItem>
                    <SelectItem value="bella">Bella</SelectItem>
                    <SelectItem value="shadow">Shadow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sample Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sample type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood">Blood</SelectItem>
                    <SelectItem value="urine">Urine</SelectItem>
                    <SelectItem value="fecal">Fecal</SelectItem>
                    <SelectItem value="tissue">Tissue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Additional notes..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Save Sample
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sample Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TestTube2 className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Samples</p>
                <p className="text-2xl font-bold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Today's Collection</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TestTube2 className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Urgent</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Samples Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sample ID</TableHead>
                <TableHead>Horse</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Collection Date</TableHead>
                <TableHead>Collected By</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSamples.map((sample) => (
                <TableRow key={sample.id}>
                  <TableCell className="font-medium">{sample.id}</TableCell>
                  <TableCell>{sample.horseName}</TableCell>
                  <TableCell>{sample.sampleType}</TableCell>
                  <TableCell>{sample.collectionDate}</TableCell>
                  <TableCell>{sample.collectedBy}</TableCell>
                  <TableCell>{getPriorityBadge(sample.priority)}</TableCell>
                  <TableCell>{getStatusBadge(sample.status)}</TableCell>
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
    </div>
  );
};

export default SampleManagement;
