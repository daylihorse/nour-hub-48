
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '@/types/client';
import ChatMessage, { Message, AttachmentType } from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b">
        <h3 className="font-medium">Chat with {client.name}</h3>
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
