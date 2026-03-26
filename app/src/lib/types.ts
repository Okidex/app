
export type UserRole = 'founder' | 'investor' | 'talent';
export type TalentSubRole = 'co-founder' | 'employee' | 'vendor' | 'fractional-leader';

export interface User {
  id: string;
  uid?: string; // ✅ ADDED: Resolves 'Property uid does not exist' in uploader components
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  okiPlusActive?: boolean;
}

export interface StripeDetails {
    customerId?: string;
    subscriptionId?: string;
    plan?: 'monthly' | 'yearly';
    status?: string;
}

export type InvestmentStage = 'Idea' | 'Pre-seed' | 'Seed' | 'Series A' | 'Series B+';

export interface CapTableEntry {
    id: string;
    shareholderName: string;
    investment: number;
    shares: number;
    equityPercentage: number;
    investmentStage: InvestmentStage;
}

export interface MonthlyFinancials {
    month: string;
    revenue: number;
    expenses: number;
    netIncome: number;
    monthlyRecurringRevenue: number;
    currentAssets: number;
    currentLiabilities: number;
    inventory?: number;
    totalAssets: number;
    totalLiabilities: number;
    shareholdersEquity: number;
    ebit: number;
    interestExpense: number;
    cogs: number;
    accountsReceivable: number;
    headcount: number;
}

export interface IncorporationDetails {
    isIncorporated: boolean;
    country?: string;
    incorporationType?: 'C-Corp' | 'S-Corp' | 'LLC' | 'Private Limited' | 'Public Limited Company' | 'Charity' | 'Other';
    incorporationDate?: string;
    entityNumber?: string;
    taxId?: string;
}

export type FounderObjective = 'fundraising' | 'networking' | 'seekingCoFounders' | 'seekingProfessionalAdvice' | 'lookingForMentorship' | 'lookingToHire';

export interface StartupInvestor {
    investorId: string;
    name: string;
    avatarUrl: string;
    isAnonymous: boolean;
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

export interface Startup {
  id: string;
  companyName: string;
  companyLogoUrl: string;
  logoUrl?: string;
  industry: string;
  stage: InvestmentStage;
  tagline: string;
  description: string;
  website: string;
  founderIds: string[];
  financials?: FinancialData;
  monthlyFinancials?: MonthlyFinancials[];
  capTable?: CapTableEntry[];
  incorporationDetails?: IncorporationDetails;
  fundraisingGoal?: number;
  fundsRaised?: number;
  showFundraisingProgress?: boolean;
  investors?: StartupInvestor[];
  profileViewCount?: number;
  location?: string;
  teamSize?: string;
  foundedDate?: string;
}

export interface FounderProfile {
  companyId?: string;
  isLead?: boolean;
  isPremium?: boolean;
  title?: string;
  linkedinUrl?: string;
  isLookingForCoFounder?: boolean;
  objectives?: FounderObjective[];
  about?: string;
  profileViewCount?: number;
  stripe?: StripeDetails;
}

export interface PortfolioCompany {
    companyName: string;
    companyUrl: string;
    companyLogoUrl: string;
}

export interface Exit {
    companyName: string;
    companyUrl: string;
}

export interface InvestorProfile {
  companyName?: string;
  companyUrl?: string;
  investorType?: 'Angel' | 'Venture Capitalist' | 'Crowdfunder' | 'Private Equity' | 'LP' | 'GP' | 'Family Office Administrator';
  investmentInterests: string[];
  investmentStages?: InvestmentStage[];
  portfolio: PortfolioCompany[];
  exits: Exit[];
  thesis?: string;
  about?: string;
  seeking?: string[];
  isHiring?: boolean;
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
  isVendor?: boolean;
  isFractionalLeader?: boolean;
  profileViewCount?: number;
}

export type Profile = FounderProfile | InvestorProfile | TalentProfile;

export interface FullUserProfile extends User {
  profile: Profile;
  isHiring?: boolean;
  isLookingForCoFounder?: boolean;
  isNetworking?: boolean;
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
    summary: string;
    industries: string[];
    stages: InvestmentStage[];
    geographies: string[];
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
    id: string;
    participantIds: string[];
    participants?: FullUserProfile[];
    lastMessage?: string;
    lastActivity?: string;
}

export type NotificationType = 'message' | 'connection' | 'match' | 'applicant';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    text: string;
    isRead: boolean;
    timestamp: string;
    link?: string;
    senderId?: string;
}

export interface Interest {
    id: string;
    userId: string;
    targetId: string;
    targetType: 'job' | 'thesis' | 'startup';
    timestamp: string;
}

export interface Match {
  id: string;
  participantIds: string[];
  matchDate: string;
}
