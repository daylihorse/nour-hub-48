
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  MessageSquare,
  Calendar,
  Plus,
  Upload,
  ClipboardList,
  Link as LinkIcon,
  DollarSign,
  Bell,
  Edit,
  ArrowLeft,
  File
} from "lucide-react";
import { getClientById } from "@/data/clients";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientNote, ClientTask, ClientFile, CommunicationLog, Client, HorseOwner } from "@/types/client";
import { formatDistanceToNow, format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import ClientChatButton from "@/components/chat/ClientChatButton";

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = getClientById(id as string);
  
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<ClientNote[]>(client?.notes || []);
  const [communications, setCommunications] = useState<CommunicationLog[]>(client?.communication || []);
  const [tasks, setTasks] = useState<ClientTask[]>(client?.tasks || []);
  const [files, setFiles] = useState<ClientFile[]>(client?.files || []);

  if (!client) {
    return <div className="p-6">Client not found</div>;
  }

  const isHorseOwner = client.type === "Horse Owner";
  const horseOwner = client as HorseOwner;

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const newNoteItem: ClientNote = {
      id: uuidv4(),
      content: newNote,
      createdAt: new Date().toISOString(),
      createdBy: "current-user"
    };
    
    setNotes([...notes, newNoteItem]);
    setNewNote("");
    toast.success("Note added successfully");
  };
  
  // Quick Actions with proper error handling
  const handleSendMessage = () => {
    try {
      navigate(`/dashboard/messages/${client.id}`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to open messages");
    }
  };
  
  const handleScheduleMeeting = () => {
    toast.success("Schedule meeting function triggered for " + client.name);
  };
  
  const handleUploadDocument = () => {
    toast.success("Upload document function triggered for " + client.name);
  };
  
  const handleAssignTask = () => {
    toast.success("Assign task function triggered for " + client.name);
  };

  const handleViewHorses = () => {
    try {
      navigate("/dashboard/horses");
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate to horses page");
    }
  };

  const handleEditClient = () => {
    try {
      navigate(`/dashboard/clients/${client.id}/edit`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate to edit page");
    }
  };

  const handleBackToClients = () => {
    try {
      navigate("/dashboard/clients");
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate back to clients");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto py-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToClients}
            className="hover:bg-white/60"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Clients
          </Button>
        </div>
        
        {/* Enhanced Profile Header Card */}
        <Card className="overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className={`h-24 bg-gradient-to-r ${isHorseOwner ? 'from-purple-500 to-purple-600' : 'from-blue-500 to-blue-600'}`}>
            <div className="absolute top-16 left-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white ${isHorseOwner ? 'bg-purple-500' : 'bg-blue-500'}`}>
                <User className="h-10 w-10" />
              </div>
            </div>
          </div>
          <CardHeader className="pt-12 pb-4">
            <div className="flex justify-between items-start">
              <div className="ml-28">
                <CardTitle className="text-2xl font-bold text-gray-900">{client.name}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge className={`${
                    client.type === "Horse Owner" 
                      ? "bg-purple-100 text-purple-800 border-purple-200" 
                      : "bg-blue-100 text-blue-800 border-blue-200"
                  }`}>
                    {client.type}
                  </Badge>
                  <Badge variant={client.status === "Active" ? "default" : "secondary"}>
                    {client.status}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <ClientChatButton client={client} />
                <Button size="sm" variant="outline" onClick={handleEditClient}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Client Info & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information Card */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Phone className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="text-sm">{client.phone}</span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Mail className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="text-sm">{client.email}</span>
                  </div>
                  {client.address && (
                    <div className="flex items-start p-3 rounded-lg bg-gray-50">
                      <MapPin className="h-4 w-4 mr-3 text-gray-500 mt-0.5" />
                      <span className="text-sm">{client.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Horse Owner Details */}
            {isHorseOwner && (
              <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <User className="h-5 w-5 mr-2 text-purple-500" />
                    Horse Owner Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-purple-50">
                      <div className="text-2xl font-bold text-purple-600">{horseOwner.horsesOwned}</div>
                      <div className="text-xs text-purple-600">Horses Owned</div>
                    </div>
                    {horseOwner.billingInfo && (
                      <div className="text-center p-3 rounded-lg bg-red-50">
                        <div className="text-2xl font-bold text-red-600">${horseOwner.billingInfo.outstanding.toFixed(0)}</div>
                        <div className="text-xs text-red-600">Outstanding</div>
                      </div>
                    )}
                  </div>
                  {horseOwner.stableAssignment && (
                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="text-sm font-medium text-gray-700">Stable Assignment</div>
                      <div className="text-sm text-gray-600">{horseOwner.stableAssignment}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions Card */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleSendMessage}>
                  <Mail className="h-4 w-4 mr-2" /> Send Message
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleScheduleMeeting}>
                  <Calendar className="h-4 w-4 mr-2" /> Schedule Meeting
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setActiveTab("notes")}>
                  <FileText className="h-4 w-4 mr-2" /> Add Note
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleUploadDocument}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Document
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleAssignTask}>
                  <ClipboardList className="h-4 w-4 mr-2" /> Assign Task
                </Button>
                {isHorseOwner && (
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleViewHorses}>
                    <LinkIcon className="h-4 w-4 mr-2" /> View Horses
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="p-6 pb-0">
                  <TabsList className="grid grid-cols-5 w-full bg-gray-100/50">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
                    <TabsTrigger value="notes" className="data-[state=active]:bg-white">Notes</TabsTrigger>
                    <TabsTrigger value="communication" className="data-[state=active]:bg-white">Communication</TabsTrigger>
                    <TabsTrigger value="files" className="data-[state=active]:bg-white">Files</TabsTrigger>
                    <TabsTrigger value="tasks" className="data-[state=active]:bg-white">Tasks</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="overview" className="space-y-6 mt-0">
                    {/* Client Since & Last Interaction */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50">
                        <CardContent className="p-4">
                          <div className="text-sm text-blue-600 font-medium">Client Since</div>
                          <div className="text-lg font-bold text-blue-800">
                            {format(new Date(client.createdAt), 'MMM dd, yyyy')}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-green-50 to-green-100/50">
                        <CardContent className="p-4">
                          <div className="text-sm text-green-600 font-medium">Last Interaction</div>
                          <div className="text-lg font-bold text-green-800">
                            {formatDistanceToNow(new Date(client.lastInteraction), { addSuffix: true })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Notes */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        Recent Notes
                      </h3>
                      {notes.length ? (
                        <div className="space-y-3">
                          {notes.slice(-3).map((note) => (
                            <Card key={note.id} className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                              <CardContent className="p-4">
                                <p className="text-sm text-gray-700">{note.content}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <Card className="bg-gray-50/50">
                          <CardContent className="p-6 text-center">
                            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No notes available</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Recent Communications */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-green-500" />
                        Recent Communications
                      </h3>
                      {communications && communications.length ? (
                        <div className="space-y-3">
                          {communications.slice(-3).map((comm) => (
                            <Card key={comm.id} className="bg-gradient-to-r from-green-50 to-green-100/50">
                              <CardContent className="p-4">
                                <div className="flex items-center mb-2">
                                  {comm.type === "call" && <Phone className="h-4 w-4 mr-2 text-green-600" />}
                                  {comm.type === "email" && <Mail className="h-4 w-4 mr-2 text-green-600" />}
                                  {comm.type === "message" && <MessageSquare className="h-4 w-4 mr-2 text-green-600" />}
                                  {comm.type === "meeting" && <Calendar className="h-4 w-4 mr-2 text-green-600" />}
                                  <span className="text-sm font-medium capitalize text-green-700">{comm.type}</span>
                                </div>
                                <p className="text-sm text-gray-700">{comm.description}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {formatDistanceToNow(new Date(comm.date), { addSuffix: true })}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <Card className="bg-gray-50/50">
                          <CardContent className="p-6 text-center">
                            <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No communication logs available</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Linked Horses for Horse Owners */}
                    {isHorseOwner && horseOwner.linkedHorses && horseOwner.linkedHorses.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center">
                          <User className="h-5 w-5 mr-2 text-purple-500" />
                          Linked Horses
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {horseOwner.linkedHorses.map((horseId) => (
                            <Card 
                              key={horseId}
                              className="bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-md transition-all cursor-pointer"
                              onClick={handleViewHorses}
                            >
                              <CardContent className="p-4 flex items-center">
                                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center mr-4">
                                  <User className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-purple-800">Horse #{horseId.split('-')[1]}</p>
                                  <p className="text-xs text-purple-600">Click to view details</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Other tab contents remain the same */}
                  <TabsContent value="notes" className="space-y-4 mt-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Client Notes</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Note
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <Textarea 
                        placeholder="Add a new note..." 
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                        Save Note
                      </Button>
                    </div>

                    <ScrollArea className="h-[300px] pr-4">
                      {notes.length ? (
                        <div className="space-y-3">
                          {[...notes].reverse().map((note) => (
                            <Card key={note.id}>
                              <CardContent className="pt-4">
                                <p>{note.content}</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No notes available for this client.</p>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="communication" className="space-y-4 mt-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Communication Log</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Log Communication
                      </Button>
                    </div>
                    
                    <ScrollArea className="h-[400px] pr-4">
                      {communications && communications.length ? (
                        <div className="space-y-3">
                          {[...communications].reverse().map((comm) => (
                            <Card key={comm.id}>
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {comm.type === "call" && <Phone className="h-4 w-4 mr-2" />}
                                    {comm.type === "email" && <Mail className="h-4 w-4 mr-2" />}
                                    {comm.type === "message" && <MessageSquare className="h-4 w-4 mr-2" />}
                                    {comm.type === "meeting" && <Calendar className="h-4 w-4 mr-2" />}
                                    <CardTitle className="text-base capitalize">{comm.type}</CardTitle>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {format(new Date(comm.date), 'MMM dd, yyyy')}
                                  </span>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p>{comm.description}</p>
                                {comm.contactPerson && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Contact: {comm.contactPerson}
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No communication logs available.</p>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="files" className="space-y-4 mt-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Files & Documents</h3>
                      <Button>
                        <Upload className="h-4 w-4 mr-1" /> Upload File
                      </Button>
                    </div>
                    
                    {files && files.length ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {files.map((file) => (
                          <div 
                            key={file.id}
                            className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                                <File className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{file.name}</p>
                                <div className="flex items-center justify-between">
                                  <p className="text-xs text-muted-foreground">
                                    {format(new Date(file.uploadDate), 'MMM dd, yyyy')}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-md bg-muted/20">
                        <div className="flex justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="mt-2 text-muted-foreground">No files uploaded yet</p>
                        <Button variant="outline" className="mt-3">
                          <Upload className="h-4 w-4 mr-1" /> Upload Files
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="tasks" className="space-y-4 mt-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Tasks & Reminders</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Task
                      </Button>
                    </div>
                    
                    {tasks && tasks.length ? (
                      <div className="space-y-2">
                        {tasks.map((task) => (
                          <div 
                            key={task.id}
                            className={`border rounded-md p-3 ${
                              task.status === "completed" ? "bg-muted/50" : ""
                            }`}
                          >
                            <div className="flex items-start">
                              <div className={`w-2 h-2 rounded-full mt-2 mr-2 ${
                                task.priority === "high" ? "bg-red-500" :
                                task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                              }`}></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                                    {task.title}
                                  </p>
                                  <Badge variant={
                                    task.status === "completed" ? "outline" :
                                    task.status === "in-progress" ? "secondary" : "default"  
                                  }>
                                    {task.status}
                                  </Badge>
                                </div>
                                {task.description && (
                                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                  {task.dueDate && (
                                    <div className="flex items-center text-xs">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                                    </div>
                                  )}
                                  {task.assignedTo && (
                                    <div className="flex items-center text-xs">
                                      <User className="h-3 w-3 mr-1" />
                                      <span>Assigned to: {task.assignedTo}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-md bg-muted/20">
                        <div className="flex justify-center">
                          <ClipboardList className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="mt-2 text-muted-foreground">No tasks created yet</p>
                        <Button variant="outline" className="mt-3">
                          <Plus className="h-4 w-4 mr-1" /> Create Task
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
