
"use client";

import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/types";

interface SearchBarProps {
    userRole?: UserRole;
}

export default function SearchBar({ userRole }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

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
        
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }
        
        router.push(`/search?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    name="search"
                    placeholder={getSearchPlaceholder()}
                    className="pl-10 w-full h-12 text-base"
                    defaultValue={searchParams.get('q') || ''}
                />
                 <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-10">Search</Button>
            </div>
        </form>
    );
}
