
import { Timestamp } from 'firebase/firestore';

export type UserRole = 'Investor' | 'Talent' | 'Founder';
export type FundingStage = 'pre-seed' | 'seed' | 'series-a' | 'series-b';

export interface Experience {
  title: string;
  company: string;
  duration: string;
}

export interface FounderEntry {
  founderName: string;
  founderTitle: string;
}

export interface CapTableEntry {
  investorName: string;
  holdingPercentage: number;
  shareCount: number;
}

export interface FinancialRecord {
  month: string; // "YYYY-MM"
  mrr: number;
  burnRate: number;
}

export interface Profile {
  headline?: string;
  summary?: string;
  bio?: string;
  experience?: Experience[];
  interests?: string[];
  linkedinUrl?: string;
  // Founder
  businessName?: string;
  websiteUrl?: string;
  businessDescription?: string;
  fundingStage?: FundingStage;
  founders?: FounderEntry[];
  isIncorporated?: boolean;
  taxNumber?: string;
  uniqueEntityNumber?: string;
  entityStructure?: string;
  countryOfIncorporation?: string;
  // Financial Metrics for Founders
  grossMargins?: number;
  burnRate?: number;
  customerAcquisitionCost?: number;
  customerLifetimeValue?: number;
  mrr?: number;
  netProfitMargins?: number;
  cashBurnRunway?: number;
  roi?: number;
  cacPayback?: number;
  valuation?: number;
  capTable?: CapTableEntry[];
  financialHistory?: FinancialRecord[];
  achievements?: string[];
  // Talent
  skills?: string[];
  openToCoFounding?: boolean;
  // Investor
  investmentThesis?: string;
  pastInvestments?: string[];
  companyUrl?: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  businessLogoUrl?: string;
  role: UserRole;
  isPremium?: boolean;
  profile: Partial<Profile>;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
    id: string;
    participant: User;
    messages: Message[];
    lastMessage: string;
    lastMessageTimestamp: string;
}

export type NotificationType = 'new_message' | 'new_connection' | 'challenge_response' | 'general';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: Timestamp;
  link?: string;
  type?: NotificationType;
}

export interface Challenge {
    id: string;
    investorId: string;
    thesis: string;
    aiSummary: string;
    aiTitle: string;
    keyPoints: string[];
    createdAt: Timestamp;
    responses: string[];
}

