# Okidex Development Changelog

This log tracks files added or modified to resolve build errors, routing conflicts, and implement core profile interactions.

## Added Files
- `src/app/api/session/route.ts`: Manages HTTP-only session cookies via standard App Router handlers.
- `src/app/api/webhooks/stripe/route.ts`: App Router endpoint for Stripe events, replacing the legacy Pages API route.

## Modified Files
- `next.config.ts`: Fixed the 404 bug by restoring standard `pageExtensions` and optimized build aliases.
- `src/lib/actions.ts`: Added `sendConnectionRequest` and `getOrCreateConversation`. Updated all actions to support hybrid ID Token/Session Cookie authentication.
- `src/lib/auth-actions.ts`: Refactored session management to use `SameSite=None` for secure cross-site workspace preview compatibility.
- `src/app/(app)/users/[id]/client.tsx`: Implemented button interactions for "Connect" and "Message" with real-time ID token verification. Fixed JSX syntax errors in the Investor sidebar.
- `src/app/(app)/messages/client.tsx`: Added real-time message stream listeners and conversation deep-linking via URL parameters.
- `src/app/api/profile/update/route.ts`: Re-implemented as a standard App Router POST handler to avoid routing conflicts.
- `src/lib/firebase-server-init.ts`: Hardened the Admin SDK singleton to prevent "App already exists" errors.
- `src/components/layout/app-header.tsx`: Updated logout flow to clear server-side sessions correctly.
- `src/components/auth/login-form.tsx`: Integrated server-side session creation upon successful login.
- `src/components/auth/register-form.tsx`: Integrated session creation during multi-step registration.
- `src/components/auth/founder-register-form.tsx`: Added session creation and fixed startup document initialization.
- `src/components/auth/investor-register-form.tsx`: Added session creation and fixed user document initialization.
- `src/components/auth/talent-register-form.tsx`: Added session creation and fixed profile document initialization.
- `src/lib/types.ts`: Updated `User` and `FullUserProfile` types to include `uid` and resolve property access errors.
- `src/components/layout/app-sidebar.tsx`: Fixed notification permission errors by hardening the Firestore listener query.
- `src/components/layout/notifications.tsx`: Hardened the notification sync logic to prevent security rule rejections.
- `src/ai/flows/*.ts`: Updated all GenAI flows to Genkit v1.x syntax.
- `src/ai/genkit.ts`: Configured the AI instance for Gemini 3 Flash Preview.
