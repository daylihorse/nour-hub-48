
import { FileText, MessageSquare, Phone, Mail, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Client, CommunicationLog, ClientNote, HorseOwner } from "@/types/client";

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
      {/* Recent Notes */}
      <div>
        <h3 className="font-semibold text-base mb-3 flex items-center">
          <FileText className="h-4 w-4 mr-2 text-blue-500" />
          Recent Notes
        </h3>
        {notes.length ? (
          <div className="space-y-2">
            {notes.slice(-3).map((note) => (
              <Card key={note.id} className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                <CardContent className="p-3">
                  <p className="text-sm text-gray-700">{note.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50/50">
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No notes available</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Communications */}
      <div>
        <h3 className="font-semibold text-base mb-3 flex items-center">
          <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
          Recent Communications
        </h3>
        {communications && communications.length ? (
          <div className="space-y-2">
            {communications.slice(-3).map((comm) => (
              <Card key={comm.id} className="bg-gradient-to-r from-green-50 to-green-100/50">
                <CardContent className="p-3">
                  <div className="flex items-center mb-1">
                    {comm.type === "call" && <Phone className="h-3 w-3 mr-2 text-green-600" />}
                    {comm.type === "email" && <Mail className="h-3 w-3 mr-2 text-green-600" />}
                    {comm.type === "message" && <MessageSquare className="h-3 w-3 mr-2 text-green-600" />}
                    {comm.type === "meeting" && <Calendar className="h-3 w-3 mr-2 text-green-600" />}
                    <span className="text-sm font-medium capitalize text-green-700">{comm.type}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comm.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(comm.date), { addSuffix: true })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50/50">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No communication logs available</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Linked Horses for Horse Owners */}
      {isHorseOwner && horseOwner.linkedHorses && horseOwner.linkedHorses.length > 0 && (
        <div>
          <h3 className="font-semibold text-base mb-3 flex items-center">
            <User className="h-4 w-4 mr-2 text-purple-500" />
            Linked Horses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {horseOwner.linkedHorses.map((horseId) => (
              <Card 
                key={horseId}
                className="bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-md transition-all cursor-pointer"
                onClick={onViewHorses}
              >
                <CardContent className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-purple-600" />
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
    </>
  );
};

export default ClientOverviewTab;
