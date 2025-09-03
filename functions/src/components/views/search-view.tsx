
'use client';

import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User, UserRole } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Loader2, Search as SearchIcon, Sparkles } from 'lucide-react';
import ProfileCard from '../profile-card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

function FounderAISearch() {
    return (
        <Card className="w-full max-w-2xl mx-auto text-center">
             <CardHeader>
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-2 bg-gray-100 text-black rounded-full px-4 py-2 text-sm font-semibold">
                        <Sparkles className="h-4 w-4" />
                        <span>AI-Powered Search</span>
                    </div>
                </div>
                <CardTitle className="text-2xl">Find Your Next Superstar</CardTitle>
                <CardDescription>
                    Describe who you're looking for. Be it a co-founder, a key hire, or a vendor to help you scale.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid w-full gap-4">
               <Textarea
                placeholder="e.g., 'A growth marketer with experience in B2B SaaS' or 'A senior backend engineer proficient in Go and Kubernetes'"
                rows={3}
                />
                <Button size="lg">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Search for Talent
                </Button>
            </CardContent>
        </Card>
    )
}

export default function SearchView() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState<UserRole | 'all'>('all');
  const [interestFilter, setInterestFilter] = React.useState('all');
  const [searchResults, setSearchResults] = React.useState<User[]>([]);
  const [isSearching, setIsSearching] = React.useState(true);

  const [user, authLoading] = useAuthState(auth);
  const [currentUserData, setCurrentUserData] = React.useState<User | null>(null);
  const [allInterests, setAllInterests] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (authLoading || !user) {
        if (!authLoading) setIsSearching(false);
        return;
    };
    
    const fetchInitialData = async () => {
        setIsSearching(true);
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                setCurrentUserData(userData);
                
                // For a founder, we don't need to run an initial search.
                if (userData.role === 'Founder') {
                    setIsSearching(false);
                    return; 
                } 
                else if (userData.role === 'Investor') {
                    // For an investor, default to searching for Founders and run search
                    setRoleFilter('Founder');
                    await handleSearch(true, 'Founder');
                } else {
                     // For Talent, no search is available.
                    setIsSearching(false);
                    return;
                }
            }

            const usersSnapshot = await getDocs(collection(db, 'users'));
            const interests = new Set<string>();
            usersSnapshot.forEach(doc => {
                const profile = doc.data().profile;
                profile?.interests?.forEach((interest: string) => interests.add(interest));
            });
            setAllInterests(Array.from(interests).sort());

        } catch (error) {
            console.error("Error fetching initial data", error);
        } finally {
            setIsSearching(false);
        }
    };

    fetchInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);
  
  const handleSearch = async (isInitialSearch = false, initialRoleFilter?: UserRole | 'all') => {
    if (!user) return;
    
    if (!isInitialSearch) { 
        setIsSearching(true);
    }
    
    const filterByRole = initialRoleFilter || roleFilter;

    try {
      const rolesToQuery = [];
      if (filterByRole !== 'all') {
          rolesToQuery.push(filterByRole);
      } else if (currentUserData?.role === 'Investor') {
          rolesToQuery.push('Founder', 'Talent', 'Investor');
      }
      
      const conditions = [];
      if (rolesToQuery.length > 0) {
        conditions.push(where('role', 'in', rolesToQuery));
      }
      if (interestFilter !== 'all') {
        conditions.push(where('profile.interests', 'array-contains', interestFilter));
      }

      const q = query(collection(db, 'users'), ...conditions);
      
      const querySnapshot = await getDocs(q);

      let results = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as User))
        .filter(u => u.id !== user.uid && u.profile && Object.keys(u.profile).length > 0);
      
      if (searchTerm) {
          results = results.filter(u => 
            (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (u.profile.headline && u.profile.headline.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (u.profile.summary && u.profile.summary.toLowerCase().includes(searchTerm.toLowerCase()))
          );
      }
      
      if (currentUserData?.role === 'Talent') {
          results = [];
      }

      setSearchResults(results);

    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsSearching(false);
    }
  }
  
  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const getAvailableRoles = () => {
    if (!currentUserData) return [];
    
    switch(currentUserData.role) {
      case 'Investor':
        return ['Founder', 'Talent', 'Investor'];
      default:
        return [];
    }
  }
  
  if (authLoading || (!currentUserData && isSearching)) {
      return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }
  
  if (currentUserData?.role === 'Talent') {
      return (
        <Alert variant="default" className="max-w-xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Search Not Available</AlertTitle>
            <AlertDescription>
                Based on your role as Talent, the search feature is not available. Founders and investors will be able to discover your profile.
            </AlertDescription>
        </Alert>
      );
  }

  if (currentUserData?.role === 'Founder') {
    return <FounderAISearch />;
  }

  return (
    <div>
      <form onSubmit={handleSearchClick} className="mb-8 rounded-lg border p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label htmlFor="search-term" className="text-sm font-medium">Search Term</label>
            <Input
              id="search-term"
              placeholder="e.g., 'Sarah Chen' or 'Fintech'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role-filter" className="text-sm font-medium">Role</label>
            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | 'all')}>
              <SelectTrigger id="role-filter">
                <SelectValue placeholder="Filter by role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {getAvailableRoles().map(role => (
                   <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="interest-filter" className="text-sm font-medium">Interest</label>
            <Select value={interestFilter} onValueChange={setInterestFilter}>
              <SelectTrigger id="interest-filter">
                <SelectValue placeholder="Filter by interest..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Interests</SelectItem>
                {allInterests.map(interest => (
                  <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={isSearching}>
                {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <SearchIcon className="mr-2 h-4 w-4" /> Search
            </Button>
        </div>
      </form>
      
       {isSearching ? (
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
         </div>
       ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.length > 0 ? (
              searchResults.map(user => <ProfileCard key={user.id} user={user} />)
            ) : (
              <div className="col-span-full text-center text-muted-foreground p-8 border rounded-lg">
                <p className="font-semibold">No users found</p>
                <p className="text-sm">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
       )}
    </div>
  );
}
