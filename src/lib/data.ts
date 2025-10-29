
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

