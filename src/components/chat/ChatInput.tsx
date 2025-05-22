
import React, { useState, useRef } from 'react';
import { 
  Paperclip, 
  Image, 
  Mic, 
  Send, 
  Smile, 
  File 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { AttachmentType } from './ChatMessage';

interface ChatInputProps {
  onSendMessage: (content: string, attachment?: {type: AttachmentType, file: File}) => void;
}

const EMOJI_LIST = [
  '😊', '😁', '😂', '🥰', '😎', '👍', '🙏', '🐴', '❤️', '👋', 
  '😀', '🤔', '👏', '🤩', '🔥', '✨', '🌟', '💯', '🎉', '🙌'
];

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [attachmentType, setAttachmentType] = useState<AttachmentType>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = () => {
    if ((!message.trim() && !selectedFile) || isRecording) return;
    
    if (selectedFile) {
      onSendMessage(message, {
        type: attachmentType,
        file: selectedFile
      });
    } else {
      onSendMessage(message);
    }
    
    setMessage('');
    setSelectedFile(null);
    setAttachmentType(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: AttachmentType) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setAttachmentType(type);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };
  
  const handleMicClick = () => {
    // Toggle recording state - in a real app, this would use the MediaRecorder API
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // In a real implementation, here you'd stop recording and process the audio
      // For demo purposes, simulate getting an audio file
      setTimeout(() => {
        setIsRecording(false);
        // Simulate a voice recording file
        // In a real app, you would create a Blob from the recording
      }, 500);
    }
  };
  
  const clearAttachment = () => {
    setSelectedFile(null);
    setAttachmentType(null);
  };

  return (
    <div className="border-t pt-3">
      {selectedFile && (
        <div className="flex items-center mb-2 p-2 bg-muted/50 rounded-md">
          {attachmentType === 'image' ? (
            <Image className="h-4 w-4 mr-2 text-blue-500" />
          ) : (
            <File className="h-4 w-4 mr-2 text-blue-500" />
          )}
          <span className="text-sm truncate flex-1">
            {selectedFile.name}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAttachment} 
            className="h-6 w-6 p-0"
          >
            &times;
          </Button>
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="resize-none min-h-[60px] pr-12 py-3"
          />
          
          <div className="absolute right-2 bottom-2 flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-64 p-2" 
                align="end"
                alignOffset={-40}
                sideOffset={5}
              >
                <div className="grid grid-cols-5 gap-2">
                  {EMOJI_LIST.map(emoji => (
                    <button
                      key={emoji}
                      className="text-xl h-10 w-10 flex items-center justify-center rounded hover:bg-muted transition-colors"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e, 'file')}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleFileChange(e, 'image')}
            className="hidden"
            accept="image/*"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => imageInputRef.current?.click()}
          >
            <Image className="h-5 w-5" />
          </Button>
          
          <Button
            variant={isRecording ? "default" : "ghost"}
            size="icon"
            className={cn(
              "rounded-full transition-colors",
              isRecording 
                ? "text-white bg-red-500 hover:bg-red-600" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={handleMicClick}
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            className="rounded-full ml-1"
            onClick={handleSendMessage}
            disabled={(!message.trim() && !selectedFile) || isRecording}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
