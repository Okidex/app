
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FounderProfile, FullUserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { getCurrentUser } from '@/lib/actions';

const features = [
  "Showcase your startup's profile to investors, start conversations, and fundraise.",
  "Post unlimited job openings.",
  "Access exclusive investment theses.",
  "Priority support.",
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [user, setUser] = useState<FullUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);
  
  if (loading || !user) {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-64 w-full" />
        </div>
    )
  }
  
  const isFounder = user.role === 'founder';
  const isPremiumFounder = isFounder && (user.profile as FounderProfile).isPremium;

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    toast({
        title: "Subscription Confirmed!",
        description: `You have successfully subscribed to the ${plan} Oki+ plan.`
    });
  };

  const monthlyPrice = 10;
  const yearlyPrice = 99;
  const yearlyMonthlyPrice = yearlyPrice / 12;
  const discount = Math.round((1 - (yearlyPrice / 12) / monthlyPrice) * 100);

  if (isPremiumFounder) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-headline">Billing</h1>
          <p className="text-muted-foreground">You are an Oki+ member. Manage your subscription and payment details.</p>
        </div>
        
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Your Oki+ Subscription</CardTitle>
                        <CardDescription>Your current plan is the <span className='font-bold'>Yearly Plan</span>. It will renew on July 21, 2025.</CardDescription>
                    </div>
                     <Badge>Active</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground'>Manage your subscription, view invoices, and update your payment method through our secure payment provider, Stripe.</p>
            </CardContent>
            <CardFooter>
                 <Button asChild>
                    <Link href="https://billing.stripe.com/p/login/test_7sI5m4bZJg0V8EMcMM" target="_blank">Manage Subscription in Stripe</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and payment details.</p>
      </div>
      
      <Card>
          <CardHeader className="text-center">
              <div className="mx-auto bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6" />
              </div>
              <CardTitle>Oki+ Subscription</CardTitle>
              <CardDescription>Unlock premium features to accelerate your startup's growth.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 max-w-2xl mx-auto">
               <div className="border bg-secondary/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Oki+ Features</h3>
                  <ul className="space-y-3">
                      {features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                      ))}
                  </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card 
                    className={cn("relative cursor-pointer", selectedPlan === 'monthly' && "border-primary ring-2 ring-primary")}
                    onClick={() => setSelectedPlan('monthly')}
                  >
                      <CardHeader>
                          <CardTitle>Monthly Plan</CardTitle>
                          <CardDescription>Flexibility for short-term needs.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">${monthlyPrice}<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                          <p className="text-sm text-muted-foreground">billed monthly, $120 a year</p>
                      </CardContent>
                      <CardFooter>
                          <Button className="w-full" onClick={() => handleSubscribe('monthly')} disabled={selectedPlan !== 'monthly'}>Choose Monthly</Button>
                      </CardFooter>
                  </Card>
                  <Card 
                    className={cn("relative cursor-pointer", selectedPlan === 'yearly' && "border-primary ring-2 ring-primary")}
                    onClick={() => setSelectedPlan('yearly')}
                  >
                      <CardHeader>
                          <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Yearly Plan</CardTitle>
                                <CardDescription>Best value for long-term growth.</CardDescription>
                            </div>
                             <Badge variant="destructive">Save {discount}%</Badge>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">${yearlyMonthlyPrice.toFixed(2)}<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                          <p className="text-sm text-muted-foreground">Billed as ${yearlyPrice} per year.</p>
                      </CardContent>
                      <CardFooter>
                          <Button className="w-full" onClick={() => handleSubscribe('yearly')} disabled={selectedPlan !== 'yearly'}>Choose Yearly</Button>
                      </CardFooter>
                  </Card>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
