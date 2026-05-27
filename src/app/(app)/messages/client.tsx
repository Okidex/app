"use client";

import { useState, useEffect } from "react";
import { 
    collection, 
    query, 
    where, 
    getDocs, 
    onSnapshot, 
    orderBy,
    addDoc,
    doc,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";
import { useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Conversation, FullUserProfile, Message } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Sparkles } from "lucide-react";
import { useOkiAgent } from "@/context/oki-agent-context";
import UserAvatar from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MessagesClientContent() {
    const { user: currentUser, isUserLoading: authLoading } = useUser();
    const searchParams = useSearchParams();
    const idFromUrl = searchParams?.get('id');
    const { openAgentWithQuery } = useOkiAgent();

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeMessages, setActiveMessages] = useState<Message[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const { toast } = useToast();
    const db = useFirestore();

    const conversationsQuery = useMemoFirebase(() => 
        currentUser?.id && db 
            ? query(collection(db, "conversations"), where("participantIds", "array-contains", currentUser.id))
            : null
    , [currentUser, db]);

    // 1. Listen for Conversations & Populate Participants
    useEffect(() => {
        if (!conversationsQuery || !db) {
            if (!authLoading) setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(conversationsQuery, async (snapshot) => {
            const convos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));
            const otherParticipantIds = [...new Set(convos.flatMap(c => c.participantIds).filter(id => id !== currentUser?.id))];

            if (otherParticipantIds.length > 0) {
                const usersQuery = query(collection(db, "users"), where("id", "in", otherParticipantIds));
                const usersSnap = await getDocs(usersQuery);
                const usersData = usersSnap.docs.map(doc => doc.data() as FullUserProfile);
                
                const populatedConvos = convos.map(convo => {
                    const otherParticipant = usersData.find(u => convo.participantIds.includes(u.id) && u.id !== currentUser?.id);
                    return { 
                        ...convo, 
                        participants: [currentUser, otherParticipant].filter(Boolean) as FullUserProfile[]
                    };
                });
                
                setConversations(populatedConvos);
                
                // Set active conversation: prefer URL param, then first convo
                if (idFromUrl && populatedConvos.some(c => c.id === idFromUrl)) {
                    setActiveConversationId(idFromUrl);
                } else if (populatedConvos.length > 0 && !activeConversationId) {
                    setActiveConversationId(populatedConvos[0].id);
                }
            } else {
                setConversations([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error loading conversations:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [conversationsQuery, currentUser, db, authLoading, activeConversationId, idFromUrl]);

    // 2. Listen for Messages in Sub-collection (Real-time updates)
    useEffect(() => {
        if (!activeConversationId || !db) return;

        const msgsQuery = query(
            collection(db, "conversations", activeConversationId, "messages"),
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(msgsQuery, (snapshot) => {
            const msgs = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
                } as Message;
            });
            setActiveMessages(msgs);
        });

        return () => unsubscribe();
    }, [activeConversationId, db]);
    
    // 3. Mark notifications as read when conversation becomes active
    useEffect(() => {
        if (!activeConversationId || !currentUser || !db) return;

        const q = query(
            collection(db, "notifications"),
            where("userId", "==", currentUser.id),
            where("type", "==", "message"),
            where("isRead", "==", false)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach(async (d) => {
                const notifData = d.data();
                if (notifData.link === `/messages?id=${activeConversationId}` || notifData.link?.includes(activeConversationId)) {
                    try {
                        await updateDoc(doc(db, "notifications", d.id), { isRead: true });
                    } catch (e) {
                        console.error("[DEBUG-MESSAGES] Failed to mark notification as read:", e);
                    }
                }
            });
        });

        return () => unsubscribe();
    }, [activeConversationId, currentUser, db]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversationId || !currentUser || !db) return;

        const textToSend = newMessage;
        setNewMessage("");
        setIsSending(true);

        try {
            // 1. Add message to sub-collection
            await addDoc(collection(db, "conversations", activeConversationId, "messages"), {
                senderId: currentUser.id,
                text: textToSend.trim(),
                timestamp: serverTimestamp()
            });

            // 2. Update conversation metadata
            await updateDoc(doc(db, "conversations", activeConversationId), {
                lastMessage: textToSend.trim(),
                lastMessageTimestamp: serverTimestamp()
            });

            // 3. Create notification for recipient
            const activeConversation = conversations.find(c => c.id === activeConversationId);
            const recipientId = activeConversation?.participantIds?.find(id => id !== currentUser.id);
            if (recipientId) {
                await addDoc(collection(db, "notifications"), {
                    userId: recipientId,
                    type: "message",
                    text: `${currentUser.name} sent you a message: "${textToSend.trim().substring(0, 50)}${textToSend.trim().length > 50 ? '...' : ''}"`,
                    isRead: false,
                    timestamp: serverTimestamp(),
                    senderId: currentUser.id,
                    link: `/messages?id=${activeConversationId}`
                });
            }
        } catch (error: any) {
            console.error("[DEBUG-MESSAGES] Send failed:", error);
            toast({
                title: "Failed to send",
                description: error.message || "An unknown error occurred",
                variant: "destructive",
            });
            setNewMessage(textToSend);
        }
        setIsSending(false);
    };

    if (authLoading || loading) return <MessagesSkeleton />;
    if (!currentUser) return <div className="flex items-center justify-center h-full">Log in to view messages.</div>;
    
    const activeConversation = conversations.find(c => c.id === activeConversationId);
    if (conversations.length === 0) return <div className="flex items-center justify-center h-full flex-col gap-4">
        <p className="text-muted-foreground">No conversations yet.</p>
        <Button asChild variant="outline">
            <Link href="/search">Find people to connect with</Link>
        </Button>
    </div>;
    
    const otherParticipant = activeConversation?.participants?.find(p => p.id !== currentUser.id);

    return (
        <div className="h-[calc(100vh-10rem)] flex">
            {/* Sidebar */}
            <div className="w-1/3 border-r pr-4 flex flex-col overflow-hidden">
                <h1 className="text-2xl font-bold font-headline mb-4">Messages</h1>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {conversations.map(convo => {
                        const otherUser = convo.participants?.find(p => p.id !== currentUser.id);
                        if (!otherUser) return null;
                        return (
                            <button 
                                key={convo.id} 
                                onClick={() => setActiveConversationId(convo.id)}
                                className={cn("w-full p-3 rounded-lg flex gap-3 text-left transition-colors", 
                                    convo.id === activeConversationId ? "bg-accent" : "hover:bg-accent/50")}
                            >
                                <UserAvatar name={otherUser.name} avatarUrl={otherUser.avatarUrl} />
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-semibold truncate">{otherUser.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {convo.lastMessage || "No messages yet"}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col pl-4">
                {activeConversation && otherParticipant ? (
                    <>
                        <div className="border-b pb-2 mb-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <UserAvatar name={otherParticipant.name} avatarUrl={otherParticipant.avatarUrl} className="h-8 w-8" />
                                <h2 className="font-bold text-lg">{otherParticipant.name}</h2>
                            </div>
                            <Button asChild variant="ghost" size="sm">
                                <Link href={`/user?id=${otherParticipant.id}`} prefetch={false}>View Profile</Link>
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-4 p-4">
                            {activeMessages.map((msg) => (
                                <div key={msg.id} className={cn("flex", msg.senderId === currentUser.id ? "justify-end" : "justify-start")}>
                                    <div className={cn("max-w-[70%] p-3 rounded-2xl shadow-sm", 
                                        msg.senderId === currentUser.id ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none")}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 items-center">
                            <Input 
                                value={newMessage} 
                                onChange={(e) => setNewMessage(e.target.value)} 
                                placeholder="Type a message..."
                                disabled={isSending}
                                className="focus-visible:ring-primary flex-1"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="border-violet-500/30 text-violet-600 hover:bg-violet-600/5 hover:text-violet-700 font-semibold shrink-0"
                                onClick={() => openAgentWithQuery(`Draft a friendly message to ${otherParticipant.name} (Role: ${otherParticipant.role}) introducing myself and asking about their startup goals.`)}
                            >
                                <Sparkles className="h-4 w-4 mr-1 text-violet-500" />
                                Draft with AI
                            </Button>
                            <Button type="submit" size="icon" disabled={isSending || !newMessage.trim()} className="shrink-0">
                                {isSending ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        Select a conversation to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}

function MessagesSkeleton() {
    return (
        <div className="h-[calc(100vh-10rem)] flex">
            <div className="w-1/3 border-r pr-4 space-y-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
            <div className="flex-1 pl-4 flex flex-col">
                <Skeleton className="h-10 w-48 mb-4" />
                <div className="flex-1 space-y-4">
                    <Skeleton className="h-12 w-1/2" />
                    <Skeleton className="h-12 w-1/2 ml-auto" />
                </div>
            </div>
        </div>
    );
}