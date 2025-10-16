'use server';

/**
 * @fileOverview Summarizes financial data provided by founders for investors.
 *
 * - summarizeFinancialData - A function that takes financial data as input and returns a summary.
 * - FinancialDataInput - The input type for the summarizeFinancialData function.
 * - FinancialDataOutput - The return type for the summarizeFinancialData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialDataInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  revenue: z.number().describe('The total revenue of the company.'),
  expenses: z.number().describe('The total expenses of the company.'),
  netIncome: z.number().describe('The net income of the company.'),
  grossProfitMargin: z.number().describe('The gross profit margin of the company.'),
  ebitda: z.number().describe('The EBITDA of the company.'),
  customerAcquisitionCost: z.number().describe('The customer acquisition cost.'),
  customerLifetimeValue: z.number().describe('The customer lifetime value.'),
  monthlyRecurringRevenue: z.number().describe('The monthly recurring revenue.'),
  cashBurnRate: z.number().describe('The cash burn rate.'),
  runway: z.number().describe('The runway of the company in months.'),
});

export type FinancialDataInput = z.infer<typeof FinancialDataInputSchema>;

const FinancialDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the financial data, highlighting key metrics and insights.'),
});

export type FinancialDataOutput = z.infer<typeof FinancialDataOutputSchema>;

export async function summarizeFinancialData(input: FinancialDataInput): Promise<FinancialDataOutput> {
  return financialDataSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialDataSummaryPrompt',
  input: {schema: FinancialDataInputSchema},
  output: {schema: FinancialDataOutputSchema},
  prompt: `You are an expert financial analyst summarizing financial data for investors.

  Given the following financial data for {{companyName}}, provide a concise summary highlighting key metrics and insights that would be relevant to investors. Focus on metrics that indicate the company's financial health and growth potential.

  Revenue: {{revenue}}
  Expenses: {{expenses}}
  Net Income: {{netIncome}}
  Gross Profit Margin: {{grossProfitMargin}}
  EBITDA: {{ebitda}}
  Customer Acquisition Cost: {{customerAcquisitionCost}}
  Customer Lifetime Value: {{customerLifetimeValue}}
  Monthly Recurring Revenue: {{monthlyRecurringRevenue}}
  Cash Burn Rate: {{cashBurnRate}}
  Runway: {{runway}} months

  Summary:`,
});

const financialDataSummaryFlow = ai.defineFlow(
  {
    name: 'financialDataSummaryFlow',
    inputSchema: FinancialDataInputSchema,
    outputSchema: FinancialDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
