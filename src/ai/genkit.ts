import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit Instance - 2026 Stable
 * This instance is used across all flows via extensionless imports.
 */
export const ai = genkit({
  plugins: [
    googleAI(), // Automatically loads GOOGLE_GENAI_API_KEY from environment
  ],
});

/**
 * Stable 2026 Model Reference
 * Gemini 2.5 Flash-Lite is the standard for low-latency AI flows in 2026.
 */
export const geminiModel = 'googleai/gemini-2.5-flash-lite';
