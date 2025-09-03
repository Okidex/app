
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import type { User } from '@/lib/types';
import ImageUploader from '../image-uploader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { ensureUrlProtocol } from '@/lib/utils';
import React from 'react';

const talentSchema = z.object({
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  headline: z.string().min(10, 'Headline must be at least 10 characters.'),
  summary: z.string().min(50, 'Summary must be at least 50 characters.'),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  skills: z.string().min(1, 'Please enter at least one skill.'),
  interests: z.string().min(1, 'Please enter at least one industry.'),
  openToCoFounding: z.boolean().default(false),
});

interface TalentFormProps {
  onSubmit: (data: z.infer<typeof talentSchema>) => void;
  isSaving: boolean;
  currentUserData: User | null;
}

export default function TalentForm({ onSubmit, isSaving, currentUserData }: TalentFormProps) {
  const [user] = useAuthState(auth);
  const form = useForm<z.infer<typeof talentSchema>>({
    resolver: zodResolver(talentSchema),
    defaultValues: {
      avatarUrl: '',
      headline: '',
      summary: '',
      linkedinUrl: '',
      skills: '',
      interests: '',
      openToCoFounding: false,
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
        skills: profile.skills?.join(', ') || '',
        interests: profile.interests?.join(', ') || '',
        openToCoFounding: profile.openToCoFounding || false,
      });
    }
  }, [currentUserData, form]);

  const handleFormSubmit = (values: z.infer<typeof talentSchema>) => {
    onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
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
                <Input placeholder="e.g., Senior Software Engineer with AI/ML Expertise" {...field} />
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
                <Textarea placeholder="Describe your experience, expertise, and what you're looking for." {...field} />
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
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Python, TensorFlow, Product Management" {...field} />
              </FormControl>
               <FormDescription>
                Comma-separated list of your top professional skills.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industries of Interest</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Health Tech, E-commerce, AI for Good" {...field} />
              </FormControl>
              <FormDescription>
                Comma-separated list of industries you're interested in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="openToCoFounding"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Open to Co-Founding
                </FormLabel>
                <FormDescription>
                  Signal to others that you are interested in co-founding a new venture.
                </FormDescription>
              </div>
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
