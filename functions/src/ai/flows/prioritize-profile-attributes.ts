
'use server';
/**
 * @fileOverview A flow to prioritize profile attributes based on investor criteria.
 *
 * - prioritizeProfileAttributes - A function that handles the profile attribute prioritization.
 * - PrioritizeProfileAttributesInput - The input type for the prioritizeProfileAttributes function.
 * - PrioritizeProfileAttributesOutput - The return type for the prioritizeProfileAttributes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const PrioritizeProfileAttributesInputSchema = z.object({
  investorCriteria: z
    .string()
    .describe('The investment criteria specified by the investor.'),
  profileAttributes: z
    .string()
    .describe('The profile attributes of the talent or founder.'),
});
export type PrioritizeProfileAttributesInput = z.infer<
  typeof PrioritizeProfileAttributesInputSchema
>;

export const PrioritizeProfileAttributesOutputSchema = z.object({
  prioritizedAttributes: z
    .string()
    .describe(
      'The profile attributes prioritized based on the investor criteria.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the prioritization of attributes.'),
});
export type PrioritizeProfileAttributesOutput = z.infer<
  typeof PrioritizeProfileAttributesOutputSchema
>;

export async function prioritizeProfileAttributes(
  input: PrioritizeProfileAttributesInput
): Promise<PrioritizeProfileAttributesOutput> {
  return prioritizeProfileAttributesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeProfileAttributesPrompt',
  input: {schema: PrioritizeProfileAttributesInputSchema},
  output: {schema: PrioritizeProfileAttributesOutputSchema},
  prompt: `You are an AI assistant that determines if a given user profile is a good match for an investor's criteria. Your goal is to provide a concise, one-sentence reasoning for why the profile is a good match.

Investor Criteria:
{{{investorCriteria}}}

User Profile to Evaluate:
{{{profileAttributes}}}

Task:
Based on the investor's criteria, evaluate the user's profile and provide a single sentence explaining why they are a compelling match. Focus on the most important overlaps in interests, role, or experience. Do not list attributes, just provide the reasoning.
`,
});

const prioritizeProfileAttributesFlow = ai.defineFlow(
  {
    name: 'prioritizeProfileAttributesFlow',
    inputSchema: PrioritizeProfileAttributesInputSchema,
    outputSchema: PrioritizeProfileAttributesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

