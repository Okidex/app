
import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '@/lib/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { users, startups, jobs, theses, conversations, notifications, interests } from '@/lib/mock-data';

async function seedDatabase() {
    const batch = writeBatch(db);

    console.log('Seeding users...');
    users.forEach(user => {
        const userRef = doc(db, 'users', user.id);
        batch.set(userRef, user);
    });

    console.log('Seeding startups...');
    startups.forEach(startup => {
        const startupRef = doc(db, 'startups', startup.id);
        batch.set(startupRef, startup);
    });

    console.log('Seeding jobs...');
    jobs.forEach(job => {
        const jobRef = doc(db, 'jobs', job.id);
        batch.set(jobRef, job);
    });

    console.log('Seeding theses...');
    theses.forEach(thesis => {
        const thesisRef = doc(db, 'theses', thesis.id);
        batch.set(thesisRef, thesis);
    });

    console.log('Seeding conversations...');
    conversations.forEach(conversation => {
        const conversationRef = doc(db, 'conversations', conversation.id);
        batch.set(conversationRef, conversation);
    });

    console.log('Seeding notifications...');
    notifications.forEach(notification => {
        const notificationRef = doc(db, 'notifications', notification.id);
        batch.set(notificationRef, notification);
    });
    
    console.log('Seeding interests...');
    interests.forEach(interest => {
        const interestRef = doc(db, 'interests', interest.id);
        batch.set(interestRef, interest);
    });

    try {
        await batch.commit();
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database: ', error);
    }
}

seedDatabase();

