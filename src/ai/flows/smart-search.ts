
'use server';

import { ai } from '../genkit';
import { z } from 'genkit';

const SmartSearchInputSchema = z.object({
  query: z.string().describe('The natural language search query.'),
  searchableData: z.string().describe('A JSON string of all searchable data including startups and users.'),
});

export type SmartSearchInput = z.infer<typeof SmartSearchInputSchema>;

const SmartSearchOutputSchema = z.object({
  startupIds: z.array(z.string()).describe('An array of startup IDs relevant to the search query.'),
  userIds: z.array(z.string()).describe('An array of user IDs relevant to the search query.'),
});

export type SmartSearchOutput = z.infer<typeof SmartSearchOutputSchema>;

/**
 * Wrapper function to expose the Genkit flow as a Next.js Server Action.
 */
export async function smartSearch(input: SmartSearchInput): Promise<SmartSearchOutput> {
  return smartSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSearchPrompt',
  input: { schema: SmartSearchInputSchema },
  output: { schema: SmartSearchOutputSchema },
  prompt: `You are a search engine for a professional network. Your task is to find relevant startups and users from the provided JSON data based on a search query.

Search Query: "{{query}}"

Searchable Data (JSON):
{{{searchableData}}}

Analyze the query and the data. A match occurs if the query text appears in any of the fields for a startup or user (e.g., name, description, industry, skills). Return the 'id' of every startup and user that matches.`,
});

const smartSearchFlow = ai.defineFlow(
  {
    name: 'smartSearchFlow',
    inputSchema: SmartSearchInputSchema,
    outputSchema: SmartSearchOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Search flow failed to generate a valid output.");
    }
    return output;
  }
);
