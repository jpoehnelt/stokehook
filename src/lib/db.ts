/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { app } from "./firebase";
import { collection, doc, getFirestore } from "firebase/firestore";
import type { User } from "firebase/auth";
import { auth } from "./auth";

export const db = getFirestore(app);

export const getUserRef = (user?: User) =>
  doc(collection(db, "users"), (user || auth.currentUser!).uid);

export const getWebhooksRef = (user?: User) =>
  collection(
    doc(collection(db, "users"), (user || auth.currentUser!).uid),
    "webhooks"
  );

export const getStatsRef = (user?: User) =>
  collection(
    doc(collection(db, "users"), (user || auth.currentUser!).uid),
    "stats"
  );
