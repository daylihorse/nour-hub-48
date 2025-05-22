
import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Client } from '@/types/client';

// Simulate getting clients from the data source
// In a real app, this would be an API call
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const clients = getAllClients();
  
  // Mock conversation data - in a real app this would come from an API
  const conversations: ConversationPreview[] = clients.slice(0, 8).map((client, index) => ({
    clientId: client.id,
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
  
  const filteredConversations = conversations.filter(conv => 
    conv.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleConversationClick = (clientId: string) => {
    navigate(`/dashboard/clients/${clientId}`);
  };
  
  const handleNewConversation = () => {
    navigate('/dashboard/clients');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            Manage all your client communications in one place
          </p>
        </div>
        <Button onClick={handleNewConversation}>
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
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
          <CardContent className="p-0">
            <ScrollArea className="h-[65vh]">
              {filteredConversations.length > 0 ? (
                <div className="divide-y">
                  {filteredConversations.map((conv) => (
                    <div 
                      key={conv.clientId}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        conv.unread ? 'bg-muted/20' : ''
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
        
        {/* Right Panel - Empty State (full chat interface would show when selecting a conversation) */}
        <Card className="lg:col-span-2 flex flex-col items-center justify-center h-[70vh] text-center">
          <MessageSquare className="h-16 w-16 text-muted-foreground/60 mb-4" />
          <h2 className="text-xl font-medium">Select a conversation</h2>
          <p className="text-muted-foreground mb-4 max-w-md">
            Choose a conversation from the list or start a new conversation with a client to begin messaging
          </p>
          <Button onClick={handleNewConversation} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Start a new conversation
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default MessagesDepartment;
