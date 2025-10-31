
import 'server-only';

export function getServiceAccountCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      console.log(`Loading service account from: ${credentialsPath}`);
      return require(credentialsPath);
    } catch (e) {
      console.error("Failed to load service account credentials:", e);
      return null;
    }
  }
  return null;
}
