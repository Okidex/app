
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import ProfileView from '@/components/views/profile-view';
import MobileView from '@/components/views/mobile-view';
import SearchView from '@/components/views/search-view';
import MessagesView from '@/components/views/messages-view';
import FinancialsView from '@/components/views/financials-view';
import SettingsView from '@/components/views/settings-view';
import BillingView from '@/components/views/billing-view';
import ChallengesView from '@/components/views/challenges-view';

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const view = searchParams.get('view');

    const renderView = () => {
        switch(view) {
            case 'search':
                return <SearchView />;
            case 'challenges':
                return <ChallengesView />;
            case 'messages':
                return <MessagesView />;
            case 'financials':
                return <FinancialsView />;
            case 'billing':
                return <BillingView />;
            case 'settings':
                return <SettingsView />;
            case 'profile':
                return <ProfileView />;
            case 'mobile':
            default:
                return <MobileView />;
        }
    }

    return (
        <>
          {renderView()}
        </>
    );
}
