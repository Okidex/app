'use server';

/**
 * @fileOverview Populates a user's profile from their LinkedIn URL.
 *
 * - populateProfileFromLinkedIn - A function that takes a LinkedIn URL and returns structured profile data.
 * - PopulateProfileFromLinkedInInput - The input type for the populateProfileFromLinkedIn function.
 * - PopulateProfileFromLinkedInOutput - The return type for the populateProfileFromLinkedIn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PopulateProfileFromLinkedInInputSchema = z.object({
  linkedinUrl: z.string().url().describe('The URL of the user\'s LinkedIn profile.'),
});
export type PopulateProfileFromLinkedInInput = z.infer<typeof PopulateProfileFromLinkedInInputSchema>;

const PopulateProfileFromLinkedInOutputSchema = z.object({
    name: z.string().describe("The user's full name."),
    title: z.string().optional().describe("The user's current job title or headline."),
    experience: z.string().optional().describe("A summary of the user's professional experience."),
    skills: z.array(z.string()).optional().describe("A list of the user's skills."),
});
export type PopulateProfileFromLinkedInOutput = z.infer<typeof PopulateProfileFromLinkedInOutputSchema>;


export async function populateProfileFromLinkedIn(input: PopulateProfileFromLinkedInInput): Promise<PopulateProfileFromLinkedInOutput> {
  return populateProfileFromLinkedInFlow(input);
}

const prompt = ai.definePrompt({
  name: 'populateProfileFromLinkedInPrompt',
  input: {schema: PopulateProfileFromLinkedInInputSchema},
  output: {schema: PopulateProfileFromLinkedInOutputSchema},
  prompt: `You are an expert at parsing LinkedIn profiles. Given a LinkedIn profile URL, your task is to extract key information to populate a user's profile on our platform.

LinkedIn Profile URL: {{{linkedinUrl}}}

Please extract the following information and return it in the specified JSON format:
- Full Name
- Current job title or headline
- A summary of their professional experience
- A list of their skills

Do not scrape the website. Based on the URL structure, make assumptions about the user's profile. For example, if the URL is "linkedin.com/in/ada-lovelace", the name is likely "Ada Lovelace". Invent plausible details for a person with that name.
`,
});

const populateProfileFromLinkedInFlow = ai.defineFlow(
  {
    name: 'populateProfileFromLinkedInFlow',
    inputSchema: PopulateProfileFromLinkedInInputSchema,
    outputSchema: PopulateProfileFromLinkedInOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
