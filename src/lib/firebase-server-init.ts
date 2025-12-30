function getServiceAccount() {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error('Missing Firebase Admin environment variables.');
  }

  // Robust parsing: handles literal \n, escaped \\n, and preserves headers
  const formattedKey = FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n');

  // Verify the key has the correct PEM headers
  if (!formattedKey.includes('BEGIN PRIVATE KEY')) {
    throw new Error('FIREBASE_PRIVATE_KEY is missing PEM headers.');
  }

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: formattedKey,
  };
}
