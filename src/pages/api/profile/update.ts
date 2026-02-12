
import type { NextApiRequest, NextApiResponse } from 'next';
import { db, auth } from '@/lib/firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        let uid: string;
        const authorization = req.headers.authorization;

        if (authorization && authorization.startsWith('Bearer ')) {
            const idToken = authorization.split('Bearer ')[1];
            const decodedToken = await auth.verifyIdToken(idToken);
            uid = decodedToken.uid;
        } else {
            const sessionCookie = req.cookies.__session;
            if (!sessionCookie) {
                return res.status(401).json({ success: false, error: 'Unauthorized: No session cookie or token.' });
            }
            const decodedToken = await auth.verifySessionCookie(sessionCookie, false);
            uid = decodedToken.uid;
        }

        const payload = req.body;
        const batch = db.batch();
        const userRef = db.collection('users').doc(uid);
        const userUpdates: any = { updatedAt: FieldValue.serverTimestamp() };

        if (payload.name) userUpdates.name = payload.name;
        if (payload.avatarUrl) userUpdates.avatarUrl = payload.avatarUrl;
        
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
            const startupDoc = await startupRef.get();

            if (startupDoc.exists && startupDoc.data()?.founderIds?.includes(uid)) {
                 batch.update(startupRef, {
                    ...startupUpdateData,
                    updatedAt: FieldValue.serverTimestamp()
                });
            } else {
                return res.status(403).json({ success: false, error: "Forbidden: Not authorized to edit this startup." });
            }
        }

        if (payload.email) {
            const currentUser = await auth.getUser(uid);
            if (currentUser.email !== payload.email) {
                await auth.updateUser(uid, { email: payload.email });
                batch.update(userRef, { email: payload.email });
            }
        }

        await batch.commit();

        return res.status(200).json({ success: true, uid: uid });

    } catch (error: any) {
        console.error("[API ERROR] /api/profile/update:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
