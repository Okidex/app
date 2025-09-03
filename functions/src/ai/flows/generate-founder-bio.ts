
'use server';
/**
 * @fileOverview A flow to generate a founder's bio from their LinkedIn profile.
 *
 * - generateFounderBio - A function that generates a compelling bio for a founder.
 * - GenerateFounderBioInput - The input type for the generateFounderBio function.
 * - GenerateFounderBioOutput - The return type for the generateFounderBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFounderBioInputSchema = z.object({
  name: z.string().describe('The name of the founder.'),
  businessName: z.string().describe("The name of the founder's business."),
  linkedinUrl: z.string().url().describe("The founder's LinkedIn profile URL."),
});
export type GenerateFounderBioInput = z.infer<
  typeof GenerateFounderBioInputSchema
>;

const GenerateFounderBioOutputSchema = z.object({
  bio: z
    .string()
    .describe('A compelling, professionally written bio for the founder.'),
});
export type GenerateFounderBioOutput = z.infer<
  typeof GenerateFounderBioOutputSchema
>;

export async function generateFounderBio(
  input: GenerateFounderBioInput
): Promise<GenerateFounderBioOutput> {
  return generateFounderBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFounderBioPrompt',
  input: {schema: GenerateFounderBioInputSchema},
  output: {schema: GenerateFounderBioOutputSchema},
  prompt: `You are an expert copywriter specializing in crafting compelling and professional biographies for startup founders. Your task is to write a short, engaging bio for a founder based on the provided information.

The bio should be:
- Written in the first person.
- Authentic and reflect a professional but personal tone.
- Highlight their passion, mission, and key accomplishments implicitly through their story.
- Connect their personal drive to the mission of their company.

Do not just list facts. Weave a narrative.

Founder's Name: {{{name}}}
Company Name: {{{businessName}}}
LinkedIn Profile: {{{linkedinUrl}}}

Based on this information, generate a compelling bio. You will have to make creative inferences based on the provided URL and names. Do not mention the LinkedIn URL in the bio.
`,
});

const generateFounderBioFlow = ai.defineFlow(
  {
    name: 'generateFounderBioFlow',
    inputSchema: GenerateFounderBioInputSchema,
    outputSchema: GenerateFounderBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

