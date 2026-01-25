
export type UserRole = 'founder' | 'investor' | 'talent';
export type TalentSubRole = 'co-founder' | 'employee' | 'vendor' | 'fractional-leader';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export interface StripeDetails {
    customerId?: string;
    subscriptionId?: string;
    plan?: 'monthly' | 'yearly';
    status?: string;
}

export interface CapTableEntry {
  id: string;
  shareholderName: string;
  investment: number;
  shares: number;
  equityPercentage: number;
  investmentStage: InvestmentStage;
}

export interface MonthlyFinancials {
  month: string; // e.g., "2024-01"
  revenue: number; // Also considered Net Sales
  expenses: number;
  netIncome: number;
  monthlyRecurringRevenue: number;
  
  // New fields for advanced metrics
  currentAssets: number;
  currentLiabilities: number;
  inventory?: number; // Optional as not all startups have it
  totalAssets: number;
  totalLiabilities: number;
  shareholdersEquity: number;
  ebit: number; // Earnings Before Interest and Taxes
  interestExpense: number;
  cogs: number; // Cost of Goods Sold
  accountsReceivable: number;
  headcount: number;
}

export interface IncorporationDetails {
  isIncorporated: boolean;
  country?: string;
  incorporationType?: 'C-Corp' | 'S-Corp' | 'LLC' | 'PLT' | 'PLC' | 'OPC' | 'LLPs' | 'Private Limited' | 'Public Limited Company' | 'Charity' | 'Other';
  incorporationDate?: string;
  entityNumber?: string;
  taxId?: string;
}

export type InvestmentStage = 'Idea' | 'Pre-seed' | 'Seed' | 'Series A' | 'Series B+';

export type FounderObjective = 'fundraising' | 'networking' | 'seekingCoFounders' | 'seekingProfessionalAdvice' | 'lookingForMentorship' | 'lookingToHire';

export interface StartupInvestor {
    investorId: string;
    name: string;
    avatarUrl: string;
    isAnonymous: boolean;
}

export interface Startup {
  id: string;
  companyName: string;
  companyLogoUrl: string;
  industry: string;
  stage: InvestmentStage;
  tagline: string;
  description: string;
  website: string;
  financials: FinancialData;
  founderIds: string[];
  monthlyFinancials: MonthlyFinancials[];
  capTable: CapTableEntry[];
  incorporationDetails: IncorporationDetails;
  fundraisingGoal?: number;
  fundsRaised?: number;
  showFundraisingProgress?: boolean;
  investors?: StartupInvestor[];
  profileViewCount?: number;
}

export interface FounderProfile {
  companyId?: string;
  isLead?: boolean;
  isPremium?: boolean;
  title?: string;
  linkedinUrl?: string;
  isSeekingCoFounder?: boolean;
  objectives?: FounderObjective[];
  profileViewCount?: number;
  stripe?: StripeDetails;
}

export interface PortfolioCompany {
  companyName: string;
  companyLogoUrl: string;
  companyUrl: string;
}

export interface Exit {
    companyName: string;
    companyUrl: string;
}

export interface InvestorProfile {
  companyName?: string;
  companyUrl?: string;
  investorType?: 'LP' | 'GP' | 'Family Office Administrator';
  investmentInterests: string[];
  investmentStages?: InvestmentStage[];
  portfolio: PortfolioCompany[];
  exits: Exit[];
  thesis?: string;
  about?: string;
  seeking?: string[];
  profileViewCount?: number;
}

export interface TalentProfile {
  subRole?: TalentSubRole;
  headline?: string;
  skills?: string[];
  experience?: string;
  linkedin?: string;
  github?: string;
  about?: string;
  organization?: string;
  education?: string;
  isSeekingCoFounder?: boolean;
  isVendor?: boolean;
  isFractionalLeader?: boolean;
  profileViewCount?: number;
}

export type Profile = FounderProfile | InvestorProfile | TalentProfile;

export interface FullUserProfile extends User {
  profile: Profile;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl: string;
  founderId: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  postedAt: string;
}

export interface InvestmentThesis {
  id: string;
  investorId: string;
  title: string;
  industries: string[];
  stages: string[];
  geographies: string[];
  summary: string;
  postedAt: string;
  isAnonymous: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id:string;
  participantIds: string[];
  messages: Message[];
  participants?: FullUserProfile[];
}

export interface Match {
  id: string;
  userId: string;
  reason: string;
}

export type NotificationType = 'message' | 'match' | 'connection' | 'applicant';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  text: string;
  isRead: boolean;
  timestamp: string;
  link: string;
  senderId?: string;
}

export interface FinancialData {
  companyName: string;
  revenue: number;
  expenses: number;
  netIncome: number;
  grossProfitMargin: number;
  ebitda: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  monthlyRecurringRevenue: number;
  cashBurnRate: number;
  runway: number;
}

export interface Interest {
  id: string;
  userId: string;
  targetId: string;
  targetType: 'job' | 'thesis';
  timestamp: string;
}
