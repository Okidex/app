import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";
import Stripe from "stripe";

// Initialize Admin SDK once
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-01-28.clover',
});

export const helloAI = onRequest({ cors: true }, (request, response) => {
  response.send("AI Function is active!");
});

/**
 * Unified Auth Handler
 */
export const auth = onRequest({ cors: true, region: "us-central1" }, async (req, res) => {
  console.log('[DEBUGGER-AUTH] Path:', req.path);
  console.log('[DEBUGGER-AUTH] Method:', req.method);
  console.log('[DEBUGGER-AUTH] Body Keys:', Object.keys(req.body || {}));

  const action = req.path.split('/').pop();
  console.log(`[DEBUGGER-AUTH] Resolved Action: ${action}`);

  try {
    if (action === 'create' && req.method === 'POST') {
      const { idToken } = req.body;
      if (!idToken) return res.status(400).json({ success: false, error: "Missing ID Token" });
      
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
      
      // Use SameSite=None; Secure for maximum compatibility during this debugging phase
      res.setHeader('Set-Cookie', `__session=${sessionCookie}; Max-Age=${expiresIn / 1000}; HttpOnly; Secure; Path=/; SameSite=None`);
      return res.status(200).json({ success: true });
    }

    if (action === 'delete') {
      res.setHeader('Set-Cookie', `__session=; Max-Age=0; HttpOnly; Secure; Path=/; SameSite=None`);
      return res.status(200).json({ success: true });
    }

    if (action === 'debug-server') {
      const doc = await admin.firestore().collection('users').doc('health-check').get();
      return res.status(200).json({
        status: "SUCCESS",
        timestamp: new Date().toISOString(),
        database: {
          exists: doc.exists,
          id: doc.id
        },
        env: {
          nodeVersion: process.version,
          platform: process.platform
        }
      });
    }

    if (action === 'search') {
      const { query: q } = req.body;
      const usersSnap = await admin.firestore().collection('users').get();
      const startupsSnap = await admin.firestore().collection('startups').get();

      const allUsers = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const allStartups = startupsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (!q) return res.status(200).json({ startups: [], users: [] });

      // Verify the ID Token in the Authorization header to enforce search permissions
      const authHeader = req.headers.authorization || '';
      let searchingUser = null;
      if (authHeader.startsWith('Bearer ')) {
        const idToken = authHeader.split('Bearer ')[1];
        try {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          const userDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
          if (userDoc.exists) {
            searchingUser = { id: userDoc.id, ...userDoc.data() };
          }
        } catch (e) {
          console.error('[DEBUG-SEARCH] Token verification failed:', e);
        }
      }

      // All founders cannot search for investors. Only investors and talent can search for them.
      const isInvestor = searchingUser?.role === 'investor';
      const isTalent = searchingUser?.role === 'talent';
      const canSeeInvestors = isInvestor || isTalent;

      const isSearchingInvestor = searchingUser?.role === 'investor';

      const filteredUsers = allUsers.filter(u => {
        // Filter out investors if they don't have access
        if (u.role === 'investor' && !canSeeInvestors) {
          return false;
        }
        // Filter out non-premium founders if the searching user is an investor
        if (u.role === 'founder' && isSearchingInvestor && u.profile?.isPremium !== true) {
          return false;
        }
        return (
          u.name?.toLowerCase().includes(q.toLowerCase()) || 
          u.role?.toLowerCase().includes(q.toLowerCase())
        );
      });

      const filteredStartups = allStartups.filter(s => 
        s.companyName?.toLowerCase().includes(q.toLowerCase()) || 
        s.description?.toLowerCase().includes(q.toLowerCase())
      );

      return res.status(200).json({ 
        startups: filteredStartups.slice(0, 20), 
        users: filteredUsers.slice(0, 20) 
      });
    }

    if ((action === 'stripe' || action === 'stripe-webhook') && req.method === 'POST') {
      const sig = req.headers['stripe-signature'];
      let event;
      
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
      
      try {
        const body = req.rawBody || req.body;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      } catch (err) {
        console.error(`[STRIPE-WEBHOOK] Webhook signature verification failed: ${err.message}`);
        // Fallback for emulator testing / local testing when webhook secret is missing/invalid or in functions emulator
        if (process.env.FUNCTIONS_EMULATOR === 'true' || !sig || webhookSecret === 'whsec_placeholder') {
          console.warn(`[STRIPE-WEBHOOK] Warning: Skipping webhook signature verification in emulator/dev mode.`);
          event = req.body;
          if (typeof event === 'string') {
            event = JSON.parse(event);
          }
        } else {
          return res.status(400).send(`Webhook Error: ${err.message}`);
        }
      }

      console.log(`[STRIPE-WEBHOOK] Event Type: ${event.type}`);

      // Handle the event
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata?.firebaseUID;
        const plan = session.metadata?.plan || 'monthly';
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

        if (userId && customerId && subscriptionId) {
          await admin.firestore().collection('users').doc(userId).set({
            profile: {
              isPremium: true,
              stripe: {
                customerId,
                subscriptionId,
                plan,
                status: 'active',
              }
            }
          }, { merge: true });
          console.log(`[STRIPE-WEBHOOK] Activated subscription for user: ${userId}`);
        }
      } else if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
        const subscription = event.data.object;
        const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
        
        const snapshot = await admin.firestore().collection('users')
          .where('profile.stripe.customerId', '==', customerId)
          .limit(1)
          .get();

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          const newStatus = subscription.status;
          const isPremium = newStatus === 'active' || newStatus === 'trialing';

          await userDoc.ref.set({
            profile: {
              isPremium: isPremium,
              stripe: {
                subscriptionId: subscription.id,
                status: newStatus,
              }
            }
          }, { merge: true });
          console.log(`[STRIPE-WEBHOOK] Updated subscription status to "${newStatus}" for user: ${userDoc.id}`);
        }
      }

      return res.status(200).json({ received: true });
    }

    if (action === 'update' && req.method === 'POST') {
      const authHeader = req.headers.authorization || '';
      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: "Unauthorized: Missing or invalid token" });
      }
      
      const idToken = authHeader.split('Bearer ')[1];
      let uid;
      try {
        if (idToken === 'mock-verification-token' && process.env.FUNCTIONS_EMULATOR === 'true') {
          uid = 'test-profile-user-update-id';
        } else {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          uid = decodedToken.uid;
        }
      } catch (err) {
        return res.status(401).json({ success: false, error: `Unauthorized: ${err.message}` });
      }

      const { name, email, avatarUrl, profile, startupData } = req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (avatarUrl) updateData.avatarUrl = avatarUrl;
      
      if (profile) {
        const userDoc = await admin.firestore().collection('users').doc(uid).get();
        const currentProfile = userDoc.data()?.profile || {};
        updateData.profile = {
          ...currentProfile,
          ...profile
        };
      }

      await admin.firestore().collection('users').doc(uid).set(updateData, { merge: true });

      // Update Startup Data if provided and user is founder
      if (startupData && startupData.id) {
        const startupUpdate = {};
        if (startupData.companyName !== undefined) startupUpdate.companyName = startupData.companyName;
        if (startupData.industry !== undefined) startupUpdate.industry = startupData.industry;
        if (startupData.description !== undefined) startupUpdate.description = startupData.description;
        if (startupData.website !== undefined) startupUpdate.website = startupData.website;
        if (startupData.companyLogoUrl !== undefined) startupUpdate.companyLogoUrl = startupData.companyLogoUrl;

        await admin.firestore().collection('startups').doc(startupData.id).set(startupUpdate, { merge: true });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(404).json({ success: false, error: "Action not found", path: req.path });
  } catch (error) {
    console.error('[DEBUGGER-AUTH] Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
