import { NextResponse } from 'next/server';
import { db, auth } from '@/lib/firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';

/**
 * App Router Route Handler for profile updates.
 * Replaces the legacy Pages API route to consolidate structural patterns.
 */

export async function POST(req: Request) {
    console.log('[DEBUG-API] POST /api/profile/update - Processing request');
    try {
        let uid: string;
        const authHeader = req.headers.get('authorization');

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const idToken = authHeader.split('Bearer ')[1];
            const decodedToken = await auth.verifyIdToken(idToken);
            uid = decodedToken.uid;
        } else {
            const sessionCookie = (await cookies()).get('__session')?.value;
            if (!sessionCookie) {
                return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
            }
            const decodedToken = await auth.verifySessionCookie(sessionCookie, false);
            uid = decodedToken.uid;
        }

        const payload = await req.json();
        const batch = db.batch();
        const userRef = db.collection('users').doc(uid);
        const userUpdates: any = { updatedAt: FieldValue.serverTimestamp() };

        if (payload.name) userUpdates.name = payload.name;
        if (payload.avatarUrl) userUpdates.avatarUrl = payload.avatarUrl;
        if (payload.email) userUpdates.email = payload.email;
        
        if (payload.profile) {
            Object.keys(payload.profile).forEach(key => {
                userUpdates[`profile.${key}`] = payload.profile[key];
            });
        }

        if (Object.keys(userUpdates).length > 1) {
            batch.update(userRef, userUpdates);
        }

        if (payload.startupData && payload.startupData.id) {
            const { id: startupId, ...startupUpdateData } = payload.startupData;
            const startupRef = db.collection('startups').doc(startupId);
            batch.update(startupRef, {
                ...startupUpdateData,
                updatedAt: FieldValue.serverTimestamp()
            });
        }

        await batch.commit();
        console.log(`[DEBUG-API] Profile updated successfully for user: ${uid}`);
        return NextResponse.json({ success: true, uid });

    } catch (error: any) {
        console.error("[DEBUG-API] Profile update error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
