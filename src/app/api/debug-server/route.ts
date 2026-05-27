import { NextResponse } from 'next/server';
import { getDb, getAuth } from '@/lib/firebase-server-init';

export async function GET() {
    const report: any = {
        timestamp: new Date().toISOString(),
        status: "STARTING",
        env: {
            nodeVersion: process.version,
            platform: process.platform,
        },
        steps: []
    };

    try {
        report.steps.push("Accessing Auth...");
        const auth = getAuth();
        report.steps.push("Accessing Firestore...");
        const db = getDb();
        
        report.steps.push("Reading health-check doc...");
        const doc = await db.collection('users').doc('health-check').get();
        report.status = "SUCCESS";
        report.database = {
            exists: doc.exists,
            id: doc.id
        };
    } catch (e: any) {
        report.status = "FAILED";
        report.error = {
            message: e.message,
            stack: e.stack
        };
    }

    return NextResponse.json(report);
}

