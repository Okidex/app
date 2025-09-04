
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import type { User } from '@/lib/types';
import ImageUploader from '../image-uploader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { ensureUrlProtocol } from '@/lib/utils';
import React from 'react';

interface InvestorFormProps {
  onSubmit: (data: any) => void;
  isSaving: boolean;
  currentUserData: User | null;
  schema: z.ZodObject<any, any, any>;
}

export default function InvestorForm({ onSubmit, isSaving, currentUserData, schema }: InvestorFormProps) {
  const [user] = useAuthState(auth);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      avatarUrl: '',
      headline: '',
      summary: '',
      linkedinUrl: '',
      companyUrl: '',
      investmentThesis: '',
      interests: '',
      pastInvestments: '',
    },
  });

  React.useEffect(() => {
    if (currentUserData) {
      const profile = currentUserData.profile || {};
      form.reset({
        avatarUrl: currentUserData.avatarUrl || '',
        headline: profile.headline || '',
        summary: profile.summary || '',
        linkedinUrl: profile.linkedinUrl || '',
        companyUrl: profile.companyUrl || '',
        investmentThesis: profile.investmentThesis || '',
        interests: profile.interests?.join(', ') || '',
        pastInvestments: profile.pastInvestments?.join(', ') || '',
      });
    }
  }, [currentUserData, form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>
              <FormControl>
                <ImageUploader 
                    onUrlChange={field.onChange} 
                    currentAvatarUrl={field.value}
                    userName={user?.displayName || ''}
                />
              </FormControl>
              <FormDescription>
                Upload a clear photo of yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Headline</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Venture Capitalist at Future Ventures" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your background and what you bring to the table as an investor." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.linkedin.com/in/your-profile"
                  {...field}
                  value={field.value ?? ''}
                  onBlur={(e) => {
                      field.onBlur();
                      const ensuredUrl = ensureUrlProtocol(e.target.value);
                      form.setValue('linkedinUrl', ensuredUrl);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="companyUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.your-company.com"
                  {...field}
                  value={field.value ?? ''}
                  onBlur={(e) => {
                      field.onBlur();
                      const ensuredUrl = ensureUrlProtocol(e.target.value);
                      form.setValue('companyUrl', ensuredUrl);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="investmentThesis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Thesis</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your investment focus, stage, and what you look for in a startup." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Industries</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Fintech, Digital Health, B2B SaaS" {...field} />
              </FormControl>
              <FormDescription>
                Comma-separated list of your primary investment industries.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pastInvestments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notable Past Investments (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., HealthPlus, FinPal" {...field} />
              </FormControl>
              <FormDescription>
                Comma-separated list of companies you've previously invested in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSaving} className="w-full">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {currentUserData?.profile && Object.keys(currentUserData.profile).length > 0 ? 'Save Changes' : 'Complete Profile'}
        </Button>
      </form>
    </FormProvider>
  );
}

    

    