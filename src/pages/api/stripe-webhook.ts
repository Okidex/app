
import { buffer } from 'micro';
import Stripe from 'stripe';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe/config';
import { getDb } from '@/lib/firebase-server-init';

export const config = {
  api: {
    bodyParser: false, // Disabling body parser is mandatory for signature verification
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.firebaseUID;

    if (userId) {
      try {
        const db = getDb();
        await db.collection('users').doc(userId).set({
          profile: {
            stripe: {
              subscriptionStatus: 'active',
              plan: session.metadata?.plan || 'monthly',
              lastUpdated: new Date().toISOString()
            }
          }
        }, { merge: true });
        console.log(`✅ Updated subscription for user: ${userId}`);
      } catch (error) {
        console.error('Error updating user subscription:', error);
      }
    }
  }

  res.json({ received: true });
}
