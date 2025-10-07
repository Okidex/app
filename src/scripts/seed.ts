import { config } from 'dotenv';
config({ path: '.env.local' });

import { initializeFirebase } from '@/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import {
  users,
  startups,
  jobs,
  theses,
  conversations,
  notifications,
  interests,
} from '@/lib/mock-data';

async function seedDatabase() {
  const { firestore } = initializeFirebase();
  if (!firestore) {
    console.error("Firestore is not initialized.");
    return;
  }
  const batch = writeBatch(firestore);

  console.log('Seeding users...');
  users.forEach((user) => {
    const userRef = doc(firestore, 'users', user.id);
    batch.set(userRef, user);
  });

  console.log('Seeding startups...');
  startups.forEach((startup) => {
    const startupRef = doc(firestore, 'startups', startup.id);
    batch.set(startupRef, startup);
  });

  console.log('Seeding jobs...');
  jobs.forEach((job) => {
    const jobRef = doc(firestore, 'jobs', job.id);
    batch.set(jobRef, job);
  });

  console.log('Seeding theses...');
  theses.forEach((thesis) => {
    const thesisRef = doc(firestore, 'theses', thesis.id);
    batch.set(thesisRef, thesis);
  });

  console.log('Seeding conversations...');
  conversations.forEach((conversation) => {
    const conversationRef = doc(firestore, 'conversations', conversation.id);
    batch.set(conversationRef, conversation);
  });

  console.log('Seeding notifications...');
  notifications.forEach((notification) => {
    const notificationRef = doc(firestore, 'notifications', notification.id);
    batch.set(notificationRef, notification);
  });

  console.log('Seeding interests...');
  interests.forEach((interest) => {
    const interestRef = doc(firestore, 'interests', interest.id);
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

