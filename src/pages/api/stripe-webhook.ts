
import { buffer } from 'micro';
import Stripe from 'stripe';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe/config';
import { db } from '@/lib/firebase-server-init';

export const config = {
  api: {
    bodyParser: false, // Disabling body parser is mandatory for signature verification
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
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

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.firebaseUID;
      const plan = session.metadata?.plan || 'monthly';
      const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
      const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

      if (userId && customerId && subscriptionId) {
        try {
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
          console.log(`✅ Activated subscription for user: ${userId}`);
        } catch (error) {
          console.error('Error updating user subscription:', error);
        }
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

            try {
                await userDoc.ref.set({
                    profile: {
                        isPremium: isPremium,
                        stripe: {
                            subscriptionId: subscription.id,
                            status: newStatus,
                        }
                    }
                }, { merge: true });
                 console.log(`✅ Updated subscription status to "${newStatus}" for user: ${userDoc.id}`);
            } catch(error) {
                console.error(`Error updating subscription status for user ${userDoc.id}:`, error);
            }
        }
        break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
