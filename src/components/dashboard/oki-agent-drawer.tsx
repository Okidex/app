"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { askOkiAgent } from "@/lib/actions";
import { UserRole } from "@/lib/types";
import { Bot, User, Send, Loader2, Compass, Sparkles, ExternalLink, RefreshCw, Clipboard, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { useOkiAgent, Message } from "@/context/oki-agent-context";

interface OkiAgentDrawerProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    userRole?: UserRole;
    initialQuery?: string;
}

export default function OkiAgentDrawer({
    isOpen,
    onOpenChange,
    userRole,
    initialQuery
}: OkiAgentDrawerProps) {
    const router = useRouter();
    const { 
        messages, 
        setMessages, 
        isLoading, 
        setIsLoading, 
        setAgentInitialQuery 
    } = useOkiAgent();
    
    const [input, setInput] = useState("");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Keep a stable ref of the messages to prevent infinite render/effect loops
    const messagesRef = useRef<Message[]>(messages);
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    // Initial system greeting when drawer opens or changes
    useEffect(() => {
        if (!isOpen) return;
        if (messages.length === 0 && !initialQuery) {
            setMessages([
                {
                    role: "model",
                    text: getGreetingText(userRole)
                }
            ]);
        }
    }, [isOpen, userRole, messages.length, initialQuery, setMessages]);

    // Handle initial query triggered from outside (e.g. dashboard search submit)
    useEffect(() => {
        if (!isOpen) return;
        if (initialQuery && initialQuery.trim()) {
            const queryToRun = initialQuery.trim();
            // Clear the trigger immediately so it only executes once
            setAgentInitialQuery("");
            
            const runInitialQuery = async () => {
                setIsLoading(true);
                const greetingMsg = {
                    role: "model" as const,
                    text: getGreetingText(userRole)
                };
                const userMsg = {
                    role: "user" as const,
                    text: queryToRun
                };
                
                const currentHistory = messagesRef.current;
                
                // Append user message if history exists, otherwise start with greeting
                if (currentHistory.length > 0) {
                    setMessages(prev => [...prev, userMsg]);
                } else {
                    setMessages([greetingMsg, userMsg]);
                }
                
                try {
                    const history = currentHistory.map(msg => ({
                        role: msg.role,
                        parts: [{ text: msg.text }]
                    }));
                    if (history.length === 0) {
                        history.push({
                            role: greetingMsg.role,
                            parts: [{ text: greetingMsg.text }]
                        });
                    }

                    const result = await askOkiAgent(history, queryToRun);
                    
                    let cleanText = result.text;
                    let redirectPath: string | null = null;
                    const redirectMatch = result.text.match(/\[REDIRECT:\s*([^\s\]]+)\]/);
                    if (redirectMatch) {
                        redirectPath = redirectMatch[1];
                        cleanText = result.text.replace(/\[REDIRECT:\s*[^\s\]]+\]/g, "").trim();
                    }

                    setMessages(prev => [
                        ...prev,
                        {
                            role: "model",
                            text: cleanText,
                            sources: result.sources
                        }
                    ]);

                    if (redirectPath) {
                        setTimeout(() => {
                            onOpenChange(false);
                            router.push(redirectPath);
                        }, 1500);
                    }
                } catch (e: any) {
                    console.error("[OKIAGENT-DRAWER-DEBUG] Error during initial query execution:", e);
                    setMessages(prev => [
                        ...prev,
                        {
                            role: "model",
                            text: "Sorry, I had trouble processing that request. Please try again."
                        }
                    ]);
                } finally {
                    setIsLoading(false);
                }
            };

            runInitialQuery();
        }
    }, [isOpen, initialQuery, userRole, setMessages, setIsLoading, setAgentInitialQuery]);

    // Auto-scroll to bottom of chat when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const getGreetingText = (role?: UserRole) => {
        switch (role) {
            case "founder":
                return "Hello! I am **OkiAgent**, your growth assistant. Ask me to find talent, draft pitches, navigate features, or type **'what can you do?'** for a full breakdown. (Note: investor matching requires [Oki+](/settings/billing)). How can I help you today?";
            case "investor":
                return "Welcome back! I am **OkiAgent**, your investment assistant. Ask me to search startups, find talent for portfolio companies, or type **'what can you do?'** for a full breakdown. What can I help you discover today?";
            case "talent":
                return "Hi there! I am **OkiAgent**, your career guide. Ask me to search B2B SaaS jobs, match co-founder roles, or type **'what can you do?'** for a full breakdown. How can I help you today?";
            default:
                return "Hello! I am **OkiAgent**. I can help you search the ecosystem, match theses, draft messages, and search Google. Type **'what can you do?'** to see a full feature list. How can I help you today?";
        }
    };

    const getSuggestions = (role?: UserRole) => {
        switch (role) {
            case "founder":
                return [
                    { label: "🔍 Find Seed SaaS investors", query: "Can you recommend Seed investors focused on B2B SaaS?" },
                    { label: "👥 Hire a fractional COO", query: "I want to hire a fractional COO with startup scaling experience." },
                    { label: "💬 Draft response to investor", query: "Draft a professional reply to an investor named Charles who asked about our cap table." },
                    { label: "🧭 How do I raise capital?", query: "How do I use this platform to raise capital?" }
                ];
            case "investor":
                return [
                    { label: "🚀 Find AI startups in Seed stage", query: "Show me B2B SaaS or AI startups currently in Seed stage." },
                    { label: "💼 Hire talent for portfolio", query: "Find me fractional product leaders or CTOs for my portfolio companies." },
                    { label: "🔍 Match investment thesis", query: "Find startups that match an investment thesis of fintech/logistics." },
                    { label: "🧭 Explore platform features", query: "What are the key pages and features of the Okidex platform?" }
                ];
            case "talent":
                return [
                    { label: "💼 Search HealthTech jobs", query: "Show me job listings in HealthTech or biotech." },
                    { label: "🤝 Find co-founder opportunities", query: "Search for founders who are seeking a technical co-founder." },
                    { label: "🧭 How do I apply for jobs?", query: "Explain how to apply for jobs and connect with startups." },
                    { label: "📈 Google: AI jobs market trends", query: "What are the latest compensation and remote work trends for senior React developers in 2026?" }
                ];
            default:
                return [
                    { label: "🧭 Navigation guide", query: "Can you guide me on how to navigate this app?" },
                    { label: "🔍 Search startups", query: "Search for startups in London." }
                ];
        }
    };

    const handleSendMessage = async (textToSend: string) => {
        if (!textToSend.trim() || isLoading) return;

        const userMsg: Message = { role: "user", text: textToSend };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Map our Message structure to the Gemini API history structure
            const history = messages.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }));

            const result = await askOkiAgent(history, textToSend);

            let cleanText = result.text;
            let redirectPath: string | null = null;
            const redirectMatch = result.text.match(/\[REDIRECT:\s*([^\s\]]+)\]/);
            if (redirectMatch) {
                redirectPath = redirectMatch[1];
                cleanText = result.text.replace(/\[REDIRECT:\s*[^\s\]]+\]/g, "").trim();
            }

            const modelMsg: Message = {
                role: "model",
                text: cleanText,
                sources: result.sources
            };

            setMessages(prev => [...prev, modelMsg]);

            if (redirectPath) {
                setTimeout(() => {
                    onOpenChange(false); // Close the drawer
                    router.push(redirectPath);
                }, 1500);
            }
        } catch (e) {
            console.error(e);
            setMessages(prev => [
                ...prev,
                {
                    role: "model",
                    text: "Sorry, I had trouble processing that request. Please try again."
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // Custom inline Markdown link and bold text renderer
    const parseInlineMarkdown = (text: string): React.ReactNode[] => {
        // Splits by bold text (**text**) and markdown links ([label](url))
        const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={index} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
            } else if (part.startsWith("[") && part.includes("](")) {
                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                if (match) {
                    const label = match[1];
                    const url = match[2];
                    const isInternal = url.startsWith("/") || url.startsWith("#");
                    if (isInternal) {
                        return (
                            <Link
                                key={index}
                                href={url}
                                onClick={() => onOpenChange(false)} // Close drawer on internal navigation
                                className="text-violet-600 dark:text-violet-400 font-semibold underline hover:text-violet-700 transition-colors"
                            >
                                {label}
                            </Link>
                        );
                    } else {
                        return (
                            <a
                                key={index}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-violet-600 dark:text-violet-400 font-semibold underline hover:text-violet-700 transition-colors inline-flex items-center gap-0.5"
                            >
                                {label}
                                <ExternalLink className="h-3 w-3 inline" />
                            </a>
                        );
                    }
                }
            }
            return part;
        });
    };

    const renderMarkdown = (text: string) => {
        if (!text) return null;
        const lines = text.split("\n");

        return lines.map((line, lineIdx) => {
            let isBullet = false;
            let content = line;
            if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                isBullet = true;
                content = line.trim().substring(2);
            }

            const parsed = parseInlineMarkdown(content);

            if (isBullet) {
                return (
                    <li key={lineIdx} className="ml-5 list-disc text-sm leading-relaxed mb-1.5 text-foreground/90">
                        {parsed}
                    </li>
                );
            }

            return (
                <p key={lineIdx} className="text-sm leading-relaxed mb-2.5 min-h-[1rem] text-foreground/90">
                    {parsed}
                </p>
            );
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md md:max-w-lg w-full h-full flex flex-col p-0 border-l border-border bg-gradient-to-b from-background to-muted/20">
                <div className="p-6 border-b bg-background flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="bg-violet-600/10 p-2 rounded-xl text-violet-600 dark:text-violet-400">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                            <SheetTitle className="text-xl font-bold font-headline flex items-center gap-1.5">
                                OkiAgent
                                <span className="bg-violet-600/10 text-violet-600 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full">AI Companion</span>
                            </SheetTitle>
                            <SheetDescription className="text-xs text-muted-foreground">
                                Powered by Gemini AI & Google Search
                            </SheetDescription>
                        </div>
                    </div>
                </div>

                {/* Messages Body */}
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6 pb-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "flex gap-3 max-w-[88%] items-start animate-fade-in",
                                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm",
                                        msg.role === "user"
                                            ? "bg-violet-600 text-white border-violet-700"
                                            : "bg-background text-foreground border-border"
                                    )}
                                >
                                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </div>
                                <div className="space-y-2">
                                    <div
                                        className={cn(
                                            "p-4 rounded-2xl shadow-sm border",
                                            msg.role === "user"
                                                ? "bg-violet-600 text-white border-violet-700 rounded-tr-none"
                                                : "bg-background text-foreground border-border rounded-tl-none"
                                        )}
                                    >
                                        <div className="space-y-1">
                                            {renderMarkdown(msg.text)}
                                        </div>

                                        {/* Actions for drafted messages */}
                                        {msg.role === "model" && msg.text.toLowerCase().includes("draft") && (
                                            <div className="mt-3 pt-3 border-t border-border flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
                                                    onClick={() => handleCopy(msg.text, idx)}
                                                >
                                                    {copiedIndex === idx ? (
                                                        <>
                                                            <Check className="h-3 w-3 mr-1 text-green-500" /> Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clipboard className="h-3 w-3 mr-1" /> Copy Draft
                                                        </>
                                                    )}
                                                </Button>
                                                <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                                                    <Link href="/messages" onClick={() => onOpenChange(false)}>
                                                        Go to Messages
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Google Search Citations */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="bg-background/80 border border-border/50 rounded-xl p-3 shadow-xs space-y-2 max-w-full">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                                <Compass className="h-3.5 w-3.5 text-violet-600" />
                                                Grounded by Google Search
                                            </p>
                                            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                                                {msg.sources.map((source, sidx) => (
                                                    <a
                                                        key={sidx}
                                                        href={source.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[11px] bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground px-2 py-1 rounded-md border flex items-center gap-1 transition-colors max-w-[200px] truncate"
                                                    >
                                                        <span className="truncate">{source.title}</span>
                                                        <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex gap-3 max-w-[85%] items-start">
                                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border bg-background text-foreground shadow-sm">
                                    <Bot className="h-4 w-4" />
                                </div>
                                <div className="bg-background text-foreground border border-border p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
                                    <span className="text-xs text-muted-foreground">OkiAgent is thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Suggestions and Input Box */}
                <div className="p-4 border-t bg-background">
                    {/* Suggestion Chips */}
                    {messages.length <= 1 && !isLoading && (
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                                <Sparkles className="h-3 w-3 text-violet-600" />
                                Suggested Prompts:
                            </p>
                            <div className="grid grid-cols-1 gap-1.5">
                                {getSuggestions(userRole).map((s, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSendMessage(s.query)}
                                        className="text-left text-xs bg-muted/50 hover:bg-violet-600/5 hover:text-violet-700 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-800 transition-all px-3 py-2 rounded-xl border text-muted-foreground flex justify-between items-center group font-medium"
                                    >
                                        <span>{s.label}</span>
                                        <Send className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-violet-600 shrink-0" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Chat Form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(input);
                        }}
                        className="flex gap-2"
                    >
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask OkiAgent anything..."
                            disabled={isLoading}
                            className="focus-visible:ring-violet-600 flex-1 h-11"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-violet-600 hover:bg-violet-700 text-white shrink-0 h-11 px-4"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </form>

                    {messages.length > 1 && !isLoading && (
                        <div className="flex justify-center mt-2.5">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setMessages([
                                        {
                                            role: "model",
                                            text: getGreetingText(userRole)
                                        }
                                    ]);
                                }}
                                className="text-[10px] text-muted-foreground hover:text-foreground h-6 flex items-center gap-1"
                            >
                                <RefreshCw className="h-3 w-3" /> Clear Conversation
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
