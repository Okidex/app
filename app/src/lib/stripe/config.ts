import Stripe from 'stripe';

/**
 * FIXED: Removed '!' and added fallback strings to prevent build crashes in CI/CD (GitHub Actions).
 * Next.js evaluates this module during build, but secrets aren't always present.
 */
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export const stripe = new Stripe(stripeKey, {
    // @ts-ignore - Using your specific project version
    apiVersion: '2026-01-28.clover',
    typescript: true,
});

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export const STRIPE_PRICE_IDS = {
    monthly: 'price_1PU6koCag8ZYHKkFlv2N0vY5',
    yearly: 'price_1PU6lHCag8ZYHKkFz0ERf8d7',
};
