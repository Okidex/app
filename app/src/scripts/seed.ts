
import 'dotenv/config';
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

// --- Direct Admin SDK Initialization for Seeding ---
if (admin.apps.length === 0) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    console.log('Firebase Admin SDK initialized for seeding.');
  } catch(e:any) {
    console.error('Error initializing Firebase Admin for seeding. Ensure GOOGLE_APPLICATION_CREDENTIALS is set.');
    throw e;
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
