
import 'server-only';
import { getCurrentUser } from '@/lib/auth-actions';
import { getDashboardData } from '@/lib/actions';
import DashboardClient from './client';

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        // This case should be handled by the layout's auth wrapper, but as a fallback:
        return <div>Please log in to view the dashboard.</div>;
    }

    const dashboardData = await getDashboardData(currentUser);
    
    // Ensure data passed to client components is serializable
    const serializableUser = JSON.parse(JSON.stringify(currentUser));
    const serializableData = JSON.parse(JSON.stringify(dashboardData));

    return <DashboardClient currentUser={serializableUser} dashboardData={serializableData} />;
}
