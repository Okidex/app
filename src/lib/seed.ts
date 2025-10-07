
import { config } from 'dotenv';
config({ path: '.env.local' });

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

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function seedDatabase() {
  const batch = db.batch();

  console.log('Seeding users...');
  users.forEach((user) => {
    const userRef = db.collection('users').doc(user.id);
    batch.set(userRef, user);
  });

  console.log('Seeding startups...');
  startups.forEach((startup) => {
    const startupRef = db.collection('startups').doc(startup.id);
    batch.set(startupRef, startup);
  });

  console.log('Seeding jobs...');
  jobs.forEach((job) => {
    const jobRef = db.collection('jobs').doc(job.id);
    batch.set(jobRef, job);
  });

  console.log('Seeding theses...');
  theses.forEach((thesis) => {
    const thesisRef = db.collection('theses').doc(thesis.id);
    batch.set(thesisRef, thesis);
  });

  console.log('Seeding conversations...');
  conversations.forEach((conversation) => {
    const conversationRef = db.collection('conversations').doc(conversation.id);
    batch.set(conversationRef, conversation);
  });

  console.log('Seeding notifications...');
  notifications.forEach((notification) => {
    const notificationRef = db.collection('notifications').doc(notification.id);
    batch.set(notificationRef, notification);
  });

  console.log('Seeding interests...');
  interests.forEach((interest) => {
    const interestRef = db.collection('interests').doc(interest.id);
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

