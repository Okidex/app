
'use server';
/**
 * @fileOverview An AI-powered search flow to find relevant startups and users.
 *
 * - smartSearch - A function that takes a natural language query and returns relevant startup and user IDs.
 * - SmartSearchInput - The input type for the smartSearch function  * - SmartSearchOutput - The return type for the smartSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSearchInputSchema = z.object({
  query: z.string().describe('The natural language search query.'),
  searchableData: z.string().describe('A JSON string of all searchable data including startups and users.'),
});
export type SmartSearchInput = z.infer<typeof SmartSearchInputSchema>;

const SmartSearchOutputSchema = z.object({
  startupIds: z.array(z.string()).describe('An array of startup IDs that are relevant to the search query.'),
  userIds: z.array(z.string()).describe('An array of user IDs that are relevant to the search query.'),
});
export type SmartSearchOutput = z.infer<typeof SmartSearchOutputSchema>;

export async function smartSearch(input: SmartSearchInput): Promise<SmartSearchOutput> {
  return smartSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSearchPrompt',
  input: {schema: SmartSearchInputSchema},
  output: {schema: SmartSearchOutputSchema},
  prompt: `You are an intelligent search engine for a platform connecting startup founders, investors, and talent. Your task is to analyze a natural language query and return the most relevant startup and user IDs based on the provided data.

Search Query: "{{query}}"

Searchable Data (JSON):
{{{searchableData}}}

Based on the query, identify the most relevant startups and users from the data. Return their IDs in the "startupIds" and "userIds" arrays. Match against all available fields, including names, descriptions, industries, skills, investment interests, etc. Prioritize relevance.
`,
});

const smartSearchFlow = ai.defineFlow(
  {
    name: 'smartSearchFlow',
    inputSchema: SmartSearchInputSchema,
    outputSchema: SmartSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
