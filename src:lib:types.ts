export type UserRole = 'Investor' | 'Talent' | 'Founder';

export interface Experience {
  title: string;
  company: string;
  duration: string;
}

export interface Profile {
  headline: string;
  summary: string;
  experience: Experience[];
  interests: string[];
  investmentCriteria: string;
  pastSuccesses: string[];
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: UserRole;
  profile: Profile;
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