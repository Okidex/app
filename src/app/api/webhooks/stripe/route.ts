import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe/config';
import { db } from '@/lib/firebase-server-init';

/**
 * App Router Route Handler for Stripe Webhooks.
 * Migrated from the legacy Pages API route to resolve path conflicts and standardize the project structure.
 */

export async function POST(req: Request) {
  console.log('[DEBUG-API] POST /api/webhooks/stripe - Received webhook');
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig || !STRIPE_WEBHOOK_SECRET) {
      console.error('[DEBUG-API] Missing stripe-signature or webhook secret');
      return new Response('Missing signature or secret', { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
    console.log(`[DEBUG-API] Stripe Event Type: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.firebaseUID;
        const plan = session.metadata?.plan || 'monthly';
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

        if (userId && customerId && subscriptionId) {
          await db.collection('users').doc(userId).set({
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
          console.log(`[DEBUG-API] Activated subscription for user: ${userId}`);
        }
        break;
      }
      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
          
          const usersRef = db.collection('users');
          const q = usersRef.where('profile.stripe.customerId', '==', customerId).limit(1);
          const snapshot = await q.get();

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
              console.log(`[DEBUG-API] Updated subscription status to "${newStatus}" for user: ${userDoc.id}`);
          }
          break;
      }
      default:
        console.log(`[DEBUG-API] Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(`[DEBUG-API] Stripe Webhook Error: ${error.message}`);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
