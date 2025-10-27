
'use server';
import {
  summarizeFinancialData,
  FinancialDataInput,
} from '@/ai/flows/financial-data-summary';
import { profilePictureAutoTagging } from '@/ai/flows/profile-picture-auto-tagging';
import { smartMatch } from '@/ai/flows/smart-matching';
import { populateProfileFromLinkedIn } from '@/ai/flows/linkedin-profile-populator';
import { financialBreakdown } from '@/ai/flows/financial-breakdown';
import { smartSearch } from '@/ai/flows/smart-search';
import { FullUserProfile, Startup } from './types';
import { initializeAdminApp } from './firebase-admin';

// Re-export AI functions to be used in client components
// These are safe because they don't directly expose firebase-admin

export const getFinancialSummary = summarizeFinancialData;
export const getProfilePictureTags = profilePictureAutoTagging;
export const getSmartMatches = smartMatch;
export const getProfileFromLinkedIn = populateProfileFromLinkedIn;
export const getFinancialBreakdown = financialBreakdown;
export const getSearchResults = smartSearch;

