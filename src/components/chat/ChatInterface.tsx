
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Client, HorseOwner } from '@/types/client';
import ChatMessage, { Message, AttachmentType } from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Phone, Mail, MapPin, Calendar, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChatInterfaceProps {
  client: Client;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ client }) => {
  // In a real app, you'd fetch messages from API
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Sample data for demonstration
  useEffect(() => {
    // Simulate loading past messages
    const demoMessages: Message[] = [
      {
        id: '1',
        content: 'Hello! How can I help you with your horses today?',
        sender: {
          id: 'staff-1',
          name: 'Stable Manager',
        },
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        isOwn: true,
      },
      {
        id: '2',
        content: 'Hi, I was wondering about the schedule for my horse\'s training this week.',
        sender: {
          id: client.id,
          name: client.name,
          avatar: '',
        },
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        isOwn: false,
      },
      {
        id: '3',
        content: 'Here\'s the training schedule for this week:',
        sender: {
          id: 'staff-1',
          name: 'Stable Manager',
        },
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
        isOwn: true,
        attachment: {
          id: 'file-1',
          type: 'file',
          url: '#',
          filename: 'TrainingSchedule.pdf',
          size: 1240000, // About 1.2 MB
        },
      }
    ];
    
    setMessages(demoMessages);
  }, [client.id, client.name]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (content: string, attachment?: {type: AttachmentType, file: File}) => {
    // In a real app, you'd send this to an API and only add it to the state when confirmed
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender: {
        id: 'staff-1',
        name: 'Stable Manager',
      },
      timestamp: new Date().toISOString(),
      isOwn: true,
      ...(attachment && {
        attachment: {
          id: uuidv4(),
          type: attachment.type,
          url: URL.createObjectURL(attachment.file), // This is temporary and works for demo purposes
          filename: attachment.file.name,
          size: attachment.file.size,
        }
      })
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simulate a response after a short delay (for demo purposes)
    if (messages.length < 5) {
      setTimeout(() => {
        const responseMessage: Message = {
          id: uuidv4(),
          content: `Thank you for your message, ${content.split(' ').slice(0, 2).join(' ')}... I'll get back to you soon!`,
          sender: {
            id: client.id,
            name: client.name,
            avatar: '',
          },
          timestamp: new Date().toISOString(),
          isOwn: false,
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 3000);
    }
  };

  // Type guard to check if client is a HorseOwner
  const isHorseOwner = (client: Client): client is HorseOwner => {
    return client.type === 'Horse Owner';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Enhanced Chat Header with Client Info */}
      <div className="px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary">
                {client.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{client.name}</h3>
              <p className="text-sm text-muted-foreground">
                {client.type} • {client.status}
              </p>
            </div>
          </div>
          
          {/* Client Info Dialog Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <User className="h-4 w-4 mr-2" />
                View Info
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {client.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{client.name}</h2>
                    <Badge variant="secondary" className="mt-1">
                      {client.type}
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                {/* Contact Information */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{client.phone}</span>
                    </div>
                    {client.address && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{client.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Dates */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    Status & Timeline
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                        {client.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Client since:</span>
                      <span>{new Date(client.createdAt).toLocaleDateString()}</span>
                    </div>
                    {client.lastInteraction && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last interaction:</span>
                        <span>{formatDistanceToNow(new Date(client.lastInteraction), { addSuffix: true })}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Horse Owner Specific Info */}
                {isHorseOwner(client) && (
                  <div>
                    <h3 className="font-medium mb-3">Horse Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Horses owned:</span>
                        <span>{client.horsesOwned}</span>
                      </div>
                      {client.stableAssignment && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stable assignment:</span>
                          <span>{client.stableAssignment}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                {client.notes && client.notes.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Recent Notes</h3>
                    <div className="space-y-2">
                      {client.notes.slice(0, 3).map((note) => (
                        <div key={note.id} className="p-3 bg-muted/50 rounded-md">
                          <p className="text-sm">{note.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(note.createdAt).toLocaleDateString()} by {note.createdBy}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      
      <div className="px-4 pb-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
