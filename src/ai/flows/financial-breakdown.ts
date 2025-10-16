'use server';

/**
 * @fileOverview Provides a detailed breakdown of a specific financial metric.
 *
 * - financialBreakdown - A function that takes a metric name and returns a detailed analysis.
 * - FinancialBreakdownInput - The input type for the financialBreakdown function.
 * - FinancialBreakdownOutput - The return type for the financialBreakdown function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialBreakdownInputSchema = z.object({
  metric: z.string().describe('The financial metric to be broken down (e.g., "Revenue", "Expenses").'),
});
export type FinancialBreakdownInput = z.infer<typeof FinancialBreakdownInputSchema>;

const FinancialBreakdownOutputSchema = z.object({
  breakdown: z.string().describe("A concise, visually-led breakdown of the financial metric. It should be easy to read, using formatting like bullet points and bold text to highlight key information."),
});
export type FinancialBreakdownOutput = z.infer<typeof FinancialBreakdownOutputSchema>;

export async function financialBreakdown(input: FinancialBreakdownInput): Promise<FinancialBreakdownOutput> {
  return financialBreakdownFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialBreakdownPrompt',
  input: {schema: FinancialBreakdownInputSchema},
  output: {schema: FinancialBreakdownOutputSchema},
  prompt: `You are a financial analyst providing a concise and visually-led breakdown of a financial metric for an investor. Your explanation must be clear and easy to read.

  The user has requested a breakdown of the following metric: {{{metric}}}.

  Your task is to generate a plausible, detailed analysis. For example, if the metric is "Revenue", you could break it down by product lines or subscription tiers. If it's "Expenses", you could detail costs like salaries and marketing.

  **Instructions:**
  1.  Start with a one-sentence summary of the metric's composition.
  2.  Follow with a bulleted list that breaks down the metric into its key components.
  3.  Use bold formatting for key labels and figures to make the information stand out (e.g., "**Enterprise Tier:** $300,000").
  4.  Keep the language direct and professional.
  `,
});

const financialBreakdownFlow = ai.defineFlow(
  {
    name: 'financialBreakdownFlow',
    inputSchema: FinancialBreakdownInputSchema,
    outputSchema: FinancialBreakdownOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
