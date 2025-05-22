
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Client } from '@/types/client';
import ChatInterface from './ChatInterface';

interface ClientChatButtonProps {
  client: Client;
}

const ClientChatButton: React.FC<ClientChatButtonProps> = ({ client }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-2">
          <MessageSquare className="h-4 w-4 mr-1" /> Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] p-0 flex flex-col">
        <ChatInterface client={client} />
      </DialogContent>
    </Dialog>
  );
};

export default ClientChatButton;
