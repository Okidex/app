import { NextResponse } from 'next/server';
import { db, auth } from '@/lib/firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';

/**
 * Force this route to be dynamic to prevent Next.js from trying to
 * evaluate the Admin SDK during 'npm run build'.
 */
export const dynamic = 'force-dynamic';

/**
 * App Router Route Handler for profile updates.
 * Replaces the legacy Pages API route to consolidate structural patterns.
 */
export async function POST(req: Request) {
    console.log('[DEBUG-API] POST /api/profile/update - Processing request');
    try {
        let uid: string;
        const authHeader = req.headers.get('authorization');

        // 1. Identity Verification
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const idToken = authHeader.split('Bearer ')[1];
            const decodedToken = await auth.verifyIdToken(idToken);
            uid = decodedToken.uid;
        } else {
            const cookieStore = await cookies();
            const sessionCookie = cookieStore.get('__session')?.value;
            
            if (!sessionCookie) {
                console.error('[DEBUG-API] Unauthorized: No session cookie found');
                return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
            }
            
            const decodedToken = await auth.verifySessionCookie(sessionCookie, false);
            uid = decodedToken.uid;
        }

        const payload = await req.json();
        const batch = db.batch();
        const userRef = db.collection('users').doc(uid);
        const userUpdates: any = { updatedAt: FieldValue.serverTimestamp() };

        // 2. Process Core User Fields
        if (payload.name) userUpdates.name = payload.name;
        if (payload.avatarUrl) userUpdates.avatarUrl = payload.avatarUrl;
        if (payload.email) userUpdates.email = payload.email;
        
        // 3. Process Nested Profile Object
        if (payload.profile) {
            Object.keys(payload.profile).forEach(key => {
                userUpdates[`profile.${key}`] = payload.profile[key];
            });
        }

        if (Object.keys(userUpdates).length > 1) {
            batch.update(userRef, userUpdates);
        }

        // 4. Process Startup Data (if applicable)
        if (payload.startupData && payload.startupData.id) {
            const { id: startupId, ...startupUpdateData } = payload.startupData;
            const startupRef = db.collection('startups').doc(startupId);
            
            // Security: Ensure user owns this startup before updating
            const startupDoc = await startupRef.get();
            if (startupDoc.exists && startupDoc.data()?.founderIds?.includes(uid)) {
                batch.update(startupRef, {
                    ...startupUpdateData,
                    updatedAt: FieldValue.serverTimestamp()
                });
            }
        }

        await batch.commit();
        console.log(`[DEBUG-API] Profile updated successfully for user: ${uid}`);
        return NextResponse.json({ success: true, uid });

    } catch (error: any) {
        console.error("[DEBUG-API] Profile update error:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
