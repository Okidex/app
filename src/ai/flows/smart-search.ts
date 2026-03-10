
'use server';

import { ai } from '../genkit';
import { z } from 'genkit';

const SmartSearchInputSchema = z.object({
  query: z.string().describe('The natural language search query.'),
  searchableData: z.string().describe('A JSON string of all searchable data including startups and users.'),
});

export type SmartSearchInput = z.infer<typeof SmartSearchInputSchema>;

const SmartSearchOutputSchema = z.object({
  startupIds: z.array(z.string()).describe('An array of startup IDs relevant to the search query, prioritized by fit.'),
  userIds: z.array(z.string()).describe('An array of user IDs relevant to the search query, prioritized by fit.'),
});

export type SmartSearchOutput = z.infer<typeof SmartSearchOutputSchema>;

/**
 * Wrapper function to expose the Genkit flow as a Next.js Server Action.
 * Prioritizes results based on complementary Objectives.
 */
export async function smartSearch(input: SmartSearchInput): Promise<SmartSearchOutput> {
  return smartSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSearchPrompt',
  input: { schema: SmartSearchInputSchema },
  prompt: `
    <system>
    You are a high-precision matchmaking and search engine for Okidex.
    Your goal is to match a search query against a list of users and startups, prioritizing complementary OBJECTIVES.
    
    MATCHMAKING RATIONALIZATION RULES:
    1. Founder 'fundraising' explicitly matches Investor 'fundDeployment' or anyone with role 'investor'.
    2. Founder 'lookingToHire' explicitly matches Talent seeking 'employee' or 'fractional-leader' roles.
    3. Founder 'seekingCoFounders' matches Talent or Founders with 'co-founder' subRole or objective.
    4. Founder 'lookingForMentorship' matches Investors open to 'mentoring'.
    5. User 'networking' matches any user with 'networking' or relevant domain expertise.

    PRIORITIZATION LOGIC:
    - RANK HIGHER results whose 'objectives' (for founders), 'seeking' (for investors), or 'subRole' (for talent) directly solve the query's need.
    - If the user query implies hiring (e.g., "developer", "CTO"), prioritize Talent results with matching skills.
    - If the user query implies capital (e.g., "VC", "seed", "funding"), prioritize Investor results.
    - Order IDs from BEST fit to LEAST fit.
    </system>

    Search Query: "{{query}}"

    Searchable Data (JSON):
    {{{searchableData}}}

    Task: Analyze the context and return a JSON object with "startupIds" and "userIds" ordered by relevance and complementary fit.
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
      console.error("[DEBUGGER-AI] LLM returned empty response");
      return { startupIds: [], userIds: [] };
    }
    
    try {
      const cleanedJsonString = jsonString
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
        
      const parsedOutput = JSON.parse(cleanedJsonString);
      console.log(`[DEBUGGER-AI] AI prioritized ${parsedOutput.userIds?.length || 0} users and ${parsedOutput.startupIds?.length || 0} startups based on complementary objectives.`);
      return SmartSearchOutputSchema.parse(parsedOutput);
    } catch (e) {
      console.error("[DEBUGGER-AI] Parse error. Raw text:", jsonString);
      return { startupIds: [], userIds: [] };
    }
  }
);
