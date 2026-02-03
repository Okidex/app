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
  // Notice we use config to set model parameters if needed
  prompt: `
    <system>
    You are a high-precision search engine for Okidex, a professional network. 
    Your goal is to match a search query against a list of users and startups.
    
    CRITICAL RULES:
    1. If the user searches for a role (e.g., "investors", "founders", "talent"), you MUST return all IDs belonging to that role in the data, even if their specific 'details' field is brief.
    2. Use semantic matching. If a user asks for "VCs" or "funding", match people with the role "investor".
    3. If a user asks for "jobs" or "hiring", match people with the role "talent" or startups with relevant descriptions.
    4. If no results are found, return empty arrays: {"startupIds": [], "userIds": []}.
    </system>

    Search Query: "{{query}}"

    Searchable Data (JSON):
    {{{searchableData}}}

    Task: Return a JSON object with "startupIds" and "userIds" that are relevant. 
    Output ONLY raw JSON. No markdown, no backticks, no preamble.
  `,
});

const smartSearchFlow = ai.defineFlow(
  {
    name: 'smartSearchFlow',
    inputSchema: SmartSearchInputSchema,
    outputSchema: SmartSearchOutputSchema,
  },
  async (input) => {
    const response = await prompt(input);
    const jsonString = response.text;

    if (!jsonString) {
      console.error("LLM returned an empty response for query:", input.query);
      return { startupIds: [], userIds: [] };
    }
    
    try {
      // Robust cleaning to handle cases where LLM ignores "no backticks" rule
      const cleanedJsonString = jsonString
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
        
      const parsedOutput = JSON.parse(cleanedJsonString);
      
      return SmartSearchOutputSchema.parse(parsedOutput);
    } catch (e) {
      console.error("Failed to parse LLM search results. Raw text:", jsonString);
      // Return empty results instead of crashing the build/app
      return { startupIds: [], userIds: [] };
    }
  }
);
