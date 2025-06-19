import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getClientById } from "@/data/clients";
import { Button } from "@/components/ui/button";
import { ClientNote, ClientTask, ClientFile, CommunicationLog, HorseOwner } from "@/types/client";
import { toast } from "sonner";
import ClientProfileHeader from "@/components/clients/profile/header/ClientProfileHeader";
import ClientBasicInfo from "@/components/clients/profile/basic-info/ClientBasicInfo";
import ClientQuickActions from "@/components/clients/profile/actions/ClientQuickActions";
import ClientStatistics from "@/components/clients/profile/statistics/ClientStatistics";
import ClientTabsContent from "@/components/clients/profile/ClientTabsContent";
import ScheduleAppointmentDialog from "@/components/clients/profile/dialogs/ScheduleAppointmentDialog";
import AddNoteDialog from "@/components/clients/profile/dialogs/AddNoteDialog";
import UploadDocumentDialog from "@/components/clients/profile/dialogs/UploadDocumentDialog";
import LogCommunicationDialog from "@/components/clients/profile/dialogs/LogCommunicationDialog";
import AddTaskDialog from "@/components/clients/profile/dialogs/AddTaskDialog";

/**
 * ClientProfile Component
 * 
 * Main component for displaying detailed client information and managing client interactions.
 * This component serves as the central hub for all client-related operations including:
 * - Viewing client details and contact information
 * - Managing notes, communications, tasks, and files
 * - Quick actions for common client operations
 * - Statistics display for horse owners
 * - Navigation between different client data views
 * 
 * The component uses a tabbed interface to organize different types of client data
 * and provides quick access to frequently used actions.
 */
