import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "@/lib/firebase-server-init";

export async function POST(req: NextRequest) {
    try {
        if (!auth || !db) {
            return NextResponse.json({ success: false, error: "Firebase Admin configuration missing." }, { status: 500 });
        }

        const authHeader = req.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }
        
        const token = authHeader.split("Bearer ")[1];
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;
        
        const payload = await req.json();
        
        const userRef = db.collection("users").doc(uid);
        const updateData: any = {};
        
        if (payload.name !== undefined) updateData.name = payload.name;
        if (payload.profile !== undefined) updateData.profile = payload.profile;
        if (payload.isHiring !== undefined) updateData.isHiring = payload.isHiring;
        if (payload.isLookingForCoFounder !== undefined) updateData.isLookingForCoFounder = payload.isLookingForCoFounder;
        if (payload.isNetworking !== undefined) updateData.isNetworking = payload.isNetworking;
        
        await userRef.update(updateData);
        
        if (payload.startupData && payload.startupData.id) {
            const startupRef = db.collection("startups").doc(payload.startupData.id);
            const startupUpdate: any = {};
            if (payload.startupData.companyName !== undefined) startupUpdate.companyName = payload.startupData.companyName;
            if (payload.startupData.industry !== undefined) startupUpdate.industry = payload.startupData.industry;
            if (payload.startupData.description !== undefined) startupUpdate.description = payload.startupData.description;
            if (payload.startupData.website !== undefined) startupUpdate.website = payload.startupData.website;
            
            // Only update if there's actually data to update
            if (Object.keys(startupUpdate).length > 0) {
                await startupRef.update(startupUpdate);
            }
        }
        
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Profile update error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
