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
  
  // Quick Actions
  const handleSendMessage = () => {
    toast.success("Message function triggered for " + client.name);
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
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Client Profile Card */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="overflow-hidden">
            <div className={`h-12 ${isHorseOwner ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
            <CardHeader className="pt-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mr-4 ${isHorseOwner ? 'bg-purple-500' : 'bg-blue-500'}`}>
                    {isHorseOwner ? (
                      <User className="h-6 w-6" />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <CardTitle>{client.name}</CardTitle>
                    <CardDescription>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        client.type === "Horse Owner" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {client.type}
                      </span>
                      <span className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {client.status}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex">
                  <ClientChatButton client={client} />
                  <Button size="sm" variant="outline" onClick={() => navigate(`/dashboard/clients/${client.id}/edit`)} className="ml-2">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{client.email}</span>
                  </div>
                  {client.address && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{client.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {isHorseOwner && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Horse Owner Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm">Horses Owned:</span>
                      <Badge className="ml-2">{horseOwner.horsesOwned}</Badge>
                    </div>
                    {horseOwner.stableAssignment && (
                      <div className="flex items-center">
                        <span className="text-sm">Stable Assignment:</span>
                        <Badge variant="outline" className="ml-2">{horseOwner.stableAssignment}</Badge>
                      </div>
                    )}
                    {horseOwner.billingInfo && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">Outstanding Balance:</span>
                        <span className="ml-2 font-medium">
                          ${horseOwner.billingInfo.outstanding.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Client Since</h3>
                <span>{format(new Date(client.createdAt), 'MMM dd, yyyy')}</span>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-3">
              <div className="flex justify-center w-full gap-2">
                <Button size="sm" variant="ghost" onClick={handleSendMessage}>
                  <Mail className="h-4 w-4 mr-1" /> Message
                </Button>
                <Button size="sm" variant="ghost" onClick={handleScheduleMeeting}>
                  <Calendar className="h-4 w-4 mr-1" /> Meeting
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleSendMessage}>
                <Mail className="h-4 w-4 mr-2" /> Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleScheduleMeeting}>
                <Calendar className="h-4 w-4 mr-2" /> Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("notes")}>
                <FileText className="h-4 w-4 mr-2" /> Add Note
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleUploadDocument}>
                <Upload className="h-4 w-4 mr-2" /> Upload Document
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleAssignTask}>
                <ClipboardList className="h-4 w-4 mr-2" /> Assign Task
              </Button>
              {isHorseOwner && (
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/dashboard/horses?ownerId=${client.id}`)}>
                  <LinkIcon className="h-4 w-4 mr-2" /> View Horses
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs & Content */}
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader className="pb-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="communication">Communication</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Recent Notes</h3>
                  {notes.length ? (
                    <div className="border rounded-md">
                      {notes.slice(-3).map((note) => (
                        <div key={note.id} className="p-3 border-b last:border-0">
                          <p className="text-sm">{note.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No notes available</p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Recent Communications</h3>
                  {communications && communications.length ? (
                    <div className="border rounded-md">
                      {communications.slice(-3).map((comm) => (
                        <div key={comm.id} className="p-3 border-b last:border-0">
                          <div className="flex items-center">
                            {comm.type === "call" && <Phone className="h-3 w-3 mr-1" />}
                            {comm.type === "email" && <Mail className="h-3 w-3 mr-1" />}
                            {comm.type === "message" && <MessageSquare className="h-3 w-3 mr-1" />}
                            {comm.type === "meeting" && <Calendar className="h-3 w-3 mr-1" />}
                            <span className="text-sm font-medium capitalize">{comm.type}</span>
                          </div>
                          <p className="text-sm">{comm.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(comm.date), { addSuffix: true })}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No communication logs available</p>
                  )}
                </div>

                {isHorseOwner && horseOwner.linkedHorses && horseOwner.linkedHorses.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Linked Horses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {horseOwner.linkedHorses.map((horseId) => (
                        <div 
                          key={horseId}
                          className="border rounded-md p-3 flex items-center hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => navigate(`/dashboard/horses/${horseId}`)}
                        >
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">Horse #{horseId.split('-')[1]}</p>
                            <p className="text-xs text-muted-foreground">View details</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
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

              <TabsContent value="communication" className="space-y-4">
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

              <TabsContent value="files" className="space-y-4">
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

              <TabsContent value="tasks" className="space-y-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
