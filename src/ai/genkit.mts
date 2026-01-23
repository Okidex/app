import { genkit } from 'genkit';
// Fix: Use 'googleai' instead of 'google-genai'
import { googleAI } from '@genkit-ai/googleai'; 

export const ai = genkit({
  plugins: [googleAI()],
});
