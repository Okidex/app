import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Force load env variables from .env.local if explicit credentials or API keys are missing
if (!process.env.ADMIN_PRIVATE_KEY || !process.env.ADMIN_CLIENT_EMAIL || !process.env.GEMINI_API_KEY) {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            envContent.split('\n').forEach(line => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) return;
                const match = trimmed.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    let val = match[2].trim();
                    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                        val = val.substring(1, val.length - 1);
                    }
                    process.env[key] = val;
                }
            });
            console.log("[FIREBASE-DEBUG-SERVER] Manually loaded environment variables from .env.local");
        }
    } catch (e) {
        console.error("[FIREBASE-DEBUG-SERVER] Failed to manually load .env.local:", e);
    }
}

let db: admin.firestore.Firestore | null = null;
let auth: admin.auth.Auth | null = null;

function initialize() {
    console.log("[FIREBASE-DEBUG-SERVER] Initializing firebase-admin...");
    try {
        const apps = admin.apps;
        console.log(`[FIREBASE-DEBUG-SERVER] Current admin apps count: ${apps.length}`);
        const defaultApp = apps.find(a => a?.name === '[DEFAULT]');

        if (!defaultApp) {
            console.log("[FIREBASE-DEBUG-SERVER] Default app not found. Initializing...");
            const projectId = process.env.ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
            const clientEmail = process.env.ADMIN_CLIENT_EMAIL;
            const privateKey = process.env.ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

            if (projectId && clientEmail && privateKey) {
                console.log("[FIREBASE-DEBUG-SERVER] Initializing with explicit service account credentials.");
                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId,
                        clientEmail,
                        privateKey
                    }),
                    projectId
                });
            } else {
                console.log("[FIREBASE-DEBUG-SERVER] Initializing with default application credentials.");
                admin.initializeApp();
            }
            console.log("[FIREBASE-DEBUG-SERVER] admin.initializeApp() completed successfully.");
        } else {
            console.log("[FIREBASE-DEBUG-SERVER] Default app '[DEFAULT]' already initialized.");
        }
        const app = admin.app();
        console.log(`[FIREBASE-DEBUG-SERVER] Resolved admin app name: "${app.name}"`);
        db = admin.firestore(app);
        auth = admin.auth(app);
        console.log("[FIREBASE-DEBUG-SERVER] admin.firestore and admin.auth instances resolved successfully.");
    } catch (e: any) {
        console.error("[FIREBASE-DEBUG-SERVER] ERROR during firebase-admin initialization:", e.message, e.stack);
        throw e;
    }
}

export function getDb(): admin.firestore.Firestore {
    if (!db) {
        console.log("[FIREBASE-DEBUG-SERVER] getDb() called but db is null. Initializing...");
        initialize();
    }
    return db!;
}

export function getAuth(): admin.auth.Auth {
    if (!auth) {
        console.log("[FIREBASE-DEBUG-SERVER] getAuth() called but auth is null. Initializing...");
        initialize();
    }
    return auth!;
}

export const getStorage = () => admin.storage();

// Dummy exports for compatibility
export const storage = null as any;

export { admin as firebaseAdmin };
