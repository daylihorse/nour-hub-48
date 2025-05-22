
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { File, Image, Mic } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

export type AttachmentType = 'image' | 'file' | 'audio' | null;

export interface Attachment {
  id: string;
  type: AttachmentType;
  url: string;
  filename: string;
  size?: number;
}

export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  isOwn: boolean;
  attachment?: Attachment;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAttachment = message.attachment !== undefined;
  
  // Render the attachment preview based on type
  const renderAttachment = () => {
    if (!message.attachment) return null;
    
    switch (message.attachment.type) {
      case 'image':
        return (
          <div className="rounded-md overflow-hidden mb-2 max-w-[240px]">
            <img 
              src={message.attachment.url} 
              alt={message.attachment.filename}
              className="w-full h-auto object-cover"
            />
          </div>
        );
      case 'file':
        return (
          <div className="flex items-center p-2 bg-accent/30 rounded-md mb-2">
            <File className="h-5 w-5 mr-2 text-blue-500" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{message.attachment.filename}</p>
              {message.attachment.size && (
                <p className="text-xs text-muted-foreground">
                  {(message.attachment.size / 1024).toFixed(1)} KB
                </p>
              )}
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="flex items-center p-2 bg-accent/30 rounded-md mb-2">
            <Mic className="h-5 w-5 mr-2 text-purple-500" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Voice message</p>
              <audio controls className="mt-1 max-w-[200px]">
                <source src={message.attachment.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex mb-4",
      message.isOwn ? "justify-end" : "justify-start"
    )}>
      {!message.isOwn && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {message.sender.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[75%]",
        message.isOwn ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-xl p-3",
          message.isOwn 
            ? "bg-primary text-primary-foreground rounded-br-sm" 
            : "bg-muted rounded-bl-sm"
        )}>
          {renderAttachment()}
          
          {message.content && (
            <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
        
        <div className={cn(
          "text-xs text-muted-foreground mt-1",
          message.isOwn ? "text-right" : "text-left"
        )}>
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      </div>
      
      {message.isOwn && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src="/user-avatar.png" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            ME
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
