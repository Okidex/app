"use client";

import { useSearchParams } from "next/navigation";
import { FullUserProfile, Startup, FounderProfile, InvestorProfile, TalentProfile } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import UserAvatar from "@/components/shared/user-avatar";
import { useEffect, useState, useMemo } from "react";
import { getSearchResults } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/shared/search-bar";
import { useUser, useFirestore } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";

const UserResultCard = ({ user }: { user: FullUserProfile }) => {
    const [details, setDetails] = useState("");
    const db = useFirestore();

    useEffect(() => {
        const getProfileDetails = async () => {
            if (!db || !user.profile) {
                setDetails('');
                return;
            };

            switch (user.role) {
                case 'investor':
                    const investorProfile = user.profile as InvestorProfile;
                    setDetails((investorProfile.investmentInterests || []).slice(0, 3).join(' / '));
                    break;
                case 'talent':
                    const talentProfile = user.profile as TalentProfile;
                    setDetails(talentProfile.headline || (talentProfile.skills || []).slice(0, 4).join(' / ') || '');
                    break;
                case 'founder':
                    const founderProfile = user.profile as FounderProfile;
                    const companyId = founderProfile.companyId;
                    if (companyId) {
                        const startupDoc = await getDoc(doc(db, "startups", companyId));
                        if (startupDoc.exists()) {
                            const startup = startupDoc.data() as Startup;
                            setDetails(`${founderProfile.title} at ${startup.companyName}`);
                        } else {
                            setDetails(founderProfile.title || 'Founder');
                        }
                    } else {
                         setDetails(founderProfile.title || 'Founder');
                    }
                    break;
                default:
                    setDetails('');
            }
        }
        getProfileDetails();
    }, [user, db]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-16 h-16" />
        <div className="flex-1">
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription className="capitalize text-base mt-0.5 text-primary font-medium">{user.role}</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
            <Link href={`/users/${user.id}`}>View Profile</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground leading-relaxed">{details || <Skeleton className="h-4 w-48" />}</div>
      </CardContent>
    </Card>
  );
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<{ startups: Startup[], users: FullUserProfile[] }>({ startups: [], users: [] });
  const { user: currentUser, isUserLoading: authLoading } = useUser();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const searchResults = await getSearchResults(query);
      setResults(searchResults);
      setLoading(false);
    };

    if (query) {
        fetchResults();
    } else {
        setLoading(false);
        setResults({ startups: [], users: [] });
    }
  }, [query]);

  // --- CLIENT-SIDE FAIL-SAFE ---
  // We use useMemo to filter out the current user even if the server action missed them.
  const filteredUsers = useMemo(() => {
    if (!currentUser) return results.users;
    return results.users.filter(u => u.id !== currentUser.id);
  }, [results.users, currentUser]);

  if (authLoading) {
    return (
      <div className="space-y-8 p-4">
        <div className="flex flex-col items-center text-center gap-4">
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-6 w-full max-w-2xl" />
        </div>
      </div>
    );
  }

  const getSearchCopy = () => {
    if (!currentUser) {
        return {
          headline: "Search the Ecosystem",
          subtext: "Find your next connection on Okidex. Log in to personalize your search."
        };
    }
    switch (currentUser.role) {
      case 'founder':
        return {
          headline: "Discover talent, power your business.",
          subtext: "Use natural language to discover top-tier talent, including fractional leaders to build your team, or find investors who are excited about your industry and stage."
        };
      case 'investor':
        return {
          headline: "Discover Your Next Opportunity",
          subtext: "Use natural language to find promising founders, hire top-tier talent like fractional leaders for your firm, or connect with other investors for your fund."
        };
      case 'talent':
        return {
          headline: "Find Your Next Role",
          subtext: "Use natural language to discover innovative startups, find your next co-founder, or connect with other talented professionals in your field."
        };
      default:
        return {
          headline: "Search the Ecosystem",
          subtext: "Find your next connection on Okidex."
        };
    }
  };

  const { headline, subtext } = getSearchCopy();

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight">{headline}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
                {subtext}
            </p>
            <div className="w-full max-w-2xl mt-2">
                <SearchBar userRole={currentUser?.role} />
            </div>
        </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ) : query && filteredUsers.length > 0 ? (
        <div className="flex flex-col gap-8 w-full">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  People <Badge variant="secondary">{filteredUsers.length}</Badge>
                </h2>
                {filteredUsers.map(user => <UserResultCard key={user.id} user={user} />)}
            </div>
        </div>
      ) : query ? (
        <Card className="text-center p-12 max-w-2xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>No results found for "{query}"</CardTitle>
                <CardDescription>
                  Try adjusting your search terms or role filters.
                </CardDescription>
            </CardHeader>
        </Card>
      ) : null}
    </div>
  );
}
