
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
    typescript: true,
});

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export const STRIPE_PRICE_IDS = {
    monthly: 'price_1PU6koCag8ZYHKkFlv2N0vY5',
    yearly: 'price_1PU6lHCag8ZYHKkFz0ERf8d7',
};
