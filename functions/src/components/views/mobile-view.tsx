
'use client';

import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, doc, getDoc, query, where, limit } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User } from '@/lib/types';
import { prioritizeProfileAttributes, PrioritizeProfileAttributesOutput } from '@/ai/flows/prioritize-profile-attributes';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Lightbulb, Loader2, X } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import CardStack from '../card-stack';

function MatchCard({ user, currentUser }: { user: User, currentUser: User | null }) {
  const [matchInfo, setMatchInfo] = React.useState<PrioritizeProfileAttributesOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getMatchInfo() {
      if (!currentUser || !user.profile) return;

      setIsLoading(true);
      try {
        const profileAttributes = `
                    Name: ${user.name},
                    Role: ${user.role},
                    Headline: ${user.profile.headline},
                    Summary: ${user.profile.summary},
                    Interests: ${user.profile.interests?.join(', ')}
                `;
        const investorCriteria = `
                    I am a ${currentUser.role}.
                    My summary: ${currentUser.profile?.summary}
                    My interests: ${currentUser.profile?.interests?.join(', ')}
                `;

        const result = await prioritizeProfileAttributes({
          investorCriteria,
          profileAttributes,
        });
        setMatchInfo(result);
      } catch (error) {
        console.error('Failed to get match info:', error);
        setMatchInfo({
          prioritizedAttributes: 'Could not load AI reasoning.',
          reasoning: 'There was an error communicating with the AI. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    getMatchInfo();
  }, [user, currentUser]);

  if (!user.profile) return null;

  return (
    <Card className="flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-lg">
      <CardHeader className="items-center p-6 text-center">
        <Avatar className="h-24 w-24 border-4 border-background shadow-md">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="pt-4">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription>{user.profile.headline}</CardDescription>
          <Badge variant="outline" className="mt-2 font-semibold">
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 overflow-auto px-6">
        <p className="text-sm text-muted-foreground">{user.profile.summary}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {user.profile.interests?.map((interest) => (
            <Badge key={interest} variant="secondary">
              {interest}
            </Badge>
          ))}
        </div>
        <div className="my-4 border-t border-border/50" />
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              Why you're a match
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <p>{matchInfo?.reasoning}</p>
            )}
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-6">
        <Button
          variant="outline"
          size="icon"
          className="h-16 w-16 rounded-full border-red-500 text-red-500 shadow-md transition-transform hover:scale-110 hover:bg-red-500/10 hover:text-red-600"
        >
          <X className="h-8 w-8" />
          <span className="sr-only">Pass</span>
        </Button>
        <Button
          size="icon"
          className="h-16 w-16 rounded-full bg-green-500 text-white shadow-md transition-transform hover:scale-110 hover:bg-green-600"
        >
          <Check className="h-8 w-8" />
          <span className="sr-only">Connect</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function MobileView() {
  const [user, authLoading] = useAuthState(auth);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [potentialMatches, setPotentialMatches] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) return;
    
    async function fetchData() {
        setIsLoading(true);
        if (!user) {
            setIsLoading(false);
            return;
        }

        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const fetchedUser = userDoc.exists() ? userDoc.data() as User : null;
            setCurrentUser(fetchedUser);

            if (fetchedUser) {
                let matchQueries = [];
                if (fetchedUser.role === 'Founder') {
                    matchQueries.push(query(collection(db, 'users'), where('role', '==', 'Talent'), limit(10)));
                } else if (fetchedUser.role === 'Investor') {
                    matchQueries.push(query(collection(db, 'users'), where('role', '==', 'Founder'), limit(5)));
                    matchQueries.push(query(collection(db, 'users'), where('role', '==', 'Talent'), limit(5)));
                    matchQueries.push(query(collection(db, 'users'), where('role', '==', 'Investor'), limit(5)));
                } else {
                    setPotentialMatches([]);
                    setIsLoading(false);
                    return;
                }

                const querySnapshots = await Promise.all(matchQueries.map(q => getDocs(q)));
                const matches = querySnapshots
                    .flatMap(snapshot => snapshot.docs)
                    .map(doc => ({ id: doc.id, ...doc.data() } as User))
                    .filter(match => match.id !== user.uid);
                
                setPotentialMatches(matches.sort(() => Math.random() - 0.5));
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    fetchData();
  }, [user, authLoading]);

  if (isLoading) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
        </div>
    )
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center py-8">
      
        <div className="relative flex h-[550px] w-[350px] items-center justify-center">
             {potentialMatches.length > 0 ? (
                <CardStack onVote={(item, vote) => console.log(item.props.user.name, vote)}>
                    {potentialMatches.map((matchUser) => (
                        <MatchCard key={matchUser.id} user={matchUser} currentUser={currentUser} />
                    ))}
                </CardStack>
             ) : (
                <Card className="flex items-center justify-center h-64 w-full">
                  <p className="text-muted-foreground p-4 text-center">
                    {currentUser?.role === 'Talent' 
                        ? "Your profile is now visible to Founders and Investors. Sit back and wait for them to connect with you!"
                        : "No potential matches found at this time. Check back later!"
                    }
                  </p>
                </Card>
             )}
        </div>
    </div>
  );
}
