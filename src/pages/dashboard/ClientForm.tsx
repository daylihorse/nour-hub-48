
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { getClientById } from "@/data/clients";
import { Client, ClientType, HorseOwner } from "@/types/client";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  type: z.enum(["Horse Owner", "Veterinarian", "Supplier", "Trainer", "Staff", "Other"]),
  address: z.string().optional(),
  status: z.enum(["Active", "Inactive"]),
  notes: z.string().optional(),
  
  // Horse Owner specific fields
  horsesOwned: z.number().min(0).optional(),
  stableAssignment: z.string().optional(),
});

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  // Get client data if in edit mode
  const existingClient = id ? getClientById(id) : undefined;
  
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isHorseOwner, setIsHorseOwner] = useState(existingClient?.type === "Horse Owner");
  
  // Initialize form with default values or existing client data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: existingClient?.name || "",
      phone: existingClient?.phone || "",
      email: existingClient?.email || "",
      type: existingClient?.type || "Horse Owner",
      address: existingClient?.address || "",
      status: existingClient?.status || "Active",
      notes: "",
      horsesOwned: existingClient?.type === "Horse Owner" 
        ? (existingClient as HorseOwner).horsesOwned 
        : 0,
      stableAssignment: existingClient?.type === "Horse Owner" 
        ? (existingClient as HorseOwner).stableAssignment 
        : "",
    }
  });
  
  // Watch for changes in client type to show/hide Horse Owner fields
  const clientType = form.watch("type");
  useEffect(() => {
    setIsHorseOwner(clientType === "Horse Owner");
  }, [clientType]);
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, we would send this to an API
    console.log(values);
    
    toast.success(
      isEditMode 
        ? `Client ${values.name} updated successfully!` 
        : `Client ${values.name} added successfully!`
    );
    
    navigate("/dashboard/clients");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/dashboard/clients")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Clients
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditMode ? "Edit Client" : "Add New Client"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Client Information" : "Client Information"}</CardTitle>
          <CardDescription>
            {isEditMode 
              ? "Update the client's information below" 
              : "Fill out the form below to add a new client"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
                  <TabsTrigger value="additional-info">Additional Information</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic-info" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter client name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Type *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select client type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Horse Owner">Horse Owner</SelectItem>
                              <SelectItem value="Veterinarian">Veterinarian</SelectItem>
                              <SelectItem value="Supplier">Supplier</SelectItem>
                              <SelectItem value="Trainer">Trainer</SelectItem>
                              <SelectItem value="Staff">Staff</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select client status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => navigate("/dashboard/clients")}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("additional-info")}>
                      Next
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="additional-info" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Add any additional notes about this client" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Horse Owner specific fields */}
                  {isHorseOwner && (
                    <>
                      <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
                        <h3 className="text-lg font-medium text-purple-800 mb-4">Horse Owner Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="horsesOwned"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Horses Owned</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="0" 
                                    {...field}
                                    onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="stableAssignment"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stable Assignment</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter stable assignment" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Example: "Block A, Stalls 1-3"
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("basic-info")}>
                      Previous
                    </Button>
                    <Button type="submit">
                      {isEditMode ? "Update Client" : "Add Client"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientForm;
