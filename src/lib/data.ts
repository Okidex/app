
import { InvestmentStage } from './types';
import { users as mockUsers, startups as mockStartups, jobs as mockJobs, theses as mockTheses, notifications as mockNotifications, conversations as mockConversations } from './mock-data';
import { getImage as getPlaceholderImage } from './placeholder-images';
import type { FullUserProfile, Startup, Job, InvestmentThesis, Notification, Conversation } from './types';


export const investmentStages: InvestmentStage[] = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];
export const users: FullUserProfile[] = mockUsers;
export const startups: Startup[] = mockStartups;
export const jobs: Job[] = mockJobs;
export const theses: InvestmentThesis[] = mockTheses;
export const notifications: Notification[] = mockNotifications;
export const conversations: Conversation[] = mockConversations;

export const getImage = getPlaceholderImage;

// In a real app, you'd fetch this from a server based on the logged-in user.
// For this prototype, we'll just grab the first user from our mock data.
export const getCurrentUser = (): FullUserProfile => {
    return users[0];
};

export const getUserById = (id: string): FullUserProfile | undefined => {
    return users.find(user => user.id === id);
}

export const getStartupById = (id: string): Startup | undefined => {
    return startups.find(startup => startup.id === id);
}

