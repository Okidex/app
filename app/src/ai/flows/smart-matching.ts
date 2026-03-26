
'use server';

/**
 * @fileOverview Smart matching flow for connecting founders with investors and talent.
 *
 * - smartMatch - A function that takes a user's profile and returns potential investors and talent matches.
 * - SmartMatchInput - The input type for the smartMatch function.
 * - SmartMatchOutput - The return type for the smartMatch function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SmartMatchInputSchema = z.object({
  startupProfile: z.string().describe("A detailed description of the user's profile, including their role, skills, interests, and what they are looking for."),
});
export type SmartMatchInput = z.infer<typeof SmartMatchInputSchema>;

const SmartMatchOutputSchema = z.object({
  investorMatches: z.array(z.string()).describe("A list of descriptive profiles for up to 5 suitable investor matches."),
  talentMatches: z.array(z.string()).describe("A list of descriptive profiles for up to 5 suitable talent matches."),
});
export type SmartMatchOutput = z.infer<typeof SmartMatchOutputSchema>;

export async function smartMatch(input: SmartMatchInput): Promise<SmartMatchOutput> {
  return smartMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartMatchPrompt',
  input: {schema: SmartMatchInputSchema},
  output: {schema: SmartMatchOutputSchema},
  prompt: `You are a smart matchmaking AI for a platform connecting founders, investors, and talent. Your goal is to find the best potential connections for a given user.

User Profile:
{{{startupProfile}}}

Based on the user's profile, generate a list of plausible, hypothetical matches.
- If the user is a founder, find potential investors and talent.
- If the user is an investor, find potential founders.
- If the user is a talent, find potential founders.

For each match, provide a short, compelling, one-sentence profile. Return up to 5 of each type of match.
`,
});


const smartMatchFlow = ai.defineFlow(
  {
    name: 'smartMatchFlow',
    inputSchema: SmartMatchInputSchema,
    outputSchema: SmartMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

