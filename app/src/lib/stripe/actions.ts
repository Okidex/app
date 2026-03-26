'use server';

import { stripe } from './config';
import { STRIPE_PRICE_IDS } from './config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
// Use the 'db' export directly as it is already initialized in your firebase-server-init.ts
import { db } from '../firebase-server-init';
import { FounderProfile } from '../types';

export async function createCheckoutSession(userId: string, userEmail: string, plan: 'monthly' | 'yearly') {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    const userProfile = userDoc.data()?.profile as FounderProfile | undefined;
    let stripeCustomerId = userProfile?.stripe?.customerId;

    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: userEmail,
            metadata: { firebaseUID: userId }
        });
        stripeCustomerId = customer.id;
        await userRef.set({
            profile: {
                stripe: { customerId: stripeCustomerId }
            }
        }, { merge: true });
    }

    const priceId = STRIPE_PRICE_IDS[plan];
    
    // FIX: Await headers() for Next.js 15/16 compatibility
    const headersList = await headers();
    const origin = headersList.get('origin');
    
    if (!origin) {
        throw new Error('Could not determine request origin.');
    }

    let sessionUrl: string | null = null;

    try {
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'subscription',
            success_url: `${origin}/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/settings/billing`,
            metadata: { firebaseUID: userId, plan }
        });
        
        sessionUrl = session.url;

    } catch (error: any) {
        console.error('Error creating Stripe checkout session:', error);
        throw new Error(`There was a problem creating the checkout session: ${error.message}`);
    }

    // Call redirect() outside of the try/catch block
    if (sessionUrl) {
        redirect(sessionUrl);
    } else {
        throw new Error('Stripe API returned no session URL.');
    }
}
