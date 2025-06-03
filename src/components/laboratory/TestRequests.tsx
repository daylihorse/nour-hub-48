
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
import { Plus, Search, Filter, Clock, FileText, AlertCircle } from "lucide-react";

const TestRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock test request data
  const testRequests = [
    {
      id: "TR001",
      sampleId: "S001",
      horseName: "Thunder",
      testType: "Complete Blood Count",
      requestedBy: "Dr. Smith",
      requestDate: "2024-06-01",
      priority: "routine",
      status: "pending",
      estimatedCompletion: "2024-06-03",
      notes: "Annual health check"
    },
    {
      id: "TR002",
      sampleId: "S002",
      horseName: "Bella",
      testType: "Urinalysis",
      requestedBy: "Dr. Johnson",
      requestDate: "2024-06-02",
      priority: "urgent",
      status: "in-progress",
      estimatedCompletion: "2024-06-02",
      notes: "Kidney function assessment"
    },
    {
      id: "TR003",
      sampleId: "S003",
      horseName: "Shadow",
      testType: "Parasite Screening",
      requestedBy: "Dr. Brown",
      requestDate: "2024-06-03",
      priority: "routine",
      status: "completed",
      estimatedCompletion: "2024-06-05",
      notes: "Routine parasite check"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: "outline", color: "blue" },
      "in-progress": { variant: "default", color: "yellow" },
      completed: { variant: "secondary", color: "green" },
      cancelled: { variant: "destructive", color: "red" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge variant={config.variant as any}>{status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    return priority === "urgent" ? 
      <Badge variant="destructive">Urgent</Badge> : 
      <Badge variant="outline">Routine</Badge>;
  };

  const filteredRequests = testRequests.filter(request => {
    const matchesSearch = request.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
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
              placeholder="Search test requests..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Test Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Test Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Sample</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sample..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s001">S001 - Thunder (Blood)</SelectItem>
                    <SelectItem value="s002">S002 - Bella (Urine)</SelectItem>
                    <SelectItem value="s003">S003 - Shadow (Fecal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Test Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbc">Complete Blood Count</SelectItem>
                    <SelectItem value="urinalysis">Urinalysis</SelectItem>
                    <SelectItem value="parasite">Parasite Screening</SelectItem>
                    <SelectItem value="chemistry">Blood Chemistry</SelectItem>
                    <SelectItem value="culture">Culture & Sensitivity</SelectItem>
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
                <Label>Special Instructions</Label>
                <Textarea placeholder="Any special instructions or notes..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Request Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Urgent</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Test Request Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Sample</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Est. Completion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.sampleId}</div>
                      <div className="text-sm text-muted-foreground">{request.horseName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{request.testType}</TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{request.estimatedCompletion}</TableCell>
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

export default TestRequests;
