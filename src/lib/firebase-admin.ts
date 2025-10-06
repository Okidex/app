
import admin from 'firebase-admin';

let app: admin.app.App;

export function initializeAdminApp() {
  if (admin.apps.length) {
    app = admin.app();
  } else {
    // These credentials will be auto-populated by Firebase App Hosting.
    // In a local environment, you would need to set up a service account.
    app = admin.initializeApp();
  }

  return {
    auth: getAuth(app),
    firestore: getFirestore(app),
    storage: getStorage(app)
  };
}

function getAuth(app: admin.app.App) {
  return admin.auth(app);
}

function getFirestore(app: admin.app.App) {
  return admin.firestore(app);
}

function getStorage(app: admin.app.App) {
    return admin.storage(app);
}

