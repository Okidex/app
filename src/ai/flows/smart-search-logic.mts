import { ai } from '../genkit.mjs'; // Note the .mjs extension for Node 22
import { z } from 'genkit';

export const SmartSearchInputSchema = z.object({
  query: z.string().describe('The natural language search query.'),
  searchableData: z.string().describe('A JSON string of all searchable data including startups and users.'),
});

export const SmartSearchOutputSchema = z.object({
  startupIds: z.array(z.string()).describe('An array of startup IDs that are relevant to the search query.'),
  userIds: z.array(z.string()).describe('An array of user IDs that are relevant to the search query.'),
});

const prompt = ai.definePrompt({
  name: 'smartSearchPrompt',
  input: { schema: SmartSearchInputSchema },
  output: { schema: SmartSearchOutputSchema },
  prompt: `You are an intelligent search engine. Analyze query: "{{query}}" against data: {{{searchableData}}}. Return relevant startupIds and userIds.`,
});

export const smartSearchFlow = ai.defineFlow(
  {
    name: 'smartSearchFlow',
    inputSchema: SmartSearchInputSchema,
    outputSchema: SmartSearchOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error("Search flow failed to generate output");
    return output;
  }
);
