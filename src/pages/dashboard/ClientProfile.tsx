
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

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = getClientById(id as string);
  
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState<ClientNote[]>(client?.notes || []);
  const [communications, setCommunications] = useState<CommunicationLog[]>(client?.communication || []);
  const [tasks, setTasks] = useState<ClientTask[]>(client?.tasks || []);
  const [files, setFiles] = useState<ClientFile[]>(client?.files || []);

  if (!client) {
    return <div className="p-6">Client not found</div>;
  }

  const isHorseOwner = client.type === "Horse Owner";
  const horseOwner = client as HorseOwner;

  // Quick Actions handlers
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
  
  const handleAddNote = () => {
    setActiveTab("notes");
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
      <div className="container mx-auto py-6 space-y-4">
        {/* Breadcrumb Navigation */}
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
        
        {/* Profile Header */}
        <ClientProfileHeader 
          client={client} 
          onEditClient={handleEditClient} 
        />

        {/* Basic Information */}
        <ClientBasicInfo client={client} />

        {/* Quick Actions */}
        <ClientQuickActions 
          client={client}
          onSendMessage={handleSendMessage}
          onScheduleMeeting={handleScheduleMeeting}
          onAddNote={handleAddNote}
          onUploadDocument={handleUploadDocument}
          onViewHorses={isHorseOwner ? handleViewHorses : undefined}
        />

        {/* Statistics for Horse Owners */}
        {isHorseOwner && (
          <ClientStatistics 
            horseOwner={horseOwner} 
            onViewHorses={handleViewHorses} 
          />
        )}

        {/* Main Content Area - Tabs */}
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
        />
      </div>
    </div>
  );
};

export default ClientProfile;
