import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  Buffer.from(import.meta.env.VITE_SERVICE_ACCOUNT, "base64").toString()
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();
export const app = admin.app();
export const auth = admin.auth();
