
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandCoins, Lock, PlusCircle } from "lucide-react";
import { FounderProfile, InvestmentThesis, TalentProfile, FullUserProfile } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "@/components/shared/user-avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import TalentInterestPrompt from "@/components/theses/talent-interest-prompt";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, getDocs, orderBy, addDoc, where } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsersByIds } from "@/lib/actions";

type ThesisWithAuthor = InvestmentThesis & { author?: FullUserProfile };

export default function ThesesClientContent() {
  const { user: currentUser, isUserLoading: authLoading } = useUser();
  const db = useFirestore();

  const thesesQuery = useMemoFirebase(() => db ? query(collection(db, "theses"), orderBy("postedAt", "desc")) : null, [db]);
  const {data: thesesData, isLoading: thesesLoading} = useCollection<InvestmentThesis>(thesesQuery);

  const [theses, setTheses] = useState<ThesisWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPostThesisOpen, setIsPostThesisOpen] = useState(false);
  const [showTalentPrompt, setShowTalentPrompt] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
      const fetchAuthors = async () => {
          if (!thesesData) {
              if(!authLoading && !thesesLoading) setLoading(false);
              return;
          };
          setLoading(true);

          const authorIds = [...new Set(thesesData.map(t => t.investorId))];
          
          if(authorIds.length > 0) {
            const authors = await getUsersByIds(authorIds);
            const thesesWithAuthors = thesesData.map(thesis => ({
                ...thesis,
                author: authors.find(a => a.id === thesis.investorId),
            }));
            setTheses(thesesWithAuthors);
          } else {
            setTheses(thesesData);
          }

          setLoading(false);
      };
      fetchAuthors();
  }, [thesesData, authLoading, thesesLoading]);
  
  const [newThesis, setNewThesis] = useState({
    title: "",
    summary: "",
    isAnonymous: true,
  });

  const handlePostThesis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !db) return;
    
    const newThesisData: Omit<InvestmentThesis, "id"> = {
      investorId: currentUser.id,
      title: newThesis.title,
      summary: newThesis.summary,
      industries: ['SaaS', 'AI'], // Placeholder
      stages: ['Seed'], // Placeholder
      geographies: ['Global'], // Placeholder
      postedAt: new Date().toISOString(),
      isAnonymous: newThesis.isAnonymous,
    };
    try {
        const docRef = await addDoc(collection(db, 'theses'), newThesisData);
        setTheses([{ ...newThesisData, id: docRef.id, author: currentUser }, ...theses]);
        setIsPostThesisOpen(false);
        setNewThesis({ title: "", summary: "", isAnonymous: true });
        toast({ title: "Thesis Posted", description: "Your investment thesis has been posted." });
    } catch(e) {
        toast({ title: "Error", description: "Could not post thesis.", variant: 'destructive'});
    }
  };

  const handleExpressInterest = (thesisTitle: string) => {
    if (currentUser?.role === 'talent' && (currentUser.profile as TalentProfile).subRole === 'co-founder') {
        setShowTalentPrompt(true);
        return;
    }
    
    toast({
        title: "Interest Expressed!",
        description: `Your interest in "${thesisTitle}" has been sent to the investor.`
    });
  };

  if (authLoading || loading) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-64" />
                <Skeleton className="h-64" />
            </div>
        </div>
    );
  }
  
  const isFounder = currentUser?.role === 'founder';
  const isInvestor = currentUser?.role === 'investor';
  const isTalent = currentUser?.role === 'talent';
  const isPremiumFounder = isFounder && (currentUser.profile as FounderProfile).isPremium;
  const isCoFounderTalent = isTalent && (currentUser.profile as TalentProfile).subRole === 'co-founder';

  if (!currentUser || (!isInvestor && !isPremiumFounder && !isCoFounderTalent)) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
          <Card className="w-full max-w-md p-8">
              <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Lock className="w-8 h-8" />
                  </div>
                  <CardTitle>Access Restricted</CardTitle>
                  <CardDescription>
                    {isFounder ? 
                      "This feature is available exclusively for Oki+ members. Upgrade your plan to view investor theses." :
                      "This feature is available for investors and talent seeking co-founder roles. Update your profile to gain access."
                    }
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <Button asChild size="lg">
                      <Link href={isFounder ? "/settings/billing" : "/profile/edit"}>
                        {isFounder ? "Upgrade to Oki+" : "Update Profile"}
                      </Link>
                  </Button>
              </CardContent>
          </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-headline">Investment Theses</h1>
          <p className="text-muted-foreground">Discover what investors are looking for, directly from them.</p>
        </div>
        {isInvestor && (
            <Button onClick={() => setIsPostThesisOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Post a Thesis
            </Button>
        )}
      </div>
      
       <Card>
          <CardContent className="p-4 flex flex-col md:flex-row gap-4">
              <Input placeholder="Search by industry, stage, or keyword..." className="flex-1" />
              <div className="flex gap-4">
                   <Select>
                      <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="ai">Artificial Intelligence</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="saas">SaaS</SelectItem>
                          <SelectItem value="health">Healthcare Tech</SelectItem>
                      </SelectContent>
                  </Select>
                  <Select>
                      <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Stage" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="pre-seed">Pre-seed</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="series-a">Series A</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
          </CardContent>
      </Card>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {theses.map(thesis => {
        const displayAnonymous = isTalent || thesis.isAnonymous || !thesis.author;

        return (
            <Card key={thesis.id} className="flex flex-col">
            <CardHeader>
                <div className="flex items-start justify-between">
                <div>
                    <CardTitle>{thesis.title}</CardTitle>
                    {displayAnonymous ? (
                        <CardDescription>Anonymous Investor</CardDescription>
                    ) : (
                        <div className="flex items-center gap-2 mt-2">
                            <UserAvatar name={thesis.author!.name} avatarUrl={thesis.author!.avatarUrl} className="h-8 w-8" />
                            <span className="text-sm font-medium">{thesis.author!.name}</span>
                        </div>
                    )}
                </div>
                <HandCoins className="w-8 h-8 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                {thesis.industries.map(i => <Badge key={i} variant="secondary">{i}</Badge>)}
                {thesis.stages.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                </div>
                <p className="text-sm text-muted-foreground">{thesis.summary}</p>
            </CardContent>
            <CardContent>
                <Button 
                    className="w-full" 
                    onClick={() => handleExpressInterest(thesis.title)}
                    variant={isTalent ? "secondary" : "default"}
                >
                    Express Interest
                </Button>
            </CardContent>
            </Card>
        )
        })}
    </div>


       <Dialog open={isPostThesisOpen} onOpenChange={setIsPostThesisOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Post a New Investment Thesis</DialogTitle>
                  <DialogDescription>Share your investment focus with the community. You can choose to post anonymously.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePostThesis} className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="thesis-title">Title</Label>
                      <Input id="thesis-title" value={newThesis.title} onChange={(e) => setNewThesis({ ...newThesis, title: e.target.value })} placeholder="e.g., The Future of B2B SaaS" required />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="thesis-summary">Summary</Label>
                      <Textarea id="thesis-summary" value={newThesis.summary} onChange={(e) => setNewThesis({ ...newThesis, summary: e.target.value })} placeholder="Describe your investment thesis, including what you look for in startups..." required />
                  </div>
                  <div className="flex items-center space-x-2">
                      <Checkbox id="anonymous-post" checked={newThesis.isAnonymous} onCheckedChange={(checked) => setNewThesis({ ...newThesis, isAnonymous: !!checked })} />
                      <Label htmlFor="anonymous-post">Post anonymously</Label>
                  </div>
                  <DialogFooter>
                      <DialogClose asChild>
                          <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Post Thesis</Button>
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>
      <TalentInterestPrompt open={showTalentPrompt} onOpenChange={setShowTalentPrompt} />
    </div>
  );
}
