
'use client';

import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import type { User, Challenge } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  addDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, FileText, Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { processInvestmentChallenge } from '@/ai/flows/process-investment-challenge';
import { Skeleton } from '../ui/skeleton';
import { sendNotification } from '@/lib/notifications';

const challengeSchema = z.object({
  thesis: z.string().min(100, 'Please provide a detailed description of your challenge (at least 100 characters).'),
});

function InvestorChallengeForm({ onChallengePosted }: { onChallengePosted: (challenge: Challenge) => void }) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof challengeSchema>>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      thesis: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof challengeSchema>) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not authenticated' });
      return;
    }

    setIsSubmitting(true);
    try {
      const aiResult = await processInvestmentChallenge({ thesis: values.thesis });

      const challengeDoc: Omit<Challenge, 'id'> = {
        investorId: user.uid,
        thesis: values.thesis,
        aiTitle: aiResult.aiTitle,
        aiSummary: aiResult.aiSummary,
        keyPoints: aiResult.keyPoints,
        createdAt: serverTimestamp() as any,
        responses: [],
      };

      const docRef = await addDoc(collection(db, 'challenges'), challengeDoc);

      toast({ title: 'Challenge Published!', description: 'Your investment challenge is now live.' });
      form.reset();
      onChallengePosted({ ...challengeDoc, id: docRef.id, createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any });

    } catch (error) {
      console.error("Failed to post challenge:", error);
      toast({ variant: 'destructive', title: 'Submission Failed', description: 'There was an error processing your challenge.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue a New Challenge</CardTitle>
        <CardDescription>
          Describe a problem, a market, or a technology you believe in. Issue it as an anonymous challenge to the startup community and find founders who are building the future you want to fund.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="thesis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Investment Challenge</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="e.g., 'I believe the next frontier in B2B SaaS is hyper-automation for mid-market finance teams. I'm looking for a tool that can reduce month-end closing time by 90%...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Anonymously
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

function FounderChallengeCard({ challenge, currentUser }: { challenge: Challenge, currentUser: User | null }) {
  const { toast } = useToast();
  const [isResponding, setIsResponding] = React.useState(false);
  const [hasResponded, setHasResponded] = React.useState(challenge.responses.includes(currentUser?.id || ''));

  const handleRespond = async () => {
      if (!currentUser || !currentUser.profile.businessName) {
          toast({ variant: 'destructive', title: 'Profile Incomplete', description: 'Please complete your founder profile before responding.' });
          return;
      }
      setIsResponding(true);
      try {
          const challengeRef = doc(db, 'challenges', challenge.id);
          await updateDoc(challengeRef, {
              responses: arrayUnion(currentUser.id)
          });
          
          await sendNotification({
              userId: challenge.investorId,
              title: 'New Response to your Challenge!',
              message: `${currentUser.profile.businessName} has responded to your challenge: "${challenge.aiTitle}"`,
              link: `/dashboard?view=profile&userId=${currentUser.id}`,
              type: 'challenge_response'
          });
          
          setHasResponded(true);
          toast({ title: 'Response Sent!', description: 'The investor has been notified and can view your profile.' });
      } catch (error) {
          console.error('Failed to respond to challenge:', error);
          toast({ variant: 'destructive', title: 'Error', description: 'Could not send your response at this time.' });
      } finally {
          setIsResponding(false);
      }
  };

  return (
      <Card className="flex flex-col">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="text-primary h-5 w-5" />
                {challenge.aiTitle}
              </CardTitle>
              <CardDescription>{challenge.aiSummary}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
              <Separator className="my-4" />
              <h4 className="font-semibold mb-2">Key Areas of Interest:</h4>
              <ul className="space-y-2">
                  {challenge.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 mt-1 shrink-0 text-yellow-500" />
                          <span className="text-muted-foreground text-sm">{point}</span>
                      </li>
                  ))}
              </ul>
          </CardContent>
          <CardFooter>
              <Button onClick={handleRespond} disabled={isResponding || hasResponded} className="w-full">
                  {isResponding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {hasResponded ? 'Response Sent' : 'Accept Challenge & Share Profile'}
              </Button>
          </CardFooter>
      </Card>
  )
}

function InvestorChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Anonymous Challenge</CardTitle>
        <CardDescription>Posted on {new Date(challenge.createdAt.seconds * 1000).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground italic line-clamp-4">"{challenge.thesis}"</p>
        <Separator className="my-4" />
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span className="font-semibold">{challenge.responses.length} {challenge.responses.length === 1 ? 'Response' : 'Responses'}</span>
        </div>
      </CardContent>
    </Card>
  )
}


export default function ChallengesView() {
  const [user, authLoading] = useAuthState(auth);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [challenges, setChallenges] = React.useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchChallenges = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'challenges'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedChallenges = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Challenge);
      setChallenges(fetchedChallenges);
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsLoading(false);
      return;
    }
    const fetchCurrentUser = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            setCurrentUser(userDoc.data() as User);
        }
    }

    fetchCurrentUser();
    fetchChallenges();
  }, [user, authLoading, fetchChallenges]);

  const handleNewChallenge = (challenge: Challenge) => {
    setChallenges(prev => [challenge, ...prev]);
  }

  if (authLoading || !currentUser) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (currentUser.role === 'Investor') {
      return (
        <>
          <InvestorChallengeForm onChallengePosted={handleNewChallenge} />
          <Separator className="my-8" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Challenge Feed</h2>
            <p className="text-muted-foreground">A feed of anonymous challenges from other investors.</p>
          </div>
          {isLoading ? (
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-56 w-full" /><Skeleton className="h-56 w-full" /><Skeleton className="h-56 w-full" />
             </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {challenges.map(c => <InvestorChallengeCard key={c.id} challenge={c} />)}
            </div>
          )}
        </>
      );
    }

    if (currentUser.role === 'Founder') {
      if (!currentUser.isPremium) {
        return (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Premium Feature</AlertTitle>
            <AlertDescription>
              Responding to Investment Challenges is a premium feature. Upgrade to Oki+ to connect directly with investors who are looking for a startup just like yours.
            </AlertDescription>
          </Alert>
        );
      }
      return (
        <>
           <div className="space-y-2">
            <h2 className="text-2xl font-bold">Investment Challenges</h2>
            <p className="text-muted-foreground">Investors have issued these challenges. If your startup is the solution, let them know.</p>
          </div>
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-80 w-full" /><Skeleton className="h-80 w-full" /><Skeleton className="h-80 w-full" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {challenges.map(c => <FounderChallengeCard key={c.id} challenge={c} currentUser={currentUser} />)}
            </div>
          )}
        </>
      );
    }
    return null;
  };

  return <div className="space-y-6">{renderContent()}</div>;
}
