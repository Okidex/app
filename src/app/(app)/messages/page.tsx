
"use client";

import { useState, useEffect } from "react";
import { getCurrentUser, sendMessage } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import UserAvatar from "@/components/shared/user-avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Conversation, FullUserProfile, Message } from "@/lib/types";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useFirestore, useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function MessagesPage() {
    const { user: authUser, isUserLoading: authLoading } = useUser();
    const [currentUser, setCurrentUser] = useState<FullUserProfile | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const { toast } = useToast();
    const db = useFirestore();

    useEffect(() => {
        if (!authLoading && authUser) {
            getCurrentUser().then(setCurrentUser);
        } else if (!authLoading && !authUser) {
            setLoading(false);
        }
    }, [authUser, authLoading]);

    useEffect(() => {
        if (!currentUser || !db) return;

        setLoading(true);
        const q = query(collection(db, "conversations"), where("participantIds", "array-contains", currentUser.id));
        
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const convos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));
            
            const otherParticipantIds = convos.flatMap(c => c.participantIds).filter(id => id !== currentUser.id);
            const uniqueParticipantIds = [...new Set(otherParticipantIds)];

            if (uniqueParticipantIds.length > 0) {
                const usersQuery = query(collection(db, "users"), where("id", "in", uniqueParticipantIds));
                const usersSnap = await getDocs(usersQuery);
                const usersData = usersSnap.docs.map(doc => doc.data() as FullUserProfile);
                
                const populatedConvos = convos.map(convo => {
                    const otherParticipant = usersData.find(u => convo.participantIds.includes(u.id) && u.id !== currentUser.id);
                    const participants = [currentUser, otherParticipant].filter(Boolean) as FullUserProfile[];
                    return { ...convo, participants, messages: convo.messages.sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) };
                });
                
                setConversations(populatedConvos);

                if (populatedConvos.length > 0 && !activeConversationId) {
                    setActiveConversationId(populatedConvos[0].id);
                }
            } else {
                 setConversations([]);
            }
            
            setLoading(false);
        }, (error) => {
            console.error("Error fetching conversations:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser, activeConversationId, db]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversationId || !currentUser) return;

        setIsSending(true);

        const optimisticMessage: Message = {
            id: `temp-${Date.now()}`,
            senderId: currentUser.id,
            text: newMessage,
            timestamp: new Date().toISOString()
        };

        // Optimistic UI update
        const updatedConversations = conversations.map(c => {
            if (c.id === activeConversationId) {
                return { ...c, messages: [...c.messages, optimisticMessage] };
            }
            return c;
        });
        setConversations(updatedConversations);
        setNewMessage("");

        const result = await sendMessage(activeConversationId, {
            senderId: currentUser.id,
            text: newMessage,
        });

        if (!result.success) {
            toast({
                title: "Error Sending Message",
                description: result.error,
                variant: "destructive",
            });
            // Revert optimistic update
            setConversations(conversations);
        }
        setIsSending(false);
    };

    if (authLoading || loading) {
        return (
            <div className="h-[calc(100vh-10rem)] flex">
                 <div className="w-1/3 border-r pr-4 flex flex-col">
                    <Skeleton className="h-8 w-40 mb-4" />
                    <Skeleton className="h-16 w-full mb-2" />
                    <Skeleton className="h-16 w-full mb-2" />
                    <Skeleton className="h-16 w-full" />
                </div>
                 <div className="w-2/3 pl-4 flex flex-col">
                    <Skeleton className="h-6 w-48 mb-4 border-b pb-2" />
                    <div className="flex-1 space-y-4 p-4">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-12 w-3/4 ml-auto" />
                        <Skeleton className="h-12 w-3/4" />
                    </div>
                    <form className="mt-4 flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-10" />
                    </form>
                </div>
            </div>
        )
    }

    if (!currentUser) {
        return <div className="flex items-center justify-center h-full">Please log in to view your messages.</div>
    }

    const activeConversation = conversations.find(c => c.id === activeConversationId);
    
    if (conversations.length === 0) {
        return <div className="flex items-center justify-center h-full">No conversations yet. Start a new one!</div>
    }

    if (conversations.length > 0 && !activeConversation) {
         return <div className="flex items-center justify-center h-full">Select a conversation to start chatting.</div>
    }

    const otherParticipant = (activeConversation!.participants as FullUserProfile[]).find(p => p.id !== currentUser.id)!;


    return (
        <div className="h-[calc(100vh-10rem)] flex">
            <div className="w-1/3 border-r pr-4 flex flex-col">
                <h1 className="text-2xl font-bold font-headline mb-4">Messages</h1>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {conversations.map(convo => {
                        const otherUser = (convo.participants as FullUserProfile[]).find(p => p.id !== currentUser!.id)!;
                        if (!otherUser) return null;
                        const lastMessage = convo.messages[convo.messages.length - 1];

                        return (
                            <Link href="#" key={convo.id} onClick={() => setActiveConversationId(convo.id)}>
                                <div className={cn(
                                    "p-3 rounded-lg flex gap-3 items-start",
                                    convo.id === activeConversationId ? "bg-accent" : "hover:bg-accent/50"
                                )}>
                                    <UserAvatar name={otherUser.name} avatarUrl={otherUser.avatarUrl} />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-semibold truncate">{otherUser.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{lastMessage?.text}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
           {activeConversation && otherParticipant && (
             <div className="w-2/3 pl-4 flex flex-col">
                <div className="border-b pb-2 mb-4">
                    <h2 className="text-xl font-semibold">{otherParticipant.name}</h2>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-background rounded-md">
                    {activeConversation.messages.map(message => (
                        <div key={message.id} className={cn(
                            "flex gap-3",
                            message.senderId === currentUser!.id ? "justify-end" : "justify-start"
                        )}>
                            {message.senderId !== currentUser!.id && (
                                <UserAvatar name={otherParticipant.name} avatarUrl={otherParticipant.avatarUrl} />
                            )}
                             <div className={cn(
                                "p-3 rounded-lg max-w-xs lg:max-w-md",
                                message.senderId === currentUser!.id ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                                <p>{message.text}</p>
                            </div>
                            {message.senderId === currentUser!.id && (
                                <UserAvatar name={currentUser!.name} avatarUrl={currentUser!.avatarUrl} />
                            )}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                    <Input 
                        placeholder="Type a message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={isSending}
                    />
                    <Button type="submit" disabled={isSending || !newMessage.trim()}>
                        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
           )}
        </div>
    );
}
