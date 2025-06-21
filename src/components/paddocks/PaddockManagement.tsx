
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { usePaddockService } from "@/hooks/usePaddockService";
import { Paddock } from "@/types/paddocks";
import PaddockTableView from "./components/PaddockTableView";
import PaddockListView from "./components/PaddockListView";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import { Plus, Grid, List, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PaddockManagement = () => {
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPaddock, setEditingPaddock] = useState<Paddock | null>(null);
  const [deletingPaddock, setDeletingPaddock] = useState<Paddock | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "grazing",
    status: "available",
    capacity: 1,
    length: 0,
    width: 0,
    section: "",
    features: [] as string[]
  });

  const {
    usePaddocks,
    createPaddock,
    updatePaddock,
    deletePaddock,
    isCreatingPaddock,
    isUpdatingPaddock,
    isDeletingPaddock
  } = usePaddockService();

  const { data: paddocks = [], isLoading } = usePaddocks();

  // Filter paddocks based on search and filters
  const filteredPaddocks = paddocks.filter(paddock => {
    const matchesSearch = paddock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paddock.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || paddock.status === statusFilter;
    const matchesType = typeFilter === "all" || paddock.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reserved': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grazing': return 'text-green-700 border-green-300';
      case 'exercise': return 'text-blue-700 border-blue-300';
      case 'breeding': return 'text-purple-700 border-purple-300';
      case 'quarantine': return 'text-red-700 border-red-300';
      case 'rehabilitation': return 'text-orange-700 border-orange-300';
      default: return 'text-gray-700 border-gray-300';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paddockData: Partial<Paddock> = {
      name: formData.name,
      number: formData.number,
      type: formData.type as any,
      status: formData.status as any,
      capacity: formData.capacity,
      currentOccupancy: 0,
      size: {
        length: formData.length,
        width: formData.width,
        unit: 'meters'
      },
      location: {
        section: formData.section
      },
      features: formData.features
    };

    if (editingPaddock) {
      updatePaddock({ id: editingPaddock.id, data: paddockData });
      setEditingPaddock(null);
    } else {
      createPaddock(paddockData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      number: "",
      type: "grazing",
      status: "available",
      capacity: 1,
      length: 0,
      width: 0,
      section: "",
      features: []
    });
    setShowAddForm(false);
  };

  const handleEdit = (paddock: Paddock) => {
    setFormData({
      name: paddock.name,
      number: paddock.number,
      type: paddock.type,
      status: paddock.status,
      capacity: paddock.capacity,
      length: paddock.size.length,
      width: paddock.size.width,
      section: paddock.location.section,
      features: paddock.features || []
    });
    setEditingPaddock(paddock);
    setShowAddForm(true);
  };

  const handleDelete = (paddock: Paddock) => {
    setDeletingPaddock(paddock);
  };

  const confirmDelete = () => {
    if (deletingPaddock) {
      deletePaddock(deletingPaddock.id);
      setDeletingPaddock(null);
    }
  };

  const handleViewDetails = (paddock: Paddock) => {
    toast({
      title: "Paddock Details",
      description: `Viewing details for ${paddock.name}`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading paddocks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Paddock Management</h2>
          <p className="text-muted-foreground">Manage your paddocks and their assignments</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} disabled={isCreatingPaddock}>
          <Plus className="h-4 w-4 mr-2" />
          Add Paddock
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search paddocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="grazing">Grazing</SelectItem>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="turnout">Turnout</SelectItem>
                <SelectItem value="breeding">Breeding</SelectItem>
                <SelectItem value="quarantine">Quarantine</SelectItem>
                <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPaddock ? 'Edit Paddock' : 'Add New Paddock'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Paddock Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Paddock Number</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grazing">Grazing</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                      <SelectItem value="turnout">Turnout</SelectItem>
                      <SelectItem value="breeding">Breeding</SelectItem>
                      <SelectItem value="quarantine">Quarantine</SelectItem>
                      <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Location Section</Label>
                  <Input
                    id="section"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length (meters)</Label>
                  <Input
                    id="length"
                    type="number"
                    min="0"
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (meters)</Label>
                  <Input
                    id="width"
                    type="number"
                    min="0"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isCreatingPaddock || isUpdatingPaddock}>
                  {editingPaddock ? 'Update Paddock' : 'Create Paddock'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Paddocks List */}
      {viewMode === 'table' ? (
        <PaddockTableView
          paddocks={filteredPaddocks}
          onViewDetails={handleViewDetails}
          onEditPaddock={handleEdit}
          onDeletePaddock={handleDelete}
          getStatusColor={getStatusColor}
          getTypeColor={getTypeColor}
        />
      ) : (
        <PaddockListView
          paddocks={filteredPaddocks}
          onViewDetails={handleViewDetails}
          onEditPaddock={handleEdit}
          onDeletePaddock={handleDelete}
          getStatusColor={getStatusColor}
          getTypeColor={getTypeColor}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingPaddock}
        onOpenChange={(open) => !open && setDeletingPaddock(null)}
        onConfirm={confirmDelete}
        recordId={deletingPaddock?.id}
        recordType="paddock"
      />
    </div>
  );
};

export default PaddockManagement;
