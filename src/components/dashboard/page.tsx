// src/app/(app)/dashboard/page.tsx

// 'use server'; // <-- REMOVED THIS LINE ENTIRELY

import 'server-only'; 
export const dynamic = 'force-dynamic'; // <-- This export is now valid

import { initializeAdminApp } from '@/lib/firebase-server-init';
import { FullUserProfile, Job, InvestmentThesis } from "@/lib/types";
import { getCurrentUser } from '@/lib/auth-actions';
import DashboardClient from './client';
// Note: admin import seems missing for `admin.firestore.DocumentSnapshot`, assuming it's available globally or via initializeAdminApp return type

async function getDashboardData(currentUser: FullUserProfile) {
    if (!currentUser) return {};

    const { firestore } = await initializeAdminApp();
    let data: any = {};

    const toPlainObject = (doc: any) => { // Using 'any' for admin.firestore.DocumentSnapshot type
        const data = doc.data();
        if (!data) return null;
        // Basic serialization for Timestamps, can be expanded
        for (const key in data) {
            if (data[key] && typeof data[key].toDate === 'function') {
                data[key] = data[key].toDate().toISOString();
            }
        }
        return { ...data, id: doc.id };
    };

    if (currentUser.role === 'founder') {
        const q = firestore.collection("users").where("role", "!=", "founder").limit(3);
        const querySnapshot = await q.get();
        data.matches = querySnapshot.docs.map(toPlainObject);
    }

    if (currentUser.role === 'investor') {
        const thesesQuery = firestore.collection("theses").where("investorId", "==", currentUser.id);
        const myThesesSnap = await thesesQuery.get();
        const myTheses = myThesesSnap.docs.map(toPlainObject) as InvestmentThesis[];
        data.myThesesCount = myTheses.length;

        const myJobsQuery = firestore.collection("jobs").where("founderId", "==", currentUser.id);
        const myJobsSnap = await myJobsQuery.get();
        const myJobs = myJobsSnap.docs.map(toPlainObject) as Job[];

        if (myTheses.length > 0) {
            const thesisInterestsQuery = firestore.collection("interests").where("targetType", "==", "thesis").where("targetId", "in", myTheses.map(t => t.id));
            const thesisInterestsSnap = await thesisInterestsQuery.get();
            data.thesisInterestsCount = thesisInterestsSnap.size;
        } else {
            data.thesisInterestsCount = 0;
        }

        if (myJobs.length > 0) {
            const jobInterestsQuery = firestore.collection("interests").where("targetType", "==", "job").where("targetId", "in", myJobs.map(j => j.id));
            const jobInterestsSnap = await jobInterestsQuery.get();
            data.jobInterestsCount = jobInterestsSnap.size;
        } else {
             data.jobInterestsCount = 0;
        }
    }

    if (currentUser.role === 'talent') {
        const jobsQuery = firestore.collection("jobs").limit(3);
        const jobsSnapshot = await jobsQuery.get();
        data.recommendedJobs = jobsSnapshot.docs.map(toPlainObject);
    }

    return data;
}


export default async function DashboardPage() {
    const user = await getCurrentUser();
    
    if (!user) {
        return <div>Please log in to view the dashboard.</div>;
    }

    const dashboardData = await getDashboardData(user);

    // CRITICAL FIX: Robustly serialize data before passing to Client Component
    const serializableUser = JSON.parse(JSON.stringify(user));
    const serializableData = JSON.parse(JSON.stringify(dashboardData));
    
    return <DashboardClient currentUser={serializableUser} dashboardData={serializableData} />;
}
