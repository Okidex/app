
// The dotenv/config import is now handled by the `tsx` command arguments in package.json
import admin from 'firebase-admin';
import {
  users,
  startups,
  jobs,
  theses,
  conversations,
  notifications,
  interests,
} from '@/lib/mock-data';

// --- Direct Admin SDK Initialization ---
// This pattern ensures the SDK is initialized only once.
if (admin.apps.length === 0) {
  // When running locally, we use the service account key file.
  // The `GOOGLE_APPLICATION_CREDENTIALS` env var is set in the `.env` file
  // and loaded by the `tsx -r dotenv/config` command.
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } else {
    // When deployed to a Google Cloud environment (like App Hosting),
    // initializeApp() with no arguments will automatically use the production service account.
    admin.initializeApp();
  }
}

const firestore = admin.firestore();
// --- End Initialization ---


async function seedDatabase() {
  const batch = firestore.batch();

  console.log('Seeding users...');
  users.forEach((user) => {
    const userRef = firestore.collection('users').doc(user.id);
    batch.set(userRef, user);
  });

  console.log('Seeding startups...');
  startups.forEach((startup) => {
    const startupRef = firestore.collection('startups').doc(startup.id);
    batch.set(startupRef, startup);
  });

  console.log('Seeding jobs...');
  jobs.forEach((job) => {
    const jobRef = firestore.collection('jobs').doc(job.id);
    batch.set(jobRef, job);
  });

  console.log('Seeding theses...');
  theses.forEach((thesis) => {
    const thesisRef = firestore.collection('theses').doc(thesis.id);
    batch.set(thesisRef, thesis);
  });

  console.log('Seeding conversations...');
  conversations.forEach((conversation) => {
    const conversationRef = firestore.collection('conversations').doc(conversation.id);
    batch.set(conversationRef, conversation);
  });

  console.log('Seeding notifications...');
  notifications.forEach((notification) => {
    const notificationRef = firestore.collection('notifications').doc(notification.id);
    batch.set(notificationRef, notification);
  });

  console.log('Seeding interests...');
  interests.forEach((interest) => {
    const interestRef = firestore.collection('interests').doc(interest.id);
    batch.set(interestRef, interest);
  });

  try {
    await batch.commit();
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database: ', error);
    process.exit(1);
  }
}

seedDatabase();
