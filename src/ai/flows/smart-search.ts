'use server';

import 'server-only';
import { ai } from '../genkit.mjs';
import { smartSearchFlow } from './smart-search-logic.mjs';
import type { z } from 'genkit';
import type { SmartSearchInputSchema, SmartSearchOutputSchema } from './smart-search-logic.mjs';

export type SmartSearchInput = z.infer<typeof SmartSearchInputSchema>;
export type SmartSearchOutput = z.infer<typeof SmartSearchOutputSchema>;

export async function smartSearch(input: SmartSearchInput): Promise<SmartSearchOutput> {
  // 2026 Best Practice: Logic execution is isolated from the Action proxy
  return await ai.runFlow(smartSearchFlow, input);
}
