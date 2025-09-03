
'use client';

import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { users } from '@/lib/data';
import type { Conversation, Message as MessageType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Loader2, SendHorizonal, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// MOCK DATA - This should be replaced with actual Firestore data
const mockConversations: Conversation[] = users.slice(0, 4).map((user, index) => ({
    id: `conv-${index + 1}`,
    participant: user,
    messages: [
        { id: 'msg-1', senderId: user.id, text: `Hey, great to connect! Loved your profile.`, timestamp: '10:30 AM' },
        { id: 'msg-2', senderId: 'user-0', text: `Thanks, ${user.name}! Likewise. I was impressed by your work at ${user.profile.experience?.[0]?.company}.`, timestamp: '10:32 AM' },
        { id: 'msg-3', senderId: user.id, text: 'Would you be open to a quick chat next week?', timestamp: '10:33 AM'},
        { id: 'msg-4', senderId: 'user-0', text: 'Absolutely! I will send over some times.', timestamp: '10:35 AM'}
    ],
    lastMessage: `Thanks, ${user.name}! Likewise...`,
    lastMessageTimestamp: '10:32 AM'
}));


export default function MessagesView() {
  const [conversations, setConversations] = React.useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(conversations[0] || null);
  const [user, loading] = useAuthState(auth);
  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedConversation) return;

    const updatedMessages = selectedConversation.messages.filter(msg => msg.id !== messageId);
    
    const updatedConversation: Conversation = {
        ...selectedConversation,
        messages: updatedMessages,
        lastMessage: updatedMessages.length > 0 ? updatedMessages[updatedMessages.length - 1].text : 'No messages yet.'
    };

    setSelectedConversation(updatedConversation);
    setConversations(prevConvs => prevConvs.map(c => c.id === updatedConversation.id ? updatedConversation : c));
    
    toast({
        title: "Message Deleted",
        description: "The message has been removed from the conversation.",
    });
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (selectedConversation?.id === conversationId) {
        setSelectedConversation(conversations[0] || null);
    }
    toast({
        title: "Conversation Deleted",
        description: "The conversation has been removed.",
    });
  }

  if (loading) {
      return (
          <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <Card className="h-[calc(100vh-10rem)] grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-1 border-r">
        <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <ScrollArea className="h-[calc(100%-4.5rem)]">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={cn(
                "group flex items-start gap-4 p-4 cursor-pointer hover:bg-muted/50",
                selectedConversation?.id === conv.id && "bg-muted"
              )}
              onClick={() => setSelectedConversation(conv)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={conv.participant.avatarUrl} />
                <AvatarFallback>{conv.participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <p className="font-semibold">{conv.participant.name}</p>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground mb-1">{conv.lastMessageTimestamp}</span>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Conversation?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the entire conversation with {conv.participant.name}. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteConversation(conv.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex items-center gap-4 p-4 border-b">
                <Avatar>
                    <AvatarImage src={selectedConversation.participant.avatarUrl} />
                    <AvatarFallback>{selectedConversation.participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{selectedConversation.participant.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedConversation.participant.profile.headline}</p>
                </div>
            </div>
            <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                    {selectedConversation.messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={cn(
                            "group flex items-end gap-2 w-full", 
                            message.senderId !== user?.uid ? "justify-start" : "justify-end"
                          )}
                        >
                            {message.senderId === user?.uid && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                               Are you sure you want to delete this message? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteMessage(message.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}

                            {message.senderId !== user?.uid && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={selectedConversation.participant.avatarUrl} />
                                </Avatar>
                            )}

                            <div className={cn("max-w-xs lg:max-w-md rounded-lg p-3", message.senderId !== user?.uid ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                                <p className="text-sm">{message.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
                <div className="relative">
                    <Input placeholder="Type a message..." className="pr-12"/>
                    <Button size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2">
                        <SendHorizonal className="h-5 w-5"/>
                    </Button>
                </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </Card>
  );
}
