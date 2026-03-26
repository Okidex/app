const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('/Users/wilfredwong/Downloads/studio-8509111427-a45a7-firebase-adminsdk-fbsvc-43ab0aa155.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
async function run() {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', 'mario@xpandtree.com').get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', JSON.stringify(doc.data(), null, 2));
  });
}
run();