const ClientProfile = () => {
  // Extract client ID from URL parameters for data retrieval
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch client data using the ID from URL params
  // Returns null if client is not found, handled in the component
  const client = getClientById(id as string);
  
  // State management for active tab - controls which content section is displayed
  // Defaults to "overview" which shows a summary of recent activity
  const [activeTab, setActiveTab] = useState("overview");
  
  // Local state for client-related data arrays
  // These allow for real-time updates without refetching from the data source
  const [notes, setNotes] = useState<ClientNote[]>(client?.notes || []);
  const [communications, setCommunications] = useState<CommunicationLog[]>(client?.communication || []);
  const [tasks, setTasks] = useState<ClientTask[]>(client?.tasks || []);
  const [files, setFiles] = useState<ClientFile[]>(client?.files || []);

  // Dialog state management
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [addNoteDialogOpen, setAddNoteDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [logCommunicationDialogOpen, setLogCommunicationDialogOpen] = useState(false);
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);

  // Early return if client is not found - prevents rendering with null data
  if (!client) {
    return <div className="p-6">Client not found</div>;
  }

  // Type checking for horse owner specific features
  // Horse owners have additional properties and functionality
  const isHorseOwner = client.type === "Horse Owner";
  const horseOwner = client as HorseOwner;

  /**
   * Navigation handler for messages
   * Attempts to navigate to the messages page for this specific client
   * Includes error handling with user feedback via toast notifications
   */
  const handleSendMessage = () => {
    try {
      navigate(`/dashboard/messages/${client.id}`);
      toast.success(`Opening messages for ${client.name}`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to open messages");
    }
  };
  
  /**
   * Handler for scheduling appointments
   * Opens the schedule appointment dialog
   */
  const handleScheduleMeeting = () => {
    setScheduleDialogOpen(true);
  };
  
  /**
   * Handler for document uploads
   * Opens the upload document dialog
   */
  const handleUploadDocument = () => {
    setUploadDialogOpen(true);
  };
  
  /**
   * Handler for adding new notes
   * Opens the add note dialog
   */
  const handleAddNote = () => {
    setAddNoteDialogOpen(true);
  };

  /**
   * Handler for logging communications
   * Opens the log communication dialog
   */
  const handleLogCommunication = () => {
    setLogCommunicationDialogOpen(true);
  };

  /**
   * Handler for adding tasks
   * Opens the add task dialog
   */
  const handleAddTask = () => {
    setAddTaskDialogOpen(true);
  };

  /**
   * Navigation handler for viewing linked horses
   * Redirects to the horses page where users can see all horses
   * Includes error handling for navigation failures
   */
  const handleViewHorses = () => {
    try {
      if (isHorseOwner) {
        // Navigate to horses page with client filter
        navigate(`/dashboard/horses?clientId=${client.id}`);
        toast.success(`Viewing horses for ${client.name}`);
      } else {
        navigate("/dashboard/horses");
      }
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate to horses page");
    }
  };

  /**
   * Handler for when a note is added
   * Updates the local notes state
   */
  const handleNoteAdded = (note: any) => {
    setNotes(prev => [note, ...prev]);
  };

  /**
   * Handler for when a document is uploaded
   * Updates the local files state
   */
  const handleDocumentUploaded = (document: any) => {
    setFiles(prev => [document, ...prev]);
  };

  /**
   * Handler for when a communication is logged
   * Updates the local communications state
   */
  const handleCommunicationLogged = (communication: CommunicationLog) => {
    setCommunications(prev => [communication, ...prev]);
  };

  /**
   * Handler for when a task is added
   * Updates the local tasks state
   */
  const handleTaskAdded = (task: ClientTask) => {
    setTasks(prev => [task, ...prev]);
  };

  /**
   * Navigation handler for editing client information
   * Redirects to the client edit form with the current client's ID
   */
  const handleEditClient = () => {
    try {
      navigate(`/dashboard/clients/${client.id}/edit`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to navigate to edit page");
    }
  };

  /**
   * Navigation handler for returning to the clients list
   * Provides a way back to the main clients overview page
   */
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
      <div className="container mx-auto py-6 space-y-4">
        {/* Breadcrumb Navigation - provides context and easy way back to clients list */}
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
        
        {/* Profile Header - displays client name, type, status and primary actions */}
        <ClientProfileHeader 
          client={client} 
          onEditClient={handleEditClient} 
        />

        {/* Basic Information Section - shows contact details and timeline */}
        <ClientBasicInfo client={client} />

        {/* Quick Actions Panel - provides fast access to common operations */}
        <ClientQuickActions 
          client={client}
          onSendMessage={handleSendMessage}
          onScheduleMeeting={handleScheduleMeeting}
          onAddNote={handleAddNote}
          onUploadDocument={handleUploadDocument}
          onViewHorses={isHorseOwner ? handleViewHorses : undefined}
        />

        {/* Statistics Section - only shown for horse owners */}
        {/* Displays horse count, billing info, and linked horses */}
        {isHorseOwner && (
          <ClientStatistics 
            horseOwner={horseOwner} 
            onViewHorses={handleViewHorses} 
          />
        )}

        {/* Main Content Area - Tabbed interface for detailed client data */}
        {/* Includes overview, notes, communications, files, and tasks */}
        <ClientTabsContent 
          client={client}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          notes={notes}
          setNotes={setNotes}
          communications={communications}
          tasks={tasks}
          files={files}
          onViewHorses={handleViewHorses}
          onLogCommunication={handleLogCommunication}
          onUploadFile={handleUploadDocument}
          onAddTask={handleAddTask}
        />

        {/* Dialog Components */}
        <ScheduleAppointmentDialog
          open={scheduleDialogOpen}
          onOpenChange={setScheduleDialogOpen}
          client={client}
        />
        
        <AddNoteDialog
          open={addNoteDialogOpen}
          onOpenChange={setAddNoteDialogOpen}
          client={client}
          onNoteAdded={handleNoteAdded}
        />
        
        <UploadDocumentDialog
          open={uploadDialogOpen}
          onOpenChange={setUploadDialogOpen}
          client={client}
          onDocumentUploaded={handleDocumentUploaded}
        />

        <LogCommunicationDialog
          open={logCommunicationDialogOpen}
          onOpenChange={setLogCommunicationDialogOpen}
          client={client}
          onCommunicationLogged={handleCommunicationLogged}
        />

        <AddTaskDialog
          open={addTaskDialogOpen}
          onOpenChange={setAddTaskDialogOpen}
          client={client}
          onTaskAdded={handleTaskAdded}
        />
      </div>
    </div>
  );
};

export default ClientProfile;
