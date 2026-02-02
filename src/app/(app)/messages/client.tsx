"use client";

import { useState, useEffect, useRef } from "react";
import { sendMessage } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import UserAvatar from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import { Conversation, FullUserProfile, Message } from "@/lib/types";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function MessagesClientContent() {
    const { user: currentUser, isUserLoading: authLoading } = useUser();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const db = useFirestore();

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [conversations, activeConversationId]);

    const conversationsQuery = useMemoFirebase(() => 
        currentUser?.id && db 
            ? query(collection(db, "conversations"), where("participantIds", "array-contains", currentUser.id))
            : null
    , [currentUser, db]);

    useEffect(() => {
        if (!conversationsQuery) {
            if (!authLoading) setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = onSnapshot(conversationsQuery, async (snapshot) => {
            const convos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));
            
            const otherParticipantIds = convos.flatMap(c => c.participantIds).filter(id => id !== currentUser?.id);
            const uniqueParticipantIds = [...new Set(otherParticipantIds)];

            if (uniqueParticipantIds.length > 0 && db) {
                const usersQuery = query(collection(db, "users"), where("id", "in", uniqueParticipantIds));
                const usersSnap = await getDocs(usersQuery);
                const usersData = usersSnap.docs.map(doc => doc.data() as FullUserProfile);
                
                const populatedConvos = convos.map(convo => {
                    const otherParticipant = usersData.find(u => convo.participantIds.includes(u.id) && u.id !== currentUser?.id);
                    const participants = [currentUser, otherParticipant].filter(Boolean) as FullUserProfile[];
                    return { 
                        ...convo, 
                        participants, 
                        messages: (convo.messages || []).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) 
                    };
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
    }, [conversationsQuery, currentUser, activeConversationId, db, authLoading]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversationId || !currentUser) return;

        setIsSending(true);
        const originalConversations = [...conversations];
        const textToSend = newMessage.trim();

        const optimisticMessage: Message = {
            id: `temp-${Date.now()}`,
            senderId: currentUser.id,
            text: textToSend,
            timestamp: new Date().toISOString()
        };

        setConversations(prev => prev.map(c => {
            if (c.id === activeConversationId) {
                return { ...c, messages: [...(c.messages || []), optimisticMessage] };
            }
            return c;
        }));
        setNewMessage("");

        try {
            const response = await sendMessage(activeConversationId, textToSend);
            if (response && !response.success) {
                throw new Error(response.error || "Failed to send");
            }
        } catch (error: any) {
            toast({
                title: "Error Sending Message",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
            setConversations(originalConversations);
        } finally {
            setIsSending(false);
        }
    };

    if (authLoading || loading) {
       return (
            <div className="h-[calc(100vh-10rem)] flex gap-4">
                 <div className="w-1/3 border-r pr-4 space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
                 <div className="w-2/3 space-y-4">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-full w-full" />
                </div>
            </div>
        );
    }

    if (!currentUser) return <div className="flex items-center justify-center h-full">Please log in to view messages.</div>;
    
    const activeConversation = conversations.find(c => c.id === activeConversationId);
    const otherParticipant = activeConversation?.participants?.find(p => p.id !== currentUser.id);

    return (
        <div className="h-[calc(100vh-10rem)] flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/3 border-r pr-4 flex flex-col">
                <h1 className="text-2xl font-bold font-headline mb-4">Messages</h1>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {conversations.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center mt-8">No conversations yet.</p>
                    ) : (
                        conversations.map(convo => {
                            const otherUser = convo.participants?.find(p => p.id !== currentUser.id);
                            if (!otherUser) return null;
                            const lastMsg = convo.messages[convo.messages.length - 1];

                            return (
                                <button 
                                    key={convo.id} 
                                    onClick={() => setActiveConversationId(convo.id)}
                                    className={cn(
                                        "w-full text-left p-3 rounded-lg flex gap-3 items-start transition-colors",
                                        convo.id === activeConversationId ? "bg-accent" : "hover:bg-accent/50"
                                    )}
                                >
                                    <UserAvatar name={otherUser.name} avatarUrl={otherUser.avatarUrl} />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-semibold truncate">{otherUser.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{lastMsg?.text || "Started a conversation"}</p>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 pl-4 flex flex-col">
                {activeConversation && otherParticipant ? (
                    <>
                        <div className="border-b pb-3 mb-4 flex items-center gap-3">
                            <UserAvatar name={otherParticipant.name} avatarUrl={otherParticipant.avatarUrl} className="w-8 h-8" />
                            <h2 className="text-lg font-semibold">{otherParticipant.name}</h2>
                        </div>
                        
                        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth">
                            {activeConversation.messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={cn(
                                        "max-w-[75%] p-3 rounded-2xl text-sm",
                                        msg.senderId === currentUser.id 
                                            ? "ml-auto bg-primary text-primary-foreground rounded-tr-none" 
                                            : "bg-muted rounded-tl-none"
                                    )}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                            <Input 
                                value={newMessage} 
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Write a message..."
                                disabled={isSending}
                                className="focus-visible:ring-primary"
                            />
                            <Button type="submit" disabled={isSending || !newMessage.trim()}>
                                {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Select a conversation to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
