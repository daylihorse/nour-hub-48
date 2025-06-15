
import { Client, CommunicationLog, ClientNote, HorseOwner } from "@/types/client";
import RecentNotesSection from "./RecentNotesSection";
import RecentCommunicationsSection from "./RecentCommunicationsSection";
import LinkedHorsesSection from "./LinkedHorsesSection";

interface ClientOverviewTabProps {
  client: Client;
  notes: ClientNote[];
  communications: CommunicationLog[];
  onViewHorses: () => void;
}

const ClientOverviewTab = ({ client, notes, communications, onViewHorses }: ClientOverviewTabProps) => {
  const isHorseOwner = client.type === "Horse Owner";
  const horseOwner = client as HorseOwner;

  return (
    <>
      <RecentNotesSection notes={notes} />
      <RecentCommunicationsSection communications={communications} />
      {isHorseOwner && horseOwner.linkedHorses && horseOwner.linkedHorses.length > 0 && (
        <LinkedHorsesSection 
          linkedHorses={horseOwner.linkedHorses} 
          onViewHorses={onViewHorses} 
        />
      )}
    </>
  );
};

export default ClientOverviewTab;
