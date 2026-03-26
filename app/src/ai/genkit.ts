import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Ensure GOOGLE_GENAI_API_KEY is defined in your .env.local
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY,
      // FORCE: v1 ensures we hit the production router instead of the beta one
      apiVersion: 'v1',
    }),
  ],
  // Safe default model for v1 AI generation
  model: googleAI.model('gemini-2.5-flash'),
});
