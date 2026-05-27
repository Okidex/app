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
import { useUser, useFirestore, useAuth } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";

const StartupResultCard = ({ startup }: { startup: Startup }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        {/* Note: Ensure storage.googleapis.com is in next.config.ts for this to work */}
        <Image src={startup.companyLogoUrl} alt={startup.companyName} width={56} height={56} className="rounded-full border object-cover" data-ai-hint="logo" />
        <div className="flex-1">
          <CardTitle>{startup.companyName}</CardTitle>
          <CardDescription>{startup.tagline}</CardDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Badge variant="secondary">{startup.industry}</Badge>
            <Badge variant="outline">{startup.stage}</Badge>
          </div>
        </div>
        <Button asChild variant="outline" size="sm">
            <Link href={`/users/${startup.founderIds[0]}`}>View</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{startup.description}</p>
      </CardContent>
    </Card>
  );
};

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

  const isPremiumFounder = user.role === 'founder' && (user.profile as FounderProfile)?.isPremium === true;

  return (
    <Card className={isPremiumFounder ? "border-amber-500/30 bg-amber-500/[0.02] shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" : "hover:shadow-md transition-all duration-300"}>
      <CardHeader className="flex flex-row items-start gap-4">
        <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-14 h-14" />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle>{user.name}</CardTitle>
            {isPremiumFounder && (
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-none text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
                Oki+
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <CardDescription className="capitalize font-medium">{user.role}</CardDescription>
            {isPremiumFounder && (
              <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 text-[10px] px-2 py-0 font-semibold">
                Actively Fundraising
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground mt-1">{details || <Skeleton className="h-4 w-48" />}</div>
        </div>
        <Button asChild variant="outline" size="sm">
            <Link href={`/user?id=${user.id}`}>View Profile</Link>
        </Button>
      </CardHeader>
    </Card>
  );
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<{ startups: Startup[], users: FullUserProfile[] }>({ startups: [], users: [] });
  const { user: currentUser, isUserLoading: authLoading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
          const idToken = auth?.currentUser ? await auth.currentUser.getIdToken() : null;
          const headers: HeadersInit = { 'Content-Type': 'application/json' };
          if (idToken) {
              headers['Authorization'] = `Bearer ${idToken}`;
          }
          const response = await fetch('/api/search', {
              method: 'POST',
              headers,
              body: JSON.stringify({ query })
          });
          const searchResults = await response.json();
          setResults(searchResults);
      } catch (e) {
          console.error("[DEBUG-SEARCH] API failed:", e);
      }
      setLoading(false);
    };

    if (query) {
        fetchResults();
    } else {
        setLoading(false);
        setResults({ startups: [], users: [] });
    }
  }, [query, auth]);

  // --- CLIENT-SIDE FAIL-SAFE ---
  // Filter out self and restrict searching for investors to paying Oki+ subscribers
  const filteredUsers = useMemo(() => {
    if (!currentUser) return results.users.filter(u => u.role !== 'investor');
    
    let users = results.users.filter(u => u.id !== currentUser.id);

    // Founders (premium or not) cannot see investors in search.
    // They must appeal to investors via live investment theses.
    const isFounder = currentUser.role === 'founder';
    const isInvestorUser = currentUser.role === 'investor';

    if (isFounder) {
        users = users.filter(u => u.role !== 'investor');
    }

    // When investors perform a search, they may only uncover paying Oki+ founders
    if (isInvestorUser) {
        users = users.filter(u => {
            if (u.role === 'founder') {
                return (u.profile as FounderProfile)?.isPremium === true;
            }
            return true;
        });
    }

    return users;
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
          subtext: "Use natural language to discover top-tier talent, including fractional leaders to build your team. To attract investors, browse and respond to our live Investment Theses."
        };
      case 'investor':
        return {
          headline: "Discover Your Next Opportunity",
          subtext: "Use natural language to find promising Oki+ founders, hire top-tier talent like fractional leaders for your firm, or connect with other investors for your fund."
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

        {/* CTA banner for founders: direct them to Investment Theses */}
        {currentUser?.role === 'founder' && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 max-w-2xl mx-auto w-full">
                <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">Looking to raise capital?</p>
                    <p className="text-xs text-muted-foreground">Attract investors by responding to their live investment theses — not by searching for them.</p>
                </div>
                <Link
                    href="/theses"
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                    Browse Theses →
                </Link>
            </div>
        )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ) : query && (results.startups.length > 0 || filteredUsers.length > 0) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {results.startups.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      Startups <Badge variant="secondary">{results.startups.length}</Badge>
                    </h2>
                    {results.startups.map(startup => <StartupResultCard key={startup.id} startup={startup} />)}
                </div>
            )}
            {filteredUsers.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      People <Badge variant="secondary">{filteredUsers.length}</Badge>
                    </h2>
                    {/* Using filteredUsers instead of results.users */}
                    {filteredUsers.map(user => <UserResultCard key={user.id} user={user} />)}
                </div>
            )}
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
