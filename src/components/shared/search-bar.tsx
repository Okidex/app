"use client";

import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/types";
import { useOkiAgent } from "@/context/oki-agent-context";

interface SearchBarProps {
    userRole?: UserRole;
}

export default function SearchBar({ userRole }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { openAgentWithQuery } = useOkiAgent();

    const getSearchPlaceholder = () => {
        switch(userRole) {
            case 'founder':
                return "e.g., 'fractional CMO' or 'investors for pre-seed saas'...";
            case 'investor':
                return "e.g., 'AI startups in SF' or 'hire fractional leader'...";
            case 'talent':
                return "e.g., 'early stage fintech jobs' or 'founder for health tech'...";
            default:
                return "e.g., 'fintech startups in new york' or 'react engineers'...";
        }
    };

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('search') as string;
        
        const params = new URLSearchParams(searchParams || '');
        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }
        
        router.push(`/search?${params.toString()}`);
    };

    const handleAiSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        const form = (e.currentTarget as HTMLButtonElement).form;
        if (form) {
            const formData = new FormData(form);
            const query = formData.get('search') as string;
            if (query.trim()) {
                openAgentWithQuery(query.trim());
            } else {
                openAgentWithQuery("What can you do?");
            }
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2 w-full">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    name="search"
                    placeholder={getSearchPlaceholder()}
                    className="pl-10 pr-24 w-full h-12 text-base rounded-xl"
                    defaultValue={searchParams?.get('q') || ''}
                />
                 <Button type="submit" variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 text-xs font-semibold">Search</Button>
            </div>
            <Button
                type="button"
                onClick={handleAiSearch}
                className="bg-violet-600 hover:bg-violet-700 text-white h-12 px-4 rounded-xl font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] shrink-0"
            >
                <Sparkles className="h-4 w-4" />
                Ask OkiAgent
            </Button>
        </form>
    );
}
