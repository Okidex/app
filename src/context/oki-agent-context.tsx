'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Message {
    role: "user" | "model";
    text: string;
    sources?: { title: string; url: string }[];
}

interface OkiAgentContextType {
    isAgentOpen: boolean;
    setIsAgentOpen: (open: boolean) => void;
    agentInitialQuery: string;
    setAgentInitialQuery: (query: string) => void;
    openAgentWithQuery: (query: string) => void;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const OkiAgentContext = createContext<OkiAgentContextType | undefined>(undefined);

export function OkiAgentProvider({ children }: { children: React.ReactNode }) {
    const [isAgentOpen, setIsAgentOpen] = useState(false);
    const [agentInitialQuery, setAgentInitialQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const openAgentWithQuery = (query: string) => {
        setAgentInitialQuery(query);
        setIsAgentOpen(true);
    };

    return (
        <OkiAgentContext.Provider value={{
            isAgentOpen,
            setIsAgentOpen,
            agentInitialQuery,
            setAgentInitialQuery,
            openAgentWithQuery,
            messages,
            setMessages,
            isLoading,
            setIsLoading
        }}>
            {children}
        </OkiAgentContext.Provider>
    );
}

export function useOkiAgent() {
    const context = useContext(OkiAgentContext);
    if (context === undefined) {
        throw new Error('useOkiAgent must be used within an OkiAgentProvider');
    }
    return context;
}

