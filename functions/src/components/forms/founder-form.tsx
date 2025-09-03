
'use client';

import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ShieldCheck, Trash2, Sparkles } from 'lucide-react';
import type { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as CardDescriptionComponent } from '../ui/card';
import ImageUploader from '../image-uploader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Switch } from '../ui/switch';
import { ensureUrlProtocol } from '@/lib/utils';
import React from 'react';
import { generateFounderBio } from '@/ai/flows/generate-founder-bio';
import { useToast } from '@/hooks/use-toast';


const founderEntrySchema = z.object({
  founderName: z.string().min(1, 'Founder name is required.'),
  founderTitle: z.string().min(1, 'Founder title is required.'),
});

const capTableEntrySchema = z.object({
    investorName: z.string().min(1, "Investor name is required."),
    holdingPercentage: z.coerce.number().min(0).max(100),
    shareCount: z.coerce.number().min(0),
});

const founderSchema = z.object({
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  businessLogoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  businessName: z.string().min(1, 'Startup name is required.'),
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  bio: z.string().optional(),
  businessDescription: z.string().min(50, 'Business description must be at least 50 characters.'),
  isIncorporated: z.boolean().default(false),
  taxNumber: z.string().optional(),
  uniqueEntityNumber: z.string().optional(),
  entityStructure: z.string().optional(),
  countryOfIncorporation: z.string().optional(),
  fundingStage: z.enum(['pre-seed', 'seed', 'series-a', 'series-b']),
  industry: z.string().min(1, 'Please enter at least one industry.'),
  founders: z.array(founderEntrySchema).optional(),
  grossMargins: z.coerce.number().optional(),
  burnRate: z.coerce.number().optional(),
  customerAcquisitionCost: z.coerce.number().optional(),
  customerLifetimeValue: z.coerce.number().optional(),
  mrr: z.coerce.number().optional(),
  netProfitMargins: z.coerce.number().optional(),
  cashBurnRunway: z.coerce.number().optional(),
  roi: z.coerce.number().optional(),
  cacPayback: z.coerce.number().optional(),
  valuation: z.coerce.number().optional(),
  capTable: z.array(capTableEntrySchema).optional(),
}).refine(data => {
    if (data.isIncorporated) {
        return !!data.taxNumber && !!data.uniqueEntityNumber && !!data.entityStructure && !!data.countryOfIncorporation;
    }
    return true;
}, {
    message: 'All incorporation details are required if the business is incorporated.',
    path: ['countryOfIncorporation'], // Show error message under the last field in the group
});

interface FounderFormProps {
  onSubmit: (data: z.infer<typeof founderSchema>) => void;
  isSaving: boolean;
  currentUserData: User | null;
}

