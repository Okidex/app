'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfilePictureAutoTaggingInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A profile picture, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type ProfilePictureAutoTaggingInput = z.infer<
  typeof ProfilePictureAutoTaggingInputSchema
>;

const ProfilePictureAutoTaggingOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe(
      'An array of suggested tags for the profile picture (e.g., professional, friendly, founder, investor).'
    ),
});

export type ProfilePictureAutoTaggingOutput = z.infer<
  typeof ProfilePictureAutoTaggingOutputSchema
>;

export async function profilePictureAutoTagging(
  input: ProfilePictureAutoTaggingInput
): Promise<ProfilePictureAutoTaggingOutput> {
  return profilePictureAutoTaggingFlow(input);
}

const profilePictureAutoTaggingPrompt = ai.definePrompt({
  name: 'profilePictureAutoTaggingPrompt',
  input: {schema: ProfilePictureAutoTaggingInputSchema},
  output: {schema: ProfilePictureAutoTaggingOutputSchema},
  prompt: `Analyze the provided profile picture and suggest relevant tags to improve profile discoverability and matching accuracy.

  Consider aspects like the person's attire, background, and overall impression to determine appropriate tags such as 'professional', 'friendly', 'founder', 'investor', 'approachable', or other relevant descriptors.

  Photo: {{media url=photoDataUri}}
  Tags:`,
});

const profilePictureAutoTaggingFlow = ai.defineFlow(
  {
    name: 'profilePictureAutoTaggingFlow',
    inputSchema: ProfilePictureAutoTaggingInputSchema,
    outputSchema: ProfilePictureAutoTaggingOutputSchema,
  },
  async input => {
    const {output} = await profilePictureAutoTaggingPrompt(input);
    return output!;
  }
);
