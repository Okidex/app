
import { users, startups } from './mock-data';
import { investmentStages, founderObjectives } from './constants';
import { FullUserProfile } from './types';

// This is a placeholder function to simulate fetching the current user.
// In a real app, you'd use your authentication context.
export function getCurrentUser(): FullUserProfile | null {
    // For now, let's just return the first user as the "logged in" user.
    return users[0];
}

export function getUserById(id: string): FullUserProfile | null {
    return users.find(user => user.id === id) || null;
}

export { users, startups, investmentStages, founderObjectives };
