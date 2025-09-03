
'use server';
/**
 * @fileOverview Flow to process an investor's thesis into a startup challenge.
 *
 * - processInvestmentChallenge - A function that refines an investor's raw thesis into a structured challenge for founders.
 * - ProcessInvestmentChallengeInput - The input type for the function.
 * - ProcessInvestmentChallengeOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ProcessInvestmentChallengeInputSchema = z.object({
  thesis: z.string().describe("The investor's raw, open-ended investment thesis or challenge description."),
});
export type ProcessInvestmentChallengeInput = z.infer<typeof ProcessInvestmentChallengeInputSchema>;

export const ProcessInvestmentChallengeOutputSchema = z.object({
  aiTitle: z.string().describe("A catchy, concise title for the challenge that will grab a founder's attention."),
  aiSummary: z.string().describe('A one-paragraph summary of the challenge, written for a founder audience.'),
  keyPoints: z.array(z.string()).describe('A list of 3-5 key bullet points that a founder should know about the challenge (e.g., target market, key technology, required traction).'),
});
export type ProcessInvestmentChallengeOutput = z.infer<typeof ProcessInvestmentChallengeOutputSchema>;


export async function processInvestmentChallenge(
  input: ProcessInvestmentChallengeInput
): Promise<ProcessInvestmentChallengeOutput> {
  return processInvestmentChallengeFlow(input);
}


const prompt = ai.definePrompt({
  name: 'processInvestmentChallengePrompt',
  input: {schema: ProcessInvestmentChallengeInputSchema},
  output: {schema: ProcessInvestmentChallengeOutputSchema},
  prompt: `You are an expert at distilling complex investment theses into actionable and exciting challenges for startup founders. Your goal is to reframe an investor's thesis into a clear and compelling call-to-action.

You will be given the investor's raw thesis. Your task is to process it and generate the following:

1.  **aiTitle**: A short, catchy title for the challenge (e.g., "The Future of Remote Work is Here," "Build the Next Gen Fintech API," "Solving Last-Mile Logistics").
2.  **aiSummary**: A one-paragraph summary that explains the core problem or opportunity. This should be written in a way that energizes founders, making them feel this is a solvable and worthwhile problem.
3.  **keyPoints**: A list of 3-5 essential bullet points. These should clarify the scope, such as the target market, required technology, ideal traction level, or specific problems to solve.

Do not just copy phrases. Synthesize and reframe the content for a founder audience.

Investor Thesis:
{{{thesis}}}
`,
});

const processInvestmentChallengeFlow = ai.defineFlow(
  {
    name: 'processInvestmentChallengeFlow',
    inputSchema: ProcessInvestmentChallengeInputSchema,
    outputSchema: ProcessInvestmentChallengeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

