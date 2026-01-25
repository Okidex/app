
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe/config';
import { initializeAdminApp } from '@/lib/firebase-server-init';
import { FounderProfile } from '@/lib/types';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf.toString(), sig!, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        console.error(`Error verifying webhook signature: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const { firestore } = await initializeAdminApp();

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.firebaseUID;
                const plan = session.metadata?.plan as 'monthly' | 'yearly';
                const stripeSubscriptionId = session.subscription as string;

                if (userId && plan) {
                    const userRef = firestore.collection('users').doc(userId);
                    const userDoc = await userRef.get();
                    if(userDoc.exists) {
                        const profile = (userDoc.data() as { profile: FounderProfile }).profile;
                        const newStripeDetails = {
                            ...(profile.stripe || {}),
                            subscriptionId: stripeSubscriptionId,
                            plan: plan,
                            status: 'active'
                        };
                        await userRef.set({
                            profile: {
                                isPremium: true,
                                stripe: newStripeDetails
                            }
                        }, { merge: true });
                         console.log(`Updated user ${userId} to Oki+ ${plan}.`);
                    }
                }
                break;

            case 'customer.subscription.deleted':
            case 'customer.subscription.updated':
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const usersQuery = firestore.collection('users').where('profile.stripe.customerId', '==', customerId).limit(1);
                const userSnapshot = await usersQuery.get();

                if (!userSnapshot.empty) {
                    const userDoc = userSnapshot.docs[0];
                    const shouldBePremium = subscription.status === 'active' || subscription.status === 'trialing';

                    await userDoc.ref.set({
                        profile: {
                            isPremium: shouldBePremium,
                            stripe: {
                                status: subscription.status
                            }
                        }
                    }, { merge: true });
                     console.log(`Updated user ${userDoc.id} subscription status to ${subscription.status}.`);
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).json({ received: true });

    } catch (error: any) {
        console.error("Error processing Stripe webhook:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default handler;
