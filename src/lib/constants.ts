
import { InvestmentStage, FounderObjective } from './types';

export const investmentStages: InvestmentStage[] = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];

export const founderObjectives: { id: FounderObjective, label: string }[] = [
    { id: 'fundraising', label: 'Fundraising' },
    { id: 'networking', label: 'Networking' },
    { id: 'seekingCoFounders', label: 'Seeking Co-founders' },
    { id: 'seekingProfessionalAdvice', label: 'Seeking Professional Advice' },
    { id: 'lookingForMentorship', label: 'Looking for Mentorship' },
    { id: 'lookingToHire', label: 'Looking to Hire' },
];