export default function FounderForm({ onSubmit, isSaving, currentUserData }: FounderFormProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [isGeneratingBio, setIsGeneratingBio] = React.useState(false);

  const form = useForm<z.infer<typeof founderSchema>>({
    resolver: zodResolver(founderSchema),
    defaultValues: {
      avatarUrl: '',
      businessLogoUrl: '',
      businessName: '',
      websiteUrl: '',
      linkedinUrl: '',
      bio: '',
      businessDescription: '',
      isIncorporated: false,
      fundingStage: 'seed',
      industry: '',
      founders: [],
      taxNumber: '',
      uniqueEntityNumber: '',
      entityStructure: '',
      countryOfIncorporation: '',
      grossMargins: undefined,
      burnRate: undefined,
      customerAcquisitionCost: undefined,
      customerLifetimeValue: undefined,
      mrr: undefined,
      netProfitMargins: undefined,
      cashBurnRunway: undefined,
      roi: undefined,
      cacPayback: undefined,
      valuation: undefined,
      capTable: [],
    },
  });

  React.useEffect(() => {
    if (currentUserData) {
      const profile = currentUserData.profile || {};
      form.reset({
        avatarUrl: currentUserData.avatarUrl || '',
        businessLogoUrl: currentUserData.businessLogoUrl || '',
        businessName: profile.businessName || '',
        websiteUrl: profile.websiteUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
        bio: profile.bio || '',
        businessDescription: profile.businessDescription || '',
        isIncorporated: profile.isIncorporated || false,
        taxNumber: profile.taxNumber || '',
        uniqueEntityNumber: profile.uniqueEntityNumber || '',
        entityStructure: profile.entityStructure || '',
        countryOfIncorporation: profile.countryOfIncorporation || '',
        fundingStage: profile.fundingStage || 'seed',
        industry: profile.interests?.join(', ') || '',
        founders: profile.founders || [],
        grossMargins: profile.grossMargins,
        burnRate: profile.burnRate,
        customerAcquisitionCost: profile.customerAcquisitionCost,
        customerLifetimeValue: profile.customerLifetimeValue,
        mrr: profile.mrr,
        netProfitMargins: profile.netProfitMargins,
        cashBurnRunway: profile.cashBurnRunway,
        roi: profile.roi,
        cacPayback: profile.cacPayback,
        valuation: profile.valuation,
        capTable: profile.capTable || [],
      });
    }
  }, [currentUserData, form]);

  const { fields: founderFields, append: appendFounder, remove: removeFounder } = useFieldArray({
    control: form.control,
    name: 'founders',
  });

   const { fields: capTableFields, append: appendCapEntry, remove: removeCapEntry } = useFieldArray({
    control: form.control,
    name: "capTable",
  });

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    try {
        const { linkedinUrl, businessName } = form.getValues();
        if (!linkedinUrl) {
            toast({ variant: 'destructive', title: 'LinkedIn URL required', description: 'Please provide a LinkedIn URL to generate a bio.' });
            return;
        }
        const result = await generateFounderBio({
            name: currentUserData?.name || user?.displayName || '',
            businessName: businessName || '',
            linkedinUrl: linkedinUrl
        });
        form.setValue('bio', result.bio, { shouldValidate: true });
        toast({ title: 'Bio Generated', description: 'Your AI-powered bio has been created.'});
    } catch (error) {
        console.error("Failed to generate bio:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not generate bio at this time.' });
    } finally {
        setIsGeneratingBio(false);
    }
  };

  const handleFormSubmit = (values: z.infer<typeof founderSchema>) => {
    onSubmit(values);
  };

  const isIncorporated = form.watch('isIncorporated');
  const linkedinUrl = form.watch('linkedinUrl');

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        
        <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Startup Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., InnovateX" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Artificial Intelligence, SaaS, Fintech" {...field} />
              </FormControl>
              <FormDescription>
                Comma-separated list of your industries.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessLogoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Startup Logo</FormLabel>
              <FormControl>
                <ImageUploader 
                    onUrlChange={field.onChange} 
                    currentAvatarUrl={field.value || undefined}
                    userName={form.getValues('businessName')}
                />
              </FormControl>
              <FormDescription>
                Upload your company's logo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Startup Homepage URL</FormLabel>
                <FormControl>
                    <Input
                      placeholder="https://www.innovatex.com"
                      {...field}
                      value={field.value ?? ''}
                      onBlur={(e) => {
                          field.onBlur();
                          const ensuredUrl = ensureUrlProtocol(e.target.value);
                          form.setValue('websiteUrl', ensuredUrl);
                      }}
                    />
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
                <FormLabel>Personal LinkedIn URL</FormLabel>
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
          name="bio"
          render={({ field }) => (
            <FormItem>
                <div className="flex items-center justify-between">
                    <FormLabel>Founder Bio</FormLabel>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateBio}
                        disabled={!linkedinUrl || isGeneratingBio}
                    >
                        {isGeneratingBio ? (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                           <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Generate with AI
                    </Button>
                </div>
              <FormControl>
                <Textarea placeholder="Tell your professional story. What drives you? What are your key accomplishments?" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormDescription>
                A compelling bio helps you connect with investors and talent.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your business, its mission, and the problem it solves." {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isIncorporated"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Is your business incorporated?
                </FormLabel>
                <FormDescription>
                  Select if you have a registered legal entity for your business.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {isIncorporated && (
             <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle>Incorporation Details</CardTitle>
                    <CardDescriptionComponent>Provide your company's incorporation information.</CardDescriptionComponent>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="entityStructure" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entity Structure</FormLabel>
                            <FormControl><Input placeholder="e.g., C-Corp, LLC" {...field} value={field.value ?? ''} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="countryOfIncorporation" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country of Incorporation</FormLabel>
                            <FormControl><Input placeholder="e.g., United States" {...field} value={field.value ?? ''} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="taxNumber" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tax Number (TIN/EIN)</FormLabel>
                            <FormControl><Input placeholder="Your business tax ID" {...field} value={field.value ?? ''} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="uniqueEntityNumber" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Unique Entity Number (UEN)</FormLabel>
                            <FormControl><Input placeholder="Your UEN or equivalent" {...field} value={field.value ?? ''} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </CardContent>
            </Card>
        )}
        
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>Founding Team</CardTitle>
            <CardDescriptionComponent>Add the members of your founding team. You are listed as the lead founder by default.</CardDescriptionComponent>
          </CardHeader>
          <CardContent className="space-y-4">
            {founderFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-4 p-4 border rounded-md relative">
                 <FormField
                  control={form.control}
                  name={`founders.${index}.founderName`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Founder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`founders.${index}.founderTitle`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CTO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeFounder(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendFounder({ founderName: '', founderTitle: '' })}
            >
              Add Founder
            </Button>
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Profile Photo</FormLabel>
              <FormControl>
                <ImageUploader 
                    onUrlChange={field.onChange} 
                    currentAvatarUrl={field.value}
                    userName={user?.displayName || ''}
                />
              </FormControl>
              <FormDescription>
                This is for your personal profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Card className="border-green-200 bg-green-50/30">
            <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                    <ShieldCheck className="mr-2 h-6 w-6" />
                    Confidential Financials
                </CardTitle>
                <CardDescriptionComponent>
                    This information will only be shared with investors upon your explicit approval.
                </CardDescriptionComponent>
            </CardHeader>
            <CardContent className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Financial Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormField control={form.control} name="mrr" render={({ field }) => (<FormItem><FormLabel>MRR ($)</FormLabel><FormControl><Input placeholder="10000" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="grossMargins" render={({ field }) => (<FormItem><FormLabel>Gross Margins (%)</FormLabel><FormControl><Input placeholder="80" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="burnRate" render={({ field }) => (<FormItem><FormLabel>Burn Rate ($/month)</FormLabel><FormControl><Input placeholder="5000" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="cashBurnRunway" render={({ field }) => (<FormItem><FormLabel>Cash Runway (months)</FormLabel><FormControl><Input placeholder="18" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="valuation" render={({ field }) => (<FormItem><FormLabel>Latest Valuation ($)</FormLabel><FormControl><Input placeholder="5000000" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="customerAcquisitionCost" render={({ field }) => (<FormItem><FormLabel>CAC ($)</FormLabel><FormControl><Input placeholder="500" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="customerLifetimeValue" render={({ field }) => (<FormItem><FormLabel>LTV ($)</FormLabel><FormControl><Input placeholder="2500" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="cacPayback" render={({ field }) => (<FormItem><FormLabel>CAC Payback (months)</FormLabel><FormControl><Input placeholder="5" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="roi" render={({ field }) => (<FormItem><FormLabel>ROI (%)</FormLabel><FormControl><Input placeholder="400" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="netProfitMargins" render={({ field }) => (<FormItem><FormLabel>Net Profit Margins (%)</FormLabel><FormControl><Input placeholder="20" type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Capitalization Table</CardTitle>
                        <CardDescriptionComponent>Add the main investors or groups on your cap table.</CardDescriptionComponent>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {capTableFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 items-end gap-4 p-4 border rounded-md">
                            <FormField control={form.control} name={`capTable.${index}.investorName`} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Investor</FormLabel><FormControl><Input placeholder="Founder/Angel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name={`capTable.${index}.holdingPercentage`} render={({ field }) => (<FormItem><FormLabel>Holding %</FormLabel><FormControl><Input type="number" placeholder="50" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name={`capTable.${index}.shareCount`} render={({ field }) => (<FormItem><FormLabel>Shares</FormLabel><FormControl><Input type="number" placeholder="500000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeCapEntry(index)} className="md:col-start-5 justify-self-end"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendCapEntry({ investorName: '', holdingPercentage: 0, shareCount: 0 })}>Add Cap Table Entry</Button>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="fundingStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fundraising Stage</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current funding stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pre-seed">Pre-seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B</SelectItem>
                </SelectContent>
              </Select>
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
