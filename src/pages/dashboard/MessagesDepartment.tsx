import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Search, Plus } from 'lucide-react';
import { Client } from '@/types/client';
import ChatInterface from '@/components/chat/ChatInterface';

// Import the getAllClients function from data/clients
import { getAllClients } from '@/data/clients';

interface ConversationPreview {
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const MessagesDepartment = () => {
  const { id: clientIdFromUrl } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  
  const clients = getAllClients();
  
  // Create conversations using the actual client IDs
  const conversations: ConversationPreview[] = clients.slice(0, 8).map((client, index) => ({
    clientId: client.id, // Use actual client.id instead of generating new ones
    clientName: client.name,
    clientAvatar: undefined,
    lastMessage: index % 3 === 0 
      ? "When is the next training session scheduled?" 
      : index % 3 === 1
      ? "I'll be visiting the stable tomorrow afternoon."
      : "Thank you for the update on my horse's health.",
    timestamp: new Date(Date.now() - (index * 3600000)).toISOString(), // Hours ago
    unread: index % 4 === 0,
  }));

  // Auto-select client if accessed via client profile
  useEffect(() => {
    if (clientIdFromUrl) {
      const client = clients.find(c => c.id === clientIdFromUrl);
      if (client) {
        setActiveClient(client);
      }
    }
  }, [clientIdFromUrl, clients]);
  
  const filteredConversations = conversations.filter(conv => 
    conv.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleConversationClick = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setActiveClient(client);
    }
  };
  
  const handleNewConversation = () => {
    setActiveClient(null);
  };

  return (
    <div className="container mx-auto p-6 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            {clientIdFromUrl 
              ? `Chatting with ${activeClient?.name || 'client'}` 
              : "Manage all your client communications in one place"
            }
          </p>
        </div>
        <Button onClick={handleNewConversation}>
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left Panel - Conversations List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 min-h-0">
            <ScrollArea className="h-full">
              {filteredConversations.length > 0 ? (
                <div className="divide-y">
                  {filteredConversations.map((conv) => (
                    <div 
                      key={conv.clientId}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        activeClient && activeClient.id === conv.clientId ? 'bg-muted' : conv.unread ? 'bg-muted/20' : ''
                      }`}
                      onClick={() => handleConversationClick(conv.clientId)}
                    >
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={conv.clientAvatar} />
                          <AvatarFallback className={`${conv.unread ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {conv.clientName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className={`font-medium truncate ${conv.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {conv.clientName}
                            </p>
                            <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {formatDistanceToNow(new Date(conv.timestamp), { addSuffix: true })}
                            </p>
                          </div>
                          <p className={`text-sm truncate ${conv.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                            {conv.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No conversations found with "{searchQuery}"</p>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No conversations yet</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* Right Panel - Chat Interface or Empty State */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {activeClient ? (
            <ChatInterface client={activeClient} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <MessageSquare className="h-16 w-16 text-muted-foreground/60 mb-4" />
              <h2 className="text-xl font-medium">Select a conversation</h2>
              <p className="text-muted-foreground mb-4 max-w-md">
                Choose a conversation from the list or start a new conversation with a client to begin messaging
              </p>
              <Button onClick={() => window.location.href = '/dashboard/clients'} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Start a new conversation
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesDepartment;
