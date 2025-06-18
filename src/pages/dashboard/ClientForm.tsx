
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { getClientById } from "@/data/clients";
import { ClientType, ClientStatus } from "@/types/client";
import { toast } from "sonner";
import HorseLinkingSection from "@/components/clients/HorseLinkingSection";

interface LinkedHorse {
  id: string;
  name: string;
  breed: string;
  gender: 'stallion' | 'mare' | 'gelding';
  age?: number;
  isComplete: boolean;
  status: 'active' | 'incomplete';
}

const clientFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().optional(),
  type: z.enum(["Horse Owner", "Veterinarian", "Supplier", "Trainer", "Staff", "Other"]),
  status: z.enum(["Active", "Inactive"]),
  notes: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);
  const [linkedHorses, setLinkedHorses] = useState<LinkedHorse[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "Horse Owner",
      status: "Active",
      notes: "",
    },
  });

  const watchedType = watch("type");
  const watchedStatus = watch("status");

  useEffect(() => {
    if (isEditing && id) {
      const client = getClientById(id);
      if (client) {
        setValue("name", client.name);
        setValue("email", client.email);
        setValue("phone", client.phone);
        setValue("address", client.address || "");
        setValue("type", client.type);
        setValue("status", client.status);
        setValue("notes", client.notes?.[0]?.content || "");
      } else {
        toast.error("Client not found");
        navigate("/dashboard/clients");
      }
    }
  }, [isEditing, id, setValue, navigate]);

  const onSubmit = async (data: ClientFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing) {
        toast.success("Client updated successfully");
      } else {
        toast.success("Client created successfully");
      }
      
      navigate("/dashboard/clients");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save client");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    try {
      if (isEditing) {
        navigate(`/dashboard/clients/${id}`);
      } else {
        navigate("/dashboard/clients");
      }
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate back");
    }
  };

  // Horse management handlers
  const handleAddExistingHorse = (horse: LinkedHorse) => {
    if (linkedHorses.find(h => h.id === horse.id)) {
      toast.error("This horse is already linked to this client");
      return;
    }
    setLinkedHorses(prev => [...prev, horse]);
  };

  const handleAddNewHorse = (horseData: Omit<LinkedHorse, 'id' | 'isComplete' | 'status'>) => {
    const newHorse: LinkedHorse = {
      id: `incomplete-${Date.now()}`,
      ...horseData,
      isComplete: false,
      status: 'incomplete'
    };
    setLinkedHorses(prev => [...prev, newHorse]);
  };

  const handleRemoveHorse = (horseId: string) => {
    setLinkedHorses(prev => prev.filter(h => h.id !== horseId));
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Client" : "Add New Client"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter client name"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Client Type *</Label>
                <Select
                  value={watchedType}
                  onValueChange={(value) => setValue("type", value as ClientType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Horse Owner">Horse Owner</SelectItem>
                    <SelectItem value="Veterinarian">Veterinarian</SelectItem>
                    <SelectItem value="Supplier">Supplier</SelectItem>
                    <SelectItem value="Trainer">Trainer</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={watchedStatus}
                  onValueChange={(value) => setValue("status", value as ClientStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-600">{errors.status.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="Enter client address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Enter any additional notes about the client"
                rows={4}
              />
            </div>

            {/* Horse Linking Section - Only show for Horse Owner */}
            {watchedType === "Horse Owner" && (
              <div className="space-y-4">
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Horse Management</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Link existing horses or add new incomplete horse records that can be completed later in the Horse Department.
                  </p>
                  <HorseLinkingSection
                    linkedHorses={linkedHorses}
                    onAddExistingHorse={(horse) => {
                      if (linkedHorses.find(h => h.id === horse.id)) {
                        toast.error("This horse is already linked to this client");
                        return;
                      }
                      setLinkedHorses(prev => [...prev, horse]);
                    }}
                    onAddNewHorse={(horseData) => {
                      const newHorse: LinkedHorse = {
                        id: `incomplete-${Date.now()}`,
                        ...horseData,
                        isComplete: false,
                        status: 'incomplete'
                      };
                      setLinkedHorses(prev => [...prev, newHorse]);
                    }}
                    onRemoveHorse={(horseId) => {
                      setLinkedHorses(prev => prev.filter(h => h.id !== horseId));
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleBack}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : isEditing ? "Update Client" : "Create Client"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientForm;
