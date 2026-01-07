
'use server';

import { stripe } from './config';
import { STRIPE_PRICE_IDS } from './config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { initializeAdminApp } from '../firebase-server-init';

// This function is kept for potential future use with the API-based checkout
// but is currently not used by the billing page, which now uses direct Payment Links.
export async function createCheckoutSession(userId: string, userEmail: string, plan: 'monthly' | 'yearly') {
    const { firestore } = initializeAdminApp();
    const userRef = firestore.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const userProfile = userDoc.data()?.profile;

    let stripeCustomerId = userProfile?.stripe?.customerId;

    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: userEmail,
            metadata: {
                firebaseUID: userId,
            },
        });
        stripeCustomerId = customer.id;
        await userRef.set({
            profile: {
                stripe: {
                    customerId: stripeCustomerId
                }
            }
        }, { merge: true });
    }

    const priceId = STRIPE_PRICE_IDS[plan];
    const origin = headers().get('origin');
    
    if (!origin) {
        throw new Error('Could not determine request origin.');
    }

    try {
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${origin}/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/settings/billing`,
            metadata: {
                firebaseUID: userId,
                plan,
            }
        });
        
        if (session.url) {
            redirect(session.url);
        } else {
            throw new Error('Failed to create a checkout session URL.');
        }

    } catch (error: any) {
        console.error('Error creating Stripe checkout session:', error);
        throw new Error('There was a problem creating the checkout session.');
    }
}
