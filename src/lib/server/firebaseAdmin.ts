export { getApp } from "firebase-admin/app";
import admin from "firebase-admin";
export { getFirestore } from "firebase-admin/firestore";
export { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(
  Buffer.from(import.meta.env.VITE_SERVICE_ACCOUNT, "base64").toString()
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
