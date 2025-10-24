
// The dotenv/config import is now handled by the `tsx` command arguments in package.json
// Example: tsx -r dotenv/config src/scripts/seed.ts

import { initializeAdminApp } from '@/lib/firebase-admin';
import {
  users,
  startups,
  jobs,
  theses,
  conversations,
  notifications,
  interests,
} from '@/lib/mock-data';

// Initialize the app before using firestore
const { firestore } = initializeAdminApp();

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

