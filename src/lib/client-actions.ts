
'use client';

import {
  summarizeFinancialData,
  FinancialDataInput,
} from '@/ai/flows/financial-data-summary';
import { profilePictureAutoTagging } from '@/ai/flows/profile-picture-auto-tagging';
import { smartMatch } from '@/ai/flows/smart-matching';
import { populateProfileFromLinkedIn } from '@/ai/flows/linkedin-profile-populator';
import { financialBreakdown } from '@/ai/flows/financial-breakdown';

// Re-export AI functions to be used in client components
// These are safe because they don't directly expose firebase-admin

export async function getFinancialSummary(input: FinancialDataInput) {
    return await summarizeFinancialData(input);
}
export async function getProfilePictureTags(input: {photoDataUri: string}) {
    return await profilePictureAutoTagging(input);
}
export async function getSmartMatches(input: {startupProfile: string}) {
    return await smartMatch(input);
}
export async function getProfileFromLinkedIn(input: {linkedinUrl: string}) {
    return await populateProfileFromLinkedIn(input);
}
export async function getFinancialBreakdown(input: {metric: string}) {
    return await financialBreakdown(input);
}
